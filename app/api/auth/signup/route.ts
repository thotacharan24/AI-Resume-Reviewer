import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Use Supabase Auth to sign up the user
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // data.user may be null for email confirmation flows; create profile in Prisma when user exists
    if (data?.user) {
      const user = await prisma.user.upsert({
        where: { id: data.user.id },
        update: { email: data.user.email ?? undefined, name: name ?? undefined },
        create: {
          id: data.user.id,
          email: data.user.email ?? email,
          name: name,
          profile: { create: { theme: 'system' } },
          subscriptions: { create: { plan: 'free', status: 'active' } },
        },
        include: { profile: true, subscriptions: true },
      });

      return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
    }

    // If user needs to confirm email, return the Supabase response
    return NextResponse.json({ message: 'Signup initiated', data }, { status: 200 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
