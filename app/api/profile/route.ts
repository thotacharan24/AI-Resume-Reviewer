import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email } = body;

    if (!name && !email) {
      return NextResponse.json({ message: 'No fields to update' }, { status: 400 });
    }

    // Update user profile
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
    });

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: { id: updated.id, email: updated.email, name: updated.name },
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile
    const dbUser = await prisma.user.findUnique({ where: { id: user.id }, include: { profile: true } });

    if (!dbUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ id: dbUser.id, email: dbUser.email, name: dbUser.name, profile: dbUser.profile });
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
