-- =====================================================
-- US Associate SaaS - User Settings Database Schema
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USER SETTINGS TABLE
-- =====================================================

-- Create user_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Profile Settings
    first_name TEXT,
    last_name TEXT,
    display_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    phone TEXT,
    timezone TEXT DEFAULT 'UTC',
    language TEXT DEFAULT 'en',

    -- Account Settings
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    marketing_emails BOOLEAN DEFAULT false,
    two_factor_enabled BOOLEAN DEFAULT false,
    last_login TIMESTAMP WITH TIME ZONE,

    -- Appearance Settings
    theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    color_scheme TEXT DEFAULT 'indigo' CHECK (color_scheme IN ('indigo', 'blue', 'green', 'purple', 'orange', 'red')),
    font_size TEXT DEFAULT 'medium' CHECK (font_size IN ('small', 'medium', 'large')),
    compact_mode BOOLEAN DEFAULT false,
    sidebar_collapsed BOOLEAN DEFAULT false,

    -- Dashboard Settings
    dashboard_layout TEXT DEFAULT 'default' CHECK (dashboard_layout IN ('default', 'compact', 'detailed')),
    default_view TEXT DEFAULT 'overview' CHECK (default_view IN ('overview', 'analytics', 'recent')),
    show_welcome_message BOOLEAN DEFAULT true,
    auto_refresh_interval INTEGER DEFAULT 300, -- 5 minutes in seconds

    -- Notification Settings
    email_frequency TEXT DEFAULT 'immediate' CHECK (email_frequency IN ('immediate', 'daily', 'weekly')),
    notification_sound BOOLEAN DEFAULT true,
    desktop_notifications BOOLEAN DEFAULT true,
    mobile_notifications BOOLEAN DEFAULT true,

    -- Privacy Settings
    profile_visibility TEXT DEFAULT 'private' CHECK (profile_visibility IN ('public', 'private', 'team')),
    activity_visibility TEXT DEFAULT 'team' CHECK (activity_visibility IN ('public', 'private', 'team')),
    data_sharing BOOLEAN DEFAULT false,

    -- Security Settings
    session_timeout INTEGER DEFAULT 3600, -- 1 hour in seconds
    password_expiry_days INTEGER DEFAULT 90,
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked BOOLEAN DEFAULT false,
    lock_until TIMESTAMP WITH TIME ZONE,

    -- Integration Settings
    google_calendar_sync BOOLEAN DEFAULT false,
    outlook_calendar_sync BOOLEAN DEFAULT false,
    slack_integration BOOLEAN DEFAULT false,
    zapier_integration BOOLEAN DEFAULT false,

    -- CRM/AMS Specific Settings
    mode TEXT DEFAULT 'trade' CHECK (mode IN ('trade', 'crm')),
    default_currency TEXT DEFAULT 'USD',
    date_format TEXT DEFAULT 'MM/DD/YYYY',
    time_format TEXT DEFAULT '12h' CHECK (time_format IN ('12h', '24h')),

    -- Workflow Settings
    auto_save_interval INTEGER DEFAULT 30, -- 30 seconds
    auto_backup_enabled BOOLEAN DEFAULT true,
    backup_frequency TEXT DEFAULT 'daily' CHECK (backup_frequency IN ('hourly', 'daily', 'weekly')),

    -- API Settings
    api_key TEXT,
    api_key_expires_at TIMESTAMP WITH TIME ZONE,
    webhook_url TEXT,
    webhook_secret TEXT,

    -- Custom Fields (JSON for extensibility)
    custom_preferences JSONB DEFAULT '{}',

    -- Constraints
    UNIQUE(user_id)
);

-- =====================================================
-- ORGANIZATION SETTINGS TABLE
-- =====================================================

-- Create organizations table if it doesn't exist
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    website_url TEXT,
    industry TEXT,
    size TEXT CHECK (size IN ('1-10', '11-50', '51-200', '201-1000', '1000+')),
    founded_year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Contact Information
    contact_email TEXT,
    contact_phone TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'US',

    -- Billing Information
    billing_email TEXT,
    billing_address JSONB DEFAULT '{}',
    tax_id TEXT,

    -- Subscription Information
    subscription_plan TEXT DEFAULT 'starter',
    subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'suspended', 'cancelled')),
    subscription_start_date TIMESTAMP WITH TIME ZONE,
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    next_billing_date TIMESTAMP WITH TIME ZONE,

    -- Organization Settings
    timezone TEXT DEFAULT 'UTC',
    working_hours JSONB DEFAULT '{"monday": {"start": "09:00", "end": "17:00"}, "tuesday": {"start": "09:00", "end": "17:00"}, "wednesday": {"start": "09:00", "end": "17:00"}, "thursday": {"start": "09:00", "end": "17:00"}, "friday": {"start": "09:00", "end": "17:00"}}',
    holidays JSONB DEFAULT '[]',

    -- Feature Flags
    features_enabled JSONB DEFAULT '{}',
    custom_domain TEXT,
    white_label_enabled BOOLEAN DEFAULT false,

    -- Limits and Quotas
    max_users INTEGER DEFAULT 5,
    max_storage_gb INTEGER DEFAULT 1,
    api_rate_limit INTEGER DEFAULT 1000,

    -- Custom Fields
    custom_fields JSONB DEFAULT '{}'
);

