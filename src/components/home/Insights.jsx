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
            heading: "أفكار ورؤى",
            sub: "مقتطفات من لينكد إن",
            readMore: "اقرأ على LinkedIn",
            fallbackDate: "2025-01-01"
        },
        en: {
            heading: "INSIGHTS",
            sub: "THOUGHTS_ON_SYSTEMS",
            readMore: "Read on LinkedIn",
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
                        <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground border-l-2 border-blue-500 pl-2">
                            // {content.sub}
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <PiLinkedinLogoFill className="w-12 h-12 text-blue-600" />
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
                                className="group block bg-foreground/5 dark:bg-white/5 border border-foreground/10 p-8 rounded-2xl hover:bg-foreground hover:text-background transition-colors duration-500 relative overflow-hidden"
                            >
                                {/* Date Badge */}
                                <div className="flex justify-between items-start mb-6">
                                    <span className="font-mono text-xs opacity-60 uppercase tracking-widest">
                                        {date}
                                    </span>
                                    <PiArrowUpRightLight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                {/* Thumbnail */}
                                {article.thumbnail && (
                                    <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
                                        <img
                                            src={urlFor(article.thumbnail).width(600).height(400).url()}
                                            alt={title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-4 line-clamp-2 leading-tight group-hover:text-background transition-colors">
                                    {title}
                                </h3>
                                <p className="text-sm opacity-70 mb-8 line-clamp-3 leading-relaxed">
                                    {excerpt}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100">
                                    <span>{content.readMore}</span>
                                    <PiArticleLight className="w-4 h-4" />
                                </div>

                                {/* Background Decoration */}
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-background/10 transition-colors" />
                            </motion.a>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
