
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

const projects = [
    {
        title: 'SafeTrip KSA',
        title_ar: 'سيف تريب السعودية',
        link: 'https://safetripeksa.com/',
        category: 'Web Dev',
        category_ar: 'تطوير ويب',
        desc: 'منصة حجوزات سفر وسياحة متكاملة للمملكة.',
        desc_en: 'Integrated travel and tourism booking platform for KSA.',
        year: '2024',
        slug: 'safetrip-ksa',
        color: 'bg-emerald-600'
    },
    {
        title: 'Saud Alfify Check',
        title_ar: 'سعود الفيفي',
        link: 'https://saud-alfify.sa/',
        category: 'Web Dev',
        category_ar: 'تطوير ويب',
        desc: 'موقع شخصي وبورتفوليو احترافي.',
        desc_en: 'Professional personal brand and portfolio website.',
        year: '2024',
        slug: 'saud-alfify',
        color: 'bg-slate-800'
    },
    {
        title: 'Bytown Mark',
        title_ar: 'باي تاون مارك',
        link: 'https://bytownmark.com/',
        category: 'Web Dev',
        category_ar: 'تطوير ويب',
        desc: 'وكالة تسويق رقمي وحلول إبداعية.',
        desc_en: 'Digital marketing and creative solutions agency.',
        year: '2023',
        slug: 'bytown-mark',
        color: 'bg-purple-600'
    },
    {
        title: 'Egyptian Club of Ascites',
        title_ar: 'النادي المصري للاستسقاء',
        link: 'https://egyptianclubofascites.com/',
        category: 'Web Dev',
        category_ar: 'تطوير ويب',
        desc: 'منصة طبية تعليمية متخصصة.',
        desc_en: 'Specialized educational medical platform.',
        year: '2023',
        slug: 'egyptian-club-ascites',
        color: 'bg-blue-600'
    },
    {
        title: 'RDO',
        title_ar: 'RDO',
        link: 'https://rdo.com.sa/',
        category: 'Web Dev',
        category_ar: 'تطوير ويب',
        desc: 'شركة تطوير عقاري واستثمار.',
        desc_en: 'Real estate development and investment company.',
        year: '2024',
        slug: 'rdo-sa',
        color: 'bg-amber-600'
    },
    {
        title: 'Movies & TV Stream App',
        title_ar: 'تطبيق بث الأفلام',
        link: 'https://dribbble.com/shots/21637021-Movies-TV-Stream-Web-Application',
        category: 'Design',
        category_ar: 'تصميم',
        desc: 'تصميم واجهة مستخدم لتطبيق بث محتوى ترفيهي.',
        desc_en: 'UI design for an entertainment streaming application.',
        year: '2023',
        slug: 'movies-stream-ui',
        color: 'bg-red-600'
    },
    {
        title: 'Music Player UI',
        title_ar: 'واجهة مشغل موسيقى',
        link: 'https://dribbble.com/shots/24258997-Music-Player-Daily-UI-Challenge-2',
        category: 'Design',
        category_ar: 'تصميم',
        desc: 'تحدي تصميم يومي: مشغل موسيقى عصري.',
        desc_en: 'Daily UI Challenge: Modern music player interface.',
        year: '2024',
        slug: 'music-player-ui',
        color: 'bg-pink-600'
    },
    {
        title: 'Maintenance Super App',
        title_ar: 'تطبيق الصيانة الشامل',
        link: 'https://dribbble.com/shots/24265224-Daily-Maintenance-Group-Super-App',
        category: 'Design',
        category_ar: 'تصميم',
        desc: 'تصميم تجربة مستخدم لتطبيق خدمات صيانة متكامل.',
        desc_en: 'UX design for a comprehensive maintenance services app.',
        year: '2024',
        slug: 'maintenance-super-app',
        color: 'bg-cyan-600'
    },
    {
        title: 'Tesla Arabic Edition',
        title_ar: 'تسلا - النسخة العربية',
        link: 'https://www.behance.net/gallery/168278119/Tesla-Arabic-Edition-(UI-Design-Project)',
        category: 'Design',
        category_ar: 'تصميم',
        desc: 'إعادة تصور واجهة تسلا للمستخدم العربي.',
        desc_en: 'Reimagining the Tesla interface for Arabic users.',
        year: '2023',
        slug: 'tesla-arabic-ui',
        color: 'bg-stone-900'
    }
];

async function seed() {
    console.log('🚀 Seeding Portfolio Projects...');

    if (!process.env.SANITY_API_TOKEN) {
        console.error('❌ SANITY_API_TOKEN is missing');
        process.exit(1);
    }

    for (const p of projects) {
        const doc = {
            _type: 'project',
            title: p.title_ar,
            title_en: p.title,
            slug: { _type: 'slug', current: p.slug },
            category: p.category_ar, // Matches standard options if you add 'System' etc logic? Or direct string
            category_en: p.category,
            desc: p.desc,
            desc_en: p.desc_en,
            link: p.link,
            year: p.year,
            color: p.color,
            role: 'Lead Developer', // Default
            views: Math.floor(Math.random() * 5000) + 500, // Random views for "Live" feel
            seo: {
                _type: 'seoDetails',
                metaTitle: `${p.title} | Portfolio`,
                metaDesc: p.desc_en,
                canonicalUrl: p.link
            }
        };

        try {
            const res = await client.createOrReplace({
                _id: `project-${p.slug}`,
                ...doc
            });
            console.log(`✅ Seeded: ${p.title}`);
        } catch (err) {
            console.error(`❌ Failed ${p.title}:`, err.message);
        }
    }

    console.log('✨ All projects seeded!');
}

seed();
