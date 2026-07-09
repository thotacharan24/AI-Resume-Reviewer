'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Zap, LayoutDashboard, FileText, History, CreditCard, Settings } from 'lucide-react';

export function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/review', label: 'Review Resume', icon: FileText },
    { href: '/dashboard/history', label: 'History', icon: History },
    { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 border-r bg-muted/30 min-h-screen flex flex-col">
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
          <Zap className="h-6 w-6 text-primary" />
          <span>ResumeAI</span>
        </Link>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 text-sm">
          <p className="font-semibold mb-2">Need help?</p>
          <p className="text-muted-foreground text-xs">
            Check our documentation or contact support
          </p>
        </div>
      </div>
    </div>
  );
}
