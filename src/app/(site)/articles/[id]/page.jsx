import { getLocalData } from "@/lib/data.server";
import ArticleDetail from "./ArticleDetail";
import { client } from "@/sanity/lib/client";
import { urlFor } from '@/sanity/lib/image';

// Revalidate every 60 seconds
export const revalidate = 60;



export async function generateMetadata({ params }) {
    const { id } = await params;
    const query = `{
        "article": *[_type == "article" && _id == $id][0] { ..., thumbnail { asset-> } },
        "settings": *[_type == "settings"][0] { siteTitle, profileImage { asset-> } }
    }`;
    const { article, settings } = await client.fetch(query, { id });

    if (!article) return {};

    const imageUrl = article.thumbnail ? urlFor(article.thumbnail).width(1200).height(630).url() : null;

    return {
        title: article.title_en || article.title,
        description: article.excerpt_en || article.excerpt,
        openGraph: {
            title: article.title_en || article.title,
            description: article.excerpt_en || article.excerpt,
            images: [
                {
                    url: `/api/og?title=${encodeURIComponent(article.title_en || article.title)}&type=ARTICLE&subtitle=${encodeURIComponent('READING_ENTRY')}${article.thumbnail?.asset?._ref ? `&imageId=${article.thumbnail.asset._ref}` : ''}${settings?.profileImage?.asset?._ref ? `&authorImageId=${settings.profileImage.asset._ref}` : ''}`,
                    width: 1200,
                    height: 630,
                },
            ]
        }
    };
}

export default async function ArticlePage({ params }) {
    const { id } = await params;

    // Fetch specific article by ID + Global Settings + Related Articles
    const query = `{
        "article": *[_type == "article" && _id == $id][0] { ..., thumbnail { asset-> } },
        "settings": *[_type == "settings"][0] { siteTitle, profileImage { asset-> } },
        "relatedArticles": *[_type == "article" && _id != $id] | order(date desc)[0...3] { ..., thumbnail { asset-> } }
    }`;
    const { article, settings, relatedArticles } = await client.fetch(query, { id });

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center font-mono text-red-500">
                ERROR 404 :: ARTICLE_NOT_FOUND
            </div>
        );
    }

    return <ArticleDetail article={article} settings={settings} relatedArticles={relatedArticles} />;
}
