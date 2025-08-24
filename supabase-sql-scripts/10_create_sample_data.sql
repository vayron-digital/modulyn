-- =====================================================
-- Create Sample Data
-- =====================================================

-- Use existing tenant ID and profile ID from your database
-- Using Vayron Digital tenant ID: aa381d7b-b6e8-4065-ba1f-ff51d090daa8
-- Using Vayron Digital profile ID: 0c8c94c0-45ee-437f-b6c5-12d59139dba0

-- Insert sample subscription
INSERT INTO subscriptions (tenant_id, plan, status, current_period_end, amount, stripe_subscription_id, stripe_customer_id) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'professional', 'active', NOW() + INTERVAL '1 year', 99.99, 'sub_sample123', 'cus_sample123');

-- Insert sample events (using actual profile ID for created_by)
INSERT INTO events (tenant_id, title, description, type, status, start_date, end_date, venue, capacity, price, currency, registration_deadline, max_registrations, current_registrations, tags, metadata, created_by) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Annual Trade Conference 2024', 'Join us for our biggest event of the year featuring industry leaders, networking opportunities, and cutting-edge insights.', 'conference', 'upcoming', NOW() + INTERVAL '2 months', NOW() + INTERVAL '2 months' + INTERVAL '3 days', 'Convention Center', 500, 299.99, 'USD', NOW() + INTERVAL '1 month', 500, 127, ARRAY['networking', 'industry', 'conference'], '{"has_catering": true, "has_wifi": true}', '0c8c94c0-45ee-437f-b6c5-12d59139dba0'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Digital Marketing Workshop', 'Learn the latest digital marketing strategies and tools to grow your business.', 'workshop', 'upcoming', NOW() + INTERVAL '1 week', NOW() + INTERVAL '1 week' + INTERVAL '1 day', 'Business Center', 50, 149.99, 'USD', NOW() + INTERVAL '3 days', 50, 23, ARRAY['marketing', 'digital', 'workshop'], '{"has_materials": true, "certificate": true}', '0c8c94c0-45ee-437f-b6c5-12d59139dba0'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Networking Mixer', 'Monthly networking event for industry professionals to connect and share insights.', 'networking', 'upcoming', NOW() + INTERVAL '2 weeks', NOW() + INTERVAL '2 weeks' + INTERVAL '4 hours', 'Downtown Club', 100, 25.00, 'USD', NOW() + INTERVAL '1 week', 100, 67, ARRAY['networking', 'monthly', 'social'], '{"has_drinks": true, "has_appetizers": true}', '0c8c94c0-45ee-437f-b6c5-12d59139dba0');

-- Insert sample contacts (using actual profile ID for assigned_to and created_by)
INSERT INTO contacts (tenant_id, type, first_name, last_name, email, phone, company, job_title, website, address, social_media, notes, tags, source, status, assigned_to, created_by) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'client', 'John', 'Smith', 'john.smith@techcorp.com', '+1-555-0123', 'TechCorp Solutions', 'CEO', 'https://techcorp.com', '{"street": "123 Business Ave", "city": "New York", "state": "NY", "zip": "10001", "country": "USA"}', '{"linkedin": "johnsmith", "twitter": "@johnsmith"}', 'Key decision maker, interested in enterprise solutions', ARRAY['vip', 'enterprise', 'decision_maker'], 'website', 'active', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'prospect', 'Sarah', 'Johnson', 'sarah.johnson@innovateinc.com', '+1-555-0456', 'Innovate Inc', 'Marketing Director', 'https://innovateinc.com', '{"street": "456 Innovation St", "city": "San Francisco", "state": "CA", "zip": "94102", "country": "USA"}', '{"linkedin": "sarahjohnson", "twitter": "@sarahj"}', 'Interested in digital marketing services', ARRAY['prospect', 'marketing', 'west_coast'], 'referral', 'active', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'lead', 'Michael', 'Brown', 'michael.brown@startupxyz.com', '+1-555-0789', 'StartupXYZ', 'Founder', 'https://startupxyz.com', '{"street": "789 Startup Blvd", "city": "Austin", "state": "TX", "zip": "73301", "country": "USA"}', '{"linkedin": "michaelbrown", "twitter": "@mbrown"}', 'Early stage startup, looking for growth strategies', ARRAY['startup', 'founder', 'growth'], 'social_media', 'active', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0');

-- Insert sample leads (using actual profile ID for assigned_to and created_by)
INSERT INTO leads (tenant_id, first_name, last_name, email, phone, company, job_title, source, status, budget, timeline, requirements, notes, tags, assigned_to, created_by, lead_score) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Emily', 'Davis', 'emily.davis@growthco.com', '+1-555-0321', 'GrowthCo', 'VP of Sales', 'website', 'qualified', 50000.00, 'within_3_months', 'Sales automation tools with CRM integration', 'Looking for sales automation tools, budget approved', ARRAY['enterprise', 'sales', 'automation'], '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 85),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'David', 'Wilson', 'david.wilson@retailpro.com', '+1-555-0654', 'RetailPro', 'Operations Manager', 'referral', 'contacted', 25000.00, 'within_6_months', 'Inventory management system with barcode scanning', 'Interested in inventory management solutions', ARRAY['retail', 'inventory', 'operations'], '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 72),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Lisa', 'Garcia', 'lisa.garcia@healthtech.com', '+1-555-0987', 'HealthTech', 'CTO', 'cold_call', 'new', 100000.00, 'within_year', 'Digital transformation platform with HIPAA compliance', 'Exploring digital transformation solutions', ARRAY['healthcare', 'digital_transformation', 'enterprise'], '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 65);

