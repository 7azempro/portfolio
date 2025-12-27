'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/context/LanguageContext';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { RiArrowLeftLine, RiLinkedinFill, RiTwitterXFill, RiFileCopyLine, RiCheckLine, RiWhatsappLine, RiFacebookCircleLine } from 'react-icons/ri';
import { urlFor } from '@/sanity/lib/image';
import { estimateReadingTime } from '@/lib/readingTime';
import { useState } from 'react';

export default function ArticleDetail({ article, settings, relatedArticles = [] }) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';
    const [copied, setCopied] = useState(false);

    // Bilingual Data Helper
    const t = (field, item = article) => {
        if (!item) return '';
        if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`];
        return item[field];
    };

    // Helper for OG Url (reuse for related)
    const getOgUrl = (item) => {
        const titleEn = item.title_en || item.title;
        const imageId = item.thumbnail?.asset?._ref || item.thumbnail?.asset?._id;
        const authorId = settings?.profileImage?.asset?._ref || settings?.profileImage?.asset?._id;
        return `/api/og?title=${encodeURIComponent(titleEn)}&type=ARTICLE&subtitle=READING_ENTRY${imageId ? `&imageId=${imageId}` : ''}${authorId ? `&authorImageId=${authorId}` : ''}`;
    };

    const title = t('title');
    const content = t('content');
    const date = new Date(article.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const readTime = estimateReadingTime(content);

    const staticText = {
        back: isAr ? 'فهرس_المقالات' : 'INDEX :: ARTICLES',
        share: isAr ? 'مشاركة' : 'SHARE_ENTRY',
        readTime: readTime,
        sys: isAr ? 'عرض_المقال :: نظام_المعرفة' : 'VIEW_ENTRY :: KNOWLEDGE_SYS',
        copy: isAr ? 'نسخ' : 'COPY_LINK',
        copied: isAr ? 'تم النسخ' : 'LINK_COPIED'
    };

    const handleCopy = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // Portable Text Components (Strict Swiss)
    const components = {
        block: {
            h1: ({ children }) => <h1 className="text-3xl md:text-5xl font-black mt-16 mb-8 leading-none tracking-tighter uppercase">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-4"><span className="w-4 h-1 bg-blue-500" />{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 border-l-4 border-foreground/20 pl-4">{children}</h3>,
            normal: ({ children }) => <p className="mb-6 leading-loose text-lg text-foreground/80 font-normal">{children}</p>,
            blockquote: ({ children }) => (
                <div className="border-l-2 border-blue-500 pl-6 py-4 my-10 italic text-2xl font-light text-foreground/70 bg-foreground/5 dark:bg-white/5">
                    &quot;{children}&quot;
                </div>
            ),
        },
        list: {
            bullet: ({ children }) => <ul className="list-square list-outside ml-6 mb-8 space-y-3 marker:text-blue-500">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-8 space-y-3 marker:font-mono marker:text-blue-500">{children}</ol>,
        },
        marks: {
            code: ({ children }) => <code className="bg-blue-500/10 text-blue-500 font-mono px-2 py-1 mx-1 rounded-sm text-sm border border-blue-500/20">{children}</code>,
            link: ({ value, children }) => (
                <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 border-b border-blue-500/30 hover:border-blue-500 transition-colors pb-0.5">
                    {children}
                </a>
            ),
        },
        types: {
            image: ({ value }) => (
                <div className="my-16 relative">
                    {/* Frame */}
                    <div className="absolute -inset-2 border border-foreground/10 z-0" />
                    <div className="absolute -inset-2 border-l border-t border-foreground opacity-20 w-4 h-4 z-0" />
                    <div className="absolute -bottom-2 -right-2 border-r border-b border-foreground opacity-20 w-4 h-4 z-0" />

                    <div className="relative z-10 bg-muted overflow-hidden">
                        <img
                            src={urlFor(value).url()}
                            alt={value.alt || 'Article Image'}
                            className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    {value.caption && (
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-foreground/10 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                            <span>FIG_REF :: {value.caption}</span>
                            <span>IMG_00X</span>
                        </div>
                    )}
                </div>
            ),
        }
    };

    return (
        <article className="min-h-screen bg-background text-foreground pt-32 pb-32 relative overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
            {/* Swiss Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-md border-b border-foreground/10 z-50 flex items-center px-6 md:px-12 justify-between">
                <Link href="/articles" className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-blue-500 transition-colors group">
                    <RiArrowLeftLine className={`text-lg ${isAr ? 'rotate-180' : ''}`} />
                    <span>{staticText.back}</span>
                </Link>
                <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
                    <span className="w-2 h-2 bg-blue-500 animate-pulse rounded-full" />
                    {staticText.sys}
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">

                {/* Header Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-10"
                >
                    {/* Industrial Meta Bar */}
                    <div className="flex flex-wrap items-center gap-6 mb-8 font-mono text-xs text-blue-500 uppercase tracking-widest border-b border-foreground/10 pb-6">
                        {/* Author Badge */}
                        {settings?.profileImage && (
                            <div className="flex items-center gap-3 pr-6 border-r border-foreground/10 mr-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-foreground/10">
                                    <img
                                        src={urlFor(settings.profileImage).width(100).height(100).url()}
                                        alt="Author"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="hidden sm:inline-block">EDITOR // 7AZEMPRO</span>
                            </div>
                        )}

                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500" />
                            {article.category || 'GENERAL'}
                        </span>
                        <span className="text-foreground/20">/</span>
                        <span>{date}</span>
                        <span className="text-foreground/20">/</span>
                        <span>{staticText.readTime}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-foreground mb-12 uppercase">
                        {title}
                    </h1>

                    {/* Tags Row */}
                    {article.tags && (
                        <div className="flex flex-wrap gap-3">
                            {article.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 border border-foreground/20 text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:bg-foreground hover:text-background transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Main Content Layout */}
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Sidebar (Share & TOC if needed) - Sticky */}
                    <div className="hidden lg:flex lg:col-span-2 flex-col gap-12 sticky top-32 h-fit">
                        <div className="flex flex-col gap-4 border-l border-foreground/10 pl-6">
                            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2 opacity-50">
                                {staticText.share}
                            </div>

                            {/* Share Buttons (Tech Boxes) */}
                            <button onClick={handleCopy} className="w-full aspect-[3/2] flex items-center justify-center border border-foreground/10 hover:border-blue-500 hover:text-blue-500 text-muted-foreground transition-all group relative" title="Copy Link">
                                {copied ? <RiCheckLine className="text-2xl" /> : <RiFileCopyLine className="text-2xl" />}
                                {copied && <span className="absolute left-full ml-4 bg-blue-500 text-white text-[10px] px-2 py-1 font-mono whitespace-nowrap tracking-widest">COPIED</span>}
                            </button>

                            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank" rel="noopener noreferrer" className="w-full aspect-[3/2] flex items-center justify-center border border-foreground/10 hover:bg-foreground hover:text-background text-muted-foreground transition-all" title="Twitter / X">
                                <RiTwitterXFill className="text-2xl" />
                            </a>

                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank" rel="noopener noreferrer" className="w-full aspect-[3/2] flex items-center justify-center border border-foreground/10 hover:border-[#0077b5] hover:text-[#0077b5] text-muted-foreground transition-all" title="LinkedIn">
                                <RiLinkedinFill className="text-2xl" />
                            </a>

                            <a href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`} target="_blank" rel="noopener noreferrer" className="w-full aspect-[3/2] flex items-center justify-center border border-foreground/10 hover:border-[#25D366] hover:text-[#25D366] text-muted-foreground transition-all" title="WhatsApp">
                                <RiWhatsappLine className="text-2xl" />
                            </a>

                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank" rel="noopener noreferrer" className="w-full aspect-[3/2] flex items-center justify-center border border-foreground/10 hover:border-[#1877F2] hover:text-[#1877F2] text-muted-foreground transition-all" title="Facebook">
                                <RiFacebookCircleLine className="text-2xl" />
                            </a>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-p:leading-loose prose-p:text-foreground/80 prose-li:text-foreground/80 mb-32"
                        >
                            {/* Featured Image (Schematic OG Cover) */}
                            <div className="mb-20 relative rounded-xl overflow-hidden shadow-2xl shadow-blue-900/10 aspect-[1200/630] group bg-muted border border-foreground/10">
                                {(() => {
                                    // PRIORITY 1: Stored Static Asset ONLY
                                    let displayUrl;
                                    try {
                                        if (article.thumbnail?.asset) {
                                            displayUrl = urlFor(article.thumbnail).width(1200).height(630).url();
                                        }
                                    } catch (e) { console.error(e); }

                                    if (displayUrl) {
                                        return (
                                            <>
                                                <img
                                                    src={displayUrl}
                                                    alt={title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                {/* Overlay Grid */}
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none mix-blend-overlay" />

                                                {/* Gradient Fade */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

                                                {/* Technical Markers */}
                                                <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-background/50 backdrop-blur-md border border-foreground/10 text-[10px] font-mono text-foreground/80 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                                    FIG_MAIN :: STORED_ASSET
                                                </div>
                                            </>
                                        );
                                    }

                                    // FALLBACK: Static Placeholder (No signal)
                                    return (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 text-foreground/20 font-mono tracking-widest uppercase">
                                            <div className="text-6xl mb-4 font-black opacity-10">404</div>
                                            <div className="text-xs">SIGNAL_LOST :: NO_VISUAL_DATA</div>
                                            <div className="mt-4 text-[10px] bg-foreground/10 px-2 py-1 rounded">Generate in Studio</div>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* Article Text */}
                            {content ? (
                                <PortableText value={content} components={components} />
                            ) : (
                                <div className="p-12 border border-dashed border-foreground/20 text-center font-mono text-muted-foreground bg-foreground/5 uppercase tracking-widest">
                                    {isAr ? 'لا يوجد محتوى' : 'NO_CONTENT_AVAILABLE'}
                                </div>
                            )}
                        </motion.div>

                        {/* RELATED ARTICLES SECTION */}
                        <div className="pt-20 border-t border-foreground/10">
                            <div className="flex items-center gap-3 mb-12 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                <span>{isAr ? 'مقالات ذات صلة' : 'SYSTEM_RECOMMENDATIONS'}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                                {relatedArticles.map((related, i) => (
                                    <Link key={related._id} href={`/articles/${related.slug.current}`} className="group block border border-foreground/10 bg-background hover:border-blue-500/50 transition-colors">
                                        <div className="aspect-[1200/630] relative overflow-hidden border-b border-foreground/10 bg-muted">
                                            <img
                                                src={getOgUrl(related)}
                                                alt={t('title', related) || related.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-lg font-bold uppercase leading-tight group-hover:text-blue-500 transition-colors mb-2">
                                                {t('title', related) || related.title}
                                            </h4>
                                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                                READ_ENTRY :: 0{i + 1}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* RETURN BUTTON */}
                            <Link href="/articles" className="inline-flex w-full md:w-auto h-16 px-12 items-center justify-center gap-4 bg-foreground text-background font-mono text-sm font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all group">
                                <RiArrowLeftLine className={`text-lg transition-transform group-hover:-translate-x-1 ${isAr ? 'rotate-180 group-hover:translate-x-1 group-hover:-translate-x-0' : ''}`} />
                                <span>{isAr ? 'العودة إلى الفهرس' : 'RETURN TO ARCHIVE'}</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Share (Bottom Fixed) */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 border-t border-foreground/10 bg-background/90 backdrop-blur-md z-40 flex justify-between items-center">
                    <span className="font-mono text-xs uppercase tracking-widest">{staticText.share}</span>
                    <div className="flex gap-4">
                        <button onClick={handleCopy} className="p-2 border border-foreground/10 rounded-full"><RiFileCopyLine /></button>
                        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`} target="_blank" className="p-2 border border-foreground/10 rounded-full"><RiTwitterXFill /></a>
                    </div>
                </div>

            </div>
        </article>
    );
}
