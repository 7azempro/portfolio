const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

const ABOUT_DOC = {
    _id: 'about',
    _type: 'about',
    role: "مهندس برمجيات",
    role_en: "Software Engineer",
    location: "القاهرة، مصر",
    location_en: "Cairo, Egypt",
    bio: "متخصص في بناء الأنظمة الرقمية المعقدة.",
    bio_en: "Specialist in building complex digital systems.",
    stats: [
        {
            _type: 'statItem',
            _key: 'stat1',
            value: '4',
            label: 'سنوات خبرة', label_en: 'Years Exp',
            unit: '+', unit_en: '+'
        },
        {
            _type: 'statItem',
            _key: 'stat2',
            value: '20',
            label: 'مشروع ناجح', label_en: 'Projects Done',
            unit: '+', unit_en: '+'
        },
        {
            _type: 'statItem',
            _key: 'stat3',
            value: '10',
            label: 'عملاء سعداء', label_en: 'Happy Clients',
            unit: '', unit_en: ''
        },
        {
            _type: 'statItem',
            _key: 'stat4',
            value: '100',
            label: 'معدل التزام', label_en: 'Commitment',
            unit: '%', unit_en: '%'
        }
    ]
};

async function migrate() {
    console.log("🚀 Migrating Stats...");
    try {
        await client.createOrReplace(ABOUT_DOC);
        console.log("✅ Stats Migrated!");
    } catch (err) {
        console.error("❌ Failed:", err.message);
    }
}

migrate();
