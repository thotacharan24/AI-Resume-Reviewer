import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    if (data?.user) {
      const user = await prisma.user.upsert({
        where: { id: data.user.id },
        update: { email: data.user.email ?? undefined },
        create: {
          id: data.user.id,
          email: data.user.email ?? email,
          name: data.user.user_metadata?.name ?? undefined,
          profile: { create: { theme: 'system' } },
          subscriptions: { create: { plan: 'free', status: 'active' } },
        },
        include: { profile: true, subscriptions: true },
      });

      return NextResponse.json({ message: 'Logged in successfully', user }, { status: 200 });
    }

    return NextResponse.json({ message: 'Login succeeded', data }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
