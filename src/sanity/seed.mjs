import { createClient } from 'next-sanity';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load Env Vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

if (!process.env.SANITY_API_TOKEN) {
    console.error("Missing SANITY_API_TOKEN in .env.local");
    process.exit(1);
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

const INITIAL_DATA = {
    hero: {
        _id: 'hero',
        _type: 'hero',
        title: "Structuring Chaos Into",
        subtitle: "Systems.",
        desc: "Bridging the gap between aesthetic intuition and engineering precision.",
        connect_btn: "Work with me"
    },
    bento: [
        {
            _type: 'bento',
            title: "Fintech Dashboard",
            subtitle: "Product Design",
            type: "project",
            colSpan: 2,
            rowSpan: 2,
            url: "/works/fintech-dashboard"
        },
        {
            _type: 'bento',
            title: "About Me",
            subtitle: "Bio & Skills",
            type: "card",
            colSpan: 1,
            rowSpan: 1,
            content: "Obsessed with systems.",
            url: "/about"
        },
        {
            _type: 'bento',
            title: "Tech Stack",
            type: "list",
            items: ["Next.js", "React", "Framer", "Tailwind"],
            colSpan: 1,
            rowSpan: 1

        }
    ],
    projects: [
        {
            _type: 'project',
            title: "Fintech Dashboard",
            slug: { current: "fintech-dashboard" },
            category: "Product Design",
            desc: "Redesigning the financial future.",
            content: "Full case study content..."
        },
        {
            _type: 'project',
            title: "E-Commerce System",
            slug: { current: "ecommerce-system" },
            category: "Design System",
            desc: "Unified design language for 5 brands.",
            content: "Full case study content..."
        }
    ]
};

async function seed() {
    console.log("Starting data seed...");

    try {
        // 1. Create/Replace Hero
        console.log("Creating Hero...");
        await client.createOrReplace(INITIAL_DATA.hero);
        console.log("Hero created.");

        // 2. Create Projects
        console.log("Creating Projects...");
        for (const p of INITIAL_DATA.projects) {
            await client.create(p);
            console.log(`Project ${p.title} created.`);
        }

        // 3. Create Bento Items
        console.log("Creating Bento Grid...");
        for (const b of INITIAL_DATA.bento) {
            await client.create(b);
            console.log(`Bento item ${b.title} created.`);
        }

        console.log("✅ Seeding complete!");
    } catch (err) {
        console.error("Seeding failed:", err);
    }
}

seed();
