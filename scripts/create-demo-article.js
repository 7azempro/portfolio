const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');

// Load Env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.SANITY_API_TOKEN) {
    console.error("Error: SANITY_API_TOKEN is missing from .env.local");
    process.exit(1);
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

const demoArticle = {
    _type: 'article',
    title: 'مستقبل التصميم الرقمي 2025',
    title_en: 'The Future of Digital Design 2025',
    slug: {
        _type: 'slug',
        current: 'future-of-digital-design-2025'
    },
    excerpt: 'استكشاف التوجهات الحديثة في واجهات المستخدم وتجربة المستخدم.',
    excerpt_en: 'Exploring the latest trends in UI/UX and spatial computing.',
    date: new Date().toISOString(),
    category: 'Design',
    seo: {
        keywords: ['UI', 'UX', 'Design System', '2025'],
        synonyms: 'Interface, User Experience'
    },
    content_en: [
        {
            _type: 'block',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    text: 'As we move towards 2025, digital interfaces are becoming more immersive and less intrusive. The "Swiss Style" of clean typography and structured grids is making a comeback, but with a modern, dynamic twist.'
                }
            ]
        }
    ]
};

async function run() {
    try {
        console.log("Creating Demo Article...");
        const res = await client.create(demoArticle);
        console.log("Success! Created Article ID:", res._id);
        console.log("Slug:", res.slug.current);
    } catch (err) {
        console.error("Failed to create article:", err.message);
    }
}

run();
