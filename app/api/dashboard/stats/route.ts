import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // For demo, return sample stats
    // In production, would fetch user from session/token
    return NextResponse.json(
      {
        todayReviews: 2,
        totalReviews: 5,
        averageScore: 72,
        currentPlan: 'free',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
