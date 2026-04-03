import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const users = await sql`SELECT * FROM users WHERE email = ${email} AND password = ${password}`;
    if (users.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const user = users[0];
    // Don't send password back
    const { password: _, ...userSafe } = user;
    
    // Convert snake_case to camelCase for the frontend
    const userFormatted = {
      id: userSafe.id,
      name: userSafe.name,
      email: userSafe.email,
      phone: userSafe.phone,
      businessName: userSafe.business_name,
      businessCategory: userSafe.business_category,
      city: userSafe.city,
      role: userSafe.role,
      createdAt: userSafe.created_at
    };

    return NextResponse.json(userFormatted);
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
