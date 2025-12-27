const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

// --- DATA ---

const SERVICES = [
    { _type: 'service', title: 'تطوير الواجهات', title_en: 'Frontend Architecture', description: 'بناء واجهات تفاعلية سريعة باستخدام React و Next.js.', description_en: 'Building performant, interactive UIs with React & Next.js.', iconKey: 'web' },
    { _type: 'service', title: 'تصميم النظم', title_en: 'System Design', description: 'تصميم أنظمة تصميم متكاملة وقابلة للتوسع.', description_en: 'Creating scalable, atomic design systems.', iconKey: 'design' },
    { _type: 'service', title: 'تطبيقات الجوال', title_en: 'Mobile Hubs', description: 'تطبيقات جوال عابرة للمنصات بأداء أصلي.', description_en: 'Cross-platform mobile experiences with native performance.', iconKey: 'mobile' },
    { _type: 'service', title: 'تطوير الخلفيات', title_en: 'Backend Systems', description: 'حلول خادم قوية ومعالجة بيانات آمنة.', description_en: 'Robust server solutions and secure data handling.', iconKey: 'backend' }
];

const TECH_STACK = [
    { _type: 'tech', name: 'React', iconKey: 'react', row: 1 },
    { _type: 'tech', name: 'Next.js', iconKey: 'nextjs', row: 1 },
    { _type: 'tech', name: 'TypeScript', iconKey: 'typescript', row: 1 },
    { _type: 'tech', name: 'Tailwind', iconKey: 'tailwind', row: 1 },
    { _type: 'tech', name: 'Node.js', iconKey: 'nodejs', row: 2 },
    { _type: 'tech', name: 'Python', iconKey: 'python', row: 2 },
    { _type: 'tech', name: 'Figma', iconKey: 'figma', row: 2 },
    { _type: 'tech', name: 'Git', iconKey: 'git', row: 2 }
];

const PROJECTS = [
    {
        _type: 'project',
        title: 'نادي الاستسقاء المصري', title_en: 'Egyptian Club of Ascites',
        category: 'System', category_en: 'System',
        year: '2025',
        link: 'https://egyptianclubofascites.com/',
        desc: 'المنصة الرقمية لنادي الاستسقاء المصري.', desc_en: 'Official digital presence for the Egyptian Club of Ascites.',
        slug: { current: 'egyptian-club' },
        challenge_en: 'Creating a unified platform for medical professionals to share resources.',
        solution_en: 'A high-performance Next.js application with secure member areas.',
        techStack: [
            { _type: 'reference', _ref: 'tech-nextjs' },
            { _type: 'reference', _ref: 'tech-tailwind' },
            { _type: 'reference', _ref: 'tech-nodejs' }
        ]
    },
    {
        _type: 'project',
        title: 'مسار العقارية', title_en: 'Masar Real Estate',
        category: 'System', category_en: 'System',
        year: '2024',
        link: 'https://example.com',
        desc: 'منصة عقارية شاملة لبيع وإدارة الأصول.', desc_en: 'Comprehensive real estate asset management platform.',
        slug: { current: 'masar-real-estate' },
        challenge_en: 'Simplifying property management for large portfolios.',
        solution_en: 'Integrated dashboard with real-time asset tracking.',
        techStack: [
            { _type: 'reference', _ref: 'tech-react' },
            { _type: 'reference', _ref: 'tech-python' }
        ]
    },
    {
        _type: 'project',
        title: 'رحلات', title_en: 'Rihlat Travel',
        category: 'Web Dev', category_en: 'Web Dev',
        year: '2023',
        link: 'https://example.com',
        desc: 'تجربة حجز سلسة للمسافر العصري.', desc_en: 'Seamless booking experience for modern travelers.',
        slug: { current: 'rihlat' },
        challenge_en: 'Modernizing the booking flow for a travel agency.',
        solution_en: 'A streamlined, mobile-first booking engine.',
        techStack: [
            { _type: 'reference', _ref: 'tech-nextjs' },
            { _type: 'reference', _ref: 'tech-figma' }
        ]
    },
    {
        _type: 'project',
        title: 'كورب تك', title_en: 'CorpTech Solutions',
        category: 'System', category_en: 'System',
        year: '2023',
        link: 'https://example.com',
        desc: 'لوحة تحكم إدارية للشركات الكبرى.', desc_en: 'Administrative dashboard for large scale enterprises.',
        slug: { current: 'corp-tech' },
        challenge_en: 'Visualizing complex enterprise data.',
        solution_en: 'Data-rich dashboard with interactive charts.',
        techStack: [
            { _type: 'reference', _ref: 'tech-typescript' },
            { _type: 'reference', _ref: 'tech-git' }
        ]
    },
    {
        _type: 'project',
        title: 'ديف كور', title_en: 'DevCore Systems',
        category: 'Web Dev', category_en: 'Web Dev',
        year: '2022',
        link: 'https://example.com',
        desc: 'أدوات تطوير متقدمة للفرق التقنية.', desc_en: 'Advanced development tools for engineering teams.',
        slug: { current: 'dev-core' },
        challenge_en: 'Improving developer velocity.',
        solution_en: 'A suite of CLI tools and web integrations.',
        techStack: [
            { _type: 'reference', _ref: 'tech-nodejs' },
            { _type: 'reference', _ref: 'tech-git' }
        ]
    }
];

async function migrate() {
    if (!client.config().token) {
        console.error("❌ Error: SANITY_API_TOKEN is missing.");
        process.exit(1);
    }

    console.log("🚀 Starting Full Migration...");

    try {
        // 1. Services
        console.log("🔹 Migrating Services...");
        const serviceTransaction = client.transaction();
        SERVICES.forEach(doc => {
            serviceTransaction.createOrReplace({ _id: `service-${doc.iconKey}`, ...doc });
        });
        await serviceTransaction.commit();
        console.log("✅ Services Migrated!");

        // 2. Tech Stack
        console.log("🔹 Migrating Tech Stack...");
        const techTransaction = client.transaction();
        TECH_STACK.forEach(doc => {
            techTransaction.createOrReplace({ _id: `tech-${doc.iconKey}`, ...doc });
        });
        await techTransaction.commit();
        console.log("✅ Tech Stack Migrated!");

        // 3. Projects
        console.log("🔹 Migrating Projects...");
        const projectTransaction = client.transaction();
        PROJECTS.forEach(doc => {
            projectTransaction.createOrReplace({ _id: `project-${doc.slug.current}`, ...doc });
        });
        await projectTransaction.commit();
        console.log("✅ Projects Migrated!");

        console.log("🎉 Full Content Restored!");
    } catch (err) {
        console.error("❌ Migration Failed:", err.message);
    }
}

migrate();
