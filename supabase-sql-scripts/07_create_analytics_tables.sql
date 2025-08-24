-- =====================================================
-- Create Analytics & Reporting Tables
-- =====================================================

-- Activity log table
CREATE TABLE IF NOT EXISTS activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    activity_type TEXT NOT NULL,
    description TEXT,
    related_to_type TEXT, -- 'contact', 'lead', 'deal', 'property', 'event', 'task'
    related_to_id UUID,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for activity_log
CREATE INDEX IF NOT EXISTS idx_activity_log_tenant_id ON activity_log(tenant_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_activity_type ON activity_log(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_log_related_to_type ON activity_log(related_to_type);
CREATE INDEX IF NOT EXISTS idx_activity_log_related_to_id ON activity_log(related_to_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON activity_log(created_at);

-- Analytics events table
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    event_name TEXT NOT NULL,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    session_id TEXT,
    properties JSONB DEFAULT '{}',
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for analytics_events
CREATE INDEX IF NOT EXISTS idx_analytics_events_tenant_id ON analytics_events(tenant_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);

-- Page views table
CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    page_url TEXT NOT NULL,
    page_title TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    session_id TEXT,
    time_on_page INTEGER, -- seconds
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for page_views
CREATE INDEX IF NOT EXISTS idx_page_views_tenant_id ON page_views(tenant_id);
CREATE INDEX IF NOT EXISTS idx_page_views_user_id ON page_views(user_id);
CREATE INDEX IF NOT EXISTS idx_page_views_page_url ON page_views(page_url);
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);

-- User sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    session_id TEXT NOT NULL,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    duration INTEGER, -- seconds
    page_count INTEGER DEFAULT 0,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    country TEXT,
    city TEXT,
    ip_address INET,
    UNIQUE(tenant_id, session_id)
);

-- Create indexes for user_sessions
CREATE INDEX IF NOT EXISTS idx_user_sessions_tenant_id ON user_sessions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_started_at ON user_sessions(started_at);

-- Performance metrics table
CREATE TABLE IF NOT EXISTS performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    metric_name TEXT NOT NULL,
    metric_value DECIMAL(10,4) NOT NULL,
    metric_unit TEXT,
    category TEXT,
    subcategory TEXT,
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance_metrics
CREATE INDEX IF NOT EXISTS idx_performance_metrics_tenant_id ON performance_metrics(tenant_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_name ON performance_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_category ON performance_metrics(category);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_period_start ON performance_metrics(period_start);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_period_end ON performance_metrics(period_end);

-- Business metrics table
CREATE TABLE IF NOT EXISTS business_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    metric_name TEXT NOT NULL,
    metric_value DECIMAL(15,2) NOT NULL,
    metric_type TEXT NOT NULL, -- 'count', 'percentage', 'currency', 'ratio'
    category TEXT NOT NULL, -- 'revenue', 'conversion', 'engagement', 'retention'
    subcategory TEXT,
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    comparison_period_start TIMESTAMPTZ,
    comparison_period_end TIMESTAMPTZ,
    comparison_value DECIMAL(15,2),
    change_percentage DECIMAL(5,2),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for business_metrics
CREATE INDEX IF NOT EXISTS idx_business_metrics_tenant_id ON business_metrics(tenant_id);
CREATE INDEX IF NOT EXISTS idx_business_metrics_name ON business_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_business_metrics_category ON business_metrics(category);
CREATE INDEX IF NOT EXISTS idx_business_metrics_type ON business_metrics(metric_type);
CREATE INDEX IF NOT EXISTS idx_business_metrics_period_start ON business_metrics(period_start);
CREATE INDEX IF NOT EXISTS idx_business_metrics_period_end ON business_metrics(period_end);

-- Dashboard widgets table
CREATE TABLE IF NOT EXISTS dashboard_widgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    widget_type TEXT NOT NULL, -- 'chart', 'metric', 'table', 'list'
    widget_name TEXT NOT NULL,
    widget_config JSONB NOT NULL,
    position_x INTEGER DEFAULT 0,
    position_y INTEGER DEFAULT 0,
    width INTEGER DEFAULT 1,
    height INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    refresh_interval INTEGER DEFAULT 300, -- seconds
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for dashboard_widgets
CREATE INDEX IF NOT EXISTS idx_dashboard_widgets_tenant_id ON dashboard_widgets(tenant_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_widgets_user_id ON dashboard_widgets(user_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_widgets_type ON dashboard_widgets(widget_type);
CREATE INDEX IF NOT EXISTS idx_dashboard_widgets_is_active ON dashboard_widgets(is_active);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    report_type TEXT NOT NULL, -- 'analytics', 'crm', 'financial', 'custom'
    query_config JSONB NOT NULL,
    schedule_config JSONB, -- for scheduled reports
    export_format TEXT DEFAULT 'pdf', -- 'pdf', 'csv', 'excel', 'json'
    recipients JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for reports
CREATE INDEX IF NOT EXISTS idx_reports_tenant_id ON reports(tenant_id);
CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(report_type);
CREATE INDEX IF NOT EXISTS idx_reports_is_active ON reports(is_active);
CREATE INDEX IF NOT EXISTS idx_reports_created_by ON reports(created_by);

-- Report executions table
CREATE TABLE IF NOT EXISTS report_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    file_url TEXT,
    file_size INTEGER,
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for report_executions
CREATE INDEX IF NOT EXISTS idx_report_executions_report_id ON report_executions(report_id);
CREATE INDEX IF NOT EXISTS idx_report_executions_tenant_id ON report_executions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_report_executions_status ON report_executions(status);
CREATE INDEX IF NOT EXISTS idx_report_executions_started_at ON report_executions(started_at);

-- Data exports table
CREATE TABLE IF NOT EXISTS data_exports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    export_type TEXT NOT NULL, -- 'contacts', 'leads', 'deals', 'events', 'custom'
    table_name TEXT,
    filters JSONB DEFAULT '{}',
    columns JSONB DEFAULT '[]',
    format TEXT NOT NULL DEFAULT 'csv', -- 'csv', 'excel', 'json'
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    file_url TEXT,
    file_size INTEGER,
    record_count INTEGER,
    error_message TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for data_exports
CREATE INDEX IF NOT EXISTS idx_data_exports_tenant_id ON data_exports(tenant_id);
CREATE INDEX IF NOT EXISTS idx_data_exports_user_id ON data_exports(user_id);
CREATE INDEX IF NOT EXISTS idx_data_exports_type ON data_exports(export_type);
CREATE INDEX IF NOT EXISTS idx_data_exports_status ON data_exports(status);
CREATE INDEX IF NOT EXISTS idx_data_exports_created_at ON data_exports(created_at);

-- KPI definitions table
CREATE TABLE IF NOT EXISTS kpi_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    formula TEXT NOT NULL,
    unit TEXT,
    target_value DECIMAL(15,2),
    target_period TEXT, -- 'daily', 'weekly', 'monthly', 'quarterly', 'yearly'
    category TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, name)
);

-- Create indexes for kpi_definitions
CREATE INDEX IF NOT EXISTS idx_kpi_definitions_tenant_id ON kpi_definitions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_kpi_definitions_category ON kpi_definitions(category);
CREATE INDEX IF NOT EXISTS idx_kpi_definitions_is_active ON kpi_definitions(is_active);
CREATE INDEX IF NOT EXISTS idx_kpi_definitions_created_by ON kpi_definitions(created_by);

-- KPI values table
CREATE TABLE IF NOT EXISTS kpi_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_id UUID NOT NULL REFERENCES kpi_definitions(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    value DECIMAL(15,4) NOT NULL,
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for kpi_values
CREATE INDEX IF NOT EXISTS idx_kpi_values_kpi_id ON kpi_values(kpi_id);
CREATE INDEX IF NOT EXISTS idx_kpi_values_tenant_id ON kpi_values(tenant_id);
CREATE INDEX IF NOT EXISTS idx_kpi_values_period_start ON kpi_values(period_start);
CREATE INDEX IF NOT EXISTS idx_kpi_values_period_end ON kpi_values(period_end);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_dashboard_widgets_updated_at 
    BEFORE UPDATE ON dashboard_widgets 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at 
    BEFORE UPDATE ON reports 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_data_exports_updated_at 
    BEFORE UPDATE ON data_exports 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kpi_definitions_updated_at 
    BEFORE UPDATE ON kpi_definitions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
