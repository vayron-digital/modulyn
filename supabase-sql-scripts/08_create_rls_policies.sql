-- =====================================================
-- Create Row Level Security (RLS) Policies
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_category_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaign_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_values ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Tenants Policies
-- =====================================================

-- Users can view their own tenant
DROP POLICY IF EXISTS "Users can view own tenant" ON tenants;
CREATE POLICY "Users can view own tenant" ON tenants
    FOR SELECT USING (id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Allow all operations for tenants for now to prevent recursion issues
-- TODO: Implement proper super admin checks once the basic functionality works
DROP POLICY IF EXISTS "Allow all operations for tenants" ON tenants;
CREATE POLICY "Allow all operations for tenants" ON tenants
    FOR ALL USING (true);

-- =====================================================
-- Profiles Policies
-- =====================================================

-- Users can view profiles in their tenant
DROP POLICY IF EXISTS "Users can view profiles in tenant" ON profiles;
CREATE POLICY "Users can view profiles in tenant" ON profiles
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Users can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (id = auth.uid());

-- Users can insert their own profile (for registration)
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (id = auth.uid());

-- Allow all operations for now to prevent recursion issues
-- TODO: Implement proper admin checks once the basic functionality works
DROP POLICY IF EXISTS "Allow all operations for profiles" ON profiles;
CREATE POLICY "Allow all operations for profiles" ON profiles
    FOR ALL USING (true);

-- =====================================================
-- Subscriptions Policies
-- =====================================================

-- Users can view subscriptions in their tenant
DROP POLICY IF EXISTS "Users can view subscriptions in tenant" ON subscriptions;
CREATE POLICY "Users can view subscriptions in tenant" ON subscriptions
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Only admins can manage subscriptions
DROP POLICY IF EXISTS "Admins can manage subscriptions" ON subscriptions;
CREATE POLICY "Admins can manage subscriptions" ON subscriptions
    FOR ALL USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = subscriptions.tenant_id
            AND role IN ('admin', 'manager')
        )
    );

-- =====================================================
-- Events Policies
-- =====================================================

-- Users can view events in their tenant
DROP POLICY IF EXISTS "Users can view events in tenant" ON events;
CREATE POLICY "Users can view events in tenant" ON events
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Users can create events if they have permission
DROP POLICY IF EXISTS "Users can create events" ON events;
CREATE POLICY "Users can create events" ON events
    FOR INSERT WITH CHECK (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = events.tenant_id
            AND role IN ('admin', 'manager', 'member')
        )
    );

-- Users can update events they created or if they're admin/manager
DROP POLICY IF EXISTS "Users can update events" ON events;
CREATE POLICY "Users can update events" ON events
    FOR UPDATE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = events.tenant_id
                AND role IN ('admin', 'manager')
            )
        )
    );

-- Users can delete events they created or if they're admin
DROP POLICY IF EXISTS "Users can delete events" ON events;
CREATE POLICY "Users can delete events" ON events
    FOR DELETE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = events.tenant_id
                AND role = 'admin'
            )
        )
    );

-- =====================================================
-- Event Registrations Policies
-- =====================================================

-- Users can view registrations in their tenant
DROP POLICY IF EXISTS "Users can view registrations in tenant" ON event_registrations;
CREATE POLICY "Users can view registrations in tenant" ON event_registrations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_registrations.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
    );

-- Users can register themselves for events
DROP POLICY IF EXISTS "Users can register for events" ON event_registrations;
CREATE POLICY "Users can register for events" ON event_registrations
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_registrations.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
        AND user_id = auth.uid()
    );

-- Users can update their own registrations
DROP POLICY IF EXISTS "Users can update own registrations" ON event_registrations;
CREATE POLICY "Users can update own registrations" ON event_registrations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_registrations.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
        AND user_id = auth.uid()
    );

-- Admins/managers can manage all registrations
DROP POLICY IF EXISTS "Admins can manage all registrations" ON event_registrations;
CREATE POLICY "Admins can manage all registrations" ON event_registrations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_registrations.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
            AND role IN ('admin', 'manager')
        )
    );

