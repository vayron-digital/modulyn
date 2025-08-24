-- =====================================================
-- Create Communication Tables
-- =====================================================

-- Email templates table
CREATE TABLE IF NOT EXISTS email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    variables JSONB DEFAULT '[]',
    category TEXT DEFAULT 'general',
    is_active BOOLEAN DEFAULT TRUE,
    is_system BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, name)
);

-- Create indexes for email_templates
CREATE INDEX IF NOT EXISTS idx_email_templates_tenant_id ON email_templates(tenant_id);
CREATE INDEX IF NOT EXISTS idx_email_templates_category ON email_templates(category);
CREATE INDEX IF NOT EXISTS idx_email_templates_is_active ON email_templates(is_active);
CREATE INDEX IF NOT EXISTS idx_email_templates_created_by ON email_templates(created_by);

-- Email campaigns table
CREATE TABLE IF NOT EXISTS email_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    template_id UUID REFERENCES email_templates(id) ON DELETE SET NULL,
    status email_campaign_status NOT NULL DEFAULT 'draft',
    scheduled_date TIMESTAMPTZ,
    sent_date TIMESTAMPTZ,
    recipient_count INTEGER DEFAULT 0,
    sent_count INTEGER DEFAULT 0,
    opened_count INTEGER DEFAULT 0,
    clicked_count INTEGER DEFAULT 0,
    bounced_count INTEGER DEFAULT 0,
    unsubscribed_count INTEGER DEFAULT 0,
    recipient_groups JSONB DEFAULT '[]',
    filters JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for email_campaigns
CREATE INDEX IF NOT EXISTS idx_email_campaigns_tenant_id ON email_campaigns(tenant_id);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_template_id ON email_campaigns(template_id);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_scheduled_date ON email_campaigns(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_created_by ON email_campaigns(created_by);

-- Email campaign recipients table
CREATE TABLE IF NOT EXISTS email_campaign_recipients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES email_campaigns(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    name TEXT,
    status TEXT DEFAULT 'pending', -- pending, sent, delivered, opened, clicked, bounced, unsubscribed
    sent_at TIMESTAMPTZ,
    opened_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    bounced_at TIMESTAMPTZ,
    unsubscribed_at TIMESTAMPTZ,
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for email_campaign_recipients
CREATE INDEX IF NOT EXISTS idx_email_campaign_recipients_campaign_id ON email_campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_campaign_recipients_user_id ON email_campaign_recipients(user_id);
CREATE INDEX IF NOT EXISTS idx_email_campaign_recipients_contact_id ON email_campaign_recipients(contact_id);
CREATE INDEX IF NOT EXISTS idx_email_campaign_recipients_lead_id ON email_campaign_recipients(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_campaign_recipients_email ON email_campaign_recipients(email);
CREATE INDEX IF NOT EXISTS idx_email_campaign_recipients_status ON email_campaign_recipients(status);

-- Email logs table
CREATE TABLE IF NOT EXISTS email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES email_campaigns(id) ON DELETE SET NULL,
    recipient_id UUID REFERENCES email_campaign_recipients(id) ON DELETE SET NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    to_email TEXT NOT NULL,
    from_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT,
    status TEXT NOT NULL, -- sent, delivered, opened, clicked, bounced, failed
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    opened_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    bounced_at TIMESTAMPTZ,
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for email_logs
CREATE INDEX IF NOT EXISTS idx_email_logs_tenant_id ON email_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_campaign_id ON email_logs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient_id ON email_logs(recipient_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_contact_id ON email_logs(contact_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_lead_id ON email_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_to_email ON email_logs(to_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    status notification_status NOT NULL DEFAULT 'unread',
    related_to_type TEXT, -- 'contact', 'lead', 'deal', 'property', 'event', 'task'
    related_to_id UUID,
    metadata JSONB DEFAULT '{}',
    read_at TIMESTAMPTZ,
    archived_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for notifications
CREATE INDEX IF NOT EXISTS idx_notifications_tenant_id ON notifications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_related_to_type ON notifications(related_to_type);
CREATE INDEX IF NOT EXISTS idx_notifications_related_to_id ON notifications(related_to_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Notification preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    email_enabled BOOLEAN DEFAULT TRUE,
    push_enabled BOOLEAN DEFAULT TRUE,
    in_app_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, user_id, type)
);

-- Create indexes for notification_preferences
CREATE INDEX IF NOT EXISTS idx_notification_preferences_tenant_id ON notification_preferences(tenant_id);
CREATE INDEX IF NOT EXISTS idx_notification_preferences_user_id ON notification_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_preferences_type ON notification_preferences(type);

-- Message templates table
CREATE TABLE IF NOT EXISTS message_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'sms', 'whatsapp', 'in_app'
    content TEXT NOT NULL,
    variables JSONB DEFAULT '[]',
    category TEXT DEFAULT 'general',
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, name)
);

-- Create indexes for message_templates
CREATE INDEX IF NOT EXISTS idx_message_templates_tenant_id ON message_templates(tenant_id);
CREATE INDEX IF NOT EXISTS idx_message_templates_type ON message_templates(type);
CREATE INDEX IF NOT EXISTS idx_message_templates_category ON message_templates(category);
CREATE INDEX IF NOT EXISTS idx_message_templates_is_active ON message_templates(is_active);
CREATE INDEX IF NOT EXISTS idx_message_templates_created_by ON message_templates(created_by);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'sms', 'whatsapp', 'in_app', 'email'
    from_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    to_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    to_contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    to_lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    to_email TEXT,
    to_phone TEXT,
    subject TEXT,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, sent, delivered, read, failed
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for messages
CREATE INDEX IF NOT EXISTS idx_messages_tenant_id ON messages(tenant_id);
CREATE INDEX IF NOT EXISTS idx_messages_type ON messages(type);
CREATE INDEX IF NOT EXISTS idx_messages_from_user_id ON messages(from_user_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_user_id ON messages(to_user_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_contact_id ON messages(to_contact_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_lead_id ON messages(to_lead_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_email ON messages(to_email);
CREATE INDEX IF NOT EXISTS idx_messages_to_phone ON messages(to_phone);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_sent_at ON messages(sent_at);

-- Communication settings table
CREATE TABLE IF NOT EXISTS communication_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    setting_key TEXT NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, setting_key)
);

-- Create indexes for communication_settings
CREATE INDEX IF NOT EXISTS idx_communication_settings_tenant_id ON communication_settings(tenant_id);
CREATE INDEX IF NOT EXISTS idx_communication_settings_key ON communication_settings(setting_key);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_email_templates_updated_at 
    BEFORE UPDATE ON email_templates 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at 
    BEFORE UPDATE ON email_campaigns 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_campaign_recipients_updated_at 
    BEFORE UPDATE ON email_campaign_recipients 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at 
    BEFORE UPDATE ON notifications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at 
    BEFORE UPDATE ON notification_preferences 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_message_templates_updated_at 
    BEFORE UPDATE ON message_templates 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at 
    BEFORE UPDATE ON messages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communication_settings_updated_at 
    BEFORE UPDATE ON communication_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
