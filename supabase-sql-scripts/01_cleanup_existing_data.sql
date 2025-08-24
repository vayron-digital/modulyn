-- =====================================================
-- Cleanup Existing Data (Preserving Tenants, Profiles, Auth)
-- =====================================================

-- Drop all existing tables except tenants, profiles, and auth tables
-- This script will clean up the database while preserving the core authentication structure

-- Drop tables in dependency order (child tables first)
DROP TABLE IF EXISTS subscription_events CASCADE;
DROP TABLE IF EXISTS task_comments CASCADE;
DROP TABLE IF EXISTS presence CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS activity_log CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS user_invitations CASCADE;
DROP TABLE IF EXISTS integrations CASCADE;
DROP TABLE IF EXISTS user_permissions CASCADE;
DROP TABLE IF EXISTS task_templates CASCADE;
DROP TABLE IF EXISTS task_dependencies CASCADE;
DROP TABLE IF EXISTS calls CASCADE;
DROP TABLE IF EXISTS journey_cards CASCADE;
DROP TABLE IF EXISTS journey_columns CASCADE;
DROP TABLE IF EXISTS journeys CASCADE;
DROP TABLE IF EXISTS chat_shared_entities CASCADE;
DROP TABLE IF EXISTS chat_attachments CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS chat_threads CASCADE;
DROP TABLE IF EXISTS brochures CASCADE;
DROP TABLE IF EXISTS designations CASCADE;
DROP TABLE IF EXISTS team_revenue_tracking CASCADE;
DROP TABLE IF EXISTS team_hierarchy CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS project_comments CASCADE;
DROP TABLE IF EXISTS project_documents CASCADE;
DROP TABLE IF EXISTS project_tasks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS cold_calls CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop custom types that are no longer needed
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS lead_status CASCADE;
DROP TYPE IF EXISTS lead_source CASCADE;
DROP TYPE IF EXISTS property_status CASCADE;
DROP TYPE IF EXISTS property_type CASCADE;
DROP TYPE IF EXISTS property_type_detailed CASCADE;
DROP TYPE IF EXISTS property_status_detailed CASCADE;
DROP TYPE IF EXISTS notification_type CASCADE;
DROP TYPE IF EXISTS notification_status CASCADE;

-- Reset sequences
ALTER SEQUENCE IF EXISTS chat_threads_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS chat_messages_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS chat_attachments_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS chat_shared_entities_id_seq RESTART WITH 1;

-- Clean up any remaining data in preserved tables
-- Keep only essential data in tenants and profiles
DELETE FROM profiles WHERE tenant_id IS NULL OR tenant_id NOT IN (SELECT id FROM tenants);
DELETE FROM tenants WHERE id NOT IN (SELECT DISTINCT tenant_id FROM profiles WHERE tenant_id IS NOT NULL);

-- Verify cleanup
SELECT 'Cleanup completed. Preserved tables:' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('tenants', 'profiles')
ORDER BY table_name;
