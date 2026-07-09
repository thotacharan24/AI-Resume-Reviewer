# Quick Start Guide - ResumeAI

Get ResumeAI running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- A code editor (VS Code recommended)

## Step 1: Clone & Install (1 min)

```bash
# Clone the repository
git clone <repository-url>
cd resume-ai

# Install dependencies
npm install
```

## Step 2: Set Up Database (2 min)

### Option A: Using Supabase (Recommended)

1. Go to https://app.supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the "Connection String (Node.js)"
5. Create `.env.local` in project root:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
```

6. Run:
```bash
npm run prisma:push
```

### Option B: Using Local PostgreSQL

1. Install PostgreSQL
2. Create database:
```sql
CREATE DATABASE resumeai;
```
3. Set DATABASE_URL in `.env.local`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/resumeai
```
4. Run:
```bash
npm run prisma:push
```

## Step 3: Configure OpenAI (1 min)

1. Go to https://platform.openai.com/api-keys
2. Create new API key
3. Add to `.env.local`:

```env
OPENAI_API_KEY=sk-...
```

**Note:** Without this key, the app will use demo data for testing.

## Step 4: Start Development Server (1 min)

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## 🎉 You're Ready!

### Test the App

1. **Sign Up:** Click "Sign Up" on landing page
2. **Create Account:** Enter email and password
3. **Go to Dashboard:** You'll be redirected automatically
4. **Review Resume:** 
   - Go to "Review Resume"
   - Paste a sample resume and job description
   - Click "Review Resume"
5. **See Results:** View AI-powered analysis

## 📝 Create `.env.local` (Full Template)

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# OpenAI (Optional - demo mode works without it)
OPENAI_API_KEY=

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Stripe (Optional - needed for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Supabase (Optional - if using Supabase Auth)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## 🚀 Next Steps

- [ ] Read [README.md](./README.md) for detailed documentation
- [ ] Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- [ ] Explore the app structure in `/app` directory
- [ ] Customize the UI in `/components` folder
- [ ] Set up Stripe for payments (see Deployment guide)

## ⚡ Useful Commands

```bash
# Development
npm run dev                 # Start dev server
npm run lint              # Check code quality

# Database
npm run prisma:generate   # Generate Prisma client
npm run prisma:push       # Sync database
npm run prisma:seed       # Seed with sample data
npx prisma studio       # Open database GUI

# Production
npm run build             # Build for production
npm start                # Start production server
```

## 🆘 Troubleshooting

**"DATABASE_URL is not set"**
- Create `.env.local` file
- Add `DATABASE_URL=your-connection-string`

**"Cannot find module '@prisma/client'"**
- Run `npm run prisma:generate`

**"Error connecting to database"**
- Check connection string in `.env.local`
- Verify database is running
- Test with: `psql your_connection_string`

**"OpenAI API error"**
- App still works! Demo mode activated
- Add `OPENAI_API_KEY` to `.env.local` when ready

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma ORM](https://www.prisma.io/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 🎯 Demo Credentials

For testing without creating accounts:

```
Email: demo@resumeai.com
Password: (any password works in demo mode)
```

---

**Need help?** Check the [README.md](./README.md) or create a GitHub issue.

Happy coding! 🚀
