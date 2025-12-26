import { client } from '../sanity/lib/client';

// GROQ Queries
// GROQ Queries
const HERO_QUERY = `*[_type == "hero"][0]`;
const PROJECT_QUERY = `*[_type == "project"]`;
const ARTICLE_QUERY = `*[_type == "article"] | order(date desc) { ..., thumbnail { asset->, hotspot, crop } }`;
const LATEST_ARTICLES_QUERY = `*[_type == "article"] | order(date desc)[0...3] { ..., thumbnail { asset->, hotspot, crop } }`;
const SERVICE_QUERY = `*[_type == "service"]`;
const TECH_QUERY = `*[_type == "tech"] | order(row asc, name asc)`;
const SLIDER_QUERY = `*[_type == "project"] | order(year desc)`;
const ABOUT_QUERY = `*[_type == "about"][0]`;
const SETTINGS_QUERY = `*[_type == "settings"][0]`;

// Fallback for Missing Config (Not connected)
const MOCK_DATA = {
    hero: {
        title: "نصمم المستقبل",
        subtitle: "بدقة هندسية.",
        desc: "نحول الأفكار إلى منتجات رقمية استثنائية، تجمع بين قوة الأداء وجمال التصميم. شريكك التقني لبناء ما هو قادم.",
        title_en: "Engineering The",
        subtitle_en: "Digital Future.",
        desc_en: "We transform complex vision into high-performance digital reality. Precision-engineered systems for brands that demand excellence.",
        connect_btn: "إعداد النظام"
    },
    bento: { items: [] },
    projects: [],
    articles: []
};

// Fallback for Missing Content (Connected but empty)
const EMPTY_STATE = {
    hero: {
        title: "مرحباً بك في",
        subtitle: "محفظتك الجديدة.",
        desc: "نجاح! تم ربط Sanity. اذهب إلى /studio لنشر أول وثيقة.",
        title_en: "Welcome to",
        subtitle_en: "Your New Portfolio.",
        desc_en: "Success! Sanity connected. Go to /studio to publish.",
        connect_btn: "الاستوديو"
    },
    bento: { items: [] },
    projects: [],
    articles: [],
    services: [],
    testimonials: []
};

export async function getLocalData(key) {
    const isConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

    if (!isConfigured) {
        console.warn("Sanity Project ID missing. Returning mock data.");
        return MOCK_DATA[key] || {};
    }

    try {
        switch (key) {
            case 'hero':
                // Pass next: { revalidate: 30 } for ISR
                // We return EMPTY_STATE if fetch returns null
                return await client.fetch(HERO_QUERY, {}, { next: { revalidate: 30 } }) || EMPTY_STATE.hero;
            case 'projects':
                return await client.fetch(PROJECT_QUERY, {}, { next: { revalidate: 30 } }) || [];
            case 'articles':
                return await client.fetch(ARTICLE_QUERY, {}, { next: { revalidate: 30 } }) || [];
            case 'latest_articles':
                return await client.fetch(LATEST_ARTICLES_QUERY, {}, { next: { revalidate: 30 } }) || [];
            case 'services':
                return await client.fetch(SERVICE_QUERY, {}, { next: { revalidate: 30 } }) || [];

            case 'tech':
                return await client.fetch(TECH_QUERY, {}, { next: { revalidate: 30 } }) || [];
            case 'about':
                return await client.fetch(ABOUT_QUERY, {}, { next: { revalidate: 30 } }) || {};
            case 'settings':
                return await client.fetch(SETTINGS_QUERY, {}, { next: { revalidate: 30 } }) || {};
            default:
                return {};
        }
    } catch (error) {
        console.error("Sanity Fetch Error:", error);
        return EMPTY_STATE[key] || {};
    }
}

export async function updateLocalData(key, newData) {
    // Using Sanity, we don't update via app actions usually (we use Studio).
    // This function is effectively deprecated for Sanity mode.
    console.log("updateLocalData called in Sanity mode - No-op");
    return { success: false, message: "Use Sanity Studio to edit content" };
}
