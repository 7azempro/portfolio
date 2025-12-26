'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useSound } from '@/lib/context/SoundContext';
import { PiArrowUpRightLight, PiArticleLight } from 'react-icons/pi';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

export default function Insights({ articles = [] }) {
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestArticles.map((article, index) => {
                        const title = getLoc(article, 'title');
                        const excerpt = getLoc(article, 'excerpt');
                        const date = new Date(article.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: '2-digit' });

                        return (
                            <motion.div
                                key={article._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <Link
                                    href={`/articles/${article._id}`}
                                    onClick={playClick}
                                    onMouseEnter={playHover}
                                    className="block h-full"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-muted border border-foreground/5 group-hover:border-blue-500/50 transition-colors">
                                        {article.thumbnail ? (
                                            <img
                                                src={urlFor(article.thumbnail).width(600).height(450).url()}
                                                alt={title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-foreground/5 flex items-center justify-center font-mono text-xs text-muted-foreground">
                                                NO_IMG
                                            </div>
                                        )}
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-500" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-wider border-b border-foreground/10 pb-2 mb-2">
                                            <span>{date}</span>
                                            <span className="group-hover:text-blue-500 transition-colors">DIR // READ</span>
                                        </div>

                                        <h3 className={`text-xl font-bold leading-snug group-hover:text-blue-500 transition-colors ${lang === 'ar' ? 'font-brand' : ''}`}>
                                            {title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                            {excerpt}
                                        </p>

                                        <div className="pt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/50 group-hover:text-foreground transition-colors">
                                            <span>{content.readMore}</span>
                                            <PiArrowUpRightLight className={`w-3 h-3 ${lang === 'ar' ? '-scale-x-100' : ''}`} />
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