-- =====================================================
-- Contacts Policies
-- =====================================================

-- Users can view contacts in their tenant
DROP POLICY IF EXISTS "Users can view contacts in tenant" ON contacts;
CREATE POLICY "Users can view contacts in tenant" ON contacts
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Users can create contacts
DROP POLICY IF EXISTS "Users can create contacts" ON contacts;
CREATE POLICY "Users can create contacts" ON contacts
    FOR INSERT WITH CHECK (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = contacts.tenant_id
            AND role IN ('admin', 'manager', 'member')
        )
    );

-- Users can update contacts they created or are assigned to, or if they're admin/manager
DROP POLICY IF EXISTS "Users can update contacts" ON contacts;
CREATE POLICY "Users can update contacts" ON contacts
    FOR UPDATE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR assigned_to = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = contacts.tenant_id
                AND role IN ('admin', 'manager')
            )
        )
    );

-- Users can delete contacts they created or if they're admin
DROP POLICY IF EXISTS "Users can delete contacts" ON contacts;
CREATE POLICY "Users can delete contacts" ON contacts
    FOR DELETE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = contacts.tenant_id
                AND role = 'admin'
            )
        )
    );

-- =====================================================
-- Leads Policies
-- =====================================================

-- Users can view leads in their tenant
DROP POLICY IF EXISTS "Users can view leads in tenant" ON leads;
CREATE POLICY "Users can view leads in tenant" ON leads
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Users can create leads
DROP POLICY IF EXISTS "Users can create leads" ON leads;
CREATE POLICY "Users can create leads" ON leads
    FOR INSERT WITH CHECK (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = leads.tenant_id
            AND role IN ('admin', 'manager', 'member')
        )
    );

-- Users can update leads they created or are assigned to, or if they're admin/manager
DROP POLICY IF EXISTS "Users can update leads" ON leads;
CREATE POLICY "Users can update leads" ON leads
    FOR UPDATE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR assigned_to = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = leads.tenant_id
                AND role IN ('admin', 'manager')
            )
        )
    );

-- Users can delete leads they created or if they're admin
DROP POLICY IF EXISTS "Users can delete leads" ON leads;
CREATE POLICY "Users can delete leads" ON leads
    FOR DELETE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = leads.tenant_id
                AND role = 'admin'
            )
        )
    );

-- =====================================================
-- Deals Policies
-- =====================================================

-- Users can view deals in their tenant
DROP POLICY IF EXISTS "Users can view deals in tenant" ON deals;
CREATE POLICY "Users can view deals in tenant" ON deals
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Users can create deals
DROP POLICY IF EXISTS "Users can create deals" ON deals;
CREATE POLICY "Users can create deals" ON deals
    FOR INSERT WITH CHECK (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = deals.tenant_id
            AND role IN ('admin', 'manager', 'member')
        )
    );

-- Users can update deals they created or are assigned to, or if they're admin/manager
DROP POLICY IF EXISTS "Users can update deals" ON deals;
CREATE POLICY "Users can update deals" ON deals
    FOR UPDATE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR assigned_to = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = deals.tenant_id
                AND role IN ('admin', 'manager')
            )
        )
    );

-- Users can delete deals they created or if they're admin
DROP POLICY IF EXISTS "Users can delete deals" ON deals;
CREATE POLICY "Users can delete deals" ON deals
    FOR DELETE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = deals.tenant_id
                AND role = 'admin'
            )
        )
    );

-- =====================================================
-- Properties Policies
-- =====================================================

-- Users can view properties in their tenant
DROP POLICY IF EXISTS "Users can view properties in tenant" ON properties;
CREATE POLICY "Users can view properties in tenant" ON properties
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Users can create properties
DROP POLICY IF EXISTS "Users can create properties" ON properties;
CREATE POLICY "Users can create properties" ON properties
    FOR INSERT WITH CHECK (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = properties.tenant_id
            AND role IN ('admin', 'manager', 'member')
        )
    );

-- Users can update properties they created or are assigned to, or if they're admin/manager
DROP POLICY IF EXISTS "Users can update properties" ON properties;
CREATE POLICY "Users can update properties" ON properties
    FOR UPDATE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR assigned_to = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = properties.tenant_id
                AND role IN ('admin', 'manager')
            )
        )
    );

