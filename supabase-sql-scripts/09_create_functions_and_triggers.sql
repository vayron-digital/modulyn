-- =====================================================
-- Create Utility Functions and Triggers
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'));
END;
$$ language 'plpgsql';

-- Function to calculate task completion percentage
CREATE OR REPLACE FUNCTION calculate_task_completion(project_id UUID)
RETURNS DECIMAL AS $$
DECLARE
    total_tasks INTEGER;
    completed_tasks INTEGER;
BEGIN
    SELECT COUNT(*), COUNT(CASE WHEN status = 'completed' THEN 1 END)
    INTO total_tasks, completed_tasks
    FROM tasks
    WHERE project_id = calculate_task_completion.project_id;
    
    IF total_tasks = 0 THEN
        RETURN 0;
    END IF;
    
    RETURN (completed_tasks::DECIMAL / total_tasks::DECIMAL) * 100;
END;
$$ language 'plpgsql';

-- Function to update deal stage based on activities
CREATE OR REPLACE FUNCTION update_deal_stage()
RETURNS TRIGGER AS $$
BEGIN
    -- Update deal stage based on last activity
    UPDATE deals 
    SET stage = CASE 
        WHEN NEW.activity_type = 'meeting' THEN 'negotiation'
        WHEN NEW.activity_type = 'proposal_sent' THEN 'proposal'
        WHEN NEW.activity_type = 'contract_signed' THEN 'closed_won'
        ELSE deals.stage
    END
    WHERE id = NEW.deal_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to create notification for task assignment
CREATE OR REPLACE FUNCTION create_task_assignment_notification()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.assigned_to IS NOT NULL AND NEW.assigned_to != OLD.assigned_to THEN
        INSERT INTO notifications (
            tenant_id,
            user_id,
            type,
            title,
            message,
            related_to_type,
            related_to_id
        ) VALUES (
            NEW.tenant_id,
            NEW.assigned_to,
            'task_assigned',
            'New Task Assigned',
            'You have been assigned a new task: ' || NEW.title,
            'task',
            NEW.id
        );
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to create notification for deal stage change
CREATE OR REPLACE FUNCTION create_deal_stage_notification()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.stage != OLD.stage THEN
        INSERT INTO notifications (
            tenant_id,
            user_id,
            type,
            title,
            message,
            related_to_type,
            related_to_id
        ) VALUES (
            NEW.tenant_id,
            NEW.assigned_to,
            'deal_updated',
            'Deal Stage Updated',
            'Deal "' || NEW.title || '" has moved to ' || NEW.stage || ' stage',
            'deal',
            NEW.id
        );
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to validate email format
CREATE OR REPLACE FUNCTION validate_email(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ language 'plpgsql';

-- Function to calculate lead score
CREATE OR REPLACE FUNCTION calculate_lead_score(lead_id UUID)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    lead_record RECORD;
BEGIN
    SELECT * INTO lead_record FROM leads WHERE id = lead_id;
    
    -- Base score from source
    CASE lead_record.source
        WHEN 'website' THEN score := score + 10;
        WHEN 'referral' THEN score := score + 15;
        WHEN 'social_media' THEN score := score + 8;
        WHEN 'cold_call' THEN score := score + 5;
        WHEN 'email_campaign' THEN score := score + 7;
        WHEN 'event' THEN score := score + 12;
        WHEN 'advertising' THEN score := score + 6;
        ELSE score := score + 3;
    END CASE;
    
    -- Score from budget (if budget is high, add more points)
    IF lead_record.budget IS NOT NULL THEN
        IF lead_record.budget >= 100000 THEN
            score := score + 20;
        ELSIF lead_record.budget >= 50000 THEN
            score := score + 15;
        ELSIF lead_record.budget >= 25000 THEN
            score := score + 10;
        ELSIF lead_record.budget >= 10000 THEN
            score := score + 5;
        END IF;
    END IF;
    
    -- Score from timeline
    IF lead_record.timeline = 'immediate' THEN
        score := score + 10;
    ELSIF lead_record.timeline = 'within_3_months' THEN
        score := score + 8;
    ELSIF lead_record.timeline = 'within_6_months' THEN
        score := score + 5;
    ELSIF lead_record.timeline = 'within_year' THEN
        score := score + 3;
    END IF;
    
    -- Score from status
    CASE lead_record.status
        WHEN 'qualified' THEN score := score + 20;
        WHEN 'proposal' THEN score := score + 15;
        WHEN 'negotiation' THEN score := score + 10;
        WHEN 'contacted' THEN score := score + 5;
        WHEN 'new' THEN score := score + 0;
        ELSE score := score + 0;
    END CASE;
    
    RETURN score;
END;
$$ language 'plpgsql';

-- Function to update lead score automatically
CREATE OR REPLACE FUNCTION update_lead_score()
RETURNS TRIGGER AS $$
BEGIN
    NEW.lead_score = calculate_lead_score(NEW.id);
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to create activity log entry
CREATE OR REPLACE FUNCTION create_activity_log()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO activity_log (
        tenant_id,
        user_id,
        activity_type,
        description,
        related_to_type,
        related_to_id,
        metadata
    ) VALUES (
        NEW.tenant_id,
        auth.uid(),
        TG_ARGV[0],
        TG_ARGV[1],
        TG_ARGV[2],
        NEW.id,
        jsonb_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW))
    );
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to check subscription limits
CREATE OR REPLACE FUNCTION check_subscription_limits()
RETURNS TRIGGER AS $$
DECLARE
    current_usage INTEGER;
    max_limit INTEGER;
    subscription_record RECORD;
