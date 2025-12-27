const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN, // Try both
    useCdn: false,
});

const HERO_DOC = {
    _id: 'hero',
    _type: 'hero',
    title: "نصمم المستقبل",
    subtitle: "بدقة هندسية.",
    desc: "نحول الأفكار إلى منتجات رقمية استثنائية، تجمع بين قوة الأداء وجمال التصميم. شريكك التقني لبناء ما هو قادم.",
    cta_primary: "ابدأ العمل",
    cta_secondary: "معرض الأعمال",

    title_en: "SYSTEM\nINTERFACE\nARCHITECT.",
    subtitle_en: "PRECISION. CLARITY. PURPOSE.",
    desc_en: "Constructing digital infrastructures that combine technical precision with Swiss minimalist aesthetics.",
    cta_primary_en: "INITIATE_PROJECT",
    cta_secondary_en: "VIEW_INDEX",

    availability: "متاح للمشاريع",
    availability_en: "STATUS: AVAILABLE_FOR_WORK",
    location: "القاهرة، مصر",
    location_en: "CAIRO, EG",

    // Section Headers
    services_title: 'خدماتنا',
    services_title_en: 'SERVICES',
    services_subtitle_en: '// CAPABILITIES',

    projects_title: 'أعمال مختارة',
    projects_title_en: 'Selected Work',
    projects_subtitle_en: 'Live Projects',

    // System Data
    system_version: 'V3.0.0 SYS_ACTIVE',
    coordinates: '30.0444° N, 31.2357° E'
};

async function migrate() {
    if (!client.config().token) {
        console.error("❌ Error: SANITY_API_TOKEN is missing in .env.local");
        process.exit(1);
    }

    console.log("🚀 Starting Migration...");

    try {
        // 1. Hero
        console.log("🔹 Migrating Hero...");
        await client.createOrReplace(HERO_DOC);
        console.log("✅ Hero Migrated!");

        console.log("🎉 Migration Complete!");
    } catch (err) {
        console.error("❌ Migration Failed:", err.message);
    }
}

migrate();
