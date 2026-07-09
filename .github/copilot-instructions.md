# ResumeAI Development Instructions

## Project Overview

ResumeAI is a production-ready SaaS application for AI-powered resume reviews. Built with Next.js 15, TypeScript, Tailwind CSS, Prisma, Supabase, OpenAI, and Stripe.

## Tech Stack Summary

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** Supabase PostgreSQL
- **AI:** OpenAI GPT-4
- **Payments:** Stripe
- **Deployment:** Vercel

## Quick Commands

```bash
# Development
npm install
npm run dev                 # Start dev server
npm run lint              # Run linter
npm run prisma:generate   # Generate Prisma client
npm run prisma:push       # Sync database schema
npm run prisma:seed       # Seed sample data

# Production
npm run build             # Build for production
npm start                # Start production server

# Database
npx prisma studio       # Open database UI
```

## Project Structure

- `/app` - Next.js pages and API routes
- `/components` - Reusable React components
- `/lib` - Utility functions and helpers
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Development Workflow

1. **Create Feature Branch:** `git checkout -b feature/feature-name`
2. **Make Changes:** Edit files in relevant directories
3. **Test Locally:** Run `npm run dev` and test in browser
4. **Commit:** `git commit -m "feat: description"`
5. **Push:** `git push origin feature/feature-name`
6. **Create PR:** Submit pull request for review

## Key Features

- **Authentication:** Email/password signup and login with session cookies
- **Resume Review:** AI-powered analysis using OpenAI GPT-4
- **Freemium Model:** Free tier (3 reviews/day), Pro tier (unlimited)
- **Stripe Payments:** Secure payment processing and webhooks
- **Database:** Prisma ORM with Supabase PostgreSQL
- **Responsive UI:** Mobile-friendly design with Tailwind CSS

## Important Paths

- Landing Page: `/` - Entry point with features and pricing
- Authentication: `/login`, `/signup` - Auth pages
- Dashboard: `/dashboard` - Protected user dashboard
- Review: `/dashboard/review` - Core feature
- History: `/dashboard/history` - Saved reviews
- Billing: `/dashboard/billing` - Subscription management
- Settings: `/dashboard/settings` - User settings

## Environment Variables

Required for local development:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=postgresql://...
OPENAI_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Code Style

- **TypeScript:** Strict mode enabled
- **Components:** Use TypeScript interfaces for props
- **Styling:** Tailwind CSS utility classes, shadcn/ui components
- **Naming:** camelCase for variables/functions, PascalCase for components
- **Comments:** Add JSDoc for complex functions

## Testing Checklist

Before deployment:

- [ ] Signup/login flow works
- [ ] Resume review generates AI analysis
- [ ] Free users limited to 3 reviews/day
- [ ] Upgrade to Pro works
- [ ] Stripe payment processes
- [ ] Webhook updates subscription
- [ ] Dark mode works correctly
- [ ] Mobile responsive on small screens
- [ ] No TypeScript errors
- [ ] Linting passes

## Common Issues

**OpenAI API Key Error:** Set `OPENAI_API_KEY` in `.env.local`

**Database Connection Error:** Verify `DATABASE_URL` and PostgreSQL is running

**Stripe Webhook Failed:** Ensure webhook URL and secret match in Stripe Dashboard

**Build Errors:** Run `npm run prisma:generate` then `npm run build`

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Supabase Docs](https://supabase.io/docs)
- [Tailwind CSS](https://tailwindcss.com)

## Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for complete deployment guide.

Quick start:
```bash
vercel --prod
```

## Support

For questions or issues, check the README.md or create a GitHub issue.
