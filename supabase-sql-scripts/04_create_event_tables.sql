-- =====================================================
-- Create Event Management Tables
-- =====================================================

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type event_type NOT NULL,
    status event_status NOT NULL DEFAULT 'upcoming',
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    venue TEXT,
    address JSONB DEFAULT '{}',
    capacity INTEGER,
    price DECIMAL(10,2) DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    registration_deadline TIMESTAMPTZ,
    max_registrations INTEGER,
    current_registrations INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    agenda JSONB DEFAULT '[]',
    speakers JSONB DEFAULT '[]',
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for events
CREATE INDEX IF NOT EXISTS idx_events_tenant_id ON events(tenant_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_is_featured ON events(is_featured);
CREATE INDEX IF NOT EXISTS idx_events_is_public ON events(is_public);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);

-- Event registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status registration_status NOT NULL DEFAULT 'confirmed',
    payment_status payment_status NOT NULL DEFAULT 'pending',
    registration_date TIMESTAMPTZ DEFAULT NOW(),
    amount_paid DECIMAL(10,2) DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    stripe_payment_intent_id TEXT,
    notes TEXT,
    dietary_restrictions TEXT,
    special_requirements TEXT,
    attended BOOLEAN DEFAULT FALSE,
    check_in_time TIMESTAMPTZ,
    check_out_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Create indexes for event_registrations
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_status ON event_registrations(status);
CREATE INDEX IF NOT EXISTS idx_event_registrations_payment_status ON event_registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_event_registrations_registration_date ON event_registrations(registration_date);

-- Event speakers table
CREATE TABLE IF NOT EXISTS event_speakers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT,
    company TEXT,
    bio TEXT,
    image_url TEXT,
    email TEXT,
    phone TEXT,
    website TEXT,
    social_media JSONB DEFAULT '{}',
    session_title TEXT,
    session_description TEXT,
    session_duration INTEGER, -- in minutes
    session_start_time TIMESTAMPTZ,
    session_end_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for event_speakers
CREATE INDEX IF NOT EXISTS idx_event_speakers_event_id ON event_speakers(event_id);
CREATE INDEX IF NOT EXISTS idx_event_speakers_name ON event_speakers(name);

-- Event sessions table
CREATE TABLE IF NOT EXISTS event_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    room TEXT,
    capacity INTEGER,
    speaker_ids UUID[] DEFAULT '{}',
    session_type TEXT DEFAULT 'presentation',
    is_break BOOLEAN DEFAULT FALSE,
    is_optional BOOLEAN DEFAULT FALSE,
    materials_url TEXT,
    recording_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for event_sessions
CREATE INDEX IF NOT EXISTS idx_event_sessions_event_id ON event_sessions(event_id);
CREATE INDEX IF NOT EXISTS idx_event_sessions_start_time ON event_sessions(start_time);
CREATE INDEX IF NOT EXISTS idx_event_sessions_is_break ON event_sessions(is_break);

-- Event waitlist table
CREATE TABLE IF NOT EXISTS event_waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    notified_at TIMESTAMPTZ,
    status TEXT DEFAULT 'waiting', -- waiting, offered, accepted, declined, expired
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Create indexes for event_waitlist
CREATE INDEX IF NOT EXISTS idx_event_waitlist_event_id ON event_waitlist(event_id);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_user_id ON event_waitlist(user_id);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_position ON event_waitlist(position);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_status ON event_waitlist(status);

-- Event feedback table
CREATE TABLE IF NOT EXISTS event_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    overall_satisfaction INTEGER CHECK (overall_satisfaction >= 1 AND overall_satisfaction <= 5),
    content_quality INTEGER CHECK (content_quality >= 1 AND content_quality <= 5),
    speaker_quality INTEGER CHECK (speaker_quality >= 1 AND speaker_quality <= 5),
    venue_rating INTEGER CHECK (venue_rating >= 1 AND venue_rating <= 5),
    organization_rating INTEGER CHECK (organization_rating >= 1 AND organization_rating <= 5),
    comments TEXT,
    would_recommend BOOLEAN,
    would_attend_again BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Create indexes for event_feedback
CREATE INDEX IF NOT EXISTS idx_event_feedback_event_id ON event_feedback(event_id);
CREATE INDEX IF NOT EXISTS idx_event_feedback_user_id ON event_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_event_feedback_rating ON event_feedback(rating);

-- Event categories table
CREATE TABLE IF NOT EXISTS event_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#3B82F6',
    icon TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, name)
);

-- Create indexes for event_categories
CREATE INDEX IF NOT EXISTS idx_event_categories_tenant_id ON event_categories(tenant_id);
CREATE INDEX IF NOT EXISTS idx_event_categories_is_active ON event_categories(is_active);

-- Event category assignments table
CREATE TABLE IF NOT EXISTS event_category_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES event_categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, category_id)
);

-- Create indexes for event_category_assignments
CREATE INDEX IF NOT EXISTS idx_event_category_assignments_event_id ON event_category_assignments(event_id);
CREATE INDEX IF NOT EXISTS idx_event_category_assignments_category_id ON event_category_assignments(category_id);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_events_updated_at 
    BEFORE UPDATE ON events 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_registrations_updated_at 
    BEFORE UPDATE ON event_registrations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_speakers_updated_at 
    BEFORE UPDATE ON event_speakers 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_sessions_updated_at 
    BEFORE UPDATE ON event_sessions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_waitlist_updated_at 
    BEFORE UPDATE ON event_waitlist 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_feedback_updated_at 
    BEFORE UPDATE ON event_feedback 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_categories_updated_at 
    BEFORE UPDATE ON event_categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
