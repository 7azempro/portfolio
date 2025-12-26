'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { RiTimeLine, RiArrowRightUpLine, RiHashtag } from 'react-icons/ri';
import { PiArrowDownLight } from 'react-icons/pi';
import { useLanguage } from '@/lib/context/LanguageContext';

import { estimateReadingTime } from '@/lib/readingTime';

export default function ArticlesView({ articles }) {
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
        sysIndex: isAr ? 'نظام_الفهرس :: قاعدة_بيانات_المقالات' : 'SYS_INDEX :: ARTICLES_DB',
        title: isAr ? 'المقالات.' : 'ARTICLES.',
        subtitle: isAr ? 'أرشيف الأفكار في هندسة النظم الرقمية، تجارب التصميم، وفلسفة بناء البرمجيات.' : 'Archive of thoughts on digital systems engineering, design experiments, and software philosophy.',
        readArticle: isAr ? 'قراءة المقال' : 'READ ENTRY',
        noData: isAr ? 'لا توجد بيانات // قاعدة البيانات فارغة' : 'NO_DATA_AVAILABLE // DATABASE_EMPTY',
        records: isAr ? 'سجل' : 'RECORDS FOUND',
        loaded: isAr ? 'تم تحميل الفهرس' : 'INDEX_LOADED'
    };

    return (
        <section className="relative min-h-screen bg-background text-foreground pt-32 pb-20 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
            {/* Swiss Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top Status Bar */}
            <div className="fixed top-20 left-0 w-full h-px bg-foreground/5 z-40 hidden lg:block" />
            <div className={`fixed top-1/2 -translate-y-1/2 w-px h-64 bg-foreground/5 z-40 hidden lg:block ${isAr ? 'right-6' : 'left-6'}`} />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-end justify-between border-b border-foreground/10 pb-12 mb-20 gap-8">
                    <div className="flex flex-col items-start gap-4">
                        <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            {staticText.sysIndex}
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.8]">
                            {staticText.title}
                        </h1>
                    </div>
                    <div className={`text-right ${isAr ? 'lg:text-left' : 'lg:text-right'} max-w-md`}>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                            {staticText.subtitle}
                        </p>
                    </div>
                </div>

                {/* FEATURED: The "Schematic" Card */}
                {featuredArticle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-32 relative group"
                    >
                        <Link href={`/articles/${featuredArticle._id}`} className="block">
                            {/* Frame */}
                            <div className="absolute -inset-4 border border-foreground/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="grid lg:grid-cols-12 gap-12 items-center">
                                {/* Visual */}
                                <div className="lg:col-span-8 relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
                                    {/* Tech Overlay */}
                                    <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="flex justify-between w-full">
                                            <span className="font-mono text-[10px] text-white/70">IMG_SEQ_001</span>
                                            <RiArrowRightUpLine className={`text-white text-2xl ${isAr ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>

                                    {featuredArticle.thumbnail ? (
                                        <Image
                                            src={featuredArticle.thumbnail}
                                            alt={t(featuredArticle, 'title')}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <img
                                            src={`/api/og?title=${encodeURIComponent(t(featuredArticle, 'title'))}&type=Article`}
                                            alt="Cover"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                {/* Meta */}
                                <div className={`lg:col-span-4 flex flex-col ${isAr ? 'items-start text-right' : 'items-end text-right lg:text-right'} gap-6`}>
                                    <div className="flex items-center gap-3">
                                        {featuredArticle.category && (
                                            <span className="px-3 py-1 bg-foreground/5 border border-foreground/10 text-[10px] font-mono uppercase tracking-wider rounded-md">
                                                {featuredArticle.category}
                                            </span>
                                        )}
                                        <span className="font-mono text-[10px] text-muted-foreground">
                                            {new Date(featuredArticle.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                        </span>
                                    </div>

                                    <h2 className="text-3xl md:text-5xl font-bold leading-tight hover:text-blue-500 transition-colors">
                                        {t(featuredArticle, 'title')}
                                    </h2>

                                    <p className={`text-muted-foreground leading-relaxed ${isAr ? 'pl-8' : 'pr-8'}`}>
                                        {t(featuredArticle, 'excerpt')}
                                    </p>

                                    <div className="pt-8 border-t border-foreground/10 w-full flex justify-end">
                                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all">
                                            {staticText.readArticle} <RiArrowRightUpLine className={isAr ? 'rotate-180' : ''} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* GRID: The "Data" List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                    {standardArticles.map((article, i) => (
                        <motion.div
                            key={article._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="h-full"
                        >
                            <Link href={`/articles/${article._id}`} className="group relative block h-full bg-foreground/5 border border-foreground/10 hover:border-blue-500/50 transition-colors rounded-none overflow-hidden">
                                {/* Corner Markers */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground/20 group-hover:border-blue-500 transition-colors z-20" />
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-foreground/20 group-hover:border-blue-500 transition-colors z-20" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-foreground/20 group-hover:border-blue-500 transition-colors z-20" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-foreground/20 group-hover:border-blue-500 transition-colors z-20" />

                                {/* Image Section with Tech Overlay */}
                                <div className="relative aspect-[3/2] overflow-hidden bg-muted border-b border-foreground/10">
                                    <div className="absolute inset-0 z-10 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-500 mix-blend-overlay" />
                                    {/* Scan Line */}
                                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-[linear-gradient(transparent_0%,rgba(59,130,246,0.1)_50%,transparent_100%)] bg-[length:100%_200%] animate-scan pointer-events-none" />

                                    {article.thumbnail ? (
                                        <Image
                                            src={article.thumbnail}
                                            alt={t(article, 'title')}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    ) : (
                                        <img
                                            src={`/api/og?title=${encodeURIComponent(t(article, 'title'))}&type=Article`}
                                            alt="Cover"
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    )}
                                </div>

                                {/* Content Body */}
                                <div className={`p-6 flex flex-col justify-between h-[calc(100%-aspect-[3/2])]`}>
                                    <div className={`flex flex-col ${isAr ? 'items-start text-right' : 'items-start text-left'}`}>

                                        {/* Metadata Row */}
                                        <div className="flex items-center gap-3 text-[10px] text-blue-500/80 mb-4 font-mono uppercase tracking-widest w-full border-b border-foreground/5 pb-3">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-sm" />
                                            <time>{new Date(article.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}</time>
                                            <span className="opacity-30">/</span>
                                            <span>{getReadTime(article)}</span>
                                        </div>

                                        {/* Title & Excerpt */}
                                        <h3 className={`text-xl font-bold leading-tight mb-3 group-hover:text-blue-500 transition-colors line-clamp-2`}>
                                            {t(article, 'title')}
                                        </h3>
                                        <p className={`text-sm text-muted-foreground line-clamp-3 leading-relaxed opacity-80`}>
                                            {t(article, 'excerpt')}
                                        </p>
                                    </div>

                                    {/* Action Footer */}
                                    <div className={`mt-6 pt-4 border-t border-foreground/5 w-full flex ${isAr ? 'justify-end' : 'justify-end'}`}>
                                        <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 group-hover:text-foreground transition-all">
                                            <span>{staticText.readArticle}</span>
                                            <RiArrowRightUpLine className={`text-lg ${isAr ? 'rotate-180' : ''}`} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {articles.length === 0 && (
                    <div className="py-20 text-center border-y border-foreground/10">
                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            {staticText.noData}
                        </p>
                    </div>
                )}
            </div>

            {/* Footer Status Bar for this page */}
            <div className="absolute bottom-0 left-0 right-0 h-12 border-t border-foreground/5 flex items-center justify-between px-6 font-mono text-[10px] text-muted-foreground uppercase">
                <span>{staticText.loaded}</span>
                <span>{articles.length} {staticText.records}</span>
            </div>
        </section>
    );
}
