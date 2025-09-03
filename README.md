# US Trade SaaS - Complete Trade Association Management Platform

A comprehensive, production-ready SaaS platform for trade associations, chambers of commerce, and professional organizations. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

### 🏢 **Trade Association Mode**
- **Member Management**: Complete member lifecycle, profiles, and insights
- **Event Management**: Conferences, workshops, webinars with registration
- **Certification Tracking**: Professional development and credential management
- **Committee Management**: Organizational structure and collaboration
- **Legislative Monitoring**: Policy tracking and advocacy tools

### 💼 **CRM Mode**
- **Lead Management**: Full sales pipeline with scoring and qualification
- **Deal Pipeline**: Opportunity tracking and revenue forecasting
- **Property Management**: Real estate listings and facility management
- **Task Management**: Project tracking with dependencies and assignments
- **Contact Management**: Comprehensive relationship management

### 🔧 **Core Platform Features**
- **Multi-tenant Architecture**: Complete data isolation between organizations
- **Real-time Updates**: Live data synchronization across all components
- **Advanced Analytics**: Custom dashboards and KPI tracking
- **Email Campaigns**: Template-based communication with tracking
- **Role-based Access Control**: Granular permissions and security
- **Mobile Responsive**: Optimized for all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **State Management**: Zustand, React Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts for data visualization
- **Authentication**: Supabase Auth with Google OAuth

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Google OAuth credentials (optional)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd us-trade-saas
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Stripe Configuration (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database-setup.sql`
4. Run the script to create all tables, functions, and sample data

### 4. Start Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## 🗄️ Database Schema

The platform uses a comprehensive, multi-tenant database design:

### Core Tables
- **organizations**: Multi-tenant organization data
- **user_settings**: User preferences and mode settings
- **profiles**: Extended user profiles with organization context

### Event Management
- **events**: Conference, workshop, and networking events
- **event_registrations**: Attendee management and tracking
- **speakers**: Speaker profiles and session assignments
- **event_speakers**: Many-to-many event-speaker relationships

### CRM Functionality
- **contacts**: Customer and prospect management
- **leads**: Lead scoring and qualification
- **deals**: Sales pipeline and opportunity tracking
- **properties**: Real estate and facility management
- **tasks**: Project and task management

### Communication
- **email_templates**: Reusable email templates with variables
- **email_campaigns**: Campaign creation and tracking
- **notifications**: In-app notification system
- **message_templates**: Multi-channel communication templates

### Analytics & Reporting
- **page_views**: User behavior tracking
- **user_sessions**: Session analytics
- **dashboard_widgets**: Custom dashboard configurations

## 🔐 Authentication & Security

### Multi-tenant Architecture
- Complete data isolation between organizations
- Row Level Security (RLS) on all tables
- Organization-based access control

### User Roles & Permissions
- **Admin**: Full system access and user management
- **Manager**: Team and project oversight
- **Member**: Standard user access
- **Viewer**: Read-only access

### Security Features
- Supabase Auth with secure session management
- Google OAuth integration
- Password reset and account recovery
- Session timeout and security policies

## 📊 Real-time Features

### Live Data Updates
- Real-time dashboard updates
- Live notifications and alerts
- Collaborative editing capabilities
- Instant chat and messaging

### WebSocket Integration
- Supabase real-time subscriptions
- Live event updates
- Real-time collaboration tools
- Instant data synchronization

## 🎨 Customization & Theming

### Theme System
- Light, dark, and system theme support
- Customizable color schemes
- Brand-specific styling options
- Responsive design for all devices

### Dashboard Customization
- Drag-and-drop widget placement
- Custom KPI definitions
- Personalized dashboard layouts
- Role-based dashboard views

## 📈 Analytics & Reporting

### Built-in Analytics
- User engagement tracking
- Event performance metrics
- Lead conversion analytics
- Revenue and growth tracking

### Custom Reports
- Configurable report builder
- Export to PDF/Excel
- Scheduled report delivery
- Interactive data visualization

## 🔌 API & Integrations

### RESTful API
- Complete CRUD operations
- Filtering and pagination
- Bulk operations support
- Rate limiting and throttling

### Third-party Integrations
- Google OAuth authentication
- Stripe payment processing
- Email service providers
- Calendar integrations

## 🚀 Deployment

### Vercel Deployment
```bash
npm run build
vercel --prod
```

### Environment Variables
Ensure all environment variables are set in your production environment.

### Database Migrations
Use the provided SQL scripts for database setup and migrations.

## 🧪 Testing

### Development Testing
```bash
npm run lint
npm run type-check
```

### Component Testing
The platform includes comprehensive component testing with React Testing Library.

## 📚 API Documentation

### Service Layer
All backend functionality is organized into service modules:

- **`/services/auth.ts`**: Authentication and user management
- **`/services/events.ts`**: Event management and registration
- **`/services/crm.ts`**: CRM functionality and sales pipeline
- **`/services/members.ts`**: Member management and insights
- **`/services/communications.ts`**: Email campaigns and notifications

### Usage Examples

```typescript
// Get all events for the organization
import { eventsService } from '@/services/events'
const events = await eventsService.getEvents()

// Create a new contact
import { contactsService } from '@/services/crm'
const contact = await contactsService.createContact({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  company: 'Example Corp'
})

// Get member statistics
import { membersService } from '@/services/members'
const stats = await membersService.getMemberStatistics()
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Enable Row Level Security (RLS)
3. Configure authentication providers
4. Set up storage buckets for file uploads

### Google OAuth
1. Create OAuth 2.0 credentials in Google Console
2. Add authorized redirect URIs
3. Configure Supabase Auth settings

### Stripe Integration
1. Set up Stripe account and API keys
2. Configure webhook endpoints
3. Set up product and pricing plans

## 📱 Mobile & Responsiveness

- Fully responsive design
- Mobile-first approach
- Touch-friendly interfaces
- Progressive Web App (PWA) ready

## 🔍 Performance Optimization

- Server-side rendering (SSR)
- Static generation where possible
- Image optimization
- Code splitting and lazy loading
- Efficient data fetching with React Query

## 🛡️ Security Best Practices

- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF token implementation
- Secure HTTP headers

## 📊 Monitoring & Logging

- Comprehensive error logging
- Performance monitoring
- User activity tracking
- System health checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code examples
- Open an issue on GitHub
- Contact the development team

## 🚀 Roadmap

### Upcoming Features
- Advanced reporting engine
- Mobile app development
- AI-powered insights
- Advanced workflow automation
- Multi-language support
- Advanced analytics dashboard

---

**Built with ❤️ for trade associations and professional organizations**

Transform your organization's digital presence with this comprehensive, enterprise-ready platform.