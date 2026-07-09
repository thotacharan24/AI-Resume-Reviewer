# ResumeAI - AI-Powered Resume Reviewer SaaS

**Land more interviews with AI-powered resume reviews.**

A production-ready SaaS application that helps job seekers optimize their resumes using AI. Built for the AI Engineering Hackathon with a focus on working features, clean architecture, and rapid deployment.

## 🚀 Features

- **AI Resume Analysis** - GPT-4 powered insights on your resume
- **ATS Score** - Get instant feedback on Applicant Tracking System compatibility
- **Skill Gap Analysis** - Identify missing skills based on job descriptions
- **Resume History** - Save and compare multiple versions
- **Freemium Model** - Free tier with 3 reviews/day, Pro tier with unlimited
- **Stripe Payments** - Secure payment processing with webhook support
- **Authentication** - Email/password authentication with persistent sessions
- **Dark Mode** - Full dark/light mode support with Tailwind CSS
- **Responsive Design** - Mobile-friendly UI with shadcn/ui components

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Next.js Route Handlers** - API endpoints
- **Prisma ORM** - Database operations
- **OpenAI API** - AI analysis engine
- **Stripe API** - Payment processing

### Database & Services
- **Supabase PostgreSQL** - Production-grade database
- **Supabase Auth** - Authentication (optional, demo includes basic auth)
- **Vercel** - Deployment platform

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ and npm/yarn
- Supabase account (for PostgreSQL)
- OpenAI API key (GPT-4 Turbo or GPT-4)
- Stripe account (for payments)
- Vercel account (for deployment)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd resume-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

**Environment Variables:**

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Set Up Database

```bash
# Generate Prisma client
npm run prisma:generate

# Create database schema
npm run prisma:push

# (Optional) Seed with sample data
npm run prisma:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app running!

## 📚 Project Structure

```
resume-ai/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── stripe/         # Stripe integration
│   │   ├── review/         # Resume review endpoint
│   │   └── dashboard/      # Dashboard data
│   ├── dashboard/          # Protected dashboard routes
│   │   ├── review/         # Resume review page
│   │   ├── history/        # Review history
│   │   ├── billing/        # Billing management
│   │   └── settings/       # User settings
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── navbar.tsx          # Navigation
│   ├── footer.tsx          # Footer
│   └── dashboard-sidebar.tsx # Dashboard sidebar
├── lib/
│   └── utils.ts            # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.js             # Seed script
└── public/                 # Static assets
```

## 🔐 Authentication Flow

1. User visits landing page
2. Clicks "Sign Up" or "Login"
3. Creates account or logs in with email/password
4. Session cookie is created (24-hour expiration)
5. Redirected to dashboard
6. Dashboard checks session cookie for auth
7. Protected routes redirect to login if unauthenticated

## 🤖 AI Integration

The app uses OpenAI's GPT-4 API to analyze resumes:

**Prompt Strategy:**
- System prompt: Instructs GPT-4 to act as an expert recruiter
- User message: Includes job description + resume
- Output: Structured JSON with analysis

**Response Format:**
```json
{
  "atsScore": 75,
  "summary": "...",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "missingSkills": ["..."],
  "matchedSkills": ["..."],
  "grammarSuggestions": "...",
  "improvedBullets": ["..."],
  "recommendation": "..."
}
```

**Fallback:** If API key is not set or quota exceeded, the app returns demo data for testing.

## 💳 Stripe Integration

### Setup Steps

1. **Create Stripe Account:** https://dashboard.stripe.com
2. **Create Products:**
   - Product: "ResumeAI Pro"
   - Price: $5/month (recurring)
3. **Copy Keys:**
   - Publishable Key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret Key → `STRIPE_SECRET_KEY`
4. **Set Webhook:**
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy Signing Secret → `STRIPE_WEBHOOK_SECRET`

### Testing Payments

Use Stripe Test Mode with these test cards:

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect Repository:**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.local`

3. **Update Stripe Webhook:**
   - Go to Stripe Dashboard
   - Update webhook URL to: `https://your-vercel-app.vercel.app/api/stripe/webhook`

4. **Deploy:**
   ```bash
   vercel --prod
   ```

### Deploy to Other Platforms

**Render:**
- Connect GitHub repo
- Set environment variables
- Deploy

**AWS/DigitalOcean:**
- Dockerize the app (see below)
- Push to container registry
- Deploy with Docker Compose

**Docker Setup:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔑 Database Setup

