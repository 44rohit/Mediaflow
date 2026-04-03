import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Map camelCase to snake_case for updates
    const updates = [];
    if (body.status) updates.push(sql`status = ${body.status}`);
    if (body.companyNotes) updates.push(sql`company_notes = ${body.companyNotes}`);
    if (body.budget) updates.push(sql`budget = ${body.budget}`);
    
    if (updates.length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    // Note: This is an oversimplified update for demo purposes
    // In a real app we'd build the query dynamically or use an ORM
    if (body.status && body.companyNotes) {
        await sql`UPDATE campaigns SET status = ${body.status}, company_notes = ${body.companyNotes}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
    } else if (body.status) {
        await sql`UPDATE campaigns SET status = ${body.status}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
    } else if (body.companyNotes) {
        await sql`UPDATE campaigns SET company_notes = ${body.companyNotes}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Update campaign error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
