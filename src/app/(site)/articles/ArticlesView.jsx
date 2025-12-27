'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { RiTimeLine, RiArrowRightUpLine, RiHashtag } from 'react-icons/ri';
import { PiArrowDownLight } from 'react-icons/pi';
import { useLanguage } from '@/lib/context/LanguageContext';

import { urlFor } from '@/sanity/lib/image';

import { estimateReadingTime } from '@/lib/readingTime';

export default function ArticlesView({ articles, settings }) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    const featuredArticle = articles[0];
    const standardArticles = articles.slice(1);

    // Helper for bilingual fields
    const t = (article, field) => {
        if (!article) return '';
        if (lang === 'en' && article[`${field}_en`]) return article[`${field}_en`];
        return article[field];
    };

    // Calc Read Time Helper
    const getReadTime = (article) => {
        const content = t(article, 'content');
        return estimateReadingTime(content);
    };

    const staticText = {
        sysIndex: isAr ? 'نظام_الفهرس :: قاعدة_بيانات_المقالات' : 'SYS_INDEX :: KNOWLEDGE_LOGS',
        title: isAr ? 'المقالات.' : 'ARCHIVE.',
        subtitle: isAr ? 'أرشيف الأفكار في هندسة النظم الرقمية.' : 'SYSTEM ARCHITECTURE & DESIGN PATTERNS.',
        readArticle: isAr ? 'قراءة المقال' : 'ACCESS_LOG',
        noData: isAr ? 'لا توجد بيانات' : 'NO_DATA_AVAILABLE',
        records: isAr ? 'سجل' : 'ENTRIES FOUND',
    };

    // OG Helper
    const getOgUrl = (article) => {
        // PRIORITY 1: Stored Static Asset
        if (article.thumbnail?.asset) {
            try {
                return urlFor(article.thumbnail).width(1200).height(630).url();
            } catch (e) { console.error("URL Builder Error", e); }
        }

        // PRIORITY 2: Dynamic Fallback -> DISABLED PER USER REQUEST
        // Return null or a local placeholder if needed.
        return null;
    };

    return (
        <section className="relative min-h-screen bg-background text-foreground pt-32 pb-20 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
            {/* Swiss Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-end justify-between border-b border-foreground/10 pb-12 mb-20 gap-8">
                    <div className="flex flex-col items-start gap-4">
                        <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            {staticText.sysIndex}
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.8] uppercase opacity-90">
                            {staticText.title}
                        </h1>
                    </div>
                </div>

                {/* FEATURED: The "Schematic" Card */}
                {featuredArticle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-24 relative group"
                    >
                        <Link href={`/articles/${featuredArticle._id}`} className="block border border-foreground/10 bg-background hover:border-blue-500/50 transition-colors relative overflow-hidden">
                            <div className="grid lg:grid-cols-12">
                                {/* Visual */}
                                <div className="lg:col-span-8 relative aspect-[1200/630] md:aspect-auto md:h-full lg:min-h-[500px] border-b lg:border-b-0 lg:border-r border-foreground/10 bg-muted overflow-hidden">
                                    {/* Tech Overlay */}
                                    <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80 tracking-widest uppercase">
                                        FEATURED_ENTRY
                                    </div>
                                    <img
                                        src={getOgUrl(featuredArticle)}
                                        alt={t(featuredArticle, 'title')}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                                </div>

                                {/* Meta */}
                                <div className="lg:col-span-4 p-8 lg:p-12 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 text-xs font-mono text-blue-500 mb-6 uppercase tracking-widest">
                                            <span className="w-2 h-2 bg-blue-500 animate-pulse" />
                                            {new Date(featuredArticle.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-black leading-tight uppercase mb-6 group-hover:text-blue-500 transition-colors">
                                            {t(featuredArticle, 'title')}
                                        </h2>
                                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-4">
                                            {t(featuredArticle, 'excerpt')}
                                        </p>
                                    </div>
                                    <div className="pt-8 border-t border-foreground/10 flex items-center justify-between text-xs font-bold uppercase tracking-widest mt-8">
                                        <span>{staticText.readArticle}</span>
                                        <RiArrowRightUpLine className={`text-lg transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 ${isAr ? '-scale-x-100' : ''}`} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* GRID: The "Data" List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {standardArticles.map((article, i) => (
                        <motion.div
                            key={article._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="group border border-foreground/10 bg-background hover:border-blue-500/50 transition-colors relative flex flex-col h-full"
                        >
                            <Link href={`/articles/${article._id}`} className="flex flex-col h-full">
                                {/* Visual */}
                                <div className="relative aspect-[1200/630] overflow-hidden border-b border-foreground/10 bg-muted">
                                    <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80 tracking-widest uppercase">
                                        LOG :: 0{i + 2}
                                    </div>
                                    <img
                                        src={getOgUrl(article)}
                                        alt={t(article, 'title')}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                                    {/* Corner Accents */}
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-l border-t border-foreground/20 bg-background z-10" />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1 gap-4">
                                    <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-widest opacity-60">
                                        <span>{new Date(article.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}</span>
                                        <span>{getReadTime(article)}</span>
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <h3 className="text-xl font-bold leading-tight group-hover:text-blue-500 transition-colors uppercase">
                                            {t(article, 'title')}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed opacity-80">
                                            {t(article, 'excerpt')}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-auto border-t border-foreground/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest group-hover:text-blue-500 transition-colors">
                                        <span>{staticText.readArticle}</span>
                                        <PiArrowDownLight className={`w-4 h-4 -rotate-90 transform transition-transform group-hover:translate-x-1 ${isAr ? 'rotate-90' : ''}`} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Status Bar for this page */}
                <div className="mt-20 pt-8 border-t border-foreground/10 flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    <span>STATUS :: SYSTEM_ONLINE</span>
                    <span>{articles.length} {staticText.records}</span>
                </div>
            </div>
        </section>
    );
}