### Supabase Configuration

1. **Create Project:** https://app.supabase.com
2. **Copy Connection String:**
   - Go to Settings → Database → Connection String
   - Copy "Node.js" connection string
   - Set as `DATABASE_URL` in `.env.local`
3. **Run Migrations:**
   ```bash
   npm run prisma:push
   ```
4. **Verify Tables:** Check "SQL Editor" in Supabase dashboard

### Prisma Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Create/sync database schema
npm run prisma:push

# Run migrations (create new)
npm run prisma:migrate

# Open Prisma Studio
npx prisma studio

# Seed database
npm run prisma:seed
```

## 📊 Database Schema

### Users Table
- `id` - Unique identifier
- `email` - User email (unique)
- `name` - User full name
- `avatar` - Profile picture URL
- `createdAt`, `updatedAt` - Timestamps

### Subscriptions Table
- `userId` - Foreign key to Users
- `plan` - "free" or "pro"
- `status` - "active", "canceled", "past_due"
- `stripeCustomerId` - Stripe customer ID
- `stripeSubscriptionId` - Stripe subscription ID
- `currentPeriodStart`, `currentPeriodEnd` - Billing period
- `canceledAt` - Cancellation date

### Reviews Table
- `userId` - Foreign key to Users
- `resumeText` - User's resume content
- `jobDescription` - Target job description
- `jobTitle` - Job title
- AI Analysis fields: `atsScore`, `summary`, `strengths`, `weaknesses`, etc.
- `createdAt`, `updatedAt` - Timestamps

### ReviewUsage Table
- `userId` - Foreign key to Users
- `date` - Date of usage
- `count` - Number of reviews on that date
- Used for rate limiting (3 reviews/day for free users)

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Signup creates new account
- [ ] Login works with email/password
- [ ] Session persists after refresh
- [ ] Logout clears session
- [ ] Protected routes redirect to login

**Resume Review:**
- [ ] Can submit resume and job description
- [ ] AI returns analysis results
- [ ] Results display correctly
- [ ] Can review multiple resumes
- [ ] Free users limited to 3/day

**Billing:**
- [ ] Upgrade button works
- [ ] Stripe checkout appears
- [ ] Test payment processes
- [ ] Webhook updates subscription
- [ ] Pro plan unlocks unlimited reviews

### Running Tests

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## 🐛 Troubleshooting

### "OpenAI API key not found"
- Set `OPENAI_API_KEY` in `.env.local`
- App will use demo data if key not set

### "Database connection failed"
- Check `DATABASE_URL` is correct
- Ensure Supabase database is running
- Verify PostgreSQL credentials

### "Stripe webhook not working"
- Update webhook URL in Stripe Dashboard
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Check webhook logs in Stripe Dashboard

### "Build errors on Vercel"
- Clear cache: `vercel --prod --env-all-file .env.local`
- Check `buildCommand` in `vercel.json`
- Review build logs in Vercel Dashboard

## 📈 Performance Optimization

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Caching with revalidateTag
- Database query optimization with Prisma select
- CSS minification with Tailwind
- Gzip compression enabled

## 🔒 Security Best Practices

- ✅ Environment variables for secrets
- ✅ HTTPS only in production
- ✅ Secure cookies (httpOnly, sameSite)
- ✅ CORS configured
- ✅ Rate limiting on API routes
- ✅ Input validation with Zod
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection with React

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Resume Review
- `POST /api/review` - Submit resume for review

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Stripe
- `POST /api/stripe/create-checkout` - Create checkout session
- `POST /api/stripe/webhook` - Webhook endpoint

### User
- `PUT /api/profile` - Update profile

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.ts` to customize colors:
```ts
colors: {
  primary: 'hsl(0 84.2% 60.2%)',
  secondary: 'hsl(217.2 91.2% 59.8%)',
  // Add more colors...
}
```

### Branding
- Update `components/navbar.tsx` logo
- Change app name in `app/layout.tsx`
- Customize colors in `app/globals.css`

## 📚 Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **shadcn/ui:** https://ui.shadcn.com
- **OpenAI API:** https://platform.openai.com/docs
- **Stripe Docs:** https://stripe.com/docs
- **Supabase Docs:** https://supabase.io/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open a GitHub issue or contact support.

---

**Built with ❤️ for the AI Engineering Hackathon**

**Get Started:** `npm install && npm run dev` → http://localhost:3000
#   A I - R e s u m e - R e v i e w e r  
 