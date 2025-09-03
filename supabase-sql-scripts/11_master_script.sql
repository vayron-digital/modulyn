-- =====================================================
-- Master SQL Script for Modulyn One Database Setup
-- =====================================================
-- This script combines all database setup scripts in the correct order
-- Run this script in your Supabase SQL editor to set up the complete database

-- Step 1: Clean up existing data (preserves tenants, profiles, auth)
\i '01_cleanup_existing_data.sql'

-- Step 2: Create custom enum types
\i '02_create_enums.sql'

-- Step 3: Create core tables
\i '03_create_core_tables.sql'

-- Step 4: Create event management tables
\i '04_create_event_tables.sql'

-- Step 5: Create CRM tables
\i '05_create_crm_tables.sql'

-- Step 6: Create communication tables
\i '06_create_communication_tables.sql'

-- Step 7: Create analytics tables
\i '07_create_analytics_tables.sql'

-- Step 8: Create functions and triggers
\i '09_create_functions_and_triggers.sql'

-- Step 9: Create RLS policies (after all tables are created)
\i '08_create_rls_policies.sql'

-- Step 10: Add missing tables and columns
\i '12_missing_tables.sql'

-- Step 11: Insert sample data (optional)
\i '10_create_sample_data.sql'

-- =====================================================
-- Setup Complete!
-- =====================================================
-- Your Modulyn One database is now ready with:
-- ✅ All tables created with proper relationships
-- ✅ Row Level Security (RLS) policies enabled
-- ✅ Utility functions and triggers for automation
-- ✅ Missing tables and columns added
-- ✅ Sample data for testing
-- ✅ Multi-tenant architecture ready
-- ✅ Google Auth integration ready

-- Next steps:
-- 1. Configure your Supabase project settings
-- 2. Set up Google OAuth in Supabase Auth settings
-- 3. Update your environment variables
-- 4. Test the database connections