-- =====================================================
-- USER ORGANIZATION RELATIONSHIP TABLE
-- =====================================================

-- Create user_organizations table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'manager', 'member', 'viewer')),
    permissions JSONB DEFAULT '{}',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_primary BOOLEAN DEFAULT false,

    -- Constraints
    UNIQUE(user_id, organization_id)
);

-- =====================================================
-- USER PREFERENCES TABLE (for complex preferences)
-- =====================================================

-- Create user_preferences table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    preference_key TEXT NOT NULL,
    preference_value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Constraints
    UNIQUE(user_id, preference_key)
);

-- =====================================================
-- NOTIFICATION SETTINGS TABLE
-- =====================================================

-- Create notification_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS notification_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL,
    email_enabled BOOLEAN DEFAULT true,
    push_enabled BOOLEAN DEFAULT true,
    in_app_enabled BOOLEAN DEFAULT true,
    frequency TEXT DEFAULT 'immediate' CHECK (frequency IN ('immediate', 'daily', 'weekly', 'never')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Constraints
    UNIQUE(user_id, notification_type)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- User Settings Indexes
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_settings_updated_at ON user_settings(updated_at);

-- Organizations Indexes
CREATE INDEX IF NOT EXISTS idx_organizations_slug ON organizations(slug);
CREATE INDEX IF NOT EXISTS idx_organizations_subscription_status ON organizations(subscription_status);

-- User Organizations Indexes
CREATE INDEX IF NOT EXISTS idx_user_organizations_user_id ON user_organizations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_organizations_organization_id ON user_organizations(organization_id);

-- User Preferences Indexes
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_key ON user_preferences(preference_key);

-- Notification Settings Indexes
CREATE INDEX IF NOT EXISTS idx_notification_settings_user_id ON notification_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_settings_type ON notification_settings(notification_type);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers if they don't exist
DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;
CREATE TRIGGER update_user_settings_updated_at
    BEFORE UPDATE ON user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;
CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER update_user_preferences_updated_at
    BEFORE UPDATE ON user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_notification_settings_updated_at ON notification_settings;
CREATE TRIGGER update_notification_settings_updated_at
    BEFORE UPDATE ON notification_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

-- User Settings Policies
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;
CREATE POLICY "Users can view own settings" ON user_settings
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;
CREATE POLICY "Users can update own settings" ON user_settings
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own settings" ON user_settings;
CREATE POLICY "Users can insert own settings" ON user_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Organizations Policies
DROP POLICY IF EXISTS "Users can view organizations they belong to" ON organizations;
CREATE POLICY "Users can view organizations they belong to" ON organizations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_organizations
            WHERE user_organizations.organization_id = organizations.id
            AND user_organizations.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Admins can update organizations" ON organizations;
CREATE POLICY "Admins can update organizations" ON organizations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_organizations
            WHERE user_organizations.organization_id = organizations.id
            AND user_organizations.user_id = auth.uid()
            AND user_organizations.role IN ('owner', 'admin')
        )
    );

-- User Organizations Policies
DROP POLICY IF EXISTS "Users can view own organization memberships" ON user_organizations;
CREATE POLICY "Users can view own organization memberships" ON user_organizations
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage organization members" ON user_organizations;
CREATE POLICY "Admins can manage organization members" ON user_organizations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_organizations uo
            WHERE uo.organization_id = user_organizations.organization_id
            AND uo.user_id = auth.uid()
            AND uo.role IN ('owner', 'admin')
        )
    );

-- User Preferences Policies
DROP POLICY IF EXISTS "Users can manage own preferences" ON user_preferences;
CREATE POLICY "Users can manage own preferences" ON user_preferences
    FOR ALL USING (auth.uid() = user_id);

-- Notification Settings Policies
DROP POLICY IF EXISTS "Users can manage own notification settings" ON notification_settings;
CREATE POLICY "Users can manage own notification settings" ON notification_settings
    FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- DEFAULT DATA INSERTION
-- =====================================================

-- Insert default notification settings for existing users
INSERT INTO notification_settings (user_id, notification_type, email_enabled, push_enabled, in_app_enabled, frequency)
SELECT 
    u.id,
    unnest(ARRAY[
        'new_lead',
        'deal_closed',
        'task_due',
        'event_reminder',
        'system_alert',
        'security_alert',
        'billing_reminder',
        'team_activity'
    ]),
    true,
    true,
    true,
    'immediate'
FROM auth.users u
WHERE NOT EXISTS (
    SELECT 1 FROM notification_settings ns
    WHERE ns.user_id = u.id AND ns.notification_type = 'new_lead'
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get user's primary organization
CREATE OR REPLACE FUNCTION get_user_primary_organization(user_uuid UUID)
RETURNS UUID AS $$
DECLARE
    org_id UUID;
BEGIN
    SELECT organization_id INTO org_id
    FROM user_organizations
    WHERE user_id = user_uuid AND is_primary = true
    LIMIT 1;

    RETURN org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create default user settings
CREATE OR REPLACE FUNCTION create_default_user_settings()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_settings (user_id)
    VALUES (NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create default settings for new users
DROP TRIGGER IF EXISTS create_user_settings_trigger ON auth.users;
CREATE TRIGGER create_user_settings_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION create_default_user_settings();
