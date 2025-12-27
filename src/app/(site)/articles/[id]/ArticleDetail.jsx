'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/context/LanguageContext';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { RiArrowLeftLine, RiLinkedinFill, RiTwitterXFill, RiFileCopyLine, RiCheckLine, RiWhatsappLine, RiTimeLine, RiEyeLine } from 'react-icons/ri';
import { urlFor } from '@/sanity/lib/image';
import { getSafeImage } from '@/lib/constants';
import { estimateReadingTime } from '@/lib/readingTime';
import { useState, useEffect, useMemo, useCallback } from 'react';
import millify from 'millify';

// Portable Text Components (Strict Swiss V2)
const components = {
    block: {
        h1: ({ children }) => <h1 className="text-4xl md:text-6xl font-black mt-20 mb-8 leading-[0.9] tracking-tighter uppercase">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-6 text-foreground flex items-center gap-4 border-l-4 border-blue-500 pl-4">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-10 mb-4 text-foreground/80">{children}</h3>,
        normal: ({ children }) => <p className="mb-6 leading-[1.8] text-lg text-foreground/80 font-normal">{children}</p>,
        blockquote: ({ children }) => (
            <div className="border-l-2 border-blue-500 bg-foreground/5 p-8 my-12 italic text-2xl font-light text-foreground/80 relative overflow-hidden">
                <span className="absolute top-0 right-0 p-2 opacity-10 font-black text-6xl leading-none">&rdquo;</span>
                {children}
            </div>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-square list-outside ml-6 mb-8 space-y-2 marker:text-blue-500 text-foreground/80">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-8 space-y-2 marker:font-mono marker:text-blue-500 text-foreground/80">{children}</ol>,
    },
    marks: {
        code: ({ children }) => <code className="bg-foreground/5 text-blue-500 font-mono px-1.5 py-0.5 mx-1 rounded-sm text-sm border border-foreground/10">{children}</code>,
        link: ({ value, children }) => (
            <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:bg-blue-500/10 transition-colors border-b border-blue-500/30 hover:border-blue-500 pb-0.5">
                {children}
            </a>
        ),
    },
    types: {
        image: ({ value }) => (
            <div className="my-16 relative group">
                {/* Tech Frame */}
                <div className="border border-foreground/10 bg-muted relative overflow-hidden">
                    <img
                        src={urlFor(value).url()}
                        alt={value.alt || 'Article Image'}
                        className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                </div>
                {value.caption && (
                    <div className="flex justify-between items-center mt-2 font-mono text-[9px] text-muted-foreground uppercase tracking-widest border-t border-foreground/10 pt-2">
                        <span className="flex items-center gap-2"><span className="w-1 h-1 bg-blue-500 rounded-full" />FIG_REF :: {value.caption}</span>
                        <span>IMG_00X</span>
                    </div>
                )}
            </div>
        ),
    }
};

export default function ArticleDetail({ article, settings, relatedArticles = [] }) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';
    const [copied, setCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    const [views, setViews] = useState(article.views || 0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);

            const viewedKey = `viewed_${article._id}`;
            if (!sessionStorage.getItem(viewedKey)) {
                fetch('/api/views', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: article._id })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.views) setViews(data.views);
                        sessionStorage.setItem(viewedKey, 'true');
                    })
                    .catch(console.error);
            }
        }
    }, [article._id]);

    const t = useCallback((field, item = article) => {
        if (!item) return '';
        if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`];
        return item[field];
    }, [lang, article]);

    const getOgUrl = useCallback((item) => {
        const titleEn = item.title_en || item.title;
        const imageId = item.thumbnail?.asset?._ref || item.thumbnail?.asset?._id;
        const authorId = settings?.profileImage?.asset?._ref || settings?.profileImage?.asset?._id;
        return `/api/og?title=${encodeURIComponent(titleEn)}&type=ARTICLE&subtitle=READING_ENTRY${imageId ? `&imageId=${imageId}` : ''}${authorId ? `&authorImageId=${authorId}` : ''}`;
    }, [settings]);

    const title = t('title');
    const content = t('content');

    const date = useMemo(() => {
        return article.date ? new Date(article.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    }, [article.date, isAr]);

    const readTime = useMemo(() => estimateReadingTime(content), [content]);

    const staticText = useMemo(() => ({
        back: isAr ? 'السجل' : 'ARCHIVE',
        share: isAr ? 'مشاركة' : 'SHARE',
        readTime: readTime,
        sys: isAr ? 'النظام' : 'SYSTEM',
        views: isAr ? 'مشاهدة' : 'VIEWS'
    }), [isAr, readTime]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(currentUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [currentUrl]);

    return (
        <article className="min-h-screen bg-background text-foreground pt-32 pb-32 relative overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
            {/* V2 Grid Background - Dotted */}
            <div className="absolute inset-0 bg-[radial-gradient(#80808020_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-foreground/10 z-50 flex items-center px-6 md:px-12 justify-between">
                <Link href="/articles" className="inline-flex items-center gap-3 font-mono text-[11px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-blue-500 transition-colors group">
                    <RiArrowLeftLine className={`text-sm ${isAr ? 'rotate-180' : ''}`} />
                    <span>{staticText.back}</span>
                </Link>
                <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
                    <span>{staticText.sys} :: ONLINE</span>
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                {/* HEADING BLOCK (Title + Meta Grid) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 border-b border-foreground/10 pb-16"
                >
                    {/* Tags */}
                    {article.tags && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {article.tags.map((tag, i) => (
                                <span key={i} className="px-2 py-1 border border-foreground/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] text-foreground mb-12 uppercase break-words">
                        {title}
                    </h1>

                    {/* Data Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 border-t border-l border-foreground/10">
                        {/* Cell 1: Author */}
                        <div className="p-6 border-r border-b border-foreground/10 hidden md:flex flex-col gap-2">
                            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">OPERATOR</span>
                            <div className="flex items-center gap-2">
                                {settings?.profileImage && (
                                    <div className="w-5 h-5 rounded-full overflow-hidden border border-foreground/20">
                                        <img src={urlFor(settings.profileImage).width(50).height(50).url()} alt="Author" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <span className="font-bold font-mono text-sm truncate">{settings?.authorName || '7AZEMPRO'}</span>
                            </div>
                        </div>
                        {/* Cell 2: Date */}
                        <div className="p-4 md:p-6 border-r border-b border-foreground/10 flex flex-col gap-2">
                            <span className="font-mono text-[10px] sm:text-[9px] text-muted-foreground uppercase tracking-widest">PUBLISHED</span>
                            <span className="font-bold font-mono text-sm">{date}</span>
                        </div>
                        {/* Cell 3: Read Time */}
                        <div className="p-4 md:p-6 border-r border-b border-foreground/10 flex flex-col gap-2">
                            <span className="font-mono text-[10px] sm:text-[9px] text-muted-foreground uppercase tracking-widest">EST. TIME</span>
                            <div className="flex items-center gap-2 font-bold font-mono text-sm">
                                <RiTimeLine className="text-blue-500" />
                                <span>{readTime}</span>
                            </div>
                        </div>
                        {/* Cell 4: Views */}
                        <div className="p-4 md:p-6 border-r border-b border-foreground/10 flex flex-col gap-2">
                            <span className="font-mono text-[10px] sm:text-[9px] text-muted-foreground uppercase tracking-widest">ENGAGEMENT</span>
                            <div className="flex items-center gap-2 font-bold font-mono text-sm">
                                <RiEyeLine className="text-green-500 animate-pulse" />
                                <span>{millify(views)} {staticText.views}</span>
                            </div>
                        </div>
                        {/* Cell 5: Category */}
                        <div className="p-4 md:p-6 border-r border-b border-foreground/10 flex flex-col gap-2">
                            <span className="font-mono text-[10px] sm:text-[9px] text-muted-foreground uppercase tracking-widest">CATEGORY</span>
                            <span className="font-bold font-mono text-sm uppercase text-blue-500">{article.category || 'SYSTEM'}</span>
                        </div>
                    </div>
                </motion.div>

                {/* VISUAL & CONTENT FLEX */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* LEFT: Control Panel (Sticky) */}
                    <div className="hidden lg:flex lg:col-span-1 flex-col gap-8 sticky top-32 h-fit">
                        <div className="flex flex-col gap-1 items-center">
                            <div className="writing-vertical-lr font-mono text-[9px] text-muted-foreground uppercase tracking-widest opacity-40 mb-4 transform rotate-180">
                                {staticText.share} PROTOCOLS
                            </div>
                            <button onClick={handleCopy} className="w-10 h-10 flex items-center justify-center border border-foreground/10 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all text-muted-foreground rounded-sm" title="Copy">
                                {copied ? <RiCheckLine /> : <RiFileCopyLine />}
                            </button>
                            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${currentUrl}`} target="_blank" className="w-10 h-10 flex items-center justify-center border border-foreground/10 hover:bg-black hover:text-white hover:border-black transition-all text-muted-foreground rounded-sm"><RiTwitterXFill /></a>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`} target="_blank" className="w-10 h-10 flex items-center justify-center border border-foreground/10 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all text-muted-foreground rounded-sm"><RiLinkedinFill /></a>
                            <a href={`https://wa.me/?text=${encodeURIComponent(title + ' ')}&url=${currentUrl}`} target="_blank" className="w-10 h-10 flex items-center justify-center border border-foreground/10 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all text-muted-foreground rounded-sm"><RiWhatsappLine /></a>
                        </div>
                    </div>

                    {/* CENTER: Main Content */}
                    <div className="lg:col-span-10"> {/* Expanded width since sidebar is slim */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="prose prose-lg prose-invert max-w-none prose-p:leading-loose prose-headings:uppercase prose-headings:tracking-tight mb-32"
                        >
                            {/* FEATURED ASSET */}
                            <div className="mb-20 rounded-sm overflow-hidden border border-foreground/10 bg-muted relative group">
                                {(() => {
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
                                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-grayscale duration-700"
                                                />
                                                <div className="absolute top-4 right-4 px-3 py-1 bg-black text-white text-[9px] font-mono tracking-widest uppercase border border-white/20">
                                                    ASSET_ID :: {article._id?.slice(0, 8)}
                                                </div>
                                            </>
                                        );
                                    }
                                    return <div className="aspect-[2/1] bg-secondary flex items-center justify-center font-mono text-xs opacity-50">NO SIGNAL</div>;
                                })()}
                            </div>

                            {content ? <PortableText value={content} components={components} /> : <div className="opacity-50 font-mono text-center py-20">DATA MISSING</div>}
                        </motion.div>

                        {/* AUTHOR RECORD */}
                        <div className="mb-20 pt-12 border-t border-foreground/10">
                            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8 flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                <span>{isAr ? 'عن المؤلف' : 'AUTHOR_RECORD :: 01'}</span>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-start bg-muted/30 border border-foreground/5 p-8 rounded-sm">
                                {/* Author Image */}
                                {settings?.profileImage && (
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-background shadow-lg shrink-0">
                                        <img
                                            src={urlFor(settings.profileImage).width(200).height(200).url()}
                                            alt={settings.authorName || 'Author'}
                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                )}

                                {/* Author Info */}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                                        {settings?.authorName || 'UNKNOWN_AUTHOR'}
                                    </h3>
                                    <div className="font-mono text-xs text-blue-500 uppercase tracking-widest mb-4">
                                        {settings?.authorRole || 'SYSTEM_ARCHITECT'}
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed text-sm mb-6 max-w-xl">
                                        {settings?.seoDescription || (isAr ? 'مهندس برمجيات متخصص في بناء الأنظمة الرقمية المعقدة وحلول الويب عالية الأداء.' : 'Software Engineer specializing in complex digital systems and high-performance architectural solutions.')}
                                    </p>

                                    {/* Signature / ID */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-foreground/5 text-[9px] font-mono uppercase tracking-widest text-muted-foreground rounded-sm">
                                        <span>ID: 7AZEM-PRO-SYS-ADMIN</span>
                                        <RiCheckLine className="text-blue-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RELATED GRID V2 */}
                        <div className="pt-20 border-t border-foreground/10">
                            <div className="flex items-center justify-between mb-12">
                                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-3">
                                    <span className="w-2 h-2 bg-blue-500" />
                                    <span>RELATED DATA</span>
                                </div>
                                <Link href="/articles" className="font-mono text-xs uppercase hover:text-blue-500 transition-colors">VIEW ALL</Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                                {relatedArticles.map((related, i) => (
                                    <Link key={related._id} href={`/articles/${related.slug.current}`} className="group block border border-foreground/10 bg-background hover:bg-muted/50 transition-colors">
                                        <div className="aspect-[1200/630] relative overflow-hidden border-b border-foreground/10 grayscale group-hover:grayscale-0 transition-all">
                                            <img
                                                src={getOgUrl(related)}
                                                alt={t('title', related)}
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Views Badge */}
                                            {related.views > 0 && (
                                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/80 tracking-widest flex items-center gap-1">
                                                    <RiEyeLine className="text-green-500" />
                                                    {millify(related.views)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 md:p-6">
                                            {/* Meta Row */}
                                            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[9px] text-muted-foreground uppercase tracking-widest mb-3">
                                                <span>{new Date(related.date).toLocaleDateString()}</span>
                                                <span className="text-blue-500">{related.category || 'SYSTEM'}</span>
                                            </div>

                                            <h4 className="text-lg font-bold uppercase leading-tight group-hover:text-blue-500 transition-colors mb-4 line-clamp-2">
                                                {t('title', related) || related.title}
                                            </h4>

                                            <div className="font-mono text-[10px] sm:text-[9px] text-muted-foreground uppercase tracking-widest flex items-center justify-between border-t border-foreground/10 pt-3 opacity-60">
                                                <span>REF_0{i + 1}</span>
                                                <span>READ_ENTRY</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block lg:col-span-1 border-l border-foreground/10"></div>
                </div>

                {/* Mobile Share Bar (Bottom) */}
                {/* Mobile Share Bar (Floating Dock) */}
                <div className="lg:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-6 px-8 py-3 bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-full shadow-2xl">
                    <button onClick={handleCopy} className="text-muted-foreground hover:text-blue-500 transition-colors"><RiFileCopyLine className="text-xl" /></button>
                    <div className="w-px h-4 bg-foreground/10" />
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`} target="_blank" className="text-muted-foreground hover:text-black transition-colors"><RiTwitterXFill className="text-xl" /></a>
                    <div className="w-px h-4 bg-foreground/10" />
                    <a href={`https://wa.me/?text=${encodeURIComponent(title + ' ')}`} target="_blank" className="text-muted-foreground hover:text-green-500 transition-colors"><RiWhatsappLine className="text-xl" /></a>
                </div>

            </div>
        </article>
    );
}
