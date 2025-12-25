'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useSound } from '@/lib/context/SoundContext';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const DashboardWidget = dynamic(() => import('./DashboardWidget'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-white/5 animate-pulse rounded-2xl" />
});
import { PiArrowDownLight } from 'react-icons/pi';

export default function Hero({ data }) {
    const { lang } = useLanguage();
    const { playHover, playClick } = useSound();

    // Defer widget load to prioritize LCP
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100); // 100ms delay to let LCP paint
        return () => clearTimeout(timer);
    }, []);

    // Parallax logic
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Content Dictionary
    const hasArabic = (text) => /[\u0600-\u06FF]/.test(text || "");

    const content = {
        ar: {
            status: data?.availability || "الحالة: متاح للمشاريع",
            title: (data?.title && hasArabic(data.title)) ? data.title : "مهندس\nالنظم\nالرقمية.",
            subtitle: (data?.subtitle && hasArabic(data.subtitle)) ? data.subtitle : "دقة. وضوح. هدف.",
            desc: (data?.desc && hasArabic(data.desc)) ? data.desc : "نصمم بنية رقمية متكاملة تجمع بين الصرامة الهندسية وجماليات التصميم.",
            ctaPrimary: data?.cta_primary || "ابدأ العمل",
            ctaSecondary: data?.cta_secondary || "معرض الأعمال",
            location: data?.location || "القاهرة، مصر"
        },
        en: {
            status: data?.availability_en || "STATUS: AVAILABLE_FOR_WORK",
            title: data?.title_en || "SYSTEM\nINTERFACE\nARCHITECT.",
            subtitle: data?.subtitle_en || "PRECISION. CLARITY. PURPOSE.",
            desc: data?.desc_en || "Constructing digital infrastructures that combine technical precision with Swiss minimalist aesthetics.",
            ctaPrimary: data?.cta_primary_en || "INITIATE_PROJECT",
            ctaSecondary: data?.cta_secondary_en || "VIEW_INDEX",
            location: data?.location_en || "CAIRO, EG"
        }
    };

    const t = content[lang];

    return (
        <section ref={ref} className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-background text-foreground pt-20 lg:pt-24 border-b border-foreground/5 dark:border-white/5">

            {/* Strict Grid Background - Parallaxed */}
            <motion.div style={{ y }} className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center flex-1">

                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-20">
                    {/* TEXT CONTENT (Strict Typographic Hierarchy) */}
                    <div className="w-full lg:col-span-7 rtl:text-right ltr:text-left relative z-30 mb-8 lg:mb-0">

                        {/* Status Indicator (Technical) */}
                        <div className="inline-flex items-center gap-3 border border-foreground/10 px-3 py-1 mb-4 md:mb-8 font-sans text-[10px] tracking-swiss-caps uppercase text-muted-foreground w-fit bg-foreground/5 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse shadow-sm shadow-emerald-500/50" />
                            <span className="opacity-50">sys_001 ::</span>
                            {t.status}
                        </div>

                        {/* Monumental Title */}
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                            className="text-swiss-poster text-foreground mix-blend-difference mb-4 md:mb-6"
                        >
                            {(t.title || "").split("\n").map((line, i) => (
                                <div key={i} className="overflow-hidden py-1 pb-2">
                                    <motion.div
                                        variants={{
                                            hidden: { y: "100%" },
                                            visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                        }}
                                    >
                                        {line}
                                    </motion.div>
                                </div>
                            ))}
                        </motion.h1>

                        {/* Description & CTAs */}
                        <div className="flex flex-col gap-6 md:gap-8 items-start border-t border-foreground/10 pt-4 md:pt-6 mt-0 relative">
                            {/* Decorative Marker */}
                            <div className="absolute top-0 right-0 rtl:left-0 rtl:right-auto w-8 h-px bg-foreground" />

                            <div className="space-y-4 md:space-y-6 max-w-xl ltr:pl-6 rtl:pr-6 border-l rtl:border-r rtl:border-l-0 border-foreground/20">
                                <h3 className={`font-bold ${lang === 'ar' ? 'text-2xl text-foreground' : 'text-xl text-foreground font-mono tracking-widest'}`}>
                                    {t.subtitle}
                                </h3>
                                <p className={`${lang === 'ar' ? 'text-lg md:text-xl leading-relaxed opacity-90' : 'text-base md:text-lg text-muted-foreground leading-relaxed'}`}>
                                    {t.desc}
                                </p>
                            </div>

                            <div className="w-full lg:w-full flex items-center justify-between lg:justify-start gap-4 z-50 p-4 lg:p-0 rounded-2xl lg:rounded-none bg-background/50 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border border-foreground/10 lg:border-none shadow-xl lg:shadow-none">
                                <Link
                                    href="/works"
                                    onClick={playClick}
                                    onMouseEnter={playHover}
                                    className="flex-1 lg:flex-none text-center relative overflow-hidden px-6 lg:px-8 py-3 lg:py-4 bg-foreground text-background font-sans text-xs font-bold tracking-swiss-caps uppercase hover:bg-blue-600 transition-colors group rounded lg:rounded-none"
                                >
                                    <span className="relative z-10">{t.ctaPrimary}</span>
                                    {/* Tech Corner */}
                                    <div className="absolute top-0 right-0 rtl:left-0 rtl:right-auto w-2 h-2 border-t border-r rtl:border-l rtl:border-r-0 border-background opacity-50" />
                                </Link>
                                <Link
                                    href="/about"
                                    onClick={playClick}
                                    onMouseEnter={playHover}
                                    className="flex-1 lg:flex-none text-center group flex items-center justify-center gap-3 px-4 py-3 lg:py-4 text-foreground font-sans text-xs font-bold tracking-swiss-caps uppercase hover:text-blue-600 transition-colors border border-foreground/20 lg:border-none rounded lg:rounded-none"
                                >
                                    <span>{t.ctaSecondary}</span>
                                    <div className="w-1.5 h-1.5 border border-foreground group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors rotate-45 rtl:-rotate-45" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* VISUAL CONTENT (Technical Display) */}
                    <div className="w-full lg:col-span-5 h-[280px] md:h-[400px] lg:h-[600px] relative flex items-center justify-center z-10 lg:mb-0 ordering-first lg:order-none">
                        {/* Frame Markers (RTL Aware) */}
                        <div className="absolute top-0 left-0 rtl:right-0 rtl:left-auto w-4 h-4 border-t border-l rtl:border-r rtl:border-l-0 border-foreground/30" />
                        <div className="absolute top-0 right-0 rtl:left-0 rtl:right-auto w-4 h-4 border-t border-r rtl:border-l rtl:border-r-0 border-foreground/30" />
                        <div className="absolute bottom-0 left-0 rtl:right-0 rtl:left-auto w-4 h-4 border-b border-l rtl:border-r rtl:border-l-0 border-foreground/30" />
                        <div className="absolute bottom-0 right-0 rtl:left-0 rtl:right-auto w-4 h-4 border-b border-r rtl:border-l rtl:border-r-0 border-foreground/30" />



                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {/* The Dashboard Widget lives inside this strict frame */}
                            {isMounted ? <DashboardWidget /> : <div className="w-full h-full bg-white/5 animate-pulse rounded-2xl" />}
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-12 border-t border-foreground/5 dark:border-white/5 flex items-center justify-between px-6 text-[10px] font-sans tracking-swiss-caps text-muted-foreground uppercase bg-background/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <PiArrowDownLight className="w-3 h-3 animate-bounce" />
                    <span>{lang === 'ar' ? 'اسحب للاستكشاف' : 'SCROLL_TO_EXPLORE'}</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <span>{t.location}</span>
                    <span>30.0444° N, 31.2357° E</span>
                </div>
                <div>
                    <span>V3.0.0 {lang === 'ar' ? 'النظام نشط' : 'SYS_ACTIVE'}</span>
                </div>
            </div>

        </section>
    );
}
