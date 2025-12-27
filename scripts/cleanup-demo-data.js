const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

if (!process.env.SANITY_API_TOKEN) {
    console.error("❌ SANITY_API_TOKEN is missing. Cannot delete data.");
    process.exit(1);
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-01-01',
});

const DEMO_SLUGS = [
    'nebula-dashboard-v2',
    'future-systems-architecture-v2'
];

async function cleanup() {
    console.log(`🧹 Starting cleanup of demo data...`);

    try {
        // Find documents with these slugs
        const query = `*[slug.current in $slugs] {_id, title}`;
        const docs = await client.fetch(query, { slugs: DEMO_SLUGS });

        if (docs.length === 0) {
            console.log("✅ No demo documents found to delete.");
            return;
        }

        console.log(`Found ${docs.length} documents to delete:`);
        docs.forEach(doc => console.log(` - ${doc.title} (${doc._id})`));

        // Delete them
        const tx = client.transaction();
        docs.forEach(doc => tx.delete(doc._id));

        // Also delete any drafts
        const draftIds = docs.map(d => `drafts.${d._id}`);
        draftIds.forEach(id => tx.delete(id));

        await tx.commit();
        console.log("✅ Cleanup complete. Demo data removed.");

    } catch (error) {
        console.error("❌ Cleanup failed:", error.message);
    }
}

cleanup();
