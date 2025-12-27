import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const client = createClient({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
            apiVersion: '2024-01-01',
            token: process.env.SANITY_API_TOKEN,
            useCdn: false
        });
        const demoArticle = {
            _type: 'article',
            title: 'مستقبل التصميم الرقمي 2025',
            title_en: 'The Future of Digital Design 2025',
            slug: { _type: 'slug', current: 'future-of-digital-design-2025' },
            excerpt: 'استكشاف التوجهات الحديثة في واجهات المستخدم وتجربة المستخدم.',
            excerpt_en: 'Exploring the latest trends in UI/UX and spatial computing.',
            date: new Date().toISOString(),
            category: 'Design',
            seo: {
                keywords: ['UI', 'UX', 'Design System', '2025'],
                synonyms: 'Interface, User Experience'
            },
            content_en: [
                {
                    _type: 'block',
                    style: 'normal',
                    children: [{ _type: 'span', text: 'As we move towards 2025, digital interfaces are becoming more immersive and less intrusive.' }]
                }
            ]
        };

        const result = await client.create(demoArticle);
        return NextResponse.json({ success: true, id: result._id });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
