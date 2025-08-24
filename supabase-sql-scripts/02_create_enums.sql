-- =====================================================
-- Create Custom Enum Types
-- =====================================================

-- User roles for the platform
CREATE TYPE user_role AS ENUM (
    'admin',
    'member',
    'manager',
    'viewer'
);

-- Organization types
CREATE TYPE organization_type AS ENUM (
    'trade_association',
    'professional_society',
    'industry_group',
    'chamber_of_commerce',
    'nonprofit',
    'other'
);

-- Subscription tiers
CREATE TYPE subscription_tier AS ENUM (
    'basic',
    'professional',
    'enterprise',
    'custom'
);

-- Subscription status
CREATE TYPE subscription_status AS ENUM (
    'active',
    'trial',
    'expired',
    'cancelled',
    'past_due',
    'pending'
);

-- Event types
CREATE TYPE event_type AS ENUM (
    'conference',
    'webinar',
    'workshop',
    'networking',
    'training',
    'meeting',
    'exhibition',
    'other'
);

-- Event status
CREATE TYPE event_status AS ENUM (
    'upcoming',
    'ongoing',
    'completed',
    'cancelled',
    'draft'
);

-- Registration status
CREATE TYPE registration_status AS ENUM (
    'confirmed',
    'pending',
    'cancelled',
    'waitlist',
    'no_show'
);

-- Payment status
CREATE TYPE payment_status AS ENUM (
    'paid',
    'pending',
    'failed',
    'refunded',
    'partial'
);

-- Member status
CREATE TYPE member_status AS ENUM (
    'active',
    'inactive',
    'pending',
    'suspended',
    'expired'
);

-- Task status
CREATE TYPE task_status AS ENUM (
    'pending',
    'in_progress',
    'completed',
    'cancelled',
    'on_hold'
);

-- Task priority
CREATE TYPE task_priority AS ENUM (
    'low',
    'medium',
    'high',
    'urgent'
);

-- Contact types
CREATE TYPE contact_type AS ENUM (
    'client',
    'lead',
    'vendor',
    'partner',
    'member',
    'prospect'
);

-- Lead status
CREATE TYPE lead_status AS ENUM (
    'new',
    'contacted',
    'qualified',
    'proposal',
    'negotiation',
    'closed_won',
    'closed_lost'
);

-- Lead source
CREATE TYPE lead_source AS ENUM (
    'website',
    'referral',
    'cold_call',
    'email_campaign',
    'social_media',
    'event',
    'advertising',
    'other'
);

-- Property status
CREATE TYPE property_status AS ENUM (
    'available',
    'pending',
    'sold',
    'off_market',
    'under_contract'
);

-- Property type
CREATE TYPE property_type AS ENUM (
    'residential',
    'commercial',
    'land',
    'industrial',
    'mixed_use'
);

-- Deal status
CREATE TYPE deal_status AS ENUM (
    'lead',
    'qualified',
    'proposal',
    'negotiation',
    'closed_won',
    'closed_lost'
);

-- Email campaign status
CREATE TYPE email_campaign_status AS ENUM (
    'draft',
    'scheduled',
    'sending',
    'sent',
    'cancelled'
);

-- Notification type
CREATE TYPE notification_type AS ENUM (
    'member_joined',
    'event_created',
    'payment_received',
    'task_assigned',
    'lead_created',
    'deal_updated',
    'system'
);

-- Notification status
CREATE TYPE notification_status AS ENUM (
    'unread',
    'read',
    'archived'
);
