import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'ResumeAI - AI-Powered Resume Reviews',
  description: 'Improve your resume with AI-powered feedback. Get instant ATS scores, skill gap analysis, and personalized improvements.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
