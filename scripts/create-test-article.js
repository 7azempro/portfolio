const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Needs a write token, or we assume public dataset? 
    // Wait, usually local dev has a token or we need to ask user. 
    // But often .env.local has a token for build/revalidate.
    // If no token in env, we can't write from outside.
    // Let's check env vars first. 
    useCdn: false,
});

// Actually, checking standard env vars for Sanity. 
// Usually SANITY_API_TOKEN or SANITY_WRITE_TOKEN.
// If missing, I cannot write. I will assumed it's set or user must provide it.
// Alternatively, I can generate a GROQ query for the user to run in Vision plugin? No, user wants *me* to create it.
// I'll assume SANITY_API_READ_TOKEN or similar exists, but write token is needed for mutation.
// Let's try to read .env.local layout first.

// Wait, I'll write the script to just output the instructions if token is missing? 
// Or I can try to use a "mutation" via the public API if dataset is public (usually not for writes).
// Most safe bet: Write the script, try to run. If fail, ask user Use Vision.

async function createArticle() {
    console.log('📝 Creating Test Article...');

    const doc = {
        _type: 'article',
        title: 'The Future of Systems Engineering',
        title_en: 'The Future of Systems Engineering',
        category: 'engineering',
        featured: true, // We added this field? Let's check schema. We added 'category', 'tags'. 
        // We didn't add 'featured' boolean in schema explicitly in the last edit, 
        // but our frontend logic `articles[0]` handles it.
        date: new Date().toISOString(),
        readTime: '7 min read',
        excerpt: 'Exploring how modular content systems are reshaping the digital landscape.',
        tags: ['Architecture', 'Sanity', 'Next.js'],
        content: [
            {
                _type: 'block',
                style: 'normal',
                children: [
                    {
                        _type: 'span',
                        text: 'This is a programmatic test article generated to verify the new Content Engine. It supports '
                    },
                    {
                        _type: 'span',
                        marks: ['strong'],
                        text: 'Rich Text'
                    },
                    {
                        _type: 'span',
                        text: ', Code Blocks, and dynamic OG image generation.'
                    }
                ]
            }
        ]
    };

    try {
        // Need a token to write
        if (!process.env.SANITY_API_TOKEN) {
            console.error('❌ Missing SANITY_API_TOKEN in .env.local. Cannot write to Sanity.');
            console.log('👉 Please add a token with "Editor" permissions to your .env.local file.');
            process.exit(1);
        }

        const res = await client.create(doc);
        console.log(`✅ Article Created! ID: ${res._id}`);
        console.log(`🔗 Verify at: http://localhost:3000/articles`);
    } catch (err) {
        console.error('❌ Failed to create article:', err.message);
    }
}

createArticle();
