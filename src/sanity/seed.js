
/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');

// Load Env Vars
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

if (!process.env.SANITY_API_TOKEN) {
    console.error("Error: SANITY_API_TOKEN not found in .env.local");
    process.exit(1);
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
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
            _id: 'bento-fintech',
            _type: 'bento',
            title: "Fintech Dashboard",
            subtitle: "Product Design",
            type: "project",
            colSpan: 2,
            rowSpan: 2,
            url: "/works/fintech-dashboard"
        },
        {
            _id: 'bento-about',
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
            _id: 'bento-tech',
            _type: 'bento',
            title: "Tech Stack",
            type: "list",
            items: ["Next.js", "React", "Framer", "Tailwind"],
            colSpan: 1,
            rowSpan: 1
        },
        {
            _id: 'bento-connect',
            _type: 'bento',
            title: "Connect",
            type: "socials",
            colSpan: 1,
            rowSpan: 1
        }
    ],
    projects: [
        {
            _id: 'project-fintech',
            _type: 'project',
            title: "Fintech Dashboard",
            slug: { _type: 'slug', current: "fintech-dashboard" },
            category: "Product Design",
            desc: "Redesigning the financial future.",
            content: "Full case study content..."
        },
        {
            _id: 'project-ecommerce',
            _type: 'project',
            title: "E-Commerce System",
            slug: { _type: 'slug', current: "ecommerce-system" },
            category: "Design System",
            desc: "Unified design language for 5 brands.",
            content: "Full case study content..."
        }

    ],
    services: [
        {
            _id: 'service-product',
            _type: 'service',
            title: "Product Design",
            description: "Designing intuitive interfaces that solve complex user problems.",
            icon: "Layout"
        },
        {
            _id: 'service-dev',
            _type: 'service',
            title: "Full Stack Dev",
            description: "Building robust, scalable applications with modern tech stacks.",
            icon: "Code"
        },
        {
            _id: 'service-system',
            _type: 'service',
            title: "Design Systems",
            description: "Creating unified design languages for consistent brand experiences.",
            icon: "Box"
        }
    ],
    testimonials: [
        {
            _id: 'testimonial-1',
            _type: 'testimonial',
            name: "Sarah Johnson",
            role: "CEO at FintechCo",
            quote: "Hazem transformed our product vision into a reality that exceeded our expectations."
        }
    ],
    articles: [
        {
            _id: 'article-future-design',
            _type: 'article',
            title: "The Future of Design Systems",
            slug: { _type: 'slug', current: "future-of-design" },
            date: "2024-03-15",
            readTime: "5 min read",
            content: "Design systems are evolving differently in the AI era..."
        }
    ]
};

async function runSeed() {
    console.log("Starting Idempotent Seeding...");

    // ... (Hero code same)
    try {
        await client.createOrReplace(INITIAL_DATA.hero);
        console.log("✅ Hero created/updated.");
    } catch (e) {
        console.error("❌ Hero failed:", e.message);
    }

    // ... (Projects code same)
    for (const p of INITIAL_DATA.projects) {
        try { await client.createOrReplace(p); console.log(`✅ Project '${p.title}' created.`); } catch (e) { }
    }

    // SERVICES
    for (const s of INITIAL_DATA.services) {
        try {
            await client.createOrReplace(s);
            console.log(`✅ Service '${s.title}' created/updated.`);
        } catch (e) {
            console.error(`❌ Service '${s.title}' failed:`, e.message);
        }
    }

    // TESTIMONIALS
    for (const t of INITIAL_DATA.testimonials) {
        try {
            await client.createOrReplace(t);
            console.log(`✅ Testimonial '${t.name}' created/updated.`);
        } catch (e) {
            console.error(`❌ Testimonial '${t.name}' failed:`, e.message);
        }
    }

    // ... (Articles/Bento as before if needed, or remove bento if abandoning the grid)
    // Keeping Bento just in case, but V3 might not use it.
    console.log("Seeding Finished.");
}

runSeed();