BEGIN
    -- Get current subscription
    SELECT * INTO subscription_record 
    FROM subscriptions 
    WHERE tenant_id = NEW.tenant_id 
    AND status = 'active' 
    ORDER BY created_at DESC 
    LIMIT 1;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No active subscription found for tenant';
    END IF;
    
    -- Check limits based on table being inserted into
    CASE TG_TABLE_NAME
        WHEN 'contacts' THEN
            SELECT COUNT(*) INTO current_usage FROM contacts WHERE tenant_id = NEW.tenant_id;
            max_limit := CASE subscription_record.plan
                WHEN 'basic' THEN 1000
                WHEN 'professional' THEN 10000
                WHEN 'enterprise' THEN 100000
                ELSE 100
            END;
        WHEN 'leads' THEN
            SELECT COUNT(*) INTO current_usage FROM leads WHERE tenant_id = NEW.tenant_id;
            max_limit := CASE subscription_record.plan
                WHEN 'basic' THEN 500
                WHEN 'professional' THEN 5000
                WHEN 'enterprise' THEN 50000
                ELSE 50
            END;
        WHEN 'deals' THEN
            SELECT COUNT(*) INTO current_usage FROM deals WHERE tenant_id = NEW.tenant_id;
            max_limit := CASE subscription_record.plan
                WHEN 'basic' THEN 100
                WHEN 'professional' THEN 1000
                WHEN 'enterprise' THEN 10000
                ELSE 10
            END;
        ELSE
            RETURN NEW;
    END CASE;
    
    IF current_usage >= max_limit THEN
        RAISE EXCEPTION 'Subscription limit exceeded for %: %/%', TG_TABLE_NAME, current_usage, max_limit;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to clean up expired data
CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS VOID AS $$
BEGIN
    -- Clean up expired notifications (older than 90 days)
    DELETE FROM notifications 
    WHERE created_at < NOW() - INTERVAL '90 days' 
    AND status = 'read';
    
    -- Clean up expired data exports (older than 7 days)
    DELETE FROM data_exports 
    WHERE created_at < NOW() - INTERVAL '7 days' 
    AND status = 'completed';
    
    -- Clean up old analytics events (older than 1 year)
    DELETE FROM analytics_events 
    WHERE timestamp < NOW() - INTERVAL '1 year';
    
    -- Clean up old page views (older than 1 year)
    DELETE FROM page_views 
    WHERE timestamp < NOW() - INTERVAL '1 year';
    
    -- Clean up old user sessions (older than 30 days)
    DELETE FROM user_sessions 
    WHERE started_at < NOW() - INTERVAL '30 days';
END;
$$ language 'plpgsql';

-- Function to get user permissions
CREATE OR REPLACE FUNCTION get_user_permissions(user_id UUID, tenant_id UUID)
RETURNS JSONB AS $$
DECLARE
    user_profile RECORD;
    permissions JSONB;
