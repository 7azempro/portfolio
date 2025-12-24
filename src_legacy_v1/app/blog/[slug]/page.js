import { getArticleData, getSortedArticlesData } from '@/lib/articles';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Generate static params for all articles
export async function generateStaticParams() {
    const articles = getSortedArticlesData();
    return articles.map((article) => ({
        slug: article.id,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const { data } = getArticleData(slug);
    return {
        title: `${data.title} | Hazem Gamal`,
        description: data.excerpt,
    };
}

export default async function Article({ params }) {
    const { slug } = await params;
    const { content, data } = getArticleData(slug);

    return (
        <article style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '150px 5vw 60px'
        }}>
            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '40px' }}>
                <ArrowLeft size={16} /> Back to Articles
            </Link>

            <header style={{ marginBottom: '60px' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '24px' }}>{data.title}</h1>
                <div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)', fontSize: '1rem' }}>
                    <time>{data.date}</time>
                    <span>•</span>
                    <span>{data.tags?.join(', ')}</span>
                </div>
            </header>

            <div className="prose" style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-color)' }}>
                <MDXRemote source={content} />
            </div>
        </article>
    );
}
