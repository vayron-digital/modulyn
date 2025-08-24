-- =====================================================
-- Create CRM Tables
-- =====================================================

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    type contact_type NOT NULL DEFAULT 'prospect',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    job_title TEXT,
    website TEXT,
    address JSONB DEFAULT '{}',
    social_media JSONB DEFAULT '{}',
    notes TEXT,
    tags TEXT[] DEFAULT '{}',
    source lead_source,
    status TEXT DEFAULT 'active',
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    last_contact_date TIMESTAMPTZ,
    next_follow_up TIMESTAMPTZ,
    lead_score INTEGER DEFAULT 0,
    is_vip BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for contacts
CREATE INDEX IF NOT EXISTS idx_contacts_tenant_id ON contacts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_contacts_type ON contacts(type);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_assigned_to ON contacts(assigned_to);
CREATE INDEX IF NOT EXISTS idx_contacts_created_by ON contacts(created_by);
CREATE INDEX IF NOT EXISTS idx_contacts_last_contact_date ON contacts(last_contact_date);
CREATE INDEX IF NOT EXISTS idx_contacts_next_follow_up ON contacts(next_follow_up);
CREATE INDEX IF NOT EXISTS idx_contacts_lead_score ON contacts(lead_score);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    status lead_status NOT NULL DEFAULT 'new',
    source lead_source NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    job_title TEXT,
    budget DECIMAL(12,2),
    timeline TEXT,
    requirements TEXT,
    notes TEXT,
    tags TEXT[] DEFAULT '{}',
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    last_contact_date TIMESTAMPTZ,
    next_follow_up TIMESTAMPTZ,
    lead_score INTEGER DEFAULT 0,
    is_qualified BOOLEAN DEFAULT FALSE,
    qualified_date TIMESTAMPTZ,
    converted_to_deal BOOLEAN DEFAULT FALSE,
    deal_id UUID, -- Will reference deals table
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for leads
CREATE INDEX IF NOT EXISTS idx_leads_tenant_id ON leads(tenant_id);
CREATE INDEX IF NOT EXISTS idx_leads_contact_id ON leads(contact_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_created_by ON leads(created_by);
CREATE INDEX IF NOT EXISTS idx_leads_last_contact_date ON leads(last_contact_date);
CREATE INDEX IF NOT EXISTS idx_leads_next_follow_up ON leads(next_follow_up);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score);
CREATE INDEX IF NOT EXISTS idx_leads_is_qualified ON leads(is_qualified);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type property_type NOT NULL,
    status property_status NOT NULL DEFAULT 'available',
    address TEXT NOT NULL,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    country TEXT DEFAULT 'USA',
    price DECIMAL(12,2),
    currency TEXT DEFAULT 'USD',
    bedrooms INTEGER,
    bathrooms DECIMAL(3,1),
    square_feet INTEGER,
    lot_size DECIMAL(10,2),
    year_built INTEGER,
    property_tax DECIMAL(10,2),
    hoa_fees DECIMAL(10,2),
    images TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    amenities TEXT[] DEFAULT '{}',
    mls_id TEXT,
    listing_date TIMESTAMPTZ,
    sold_date TIMESTAMPTZ,
    sold_price DECIMAL(12,2),
    days_on_market INTEGER,
    owner_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for properties
CREATE INDEX IF NOT EXISTS idx_properties_tenant_id ON properties(tenant_id);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_state ON properties(state);
CREATE INDEX IF NOT EXISTS idx_properties_mls_id ON properties(mls_id);
CREATE INDEX IF NOT EXISTS idx_properties_assigned_to ON properties(assigned_to);
CREATE INDEX IF NOT EXISTS idx_properties_created_by ON properties(created_by);
CREATE INDEX IF NOT EXISTS idx_properties_listing_date ON properties(listing_date);

-- Deals table
CREATE TABLE IF NOT EXISTS deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status deal_status NOT NULL DEFAULT 'lead',
    value DECIMAL(12,2),
    currency TEXT DEFAULT 'USD',
    probability INTEGER DEFAULT 0, -- 0-100
    expected_close_date TIMESTAMPTZ,
    actual_close_date TIMESTAMPTZ,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    notes TEXT,
    tags TEXT[] DEFAULT '{}',
    stage TEXT DEFAULT 'lead',
    pipeline TEXT DEFAULT 'default',
    source TEXT,
    loss_reason TEXT,
    win_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for deals
