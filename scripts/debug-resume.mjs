
async function testResumeApi() {
    try {
        console.log("Sending request to http://localhost:3000/api/resume...");
        const response = await fetch('http://localhost:3000/api/resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Debug User',
                email: 'debug@example.com',
                purpose: 'Debugging'
            })
        });

        console.log('Status:', response.status);
        console.log('Content-Type:', response.headers.get('content-type'));

        const text = await response.text();
        console.log('Raw Body Length:', text.length);
        console.log('Raw Body Preview:', text.substring(0, 500)); // First 500 chars

        try {
            const json = JSON.parse(text);
            const fs = await import('node:fs');
            fs.writeFileSync('debug-output.txt', JSON.stringify(json, null, 2));
            console.log('Error written to debug-output.txt');
        } catch (e) {
            console.log('Body is not JSON');
        }

    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

testResumeApi();
