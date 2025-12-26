const http = require('http');

const endpoints = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/articles' },
    { name: 'OG API', path: '/api/og?title=HealthCheck' },
    { name: 'Studio', path: '/studio' },
];

const checkEndpoint = (endpoint) => {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: endpoint.path,
            method: 'HEAD',
            timeout: 10000
        };

        const req = http.request(options, (res) => {
            resolve({
                name: endpoint.name,
                path: endpoint.path,
                status: res.statusCode,
                ok: res.statusCode >= 200 && res.statusCode < 400
            });
        });

        req.on('error', (e) => {
            resolve({
                name: endpoint.name,
                path: endpoint.path,
                status: 'ERROR',
                error: e.message,
                ok: false
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({
                name: endpoint.name,
                path: endpoint.path,
                status: 'TIMEOUT',
                ok: false
            });
        });

        req.end();
    });
};

async function runHealthCheck() {
    console.log('🏥 Starting Localhost Health Check...\n');
    console.log('Target: http://localhost:3000');
    console.log('----------------------------------------');

    const results = await Promise.all(endpoints.map(checkEndpoint));
    let allGood = true;

    results.forEach(r => {
        const icon = r.ok ? '✅' : '❌';
        console.log(`${icon} ${r.name.padEnd(10)} [${r.path.padEnd(25)}]: ${r.status}`);
        if (!r.ok) allGood = false;
    });

    console.log('----------------------------------------');
    if (allGood) {
        console.log('🚀 SYSTEM OPERATIONAL. Frontend is listening.');
    } else {
        console.log('⚠️  SYSTEM ISSUES DETECTED.');
        process.exit(1);
    }
}

runHealthCheck();