BEGIN
    SELECT * INTO user_profile FROM profiles WHERE id = user_id AND tenant_id = get_user_permissions.tenant_id;
    
    IF NOT FOUND THEN
        RETURN '{}'::jsonb;
    END IF;
    
    -- Define permissions based on role
    CASE user_profile.role
        WHEN 'admin' THEN
            permissions := '{
                "can_manage_users": true,
                "can_manage_subscriptions": true,
                "can_manage_settings": true,
                "can_view_analytics": true,
                "can_manage_reports": true,
                "can_manage_events": true,
                "can_manage_contacts": true,
                "can_manage_leads": true,
                "can_manage_deals": true,
                "can_manage_properties": true,
                "can_manage_tasks": true,
                "can_manage_communications": true
            }'::jsonb;
        WHEN 'manager' THEN
            permissions := '{
                "can_manage_users": false,
                "can_manage_subscriptions": false,
                "can_manage_settings": false,
                "can_view_analytics": true,
                "can_manage_reports": true,
                "can_manage_events": true,
                "can_manage_contacts": true,
                "can_manage_leads": true,
                "can_manage_deals": true,
                "can_manage_properties": true,
                "can_manage_tasks": true,
                "can_manage_communications": true
            }'::jsonb;
        WHEN 'member' THEN
            permissions := '{
                "can_manage_users": false,
                "can_manage_subscriptions": false,
                "can_manage_settings": false,
                "can_view_analytics": false,
                "can_manage_reports": false,
                "can_manage_events": true,
                "can_manage_contacts": true,
                "can_manage_leads": true,
                "can_manage_deals": true,
                "can_manage_properties": true,
                "can_manage_tasks": true,
                "can_manage_communications": false
            }'::jsonb;
        ELSE
            permissions := '{
                "can_manage_users": false,
                "can_manage_subscriptions": false,
                "can_manage_settings": false,
                "can_view_analytics": false,
                "can_manage_reports": false,
                "can_manage_events": false,
                "can_manage_contacts": false,
                "can_manage_leads": false,
                "can_manage_deals": false,
                "can_manage_properties": false,
                "can_manage_tasks": false,
                "can_manage_communications": false
            }'::jsonb;
    END CASE;
    
    RETURN permissions;
END;
$$ language 'plpgsql';

-- Create triggers for automatic functionality

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS task_assignment_notification_trigger ON tasks;
DROP TRIGGER IF EXISTS deal_stage_notification_trigger ON deals;
DROP TRIGGER IF EXISTS lead_score_calculation_trigger ON leads;
DROP TRIGGER IF EXISTS subscription_limit_check_contacts ON contacts;
DROP TRIGGER IF EXISTS subscription_limit_check_leads ON leads;
DROP TRIGGER IF EXISTS subscription_limit_check_deals ON deals;
DROP TRIGGER IF EXISTS activity_log_contacts_trigger ON contacts;
DROP TRIGGER IF EXISTS activity_log_leads_trigger ON leads;
DROP TRIGGER IF EXISTS activity_log_deals_trigger ON deals;

-- Trigger for task assignment notifications
CREATE TRIGGER task_assignment_notification_trigger
    AFTER UPDATE OF assigned_to ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION create_task_assignment_notification();

-- Trigger for deal stage change notifications
CREATE TRIGGER deal_stage_notification_trigger
    AFTER UPDATE OF stage ON deals
    FOR EACH ROW
    EXECUTE FUNCTION create_deal_stage_notification();

-- Trigger for lead score calculation
CREATE TRIGGER lead_score_calculation_trigger
    BEFORE INSERT OR UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_lead_score();

-- Trigger for subscription limit checking
CREATE TRIGGER subscription_limit_check_contacts
    BEFORE INSERT ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION check_subscription_limits();

CREATE TRIGGER subscription_limit_check_leads
    BEFORE INSERT ON leads
    FOR EACH ROW
    EXECUTE FUNCTION check_subscription_limits();

CREATE TRIGGER subscription_limit_check_deals
    BEFORE INSERT ON deals
    FOR EACH ROW
    EXECUTE FUNCTION check_subscription_limits();

-- Trigger for activity logging
CREATE TRIGGER activity_log_contacts_trigger
    AFTER INSERT OR UPDATE OR DELETE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION create_activity_log('contact_created', 'Contact activity', 'contact');

CREATE TRIGGER activity_log_leads_trigger
    AFTER INSERT OR UPDATE OR DELETE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION create_activity_log('lead_created', 'Lead activity', 'lead');

CREATE TRIGGER activity_log_deals_trigger
    AFTER INSERT OR UPDATE OR DELETE ON deals
    FOR EACH ROW
    EXECUTE FUNCTION create_activity_log('deal_created', 'Deal activity', 'deal');

-- Note: To enable scheduled cleanup, you need to:
-- 1. Enable the pg_cron extension in Supabase
-- 2. Uncomment the following lines:
-- 
-- CREATE EXTENSION IF NOT EXISTS pg_cron;
-- SELECT cron.schedule(
--     'cleanup-expired-data',
--     '0 2 * * *', -- Daily at 2 AM
--     'SELECT cleanup_expired_data();'
-- );
-- 
-- For now, you can manually run cleanup with:
-- SELECT cleanup_expired_data();
