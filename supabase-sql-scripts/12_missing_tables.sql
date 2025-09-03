-- =====================================================
-- Missing Tables Script
-- =====================================================
-- This script adds tables that are referenced in the code but missing from existing scripts
-- All statements use IF NOT EXISTS to avoid conflicts

-- Create missing enum types if they don't exist
DO $$ 
BEGIN
    -- Create user_mode enum if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_mode') THEN
        CREATE TYPE user_mode AS ENUM ('trade', 'crm');
    END IF;
    
    -- Create theme_preference enum if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'theme_preference') THEN
        CREATE TYPE theme_preference AS ENUM ('light', 'dark', 'system');
    END IF;
END $$;

-- Add missing columns to existing tables FIRST (before creating user_settings)
DO $$ 
BEGIN
    -- Add missing columns to profiles table (explicitly target public schema)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'profiles' 
                   AND column_name = 'organization_id') THEN
        ALTER TABLE public.profiles ADD COLUMN organization_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL;
    END IF;
    
    -- Add missing columns to tenants table (explicitly target public schema)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'tenants' 
                   AND column_name = 'subscription_tier') THEN
        ALTER TABLE public.tenants ADD COLUMN subscription_tier subscription_tier DEFAULT 'basic';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'tenants' 
                   AND column_name = 'subscription_status') THEN
        ALTER TABLE public.tenants ADD COLUMN subscription_status subscription_status DEFAULT 'active';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'tenants' 
                   AND column_name = 'subscription_expires_at') THEN
        ALTER TABLE public.tenants ADD COLUMN subscription_expires_at TIMESTAMPTZ;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'tenants' 
                   AND column_name = 'stripe_customer_id') THEN
        ALTER TABLE public.tenants ADD COLUMN stripe_customer_id TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'tenants' 
                   AND column_name = 'stripe_subscription_id') THEN
        ALTER TABLE public.tenants ADD COLUMN stripe_subscription_id TEXT;
    END IF;
END $$;

-- Create indexes for the new columns (after the DO block to ensure columns exist)
CREATE INDEX IF NOT EXISTS idx_profiles_organization_id ON public.profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_tenants_subscription_tier ON public.tenants(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_tenants_subscription_status ON public.tenants(subscription_status);
CREATE INDEX IF NOT EXISTS idx_tenants_stripe_customer_id ON public.tenants(stripe_customer_id);

-- User Settings table (referenced in dashboard.ts and other services)
CREATE TABLE IF NOT EXISTS public.user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
    user_mode user_mode DEFAULT 'trade',
    theme theme_preference DEFAULT 'system',
    language TEXT DEFAULT 'en',
    timezone TEXT DEFAULT 'UTC',
    notifications JSONB DEFAULT '{}',
    preferences JSONB DEFAULT '{}',
    subscription_plan subscription_tier DEFAULT 'basic',
    subscription_status subscription_status DEFAULT 'active',
    subscription_expires_at TIMESTAMPTZ,
    access_permissions TEXT[] DEFAULT '{}',
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create indexes for user_settings
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON public.user_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_settings_organization_id ON public.user_settings(organization_id);
CREATE INDEX IF NOT EXISTS idx_user_settings_user_mode ON public.user_settings(user_mode);
CREATE INDEX IF NOT EXISTS idx_user_settings_subscription_plan ON public.user_settings(subscription_plan);
CREATE INDEX IF NOT EXISTS idx_user_settings_subscription_status ON public.user_settings(subscription_status);
CREATE INDEX IF NOT EXISTS idx_user_settings_stripe_customer_id ON public.user_settings(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_user_settings_access_permissions ON public.user_settings USING GIN(access_permissions);
CREATE INDEX IF NOT EXISTS idx_user_settings_updated_at ON public.user_settings(updated_at);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_user_settings_updated_at 
    BEFORE UPDATE ON public.user_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on user_settings
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_settings
DROP POLICY IF EXISTS "Users can view own settings" ON public.user_settings;
CREATE POLICY "Users can view own settings" ON public.user_settings
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own settings" ON public.user_settings;
CREATE POLICY "Users can update own settings" ON public.user_settings
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own settings" ON public.user_settings;
CREATE POLICY "Users can insert own settings" ON public.user_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to create default user settings when a new user signs up
CREATE OR REPLACE FUNCTION create_default_user_settings()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_settings (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user settings for new users
DROP TRIGGER IF EXISTS create_user_settings_trigger ON auth.users;
CREATE TRIGGER create_user_settings_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION create_default_user_settings();



-- Add comments for documentation
COMMENT ON TABLE public.user_settings IS 'User preferences, settings, and subscription information';
COMMENT ON COLUMN public.user_settings.user_mode IS 'User mode: trade (AMS) or crm';
COMMENT ON COLUMN public.user_settings.subscription_plan IS 'Current subscription plan (basic, pro, enterprise)';
COMMENT ON COLUMN public.user_settings.access_permissions IS 'Array of solutions user has access to (["crm"], ["ams"], ["crm", "ams"])';
COMMENT ON COLUMN public.user_settings.subscription_status IS 'Subscription status (active, inactive, suspended, cancelled)';
COMMENT ON COLUMN public.user_settings.subscription_expires_at IS 'When the subscription expires';
COMMENT ON COLUMN public.user_settings.stripe_customer_id IS 'Stripe customer ID for billing';
COMMENT ON COLUMN public.user_settings.stripe_subscription_id IS 'Stripe subscription ID for billing';

-- =====================================================
-- Missing Tables Added Successfully!
-- =====================================================
-- ✅ user_settings table created with RLS policies
-- ✅ Missing columns added to profiles and tenants tables
-- ✅ Automatic user settings creation trigger
-- ✅ Proper indexing for performance
-- ✅ Documentation comments added.