CREATE INDEX IF NOT EXISTS idx_deals_tenant_id ON deals(tenant_id);
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_contact_id ON deals(contact_id);
CREATE INDEX IF NOT EXISTS idx_deals_property_id ON deals(property_id);
CREATE INDEX IF NOT EXISTS idx_deals_lead_id ON deals(lead_id);
CREATE INDEX IF NOT EXISTS idx_deals_assigned_to ON deals(assigned_to);
CREATE INDEX IF NOT EXISTS idx_deals_created_by ON deals(created_by);
CREATE INDEX IF NOT EXISTS idx_deals_value ON deals(value);
CREATE INDEX IF NOT EXISTS idx_deals_probability ON deals(probability);
CREATE INDEX IF NOT EXISTS idx_deals_expected_close_date ON deals(expected_close_date);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status task_status NOT NULL DEFAULT 'pending',
    priority task_priority NOT NULL DEFAULT 'medium',
    due_date TIMESTAMPTZ,
    completed_date TIMESTAMPTZ,
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    related_to_type TEXT, -- 'contact', 'lead', 'deal', 'property', 'event'
    related_to_id UUID,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    reminder_date TIMESTAMPTZ,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_pattern JSONB DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for tasks
CREATE INDEX IF NOT EXISTS idx_tasks_tenant_id ON tasks(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON tasks(created_by);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_completed_date ON tasks(completed_date);
CREATE INDEX IF NOT EXISTS idx_tasks_related_to_type ON tasks(related_to_type);
CREATE INDEX IF NOT EXISTS idx_tasks_related_to_id ON tasks(related_to_id);
CREATE INDEX IF NOT EXISTS idx_tasks_contact_id ON tasks(contact_id);
CREATE INDEX IF NOT EXISTS idx_tasks_lead_id ON tasks(lead_id);
CREATE INDEX IF NOT EXISTS idx_tasks_deal_id ON tasks(deal_id);
CREATE INDEX IF NOT EXISTS idx_tasks_property_id ON tasks(property_id);
CREATE INDEX IF NOT EXISTS idx_tasks_event_id ON tasks(event_id);

-- Task comments table
CREATE TABLE IF NOT EXISTS task_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for task_comments
CREATE INDEX IF NOT EXISTS idx_task_comments_task_id ON task_comments(task_id);
CREATE INDEX IF NOT EXISTS idx_task_comments_user_id ON task_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_task_comments_created_at ON task_comments(created_at);

-- Contact activities table
CREATE TABLE IF NOT EXISTS contact_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'call', 'email', 'meeting', 'note', 'task', 'event'
    subject TEXT,
    description TEXT,
    duration INTEGER, -- in minutes
    date TIMESTAMPTZ NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    related_to_type TEXT,
    related_to_id UUID,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for contact_activities
CREATE INDEX IF NOT EXISTS idx_contact_activities_tenant_id ON contact_activities(tenant_id);
CREATE INDEX IF NOT EXISTS idx_contact_activities_contact_id ON contact_activities(contact_id);
CREATE INDEX IF NOT EXISTS idx_contact_activities_lead_id ON contact_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_contact_activities_deal_id ON contact_activities(deal_id);
CREATE INDEX IF NOT EXISTS idx_contact_activities_type ON contact_activities(type);
CREATE INDEX IF NOT EXISTS idx_contact_activities_user_id ON contact_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_activities_date ON contact_activities(date);

-- Contact notes table
CREATE TABLE IF NOT EXISTS contact_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT NOT NULL,
    is_private BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for contact_notes
CREATE INDEX IF NOT EXISTS idx_contact_notes_tenant_id ON contact_notes(tenant_id);
CREATE INDEX IF NOT EXISTS idx_contact_notes_contact_id ON contact_notes(contact_id);
CREATE INDEX IF NOT EXISTS idx_contact_notes_lead_id ON contact_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_contact_notes_deal_id ON contact_notes(deal_id);
CREATE INDEX IF NOT EXISTS idx_contact_notes_property_id ON contact_notes(property_id);
CREATE INDEX IF NOT EXISTS idx_contact_notes_created_by ON contact_notes(created_by);
CREATE INDEX IF NOT EXISTS idx_contact_notes_created_at ON contact_notes(created_at);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_contacts_updated_at 
    BEFORE UPDATE ON contacts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at 
    BEFORE UPDATE ON properties 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at 
    BEFORE UPDATE ON deals 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at 
    BEFORE UPDATE ON tasks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_task_comments_updated_at 
    BEFORE UPDATE ON task_comments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_activities_updated_at 
    BEFORE UPDATE ON contact_activities 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_notes_updated_at 
    BEFORE UPDATE ON contact_notes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