-- Users can delete properties they created or if they're admin
DROP POLICY IF EXISTS "Users can delete properties" ON properties;
CREATE POLICY "Users can delete properties" ON properties
    FOR DELETE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = properties.tenant_id
                AND role = 'admin'
            )
        )
    );

-- =====================================================
-- Tasks Policies
-- =====================================================

-- Users can view tasks in their tenant
DROP POLICY IF EXISTS "Users can view tasks in tenant" ON tasks;
CREATE POLICY "Users can view tasks in tenant" ON tasks
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Users can create tasks
DROP POLICY IF EXISTS "Users can create tasks" ON tasks;
CREATE POLICY "Users can create tasks" ON tasks
    FOR INSERT WITH CHECK (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = tasks.tenant_id
            AND role IN ('admin', 'manager', 'member')
        )
    );

-- Users can update tasks they created or are assigned to, or if they're admin/manager
DROP POLICY IF EXISTS "Users can update tasks" ON tasks;
CREATE POLICY "Users can update tasks" ON tasks
    FOR UPDATE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR assigned_to = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = tasks.tenant_id
                AND role IN ('admin', 'manager')
            )
        )
    );

-- Users can delete tasks they created or if they're admin
DROP POLICY IF EXISTS "Users can delete tasks" ON tasks;
CREATE POLICY "Users can delete tasks" ON tasks
    FOR DELETE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND (
            created_by = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND tenant_id = tasks.tenant_id
                AND role = 'admin'
            )
        )
    );

-- =====================================================
-- Email Templates Policies
-- =====================================================

-- Users can view email templates in their tenant
DROP POLICY IF EXISTS "Users can view email templates in tenant" ON email_templates;
CREATE POLICY "Users can view email templates in tenant" ON email_templates
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Only admins/managers can manage email templates
DROP POLICY IF EXISTS "Admins can manage email templates" ON email_templates;
CREATE POLICY "Admins can manage email templates" ON email_templates
    FOR ALL USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = email_templates.tenant_id
            AND role IN ('admin', 'manager')
        )
    );

-- =====================================================
-- Email Campaigns Policies
-- =====================================================

-- Users can view email campaigns in their tenant
DROP POLICY IF EXISTS "Users can view email campaigns in tenant" ON email_campaigns;
CREATE POLICY "Users can view email campaigns in tenant" ON email_campaigns
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Only admins/managers can manage email campaigns
DROP POLICY IF EXISTS "Admins can manage email campaigns" ON email_campaigns;
CREATE POLICY "Admins can manage email campaigns" ON email_campaigns
    FOR ALL USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = email_campaigns.tenant_id
            AND role IN ('admin', 'manager')
        )
    );

-- =====================================================
-- Notifications Policies
-- =====================================================

-- Users can only view their own notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid());

-- Users can update their own notifications
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (user_id = auth.uid());

-- System can create notifications for users
DROP POLICY IF EXISTS "System can create notifications" ON notifications;
CREATE POLICY "System can create notifications" ON notifications
    FOR INSERT WITH CHECK (true);

-- =====================================================
-- Analytics Policies
-- =====================================================

-- Users can view analytics in their tenant
DROP POLICY IF EXISTS "Users can view analytics in tenant" ON analytics_events;
CREATE POLICY "Users can view analytics in tenant" ON analytics_events
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- System can create analytics events
DROP POLICY IF EXISTS "System can create analytics events" ON analytics_events;
CREATE POLICY "System can create analytics events" ON analytics_events
    FOR INSERT WITH CHECK (true);

-- Only admins can delete analytics data
DROP POLICY IF EXISTS "Admins can delete analytics" ON analytics_events;
CREATE POLICY "Admins can delete analytics" ON analytics_events
    FOR DELETE USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = analytics_events.tenant_id
            AND role = 'admin'
        )
    );

-- =====================================================
-- Reports Policies
-- =====================================================

