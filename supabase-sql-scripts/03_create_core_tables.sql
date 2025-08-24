-- =====================================================
-- Create Core Tables
-- =====================================================

-- Organizations table (extends existing tenants table)
-- Note: We'll use the existing tenants table as the base organization table
-- and add any missing columns if needed

-- Add missing columns to tenants table if they don't exist
DO $$ 
BEGIN
    -- Add organization_type if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tenants' AND column_name = 'organization_type') THEN
        ALTER TABLE tenants ADD COLUMN organization_type organization_type DEFAULT 'trade_association';
    END IF;
    
    -- Add website if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tenants' AND column_name = 'website') THEN
        ALTER TABLE tenants ADD COLUMN website TEXT;
    END IF;
    
    -- Add phone if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tenants' AND column_name = 'phone') THEN
        ALTER TABLE tenants ADD COLUMN phone TEXT;
    END IF;
    
    -- Add founded_year if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tenants' AND column_name = 'founded_year') THEN
        ALTER TABLE tenants ADD COLUMN founded_year INTEGER;
    END IF;
    
    -- Add social_media if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tenants' AND column_name = 'social_media') THEN
        ALTER TABLE tenants ADD COLUMN social_media JSONB DEFAULT '{}';
    END IF;
    
    -- Add primary_contact if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tenants' AND column_name = 'primary_contact') THEN
        ALTER TABLE tenants ADD COLUMN primary_contact JSONB DEFAULT '{}';
    END IF;
END $$;

-- Members table (extends existing profiles table)
-- Add missing columns to profiles table if they don't exist
DO $$ 
BEGIN
    -- Add membership_type if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'membership_type') THEN
        ALTER TABLE profiles ADD COLUMN membership_type TEXT DEFAULT 'basic';
    END IF;
    
    -- Add member_since if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'member_since') THEN
        ALTER TABLE profiles ADD COLUMN member_since TIMESTAMPTZ DEFAULT NOW();
    END IF;
    
    -- Add subscription_status if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'subscription_status') THEN
        ALTER TABLE profiles ADD COLUMN subscription_status subscription_status DEFAULT 'active';
    END IF;
    
    -- Add certifications if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'certifications') THEN
        ALTER TABLE profiles ADD COLUMN certifications TEXT[] DEFAULT '{}';
    END IF;
    
    -- Add specializations if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'specializations') THEN
        ALTER TABLE profiles ADD COLUMN specializations TEXT[] DEFAULT '{}';
    END IF;
    
    -- Add committees if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'committees') THEN
        ALTER TABLE profiles ADD COLUMN committees TEXT[] DEFAULT '{}';
    END IF;
    
    -- Add profile_image_url if it doesn't exist (use existing profile_photo_url)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'profile_image_url') THEN
        ALTER TABLE profiles ADD COLUMN profile_image_url TEXT;
    END IF;
    
    -- Add phone if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'phone') THEN
        ALTER TABLE profiles ADD COLUMN phone TEXT;
    END IF;
    
    -- Add company_name if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'company_name') THEN
        ALTER TABLE profiles ADD COLUMN company_name TEXT;
    END IF;
    
    -- Add website if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'website') THEN
        ALTER TABLE profiles ADD COLUMN website TEXT;
    END IF;
    
    -- Add social_media if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'social_media') THEN
        ALTER TABLE profiles ADD COLUMN social_media JSONB DEFAULT '{}';
    END IF;
    
    -- Add address if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'address') THEN
        ALTER TABLE profiles ADD COLUMN address JSONB DEFAULT '{}';
    END IF;
    
    -- Add preferences if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'preferences') THEN
        ALTER TABLE profiles ADD COLUMN preferences JSONB DEFAULT '{}';
    END IF;
    
    -- Add role if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'role') THEN
        ALTER TABLE profiles ADD COLUMN role user_role DEFAULT 'member';
    END IF;
    
    -- Add is_super_admin if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'is_super_admin') THEN
        ALTER TABLE profiles ADD COLUMN is_super_admin BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    plan subscription_tier NOT NULL,
    status subscription_status NOT NULL DEFAULT 'active',
    current_period_end TIMESTAMPTZ NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    stripe_subscription_id TEXT,
    stripe_customer_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_tenant_id ON subscriptions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    invoice_number TEXT UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status payment_status NOT NULL DEFAULT 'pending',
    due_date TIMESTAMPTZ NOT NULL,
    paid_date TIMESTAMPTZ,
    stripe_invoice_id TEXT,
    items JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for invoices
CREATE INDEX IF NOT EXISTS idx_invoices_tenant_id ON invoices(tenant_id);
CREATE INDEX IF NOT EXISTS idx_invoices_subscription_id ON invoices(subscription_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);

-- Payment methods table
CREATE TABLE IF NOT EXISTS payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    stripe_payment_method_id TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    last4 TEXT,
    brand TEXT,
    exp_month INTEGER,
    exp_year INTEGER,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for payment methods
CREATE INDEX IF NOT EXISTS idx_payment_methods_tenant_id ON payment_methods(tenant_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_stripe_id ON payment_methods(stripe_payment_method_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_default ON payment_methods(is_default);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables
CREATE TRIGGER update_subscriptions_updated_at 
    BEFORE UPDATE ON subscriptions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at 
    BEFORE UPDATE ON invoices 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_methods_updated_at 
    BEFORE UPDATE ON payment_methods 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
