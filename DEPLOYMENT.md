# Deployment Guide - ResumeAI

Complete step-by-step guide for deploying ResumeAI to production.

## 🎯 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest option for Next.js apps. It's the official platform by Vercel (the creators of Next.js).

#### Prerequisites
- Vercel account (free tier available)
- GitHub account with repository pushed

#### Steps

**1. Connect Repository to Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (this will prompt you to create a project)
vercel
```

Or use the web dashboard:
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Click "Import"

**2. Configure Environment Variables**

In Vercel Dashboard:
1. Go to Project Settings
2. Click "Environment Variables"
3. Add all variables from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)

**3. Deploy to Production**

```bash
# Deploy to production
vercel --prod
```

Or use the GitHub push trigger:
- Every push to main automatically deploys

**4. Update Stripe Webhook**

In Stripe Dashboard:
1. Go to Webhooks
2. Update the endpoint URL to: `https://your-app.vercel.app/api/stripe/webhook`
3. Copy the new Signing Secret
4. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables

**5. Test the Deployment**

```bash
# Visit your live app
https://your-app.vercel.app

# Test signup/login
# Test review submission
# Test Stripe payment (use test card: 4242 4242 4242 4242)
```

---

### Option 2: Railway

Railway is a modern deployment platform with great PostgreSQL support.

#### Steps

**1. Create Railway Account**
- Go to https://railway.app
- Sign up with GitHub

**2. Create New Project**
- Click "New Project"
- Select "Deploy from GitHub"
- Connect your repository

**3. Add PostgreSQL Database**
- Click "Add"
- Select "PostgreSQL"
- Railway will provide connection string

**4. Configure Environment Variables**

In Railway Dashboard:
- Click "Variables"
- Add all environment variables
- Copy PostgreSQL connection string to `DATABASE_URL`

**5. Configure Build & Start Commands**

In Railway Settings:
- Build Command: `npm run build`
- Start Command: `npm start`

**6. Deploy**

```bash
# Push to main branch
git push origin main
```

Railway auto-deploys on push.

---

### Option 3: Docker + AWS/DigitalOcean

For more control and enterprise deployments.

#### Prerequisites
- Docker installed locally
- AWS or DigitalOcean account
- Docker Hub account (for image registry)

#### Steps

**1. Create Dockerfile**

```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
```

**2. Create docker-compose.yml**

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=resumeai
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

**3. Build & Push Docker Image**

```bash
# Build image
docker build -t resumeai:latest .

# Tag for Docker Hub
docker tag resumeai:latest your-username/resumeai:latest

# Push to Docker Hub
docker login
docker push your-username/resumeai:latest
```

**4. Deploy to DigitalOcean App Platform**

- Go to DigitalOcean Dashboard
- Create App
- Select "Docker" deployment
- Connect to Docker Hub repository
- Set environment variables
- Deploy

**5. Deploy to AWS ECS**

```bash
# Create ECR repository
aws ecr create-repository --repository-name resumeai

# Get login command
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag and push image
docker tag resumeai:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/resumeai:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/resumeai:latest

# Create ECS task definition and service
```

---

## 🗄️ Database Setup for Production

### Supabase PostgreSQL

**1. Create Supabase Project**
- Go to https://app.supabase.com
- Create new project
- Save password securely

**2. Get Connection String**
- Go to Settings → Database
- Copy "Connection string" (Node.js)
- Save as `DATABASE_URL`

**3. Run Migrations**

```bash
# Connect to production database
DATABASE_URL=your_production_url npm run prisma:push

# Verify schema created
DATABASE_URL=your_production_url npx prisma studio
```

### Self-Hosted PostgreSQL

For on-premise deployments:

```bash
# Connect with psql
psql postgresql://user:password@host:5432/resumeai

# Run schema
psql -f schema.sql postgresql://user:password@host:5432/resumeai
```

---

## 🔐 Production Security Checklist

- [ ] Set strong database passwords
- [ ] Enable database backups
- [ ] Configure SSL/TLS certificates
- [ ] Set up CORS properly
- [ ] Enable rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS only
- [ ] Configure security headers
- [ ] Set up logging & monitoring
- [ ] Enable database encryption at rest
- [ ] Configure API authentication
- [ ] Set up error tracking (Sentry)

### Security Headers

Add to `next.config.js`:

```js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ];
}
```

---

## 🚨 Monitoring & Logging

### Set Up Error Tracking (Sentry)

**1. Create Sentry Account**
- Go to https://sentry.io
- Create project for Next.js

**2. Install SDK**

```bash
npm install @sentry/nextjs
```

**3. Configure**

Create `sentry.client.config.js`:

```js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Set Up Logging

```bash
npm install winston
```

Create `lib/logger.ts`:

```ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
```

---

## 📊 Performance Optimization

### Enable Caching

```bash
# Cache headers in next.config.js
headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=60, s-maxage=60',
        },
      ],
    },
  ];
}
```

### Enable Compression

```bash
# Already enabled by default in Next.js
# But can be configured in next.config.js
compress: true,
```

---

## 🔄 Continuous Integration/Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main'
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## 🆘 Troubleshooting Deployment

### Build Fails on Vercel
```bash
# Check build logs
vercel logs <deployment-id>

# Build locally
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Database Connection Issues
```bash
# Test connection
DATABASE_URL=your_url npm run prisma:db:execute --stdin < test.sql

# Check Prisma schema
npx prisma validate
```

### Stripe Webhook Not Working
- Verify endpoint URL is correct
- Check webhook signing secret matches
- Look at Stripe webhook logs
- Check application error logs

### Performance Issues
- Check database query performance
- Enable Vercel Analytics
- Monitor OpenAI API usage
- Review bandwidth and CPU usage

---

## 📈 Scaling Considerations

As usage grows:

1. **Database:** Upgrade Supabase plan or switch to managed PostgreSQL
2. **API:** Increase rate limits, add caching
3. **Images:** Use CDN for static assets
4. **AI:** Consider batching requests, implement queues
5. **Payments:** Monitor Stripe rate limits

---

## 🎉 Deployment Complete!

Your ResumeAI is now live in production. 

**Next Steps:**
1. Monitor error logs
2. Set up alerting
3. Test all features
4. Collect user feedback
5. Plan feature releases

---

For more help, see the main [README.md](../README.md).