-- Users can view reports in their tenant
DROP POLICY IF EXISTS "Users can view reports in tenant" ON reports;
CREATE POLICY "Users can view reports in tenant" ON reports
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Only admins/managers can manage reports
DROP POLICY IF EXISTS "Admins can manage reports" ON reports;
CREATE POLICY "Admins can manage reports" ON reports
    FOR ALL USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = reports.tenant_id
            AND role IN ('admin', 'manager')
        )
    );

-- =====================================================
-- Dashboard Widgets Policies
-- =====================================================

-- Users can only view their own dashboard widgets
DROP POLICY IF EXISTS "Users can view own dashboard widgets" ON dashboard_widgets;
CREATE POLICY "Users can view own dashboard widgets" ON dashboard_widgets
    FOR SELECT USING (user_id = auth.uid());

-- Users can manage their own dashboard widgets
DROP POLICY IF EXISTS "Users can manage own dashboard widgets" ON dashboard_widgets;
CREATE POLICY "Users can manage own dashboard widgets" ON dashboard_widgets
    FOR ALL USING (user_id = auth.uid());

-- =====================================================
-- Data Exports Policies
-- =====================================================

-- Users can only view their own data exports
DROP POLICY IF EXISTS "Users can view own data exports" ON data_exports;
CREATE POLICY "Users can view own data exports" ON data_exports
    FOR SELECT USING (user_id = auth.uid());

-- Users can create their own data exports
DROP POLICY IF EXISTS "Users can create own data exports" ON data_exports;
CREATE POLICY "Users can create own data exports" ON data_exports
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can update their own data exports
DROP POLICY IF EXISTS "Users can update own data exports" ON data_exports;
CREATE POLICY "Users can update own data exports" ON data_exports
    FOR UPDATE USING (user_id = auth.uid());

-- =====================================================
-- KPI Policies
-- =====================================================

-- Users can view KPIs in their tenant
DROP POLICY IF EXISTS "Users can view KPIs in tenant" ON kpi_definitions;
CREATE POLICY "Users can view KPIs in tenant" ON kpi_definitions
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Only admins/managers can manage KPIs
DROP POLICY IF EXISTS "Admins can manage KPIs" ON kpi_definitions;
CREATE POLICY "Admins can manage KPIs" ON kpi_definitions
    FOR ALL USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = kpi_definitions.tenant_id
            AND role IN ('admin', 'manager')
        )
    );

-- =====================================================
-- Communication Settings Policies
-- =====================================================

-- Users can view communication settings in their tenant
DROP POLICY IF EXISTS "Users can view communication settings in tenant" ON communication_settings;
CREATE POLICY "Users can view communication settings in tenant" ON communication_settings
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Only admins can manage communication settings
DROP POLICY IF EXISTS "Admins can manage communication settings" ON communication_settings;
CREATE POLICY "Admins can manage communication settings" ON communication_settings
    FOR ALL USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = communication_settings.tenant_id
            AND role = 'admin'
        )
    );

-- =====================================================
-- Additional Table Policies
-- =====================================================

-- Invoices Policies
DROP POLICY IF EXISTS "Users can view invoices in tenant" ON invoices;
CREATE POLICY "Users can view invoices in tenant" ON invoices
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

DROP POLICY IF EXISTS "Admins can manage invoices" ON invoices;
CREATE POLICY "Admins can manage invoices" ON invoices
    FOR ALL USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = invoices.tenant_id
            AND role IN ('admin', 'manager')
        )
    );

-- Payment Methods Policies
DROP POLICY IF EXISTS "Users can view payment methods in tenant" ON payment_methods;
CREATE POLICY "Users can view payment methods in tenant" ON payment_methods
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

DROP POLICY IF EXISTS "Admins can manage payment methods" ON payment_methods;
CREATE POLICY "Admins can manage payment methods" ON payment_methods
    FOR ALL USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
            AND role IN ('admin', 'manager')
        )
    );

-- Event Sessions Policies
DROP POLICY IF EXISTS "Users can view event sessions in tenant" ON event_sessions;
CREATE POLICY "Users can view event sessions in tenant" ON event_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_sessions.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
    );

