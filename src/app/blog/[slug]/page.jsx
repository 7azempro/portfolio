import React from 'react';
import { getLocalData } from '../../../lib/data.server';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const articles = await getLocalData('articles');
    const post = articles.find(p => p.slug === slug);
    return {
        title: post ? `${post.title} | Hazem Gamal` : 'Article Not Found',
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const articles = await getLocalData('articles');
    const post = articles.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-4xl text-white/50">Article not found</h1>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-[var(--bg-color)]">
            {/* Simple Header */}
            <div className="pt-32 px-[5vw] pb-12 max-w-4xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8">
                    <ArrowLeft size={20} />
                    Back to Writing
                </Link>

                <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight mb-6">
                    {post.title}
                </h1>

                <div className="flex gap-6 text-white/40 text-sm">
                    <span className="flex items-center gap-2">
                        <Calendar size={16} /> {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock size={16} /> {post.readTime}
                    </span>
                </div>
            </div>

            {/* Featured Image */}
            <div className="w-full h-[50vh] bg-gray-800 relative overflow-hidden mb-20">
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover opacity-80" />
            </div>

            {/* Content */}
            <div className="px-[5vw] pb-40 max-w-3xl mx-auto prose prose-invert prose-lg">
                <p className="text-xl leading-relaxed text-white/80">
                    {post.content}
                </p>
                {/* In V3: Introduce actual MDX renderer here */}
            </div>
        </article>
    );
}
