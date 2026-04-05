const http = require('http');

const PORT = 3000;
const ADMIN_ID = 'admin-01';
const ANALYST_ID = 'analyst-01';
const VIEWER_ID = 'viewer-01';

const request = (method, path, userId, body = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: PORT,
            path,
            method,
            headers: {
                'x-user-id': userId,
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: data ? JSON.parse(data) : {} }));
        });

        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
};

async function runTest() {
    console.log('--- Starting API Functional Test ---');

    // 1. Create records (Admin)
    console.log('\n[1] Creating income record (Admin)...');
    const r1 = await request('POST', '/api/records', ADMIN_ID, {
        amount: 5000,
        type: 'income',
        category: 'Project Pay',
        date: '2026-04-05',
        notes: 'Consulting fee'
    });
    console.log('Income created:', r1.status === 201 ? 'Success' : 'Fail');

    console.log('\n[2] Creating expense record (Admin)...');
    const r2 = await request('POST', '/api/records', ADMIN_ID, {
        amount: 200,
        type: 'expense',
        category: 'Coffee',
        date: '2026-04-05',
        notes: 'Monthly bulk bean purchase'
    });
    console.log('Expense created:', r2.status === 201 ? 'Success' : 'Fail');

    // 2. Fetch summary (Analyst)
    console.log('\n[3] Fetching summary (Analyst)...');
    const summary = await request('GET', '/api/summary', ANALYST_ID);
    if (summary.status === 200) {
        console.log('Summary Stats:');
        console.log(`- Net Balance: ${summary.body.netBalance}`);
        console.log(`- Total Income: ${summary.body.totalIncome}`);
        console.log(`- Total Expense: ${summary.body.totalExpense}`);
    }

    // 3. Test RBAC Constraint: Analyst trying to create record
    console.log('\n[4] Testing RBAC (Analyst trying to POST record)...');
    const r3 = await request('POST', '/api/records', ANALYST_ID, { amount: 100, type: 'expense', category: 'Test', date: '2026-04-05' });
    console.log('Status (Should be 403):', r3.status);
    console.log('Error Message:', r3.body.error);

    // 4. Test RBAC Constraint: Viewer trying to manage users
    console.log('\n[5] Testing RBAC (Viewer trying to manage users)...');
    const users = await request('GET', '/api/users', VIEWER_ID);
    console.log('Status (Should be 403):', users.status);
    console.log('Error Message:', users.body.error);

    console.log('\n--- Test Completed ---');
}

runTest();