-- Insert sample deals (using actual profile ID for assigned_to and created_by, and NULL for lead_id/contact_id for now)
INSERT INTO deals (tenant_id, title, description, value, currency, stage, probability, expected_close_date, lead_id, contact_id, assigned_to, created_by) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'TechCorp Enterprise Solution', 'Comprehensive enterprise software solution for TechCorp', 50000.00, 'USD', 'negotiation', 75, NOW() + INTERVAL '1 month', NULL, NULL, '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Innovate Inc Marketing Package', 'Digital marketing services for Innovate Inc', 15000.00, 'USD', 'proposal', 60, NOW() + INTERVAL '2 weeks', NULL, NULL, '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'GrowthCo Sales Automation', 'Sales automation platform for GrowthCo', 25000.00, 'USD', 'qualification', 40, NOW() + INTERVAL '3 months', NULL, NULL, '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0');

-- Insert sample properties (using actual profile ID for assigned_to and created_by)
INSERT INTO properties (tenant_id, title, description, type, status, price, currency, address, city, state, zip_code, country, features, amenities, images, assigned_to, created_by, tags) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Downtown Office Space', 'Modern office space in the heart of downtown, perfect for growing companies', 'commercial', 'available', 5000.00, 'USD', '100 Main St', 'New York', 'NY', '10001', 'USA', ARRAY['open_floor_plan', 'natural_light', 'high_ceilings'], ARRAY['parking', 'security', 'conference_rooms'], ARRAY['office1.jpg', 'office2.jpg'], '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', ARRAY['office', 'downtown', 'modern']),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Warehouse Facility', 'Large warehouse space with loading docks and storage areas', 'industrial', 'available', 8000.00, 'USD', '500 Industrial Blvd', 'Chicago', 'IL', '60601', 'USA', ARRAY['loading_docks', 'high_ceilings', 'climate_control'], ARRAY['security', 'parking', 'office_space'], ARRAY['warehouse1.jpg', 'warehouse2.jpg'], '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', ARRAY['warehouse', 'industrial', 'storage']),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Retail Storefront', 'Prime retail location with high foot traffic', 'commercial', 'under_contract', 3500.00, 'USD', '200 Shopping Ave', 'Los Angeles', 'CA', '90210', 'USA', ARRAY['storefront', 'display_windows', 'storage_room'], ARRAY['parking', 'security', 'utilities'], ARRAY['retail1.jpg', 'retail2.jpg'], '0c8c94c0-45ee-437f-b6c5-12d59139dba0', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', ARRAY['retail', 'storefront', 'prime_location']);

-- Insert sample tasks (using actual profile ID for assigned_to and created_by, and NULL for related_to_id for now)
INSERT INTO tasks (tenant_id, title, description, status, priority, due_date, assigned_to, related_to_type, related_to_id, tags, created_by) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Follow up with TechCorp', 'Schedule a follow-up call with John Smith to discuss proposal', 'in_progress', 'high', NOW() + INTERVAL '3 days', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 'contact', NULL, ARRAY['follow_up', 'sales'], '0c8c94c0-45ee-437f-b6c5-12d59139dba0'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Prepare marketing proposal', 'Create detailed proposal for Innovate Inc marketing services', 'pending', 'medium', NOW() + INTERVAL '1 week', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 'deal', NULL, ARRAY['proposal', 'marketing'], '0c8c94c0-45ee-437f-b6c5-12d59139dba0'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Event planning meeting', 'Schedule meeting to discuss Annual Trade Conference logistics', 'pending', 'high', NOW() + INTERVAL '2 days', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 'event', NULL, ARRAY['event', 'planning'], '0c8c94c0-45ee-437f-b6c5-12d59139dba0');

