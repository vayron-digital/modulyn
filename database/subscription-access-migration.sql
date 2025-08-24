-- =====================================================
-- Subscription and Access Control Migration
-- =====================================================
-- This migration adds fields to track user subscription plans and access permissions
-- Run this in your Supabase SQL editor

-- Add subscription and access control fields to user_settings
DO $$ 
BEGIN
    -- Add subscription_plan column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_settings' AND column_name = 'subscription_plan'
    ) THEN
        ALTER TABLE user_settings 
        ADD COLUMN subscription_plan TEXT DEFAULT 'crm_basic';
    END IF;

    -- Add access_permissions column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_settings' AND column_name = 'access_permissions'
    ) THEN
        ALTER TABLE user_settings 
        ADD COLUMN access_permissions JSONB DEFAULT '["crm"]'::jsonb;
    END IF;

    -- Add subscription_status column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_settings' AND column_name = 'subscription_status'
    ) THEN
        ALTER TABLE user_settings 
        ADD COLUMN subscription_status TEXT DEFAULT 'active';
    END IF;

    -- Add subscription_expires_at column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_settings' AND column_name = 'subscription_expires_at'
    ) THEN
        ALTER TABLE user_settings 
        ADD COLUMN subscription_expires_at TIMESTAMP WITH TIME ZONE;
    END IF;

    -- Add stripe_customer_id column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_settings' AND column_name = 'stripe_customer_id'
    ) THEN
        ALTER TABLE user_settings 
        ADD COLUMN stripe_customer_id TEXT;
    END IF;

    -- Add stripe_subscription_id column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_settings' AND column_name = 'stripe_subscription_id'
    ) THEN
        ALTER TABLE user_settings 
        ADD COLUMN stripe_subscription_id TEXT;
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_settings_subscription_plan ON user_settings(subscription_plan);
CREATE INDEX IF NOT EXISTS idx_user_settings_subscription_status ON user_settings(subscription_status);
CREATE INDEX IF NOT EXISTS idx_user_settings_stripe_customer_id ON user_settings(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_user_settings_access_permissions ON user_settings USING GIN(access_permissions);

-- Add comments for documentation
COMMENT ON COLUMN user_settings.subscription_plan IS 'Current subscription plan (crm_basic, ams_pro, both_enterprise, etc.)';
COMMENT ON COLUMN user_settings.access_permissions IS 'Array of solutions user has access to (["crm"], ["ams"], ["crm", "ams"])';
COMMENT ON COLUMN user_settings.subscription_status IS 'Subscription status (active, inactive, suspended, cancelled)';
COMMENT ON COLUMN user_settings.subscription_expires_at IS 'When the subscription expires';
COMMENT ON COLUMN user_settings.stripe_customer_id IS 'Stripe customer ID for billing';
COMMENT ON COLUMN user_settings.stripe_subscription_id IS 'Stripe subscription ID for billing';

-- Update RLS policies to include new fields
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;
CREATE POLICY "Users can view own settings" ON user_settings
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;
CREATE POLICY "Users can update own settings" ON user_settings
    FOR UPDATE USING (auth.uid() = user_id);

-- Create a function to check if user has access to a specific solution
CREATE OR REPLACE FUNCTION has_solution_access(solution_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_settings 
        WHERE user_id = auth.uid() 
        AND subscription_status = 'active'
        AND access_permissions ? solution_name
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION has_solution_access(TEXT) TO authenticated;
