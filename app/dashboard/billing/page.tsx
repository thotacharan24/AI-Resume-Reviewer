'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface SubscriptionInfo {
  plan: string;
  status: string;
  renewalDate?: string;
  price?: number;
}

export default function BillingPage() {
  const [subscription] = useState<SubscriptionInfo>({
    plan: 'free',
    status: 'active',
  });
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: 'price_pro_monthly' }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to Stripe checkout
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error('Failed to create checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold capitalize">
                  {subscription.plan}
                </h3>
                <Badge variant="outline">{subscription.status}</Badge>
              </div>
              <p className="text-muted-foreground">
                {subscription.plan === 'free'
                  ? 'Get started with 3 reviews per day'
                  : 'Get unlimited reviews with Pro'}
              </p>
            </div>
            <div className="text-right">
              {subscription.plan === 'free' ? (
                <p className="text-2xl font-bold">Free</p>
              ) : (
                <>
                  <p className="text-2xl font-bold">$5</p>
                  <p className="text-sm text-muted-foreground">/month</p>
                </>
              )}
            </div>
          </div>

          {subscription.plan === 'free' && (
            <Button
              onClick={handleUpgrade}
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? 'Processing...' : 'Upgrade to Pro'}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Plan Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold">Free</th>
                  <th className="text-center py-3 px-4 font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Reviews per day', free: '3', pro: 'Unlimited' },
                  { feature: 'ATS Score', free: '✓', pro: '✓' },
                  { feature: 'Skill Gap Analysis', free: '', pro: '✓' },
                  { feature: 'Improved Bullets', free: '', pro: '✓' },
                  { feature: 'Priority Support', free: '', pro: '✓' },
                  { feature: 'Resume History', free: '✓', pro: '✓' },
                ].map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{item.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {item.free === '✓' ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">{item.free}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.pro === '✓' ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <span>{item.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Reviews Used</span>
                <span className="font-semibold">2 / 3</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2"
                  style={{ width: '66%' }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
