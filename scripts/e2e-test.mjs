// E2E Test Suite for Cheki Baggage & Travel Compliance App
import http from 'http';

const BASE_URL = 'http://localhost:3000';

function postRequest(path, payload, headers = {}) {
  return new Promise((resolve, reject) => {
    const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, body: parsed });
        } catch {
          resolve({ status: res.statusCode, body });
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function getRequest(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve({ status: res.statusCode, bodyLength: body.length });
      });
    }).on('error', reject);
  });
}

async function runE2ETests() {
  console.log('====================================================');
  console.log('🚀 RUNNING CHEKI E2E COMPREHENSIVE TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  // --- SECTION 1: PAGE ROUTE HEALTH CHECKS ---
  console.log('--- 1. Testing Page Routes (HTTP 200) ---');
  try {
    const routes = ['/', '/regulations', '/customs', '/checklist'];
    for (const route of routes) {
      const res = await getRequest(route);
      assert(res.status === 200, `Page Route ${route} returns HTTP 200`, `Status: ${res.status}`);
    }
  } catch (err) {
    console.error('Failed page health check:', err);
  }

  // --- SECTION 2: POSITIVE CASES (/api/analyze) ---
  console.log('\n--- 2. Testing Positive Cases (/api/analyze) ---');

  // Test 2.1: Plane with powerbank in checked baggage (Expect placement warning)
  try {
    const payload = {
      items: [
        { id: '1', name: 'Powerbank 20000mAh', placement: 'checkin' },
        { id: '2', name: 'Laptop', placement: 'cabin' },
      ],
      trip: {
        transportMode: 'plane',
        tripType: 'international',
        originCountry: 'Indonesia',
        destinationCountry: 'Singapura',
        isCustomDestination: false,
      },
    };

    console.log('Testing AI Analysis: Powerbank in Checked Baggage (Singapore)...');
    const res = await postRequest('/api/analyze', payload);
    assert(res.status === 200, 'Test 2.1: Status 200 OK for plane baggage check', `Got status ${res.status}`);
    assert(Array.isArray(res.body.results) && res.body.results.length === 2, 'Test 2.1: Returns 2 analyzed results');
    
    // Check if placement warning exists for powerbank in checkin
    const pbResult = res.body.results.find(r => r.item.toLowerCase().includes('powerbank'));
    assert(pbResult && (pbResult.placementWarning || pbResult.status !== 'allowed'), 'Test 2.1: Correctly flagged Powerbank in check-in as warning or restricted');
  } catch (err) {
    assert(false, 'Test 2.1: Exception occurred', err.message);
  }

  // Test 2.2: Ship (Kapal Laut) with specific maritime goods (Durian & Gas portable)
  try {
    console.log('Testing Ship Analysis: Durian and Gas Portable on Passenger Vessel...');
    const payload = {
      items: [
        { id: '1', name: 'Durian', placement: 'cabin' },
        { id: '2', name: 'Tabung gas elpiji portable', placement: 'checkin' },
        { id: '3', name: 'Beras 20kg', placement: 'checkin' },
      ],
      trip: {
        transportMode: 'ship',
        tripType: 'domestic',
        originCountry: 'Surabaya',
        destinationCountry: 'Makassar',
        isCustomDestination: false,
      },
    };

    const res = await postRequest('/api/analyze', payload);
    assert(res.status === 200, 'Test 2.2: Status 200 OK for ship baggage check');
    assert(res.body.results.length === 3, 'Test 2.2: Returns 3 analyzed ship items');

    const gasResult = res.body.results.find(r => r.item.toLowerCase().includes('gas'));
    assert(gasResult && gasResult.status === 'forbidden', 'Test 2.2: Gas portable correctly detected as forbidden on passenger ship');
  } catch (err) {
    assert(false, 'Test 2.2: Exception occurred', err.message);
  }

  // Test 2.3: Custom Country Not In Preset List (e.g. Turki / Turkey)
  try {
    console.log('Testing Custom Country: Turki (Turkey)...');
    const payload = {
      items: [
        { id: '1', name: 'Obat batuk sirup kodein', placement: 'cabin' },
        { id: '2', name: 'Drone kamera', placement: 'cabin' },
      ],
      trip: {
        transportMode: 'plane',
        tripType: 'international',
        originCountry: 'Indonesia',
        destinationCountry: 'Turki',
        isCustomDestination: true,
      },
    };

    const res = await postRequest('/api/analyze', payload);
    assert(res.status === 200, 'Test 2.3: Status 200 OK for custom country (Turki)');
    assert(res.body.results.length === 2, 'Test 2.3: Analyzed all items for custom country');
    assert(typeof res.body.generalAdvice === 'string' && res.body.generalAdvice.length > 0, 'Test 2.3: Advice provided for destination Turki');
  } catch (err) {
    assert(false, 'Test 2.3: Exception occurred', err.message);
  }

  // --- SECTION 3: NEGATIVE & EDGE CASES ---
  console.log('\n--- 3. Testing Negative & Edge Cases ---');

  // Test 3.1: Empty items array
  try {
    const res = await postRequest('/api/analyze', { items: [] });
    assert(res.status === 400, 'Test 3.1: Empty items array rejected with HTTP 400', `Got status ${res.status}`);
  } catch (err) {
    assert(false, 'Test 3.1: Exception occurred', err.message);
  }

  // Test 3.2: Items with empty / whitespace strings
  try {
    const res = await postRequest('/api/analyze', {
      items: [{ id: '1', name: '   ', placement: 'cabin' }],
    });
    assert(res.status === 400, 'Test 3.2: Whitespace-only item name rejected with HTTP 400', `Got status ${res.status}`);
  } catch (err) {
    assert(false, 'Test 3.2: Exception occurred', err.message);
  }

  // Test 3.3: Malformed JSON string
  try {
    const res = await postRequest('/api/analyze', '{ broken_json: true, ');
    assert(res.status === 400, 'Test 3.3: Malformed JSON rejected with HTTP 400', `Got status ${res.status}`);
  } catch (err) {
    assert(false, 'Test 3.3: Exception occurred', err.message);
  }

  // Test 3.4: Missing trip object (Should handle with fallback defaults without 500 crash)
  try {
    const res = await postRequest('/api/analyze', {
      items: [{ id: '1', name: 'Laptop', placement: 'cabin' }],
    });
    assert(res.status === 200, 'Test 3.4: Missing trip object defaults gracefully without 500 error', `Got status ${res.status}`);
  } catch (err) {
    assert(false, 'Test 3.4: Exception occurred', err.message);
  }

  // Test 3.5: Extremely long or special characters
  try {
    const res = await postRequest('/api/analyze', {
      items: [
        { id: '1', name: 'Barang #1 @!$%^&*()_+ "Special" 🚀', placement: 'cabin' },
      ],
      trip: {
        transportMode: 'plane',
        tripType: 'international',
        originCountry: 'Indonesia',
        destinationCountry: 'Jepang',
        isCustomDestination: false,
      },
    });
    assert(res.status === 200, 'Test 3.5: Special characters & emojis handled smoothly', `Got status ${res.status}`);
  } catch (err) {
    assert(false, 'Test 3.5: Exception occurred', err.message);
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runE2ETests();
