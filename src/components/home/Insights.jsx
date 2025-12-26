'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useSound } from '@/lib/context/SoundContext';
import { PiArrowUpRightLight, PiLinkedinLogoFill, PiArticleLight } from 'react-icons/pi';
import { urlFor } from '@/sanity/lib/image';

export default function Insights({ articles = [] }) {
    const { lang } = useLanguage();
    const { playHover, playClick } = useSound();

    const t = {
        ar: {
            heading: "المقالات",
            sub: "أحدث المنشورات",
            readMore: "اقرأ المزيد",
            fallbackDate: "2025-01-01"
        },
        en: {
            heading: "ARTICLES",
            sub: "LATEST_POSTS",
            readMore: "Read Article",
            fallbackDate: "JAN 01, 2025"
        }
    };
    const content = t[lang];

    // Helper for Loc
    const getLoc = (item, field) => {
        if (lang === 'ar') return item[field] || item[`${field}_ar`] || "";
        return item[`${field}_en`] || item[field] || "";
    };

    if (!articles || articles.length === 0) return null;

    return (
        <section className="py-24 border-b border-foreground/5 dark:border-white/5">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                            {content.heading}
                        </h2>
                        <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground border-s-2 border-blue-500 ps-2">
                            // {content.sub}
                        </span>
                    </div>

                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => {
                        const link = article.linkedinUrl || "#";
                        const title = getLoc(article, 'title');
                        const excerpt = getLoc(article, 'excerpt');
                        const date = article.date || content.fallbackDate;

                        return (
                            <motion.a
                                key={article._id || index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={playClick}
                                onMouseEnter={playHover}
                                className="group block h-full min-h-[360px] bg-[#111] dark:bg-white/5 border border-foreground/10 dark:border-white/10 rounded-2xl relative overflow-hidden isolate"
                            >
                                {/* 1. FEATURE IMAGE BACKGROUND */}
                                {article.thumbnail && (
                                    <>
                                        {/* Image */}
                                        <div className="absolute inset-0 z-[-2]">
                                            <img
                                                src={urlFor(article.thumbnail).width(600).height(800).url()}
                                                alt={title}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                            />
                                        </div>
                                        {/* Gradient Overlay for Text Readability */}
                                        <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                    </>
                                )}

                                {/* 2. CONTENT CONTAINER */}
                                <div className="relative z-10 p-8 flex flex-col h-full justify-between">

                                    {/* Top: Date & Badge */}
                                    <div className="flex justify-between items-start mb-auto">
                                        <span className="font-mono text-xs text-white/70 uppercase tracking-widest bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                            {date}
                                        </span>
                                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform ltr:translate-x-4 rtl:-translate-x-4 group-hover:translate-x-0 -translate-y-4 group-hover:translate-y-0">
                                            <PiArrowUpRightLight className="w-5 h-5 text-white rtl:-scale-x-100" />
                                        </div>
                                    </div>

                                    {/* Bottom: Title & CTA */}
                                    <div className="mt-8">
                                        <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-white group-hover:text-blue-400 transition-colors">
                                            {title}
                                        </h3>
                                        <p className="text-sm text-white/70 mb-6 line-clamp-2 leading-relaxed">
                                            {excerpt}
                                        </p>

                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                                            <span>{content.readMore}</span>
                                            <PiArticleLight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
