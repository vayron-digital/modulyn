# US Trade Association Management Platform

A modern SaaS platform designed for US trade associations, providing essential tools for member management, event organization, and communication.

## Features

### Core Functionality
- **Member Management**
  - Member directory with advanced filtering
  - Role-based access control
  - Member status tracking
  - CSV import/export capabilities

- **Organization Management**
  - Organization profile management
  - Multi-tenant architecture
  - Address and contact information management
  - Billing email configuration

- **Event Management**
  - Event creation and scheduling
  - Registration handling
  - Payment processing
  - Attendee management

- **Communication System**
  - Email template management
  - Member grouping
  - Announcement broadcasts
  - Email tracking

### Technical Features
- Modern, responsive UI built with Next.js 14 and Tailwind CSS
- Type-safe development with TypeScript
- Real-time data management with Tanstack Query
- Form handling with React Hook Form and Zod validation
- Secure authentication with Supabase
- Payment processing with Stripe
- Email communications with SendGrid

## Tech Stack

### Frontend
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide Icons
- Tanstack Query v5
- Zustand
- React Hook Form v7
- Zod

### Backend
- Supabase (Database & Authentication)
- Next.js API Routes
- Stripe Integration
- SendGrid Integration

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn
- Supabase account
- Stripe account
- SendGrid account

### Installation

1. Clone the repository:
\`\`\`bash
git clone [repository-url]
cd us-trade-saas
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a \`.env.local\` file in the root directory with the following variables:
\`\`\`env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=your-verified-sender-email
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

The application will be available at \`http://localhost:3000\`.

## Project Structure

\`\`\`
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   └── api/               # API routes
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── events/           # Event management components
│   ├── members/          # Member management components
│   ├── shared/           # Shared components
│   └── ui/               # UI components (shadcn/ui)
├── lib/                  # Utility functions and hooks
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand store
│   ├── utils/           # Utility functions
│   └── validations/     # Zod schemas
├── types/               # TypeScript types
└── styles/              # Global styles
\`\`\`

## Development

### Code Style
- Use TypeScript for all files
- Follow ESLint and Prettier configurations
- Use named exports for components
- Implement proper error handling
- Add JSDoc comments for complex functions

### Component Guidelines
- Use shadcn/ui components for consistency
- Implement proper loading states
- Handle error states gracefully
- Make components responsive
- Follow accessibility guidelines

### State Management
- Use Zustand for global state
- Use Tanstack Query for server state
- Implement proper caching strategies
- Handle loading and error states

## Testing

- Unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Playwright
- API tests with Supertest

## Deployment

The application is configured for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy the application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.