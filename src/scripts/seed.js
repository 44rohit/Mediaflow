const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  try {
    console.log('Seeding database...');

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        business_name TEXT,
        business_category TEXT,
        city TEXT,
        role TEXT NOT NULL DEFAULT 'vendor',
        password TEXT NOT NULL,
        profile_image TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Created users table');

    // Create campaigns table
    await sql`
      CREATE TABLE IF NOT EXISTS campaigns (
        id TEXT PRIMARY KEY,
        vendor_id TEXT REFERENCES users(id),
        vendor_name TEXT,
        business_name TEXT,
        product_name TEXT NOT NULL,
        product_description TEXT,
        product_category TEXT,
        images JSONB DEFAULT '[]',
        has_idea BOOLEAN DEFAULT FALSE,
        idea_description TEXT,
        target_audience INTEGER,
        budget INTEGER,
        start_date DATE,
        end_date DATE,
        channels JSONB DEFAULT '[]',
        special_notes TEXT,
        status TEXT DEFAULT 'pending',
        company_notes TEXT,
        analytics JSONB DEFAULT '{"reach": 0, "impressions": 0, "clicks": 0, "engagementRate": 0}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Created campaigns table');

    // Insert mock users
    const mockUsers = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh@freshbites.com',
        phone: '+91 98765 43210',
        business_name: 'Fresh Bites Restaurant',
        business_category: 'Food & Beverage',
        city: 'Mumbai',
        role: 'vendor',
        password: 'vendor123',
      },
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya@stylehaus.com',
        phone: '+91 87654 32109',
        business_name: 'Style Haus Boutique',
        business_category: 'Fashion & Apparel',
        city: 'Delhi',
        role: 'vendor',
        password: 'vendor123',
      },
      {
        id: '3',
        name: 'Admin User',
        email: 'admin@mediaflow.com',
        phone: '+91 99999 00000',
        business_name: 'MediaFlow Corp',
        business_category: 'Marketing',
        city: 'Bangalore',
        role: 'admin',
        password: 'admin123',
      },
    ];

    for (const user of mockUsers) {
      await sql`
        INSERT INTO users (id, name, email, phone, business_name, business_category, city, role, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.phone}, ${user.business_name}, ${user.business_category}, ${user.city}, ${user.role}, ${user.password})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
    console.log('Inserted mock users');

    // Insert mock campaigns
    const mockCampaigns = [
      {
        id: 'c1',
        vendorId: '1',
        vendorName: 'Rajesh Kumar',
        businessName: 'Fresh Bites Restaurant',
        productName: 'Weekend Brunch Special',
        productDescription: 'Unlimited brunch buffet with 50+ items...',
        productCategory: 'Food & Dining',
        targetAudience: 50000,
        budget: 25000,
        startDate: '2026-01-15',
        endDate: '2026-02-15',
        channels: JSON.stringify(['Social Media', 'Google Ads', 'Influencer']),
        status: 'active',
        analytics: JSON.stringify({ reach: 42350, impressions: 128900, clicks: 3240, engagementRate: 4.8 }),
      },
    ];

    for (const camp of mockCampaigns) {
      await sql`
        INSERT INTO campaigns (id, vendor_id, vendor_name, business_name, product_name, product_description, product_category, target_audience, budget, start_date, end_date, channels, status, analytics)
        VALUES (${camp.id}, ${camp.vendorId}, ${camp.vendorName}, ${camp.businessName}, ${camp.productName}, ${camp.productDescription}, ${camp.productCategory}, ${camp.targetAudience}, ${camp.budget}, ${camp.startDate}, ${camp.endDate}, ${camp.channels}, ${camp.status}, ${camp.analytics})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
    console.log('Inserted mock campaigns');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();