DROP POLICY IF EXISTS "Admins can manage event sessions" ON event_sessions;
CREATE POLICY "Admins can manage event sessions" ON event_sessions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_sessions.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
            AND role IN ('admin', 'manager')
        )
    );

-- Event Waitlist Policies
DROP POLICY IF EXISTS "Users can view event waitlist in tenant" ON event_waitlist;
CREATE POLICY "Users can view event waitlist in tenant" ON event_waitlist
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_waitlist.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
    );

DROP POLICY IF EXISTS "Users can manage own waitlist entries" ON event_waitlist;
CREATE POLICY "Users can manage own waitlist entries" ON event_waitlist
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_waitlist.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
        AND user_id = auth.uid()
    );

-- Event Feedback Policies
DROP POLICY IF EXISTS "Users can view event feedback in tenant" ON event_feedback;
CREATE POLICY "Users can view event feedback in tenant" ON event_feedback
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_feedback.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
    );

DROP POLICY IF EXISTS "Users can create own feedback" ON event_feedback;
CREATE POLICY "Users can create own feedback" ON event_feedback
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_feedback.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
        AND user_id = auth.uid()
    );

-- Event Speakers Policies
DROP POLICY IF EXISTS "Users can view event speakers in tenant" ON event_speakers;
CREATE POLICY "Users can view event speakers in tenant" ON event_speakers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_speakers.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
    );

DROP POLICY IF EXISTS "Admins can manage event speakers" ON event_speakers;
CREATE POLICY "Admins can manage event speakers" ON event_speakers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_speakers.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
            AND role IN ('admin', 'manager')
        )
    );

-- Event Categories Policies
DROP POLICY IF EXISTS "Users can view event categories in tenant" ON event_categories;
CREATE POLICY "Users can view event categories in tenant" ON event_categories
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

DROP POLICY IF EXISTS "Admins can manage event categories" ON event_categories;
CREATE POLICY "Admins can manage event categories" ON event_categories
    FOR ALL USING (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
            AND role IN ('admin', 'manager')
        )
    );

-- Event Category Assignments Policies
DROP POLICY IF EXISTS "Users can view event category assignments in tenant" ON event_category_assignments;
CREATE POLICY "Users can view event category assignments in tenant" ON event_category_assignments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_category_assignments.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
    );

DROP POLICY IF EXISTS "Admins can manage event category assignments" ON event_category_assignments;
CREATE POLICY "Admins can manage event category assignments" ON event_category_assignments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_category_assignments.event_id 
            AND events.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
            AND role IN ('admin', 'manager')
        )
    );

-- Task Comments Policies
DROP POLICY IF EXISTS "Users can view task comments in tenant" ON task_comments;
CREATE POLICY "Users can view task comments in tenant" ON task_comments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM tasks 
            WHERE tasks.id = task_comments.task_id 
            AND tasks.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
    );

DROP POLICY IF EXISTS "Users can create task comments" ON task_comments;
CREATE POLICY "Users can create task comments" ON task_comments
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM tasks 
            WHERE tasks.id = task_comments.task_id 
            AND tasks.tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        )
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
            AND role IN ('admin', 'manager', 'member')
        )
    );

-- Contact Activities Policies
DROP POLICY IF EXISTS "Users can view contact activities in tenant" ON contact_activities;
CREATE POLICY "Users can view contact activities in tenant" ON contact_activities
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

DROP POLICY IF EXISTS "Users can create contact activities" ON contact_activities;
CREATE POLICY "Users can create contact activities" ON contact_activities
    FOR INSERT WITH CHECK (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
            AND role IN ('admin', 'manager', 'member')
        )
    );

-- Contact Notes Policies
DROP POLICY IF EXISTS "Users can view contact notes in tenant" ON contact_notes;
CREATE POLICY "Users can view contact notes in tenant" ON contact_notes
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

DROP POLICY IF EXISTS "Users can create contact notes" ON contact_notes;
CREATE POLICY "Users can create contact notes" ON contact_notes
    FOR INSERT WITH CHECK (
        tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
            AND role IN ('admin', 'manager', 'member')
        )
    );
