const http = require('http');

async function testApi() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('--- Database Integration Test ---');

  // 1. Test Login
  console.log('\n1. Testing Login (rajesh@freshbites.com)...');
  try {
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'rajesh@freshbites.com', password: 'vendor123' }),
    });
    const loginData = await loginRes.json();
    if (loginRes.ok && loginData.id === '1') {
      console.log('✅ Login successful!');
    } else {
      console.log('❌ Login failed:', loginData);
    }
  } catch (e) {
    console.log('❌ Login test error (Is the dev server running?):', e.message);
    return;
  }

  // 2. Test Get Campaigns
  console.log('\n2. Testing Get Campaigns (vendorId=1)...');
  try {
    const campRes = await fetch(`${baseUrl}/api/campaigns?vendorId=1`);
    const campData = await campRes.json();
    if (campRes.ok && Array.isArray(campData)) {
      console.log(`✅ Fetched ${campData.length} campaigns!`);
      if (campData.length > 0) {
        console.log('   First campaign:', campData[0].productName);
      }
    } else {
      console.log('❌ Fetch campaigns failed:', campData);
    }
  } catch (e) {
    console.log('❌ Campaign test error:', e.message);
  }

  // 3. Test Registration
  const testEmail = `test_${Date.now()}@example.com`;
  console.log(`\n3. Testing Registration (${testEmail})...`);
  try {
    const regRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: testEmail,
        password: 'password123',
        businessName: 'Test Biz',
        businessCategory: 'Other',
        city: 'Mumbai',
        phone: '1234567890'
      }),
    });
    const regData = await regRes.json();
    if (regRes.ok && regData.id) {
      console.log('✅ Registration successful! ID:', regData.id);
      
      // 4. Test Create Campaign for new user
      console.log('\n4. Testing Create Campaign for new user...');
      const newCampRes = await fetch(`${baseUrl}/api/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: regData.id,
          vendorName: 'Test User',
          businessName: 'Test Biz',
          productName: 'Verification Campaign',
          productDescription: 'Testing database persistence',
          productCategory: 'Other',
          targetAudience: 1000,
          budget: 500,
          timeline: { start: '2026-05-01', end: '2026-05-15' },
          channels: ['Social Media']
        }),
      });
      const newCampData = await newCampRes.json();
      if (newCampRes.ok && newCampData.id) {
        console.log('✅ Campaign created successfully! ID:', newCampData.id);
      } else {
        console.log('❌ Campaign creation failed:', newCampData);
      }
    } else {
      console.log('❌ Registration failed:', regData);
    }
  } catch (e) {
    console.log('❌ Registration/Creation test error:', e.message);
  }

  console.log('\n--- Verification Finished ---');
}

testApi();
