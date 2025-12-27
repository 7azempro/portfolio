import { getLocalData } from "@/lib/data.server";
import Link from 'next/link';
import SmartCompass from '@/components/ui/SmartCompass';
import ArticleDetail from "./ArticleDetail";
import { client } from "@/sanity/lib/client";
import { urlFor } from '@/sanity/lib/image';

// Revalidate every 60 seconds
export const revalidate = 60;



export async function generateMetadata({ params }) {
    const { id } = await params;
    const query = `{
        "article": *[_type == "article" && (slug.current == $id || _id == $id)][0] { ..., thumbnail { asset-> } },
        "settings": *[_type == "settings"][0] { siteTitle, profileImage { asset-> }, authorName, authorRole, seoDescription }
    }`;
    const { article, settings } = await client.fetch(query, { id });

    if (!article) return {};

    const seo = article.seo || {};
    const title = seo.metaTitle || article.title_en || article.title;
    const description = seo.metaDesc || article.excerpt_en || article.excerpt;
    const shareImage = seo.seoImage ? urlFor(seo.seoImage).width(1200).height(630).url() : (article.thumbnail ? urlFor(article.thumbnail).width(1200).height(630).url() : null);

    const ogImages = shareImage ? [{ url: shareImage, width: 1200, height: 630 }] : [];

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: ogImages,
            url: seo.canonicalUrl || undefined
        },
        alternates: {
            canonical: seo.canonicalUrl || `/articles/${article.slug?.current || id}`
        }
    };
}

export default async function ArticlePage({ params }) {
    const { id } = await params;

    // Fetch specific article by ID + Global Settings + Related Articles
    const query = `{
        "article": *[_type == "article" && (slug.current == $id || _id == $id)][0] { ..., thumbnail { asset-> } },
        "settings": *[_type == "settings"][0] { siteTitle, profileImage { asset-> }, authorName, authorRole, seoDescription }
    }`;
    const { article, settings } = await client.fetch(query, { id });

    const relatedArticles = await client.fetch(
        `*[_type == "article" && _id != $id && slug.current != $id && defined(slug.current)] | order(date desc)[0...2]{
            ...,
            "slug": slug,
            thumbnail { asset->, hotspot, crop },
            views
        }`,
        { id },
        { next: { revalidate: 30 } }
    );

    if (!article) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[85vh] p-8 text-center space-y-8 relative overflow-hidden bg-[#050505] text-white">
                {/* Ambient Backlight */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <h1 className="text-[120px] sm:text-[180px] font-black leading-none opacity-5 select-none font-mono tracking-tighter">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/5">
                            <span className="font-mono text-xl font-bold tracking-widest text-white">NULL</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 max-w-lg relative z-10">
                    <h2 className="text-3xl font-bold tracking-tight">Article Declassified</h2>
                    <p className="text-white/60 leading-relaxed">
                        The integrity of this record has been compromised or it never existed. The archives are incomplete.
                    </p>
                </div>

                <SmartCompass />
            </div>
        );
    }

    return <ArticleDetail article={article} settings={settings} relatedArticles={relatedArticles} />;
}