-- Insert sample email templates (using actual profile ID for created_by)
INSERT INTO email_templates (tenant_id, name, subject, content, variables, category, is_active, created_by) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Welcome Email', 'Welcome to {{organization_name}}!', 'Dear {{first_name}},\n\nWelcome to {{organization_name}}! We''re excited to have you as a member.\n\nBest regards,\n{{organization_name}} Team', '["first_name", "organization_name"]', 'onboarding', true, '0c8c94c0-45ee-437f-b6c5-12d59139dba0'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Event Reminder', 'Reminder: {{event_title}} is tomorrow!', 'Hi {{first_name}},\n\nJust a friendly reminder that {{event_title}} is tomorrow at {{event_time}}.\n\nLocation: {{event_location}}\n\nWe look forward to seeing you there!\n\nBest regards,\n{{organization_name}}', '["first_name", "event_title", "event_time", "event_location", "organization_name"]', 'events', true, '0c8c94c0-45ee-437f-b6c5-12d59139dba0'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Follow-up Email', 'Following up on our conversation', 'Hi {{first_name}},\n\nI hope this email finds you well. I wanted to follow up on our recent conversation about {{topic}}.\n\n{{next_steps}}\n\nLooking forward to hearing from you.\n\nBest regards,\n{{sender_name}}', '["first_name", "topic", "next_steps", "sender_name"]', 'sales', true, '0c8c94c0-45ee-437f-b6c5-12d59139dba0');

-- Insert sample notifications (using actual profile ID for user_id)
INSERT INTO notifications (tenant_id, user_id, type, title, message, status, related_to_type, related_to_id) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 'task_assigned', 'New Task Assigned', 'You have been assigned a new task: Follow up with TechCorp', 'unread', 'task', NULL),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 'deal_updated', 'Deal Stage Updated', 'Deal "TechCorp Enterprise Solution" has moved to negotiation stage', 'unread', 'deal', NULL),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 'event_created', 'Event Reminder', 'Annual Trade Conference 2024 is in 2 weeks', 'unread', 'event', NULL);

-- Insert sample dashboard widgets (using actual profile ID for user_id)
INSERT INTO dashboard_widgets (tenant_id, user_id, widget_type, widget_name, widget_config, position_x, position_y, width, height) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 'metric', 'Total Contacts', '{"metric": "contacts_count", "color": "blue"}', 0, 0, 1, 1),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 'metric', 'Active Deals', '{"metric": "deals_count", "color": "green"}', 1, 0, 1, 1),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 'chart', 'Sales Pipeline', '{"chart_type": "funnel", "data_source": "deals_by_stage"}', 0, 1, 2, 2),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', '0c8c94c0-45ee-437f-b6c5-12d59139dba0', 'list', 'Upcoming Tasks', '{"list_type": "tasks", "filter": "due_soon", "limit": 5}', 2, 0, 1, 2);

-- Insert sample communication settings
INSERT INTO communication_settings (tenant_id, setting_key, setting_value, description) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'email_sender_name', '"Modulyn One Team"', 'Default sender name for emails'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'email_sender_address', '"noreply@modulynone.com"', 'Default sender email address'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'notification_preferences', '{"email": true, "push": true, "in_app": true}', 'Default notification preferences'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'business_hours', '{"start": "09:00", "end": "17:00", "timezone": "America/New_York"}', 'Business hours for scheduling');

-- Insert sample KPI definitions
INSERT INTO kpi_definitions (tenant_id, name, description, formula, unit, target_value, target_period, category) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Lead Conversion Rate', 'Percentage of leads converted to customers', 'COUNT(deals WHERE stage = ''closed_won'') / COUNT(leads) * 100', '%', 25.0, 'monthly', 'sales'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Average Deal Size', 'Average value of closed deals', 'AVG(deals WHERE stage = ''closed_won'' AND value)', 'USD', 50000.0, 'monthly', 'sales'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Customer Retention Rate', 'Percentage of customers retained over time', 'COUNT(customers WHERE status = ''active'') / COUNT(customers) * 100', '%', 90.0, 'monthly', 'customer_success'),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Event Attendance Rate', 'Percentage of registered attendees who actually attend', 'COUNT(event_registrations WHERE attended = true) / COUNT(event_registrations) * 100', '%', 85.0, 'monthly', 'events');

-- Insert sample business metrics
INSERT INTO business_metrics (tenant_id, metric_name, metric_value, metric_type, category, subcategory, period_start, period_end) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Total Revenue', 125000.00, 'currency', 'revenue', 'total', NOW() - INTERVAL '1 month', NOW()),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'New Leads', 45, 'count', 'conversion', 'leads', NOW() - INTERVAL '1 month', NOW()),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Active Members', 234, 'count', 'engagement', 'members', NOW() - INTERVAL '1 month', NOW()),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Event Registrations', 156, 'count', 'engagement', 'events', NOW() - INTERVAL '1 month', NOW());

-- Insert sample performance metrics
INSERT INTO performance_metrics (tenant_id, metric_name, metric_value, metric_unit, category, subcategory, period_start, period_end) VALUES
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Page Load Time', 2.3, 'seconds', 'performance', 'frontend', NOW() - INTERVAL '1 day', NOW()),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'Database Query Time', 150.5, 'milliseconds', 'performance', 'backend', NOW() - INTERVAL '1 day', NOW()),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'API Response Time', 200.0, 'milliseconds', 'performance', 'api', NOW() - INTERVAL '1 day', NOW()),
('aa381d7b-b6e8-4065-ba1f-ff51d090daa8', 'User Session Duration', 1800.0, 'seconds', 'engagement', 'user_behavior', NOW() - INTERVAL '1 day', NOW());
