'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useSound } from '@/lib/context/SoundContext';
import { PiArrowUpRightLight, PiArticleLight } from 'react-icons/pi';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

export default function Insights({ articles = [], settings }) {
    const { lang } = useLanguage();
    const { playHover, playClick } = useSound();

    const t = {
        ar: {
            heading: "أفكار",
            sub: "المقالات_الأخيرة",
            readMore: "قراءة",
            sys: "سجل :: المقالات"
        },
        en: {
            heading: "INSIGHTS",
            sub: "LATEST_ENTRIES",
            readMore: "READ",
            sys: "LOG :: ARTICLES"
        }
    };
    const content = t[lang];

    // Helper for Loc
    const getLoc = (item, field) => {
        if (!item) return '';
        if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`];
        return item[field];
    };

    if (!articles || articles.length === 0) return null;

    // Show only latest 3
    const latestArticles = articles.slice(0, 3);

    return (
        <section className="py-32 border-b border-foreground/5 dark:border-white/5 relative overflow-hidden bg-background">
            {/* Swiss Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="flex items-end justify-between mb-20 border-b border-foreground/10 pb-8">
                    <div>
                        <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2 mb-4">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-none animate-pulse" />
                            {content.sys}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">
                            {content.heading}
                        </h2>
                    </div>

                    <Link href="/articles" className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-blue-500 transition-colors group">
                        <span>{lang === 'ar' ? 'عرض الكل' : 'VIEW_INDEX'}</span>
                        <PiArrowUpRightLight className={`w-4 h-4 ${lang === 'ar' ? '-scale-x-100' : ''}`} />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestArticles.map((article, index) => {
                        const title = getLoc(article, 'title');
                        const excerpt = getLoc(article, 'excerpt');
                        const date = new Date(article.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: '2-digit' });
                        const category = article.category || 'SYSTEM';

                        // PRIORITY 1: Stored Static Asset ONLY
                        let ogUrl = null;
                        if (article.thumbnail?.asset) {
                            try {
                                ogUrl = urlFor(article.thumbnail).width(1200).height(630).url();
                            } catch (e) {
                                console.error("URL Builder Error", e);
                            }
                        }

                        return (
                            <motion.div
                                key={article._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group border border-foreground/10 bg-background hover:border-blue-500/50 transition-colors relative flex flex-col h-full"
                            >
                                <Link
                                    href={`/articles/${article._id}`}
                                    onClick={playClick}
                                    onMouseEnter={playHover}
                                    className="flex flex-col h-full"
                                >
                                    {/* Image Section (Technical Window) */}
                                    <div className="relative aspect-[1200/630] overflow-hidden border-b border-foreground/10 bg-muted">
                                        {/* Status Marker */}
                                        <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80 tracking-widest uppercase">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                            {category}
                                        </div>

                                        <div className="relative w-full h-full">
                                            {ogUrl ? (
                                                <>
                                                    <img
                                                        src={ogUrl}
                                                        alt={title}
                                                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                                    />
                                                    <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                                                </>
                                            ) : (
                                                // FALLBACK: Static Placeholder
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 text-foreground/20 font-mono tracking-widest uppercase">
                                                    <div className="text-4xl mb-2 font-black opacity-10">404</div>
                                                    <div className="text-[10px]">NO_VISUAL_DATA</div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Corner Accents */}
                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-l border-t border-foreground/20 bg-background z-10" />
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6 flex flex-col flex-1 gap-4">
                                        {/* Meta Header */}
                                        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-widest opacity-60">
                                            <span>{date}</span>
                                            <span>LOG :: 0{index + 1}</span>
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 space-y-3">
                                            <h3 className={`text-xl font-bold leading-tight group-hover:text-blue-500 transition-colors uppercase ${lang === 'ar' ? 'font-brand' : ''}`}>
                                                {title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed opacity-80">
                                                {excerpt}
                                            </p>
                                        </div>

                                        {/* Action Footer */}
                                        <div className="pt-4 mt-auto border-t border-foreground/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest group-hover:text-blue-500 transition-colors">
                                            <span>{content.readMore}</span>
                                            <PiArrowUpRightLight className={`w-4 h-4 transform transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 ${lang === 'ar' ? '-scale-x-100' : ''}`} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
