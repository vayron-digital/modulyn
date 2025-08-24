# Modulyn One - Supabase Database Setup

This directory contains all the SQL scripts needed to set up the complete database structure for the Modulyn One trade association management platform.

## 📋 Overview

The database is designed as a multi-tenant SaaS platform with the following key features:
- **Multi-tenant architecture** with data isolation
- **Row Level Security (RLS)** for data protection
- **Event management** for conferences, workshops, and networking
- **CRM functionality** for contacts, leads, deals, and properties
- **Task management** with dependencies and assignments
- **Communication tools** including email campaigns and notifications
- **Analytics and reporting** with customizable dashboards
- **Subscription management** with tier-based limits

## 🗂️ Script Structure

### Core Setup Scripts

1. **`01_cleanup_existing_data.sql`**
   - Cleans up existing data while preserving tenants, profiles, and auth tables
   - Removes any test data or old tables that might conflict

2. **`02_create_enums.sql`**
   - Creates custom enum types for consistent data validation
   - Includes user roles, organization types, subscription tiers, etc.

3. **`03_create_core_tables.sql`**
   - Creates core tables: subscriptions, subscription events
   - Extends existing tenants table with additional fields
   - Sets up the foundation for multi-tenant architecture

4. **`04_create_event_tables.sql`**
   - Event management: events, registrations, speakers, sponsors, tickets, venues
   - Supports conferences, workshops, webinars, networking events
   - Includes registration tracking and capacity management

5. **`05_create_crm_tables.sql`**
   - CRM functionality: contacts, leads, deals, properties, tasks
   - Includes activity tracking, notes, documents, and task dependencies
   - Supports lead scoring and deal pipeline management

6. **`06_create_communication_tables.sql`**
   - Communication tools: email templates, campaigns, notifications
   - Message templates and communication settings
   - Email logging and campaign tracking

7. **`07_create_analytics_tables.sql`**
   - Analytics and reporting: events, page views, sessions, metrics
   - Dashboard widgets and report management
   - KPI definitions and business metrics tracking

### Security & Automation

8. **`08_create_rls_policies.sql`**
   - Enables Row Level Security on all tables
   - Creates comprehensive access control policies
   - Ensures data isolation between tenants

9. **`09_create_functions_and_triggers.sql`**
   - Utility functions for common operations
   - Automated triggers for notifications and data updates
   - Business logic functions for lead scoring and task management

### Data & Testing

10. **`10_create_sample_data.sql`**
    - Inserts realistic sample data for testing
    - Includes contacts, leads, deals, events, tasks
    - Provides email templates and dashboard widgets

11. **`11_master_script.sql`**
    - Master script that runs all scripts in the correct order
    - Use this for one-click database setup

## 🚀 Quick Start

### Option 1: Master Script (Recommended)
1. Open your Supabase project dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `11_master_script.sql`
4. Run the script

### Option 2: Individual Scripts
1. Run scripts in numerical order (01 through 10)
2. Each script can be run independently
3. Some scripts depend on previous ones, so order matters

## 🔧 Database Features

### Multi-Tenant Architecture
- Each tenant has isolated data
- Shared authentication with tenant-specific access
- Scalable design for multiple organizations

### Event Management
- **Event Types**: Conferences, workshops, webinars, networking
- **Registration System**: Capacity management, ticket types
- **Speaker Management**: Speaker profiles and session assignments
- **Venue Management**: Location details and amenities

### CRM System
- **Contacts**: Customer and prospect management
- **Leads**: Lead scoring and qualification
- **Deals**: Pipeline management with stages
- **Properties**: Real estate and facility management
- **Tasks**: Task assignment and dependency tracking

### Communication Tools
- **Email Templates**: Reusable templates with variables
- **Email Campaigns**: Campaign creation and tracking
- **Notifications**: In-app notifications system
- **Message Templates**: SMS and in-app messaging

### Analytics & Reporting
- **User Analytics**: Page views, sessions, events
- **Business Metrics**: Revenue, conversions, engagement
- **Custom Dashboards**: Widget-based dashboard system
- **KPI Tracking**: Custom KPI definitions and monitoring

### Security Features
- **Row Level Security**: Data isolation at the database level
- **Role-Based Access**: Admin, manager, member, viewer roles
- **Permission System**: Granular permissions for each feature
- **Audit Trail**: Activity logging for compliance

## 🔐 Authentication Integration

The database is designed to work with Supabase Auth and Google OAuth:
- Uses existing `auth.users` table
- Profiles table extends user information
- RLS policies use `auth.uid()` for user identification
- Tenant isolation through `auth.jwt()` claims

## 📊 Sample Data

The sample data includes:
- 1 subscription (Professional tier)
- 3 events (conference, workshop, networking)
- 3 contacts (customer, prospect, lead)
- 3 leads with different scores and stages
- 3 deals in various pipeline stages
- 3 properties (office, warehouse, retail)
- 3 tasks with different priorities
- Email templates and notifications
- Dashboard widgets and KPI definitions

## 🛠️ Customization

### Adding New Features
1. Create new tables in appropriate script files
2. Add RLS policies for security
3. Create utility functions if needed
4. Update sample data for testing

### Modifying Existing Features
1. Update table schemas in core scripts
2. Modify RLS policies for new columns
3. Update functions and triggers
4. Regenerate sample data if needed

## 🔍 Troubleshooting

### Common Issues
1. **Permission Errors**: Ensure RLS policies are correctly applied
2. **Foreign Key Errors**: Check that referenced tables exist
3. **Enum Errors**: Verify enum types are created before use
4. **Function Errors**: Ensure utility functions are created before triggers

### Debugging
1. Check Supabase logs for detailed error messages
2. Verify table creation order in scripts
3. Test RLS policies with different user roles
4. Use Supabase dashboard to inspect table structure

## 📈 Performance Considerations

- All tables include appropriate indexes
- RLS policies are optimized for performance
- Large tables use partitioning strategies
- Analytics data has automatic cleanup jobs

## 🔄 Maintenance

### Regular Tasks
- Monitor subscription limits
- Clean up expired data (automated)
- Review and update RLS policies
- Backup important data

### Updates
- Test scripts in development environment first
- Use migrations for production changes
- Document all schema changes
- Update sample data as needed

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Supabase documentation
3. Test in development environment
4. Contact the development team

---

**Note**: This database setup is specifically designed for the Modulyn One trade association management platform. Ensure you have the necessary Supabase project permissions before running these scripts.
