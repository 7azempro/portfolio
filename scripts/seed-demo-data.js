
const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2023-05-03',
});

// Rich Text Helper
const block = (text, style = 'normal') => ({
    _type: 'block',
    style,
    children: [{ _type: 'span', text }],
    markDefs: []
});

// FULL DEMO ARTICLE
const demoArticle = {
    _type: 'article',
    slug: { _type: 'slug', current: 'future-systems-architecture-v2' },

    // Content
    title: 'مستقبل هندسة الأنظمة الموزعة',
    title_en: 'The Future of Distributed Systems Architecture',
    excerpt: 'استكشاف شامل للأنماط المعمارية الحديثة، من الميكروسرفيس إلى البنية التركيبية، وكيف تعيد تشكيل الويب.',
    excerpt_en: 'A comprehensive exploration of modern architectural patterns, from microservices to composable infrastructure, and how they are reshaping the web.',

    content: [
        block('مقدمة في الأنظمة الموزعة', 'h2'),
        block('في عالم يتسم بالسرعة والتعقيد، لم تعد الهيكليات التقليدية كافية. التحول نحو الأنظمة الموزعة ليس مجرد خيار تقني، بل ضرورة استراتيجية.'),
        block('Modular Architecture', 'h2'),
        block('The concept of modularity allows teams to iterate independently. This reduces specific points of failure and enhances scalability.'),
        block('الخلاصة', 'h3'),
        block('المستقبل ينتمي إلى الأنظمة التي تستطيع التكيف، التوسع، والتعافي ذاتياً.')
    ],
    content_en: [
        block('Introduction to Distributed Systems', 'h2'),
        block('In a fast-paced and complex world, traditional monolithic architectures are no longer sufficient. The shift towards distributed systems is not just a technical choice, but a strategic necessity.'),
        block('Modular Architecture', 'h2'),
        block('Modularity enables independent iteration. By decoupling components, we reduce the blast radius of failures and improve overall system resilience.'),
        block('Conclusion', 'h3'),
        block('The future belongs to systems that can adapt, scale, and self-heal.')
    ],

    // Metadata
    date: new Date().toISOString(),
    category: 'Engineering',
    tags: ['System Design', 'Microservices', 'Scalability', 'Cloud Native', 'Node.js'],
    views: 3450,

    // SEO
    seo: {
        _type: 'seoDetails',
        metaTitle: 'Future of Distributed Systems | 7AZEMPRO',
        metaDesc: 'Explore the evolution of web architecture. A deep dive into microservices, modularity, and the future of scalable software engineering.',
        keywords: ['System Architecture', 'Distributed Systems', 'Software Engineering', 'Microservices'],
        canonicalUrl: 'https://7azem.pro/articles/future-systems-architecture-v2',
        ogTitle: 'The Future of Distributed Systems Architecture',
        ogDescription: 'A deep dive into modularity and scalability.',
    }
};

// FULL DEMO PROJECT
const demoProject = {
    _type: 'project',
    slug: { _type: 'slug', current: 'nebula-dashboard-v2' },

    // Basic
    role: 'Full Stack Developer',
    year: '2025',
    startedAt: '2024-01-15',
    endedAt: '2024-06-30',
    link: 'https://nebula.7azem.pro',
    repo: 'https://github.com/7azempro/nebula',
    views: 8900,

    // Arabic Content
    title: 'لوحة تحكم نيبولا',
    category: 'System', // System, Web Dev, Mobile App, Design
    desc: 'نظام تحليلات فوري مصمم للشركات ذات البيانات الضخمة.',
    challenge: 'كان التحدي الرئيسي هو معالجة ملايين النقاط البيانية وعرضها في الوقت الفعلي دون أي تأخير ملحوظ في واجهة المستخدم، مع الحفاظ على استهلاك منخفض للموارد على المتصفح.',
    solution: 'قمنا بتطوير طبقة تجميع مخصصة باستخدام Node.js و Redis للتعامل مع تدفق البيانات. للعرض، استخدمنا WebGL عبر مكتبة Three.js لرسم المخططات البيانية المعقدة بسرعة فائقة.',

    // English Content
    title_en: 'Nebula Analytics Dashboard',
    category_en: 'System',
    desc_en: 'Real-time high-performance analytics system for big data enterprises.',
    challenge_en: 'The main challenge was processing millions of data points and rendering them in real-time with zero perceptible latency, all while maintaining low memory footprint on the client browser.',
    solution_en: 'We engineered a custom aggregation layer using Node.js and Redis to handle the data stream. For rendering, we leveraged WebGL via Three.js to draw complex visualizations at 60fps.',

    // Media
    color: 'bg-indigo-600',

    // SEO
    seo: {
        _type: 'seoDetails',
        metaTitle: 'Nebula Dashboard Case Study | 7AZEMPRO',
        metaDesc: 'How we built a high-performance real-time analytics dashboard using WebGL and Node.js. A deep dive into system optimization.',
        keywords: ['Dashboard', 'Analytics', 'WebGL', 'Big Data', 'Case Study'],
        canonicalUrl: 'https://7azem.pro/works/nebula-dashboard-v2',
        ogTitle: 'Nebula Dashboard: Engineering Real-time Analytics',
        ogDescription: 'Processing millions of data points at 60fps.',
    }
};

async function seed() {
    console.log('🌱 Seeding Comprehensive Demo Data...');

    if (!process.env.SANITY_API_TOKEN) {
        console.error('❌ SANITY_API_TOKEN is missing in .env.local');
        process.exit(1);
    }

    try {
        // 1. Create Article
        const article = await client.create(demoArticle);
        console.log(`✅ Created Full Article: ${article.title_en} (ID: ${article._id})`);

        // 2. Create Project
        const project = await client.create(demoProject);
        console.log(`✅ Created Full Project: ${project.title_en} (ID: ${project._id})`);

        console.log('✨ Seed Complete! Check your Dashboard and SEO.');
    } catch (err) {
        console.error('❌ Seed Failed:', err.message);
    }
}

seed();
