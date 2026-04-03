import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(request) {
  try {
    const { name, email, password, phone, businessName, businessCategory, city } = await request.json();

    // Check if user exists
    const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const id = 'u' + Date.now();
    await sql`
      INSERT INTO users (id, name, email, password, phone, business_name, business_category, city, role)
      VALUES (${id}, ${name}, ${email}, ${password}, ${phone}, ${businessName}, ${businessCategory}, ${city}, 'vendor')
    `;

    const newUser = { id, name, email, phone, businessName, businessCategory, city, role: 'vendor' };
    return NextResponse.json(newUser);
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
