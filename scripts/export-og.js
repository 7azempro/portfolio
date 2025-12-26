const { createClient } = require('@sanity/client');
// Node 18+ has native fetch

// 1. Config
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7azempro'; // Fallback or loaded from env
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2023-05-03';
const baseUrl = 'http://localhost:3000'; // Make sure dev server is running

// Initialize Sanity Client (Read Only)
const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // We want fresh data
});

async function exportImages() {
    console.log('🚀 Starting OG Image Export...');

    // Ensure directory exists
    const outDir = path.join(process.cwd(), 'public', 'og-exports');
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    // 2. Fetch Articles & Settings
    const query = `{
      "articles": *[_type == "article"] { 
          _id, 
          title, 
          title_en, 
          thumbnail { asset-> } 
      },
      "settings": *[_type == "settings"][0] { profileImage { asset-> } }
  }`;

    try {
        const { articles, settings } = await client.fetch(query);
        console.log(`📋 Found ${articles.length} articles.`);

        const authorId = settings?.profileImage?.asset?._ref;

        // 3. Loop and Fetch
        for (const article of articles) {
            const title = article.title_en || article.title;
            const imageId = article.thumbnail?.asset?._ref;

            // Construct the API URL
            const params = new URLSearchParams({
                title: title,
                type: 'ARTICLE',
                subtitle: 'READING_ENTRY',
            });
            if (imageId) params.append('imageId', imageId);
            if (authorId) params.append('authorImageId', authorId);

            const url = `${baseUrl}/api/og?${params.toString()}`;
            const filename = `og-${article._id}.png`;
            const filePath = path.join(outDir, filename);

            console.log(`📸 Generating: ${title.substring(0, 20)}...`);

            // Fetch the image
            const res = await fetch(url);
            if (!res.ok) {
                console.error(`❌ Failed: ${title}`);
                continue;
            }

            // Write to file
            const buffer = await res.buffer();
            fs.writeFileSync(filePath, buffer);
            console.log(`✅ Saved: ${filename}`);
        }

        console.log(`\n🎉 Done! All images saved to: ${outDir}`);
        console.log(`⚠️  Note: Make sure 'npm run dev' is running while using this script.`);

    } catch (err) {
        console.error('Fatal Error:', err);
    }
}

// Load env if needed (simple hack since we are in node script)
// In a real setup, use dotenv. For now, assuming environment variables are set or defaults work if hardcoded.
// We'll rely on the user running this with env vars loaded, or default to standard.
// Actually, let's grab the IDs from the file system if complex. 
// For now, simpler: we'll check if we can read .env.local
try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = require('dotenv').config({ path: envPath }).parsed;
        // dotenv is likely not installed as dev dependency? 
        // We'll just assume they are available or use hardcoded check.
    }
} catch (e) { }

exportImages();
