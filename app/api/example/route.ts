import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Example API route
    const data = [
      { id: '1', name: 'Example 1' },
      { id: '2', name: 'Example 2' },
    ];

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

