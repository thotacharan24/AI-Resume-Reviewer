'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ArrowRight, CheckCircle, Zap, BarChart3, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
            Improve Your Resume with AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Instant ATS score, missing skills detection, recruiter feedback, and personalized improvements.
            Land more interviews with data-driven resume optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup">
              <Button size="lg" className="text-lg">
                Start Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to create a winning resume
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant ATS Score',
                description: 'Get your resume scored against Applicant Tracking System criteria instantly',
              },
              {
                icon: BarChart3,
                title: 'Skill Gap Analysis',
                description: 'Identify missing skills and see exactly what employers are looking for',
              },
              {
                icon: Sparkles,
                title: 'AI-Powered Suggestions',
                description: 'Receive personalized recommendations to improve your resume',
              },
              {
                icon: CheckCircle,
                title: 'Grammar & Formatting',
                description: 'Professional review of grammar, formatting, and presentation',
              },
              {
                icon: Zap,
                title: 'Recruiter Feedback',
                description: 'Get feedback from an AI trained on successful resumes',
              },
              {
                icon: BarChart3,
                title: 'Review History',
                description: 'Track your improvements and compare different resume versions',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
              >
                <feature.icon className="h-8 w-8 mb-3 text-primary" />
                <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that works for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 'Free',
                features: [
                  '3 reviews per day',
                  'Basic ATS Score',
                  'History tracking',
                  'Resume storage',
                  'Email support',
                ],
                cta: 'Get Started',
                href: '/signup',
                variant: 'outline' as const,
              },
              {
                name: 'Pro',
                price: '$5',
                period: '/month',
                features: [
                  'Unlimited reviews',
                  'Advanced AI analysis',
                  'Skill gap analysis',
                  'Improved bullet points',
                  'Priority support',
                  'Resume comparisons',
                ],
                cta: 'Upgrade to Pro',
                href: '/signup',
                variant: 'default' as const,
                highlighted: true,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-lg border ${plan.highlighted ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'bg-card'}`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button variant={plan.variant} className="w-full">
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
