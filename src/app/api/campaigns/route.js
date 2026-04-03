import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');

    let campaigns;
    if (vendorId) {
      campaigns = await sql`SELECT * FROM campaigns WHERE vendor_id = ${vendorId} ORDER BY created_at DESC`;
    } else {
      campaigns = await sql`SELECT * FROM campaigns ORDER BY created_at DESC`;
    }

    // Format for frontend (snake_case to camelCase, JSON parsing)
    const formatted = campaigns.map(c => ({
      id: c.id,
      vendorId: c.vendor_id,
      vendorName: c.vendor_name,
      businessName: c.business_name,
      productName: c.product_name,
      productDescription: c.product_description,
      productCategory: c.product_category,
      images: c.images,
      hasIdea: c.has_idea,
      ideaDescription: c.idea_description,
      targetAudience: c.target_audience,
      budget: c.budget,
      timeline: { start: c.start_date, end: c.end_date },
      channels: typeof c.channels === 'string' ? JSON.parse(c.channels) : c.channels,
      specialNotes: c.special_notes,
      status: c.status,
      companyNotes: c.company_notes,
      analytics: typeof c.analytics === 'string' ? JSON.parse(c.analytics) : c.analytics,
      createdAt: c.created_at,
      updatedAt: c.updated_at
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('Fetch campaigns error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const id = 'c' + Date.now();
    
    await sql`
      INSERT INTO campaigns (
        id, vendor_id, vendor_name, business_name, product_name, 
        product_description, product_category, has_idea, idea_description, 
        target_audience, budget, start_date, end_date, channels, status
      ) VALUES (
        ${id}, ${data.vendorId}, ${data.vendorName}, ${data.businessName}, 
        ${data.productName}, ${data.productDescription}, ${data.productCategory}, 
        ${data.hasIdea}, ${data.ideaDescription}, ${data.targetAudience}, 
        ${data.budget}, ${data.timeline?.start}, ${data.timeline?.end}, 
        ${JSON.stringify(data.channels || [])}, 'pending'
      )
    `;

    return NextResponse.json({ id, status: 'pending' });
  } catch (err) {
    console.error('Create campaign error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
