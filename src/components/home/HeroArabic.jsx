'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useEffect, useState } from 'react';
import DashboardWidget from './DashboardWidget';
import { RiArrowDownLine } from 'react-icons/ri';

export default function HeroArabic({ data }) {
    const { lang } = useLanguage();

    // Content Dictionary
    const hasArabic = (text) => /[\u0600-\u06FF]/.test(text || "");

    const content = {
        ar: {
            status: "الحالة: متاح للمشاريع",
            title: (data?.title && hasArabic(data.title)) ? data.title : "مهندس\nالتجارب\nالرقمية.",
            subtitle: (data?.subtitle && hasArabic(data.subtitle)) ? data.subtitle : "نحول التعقيد إلى بساطة.",
            desc: (data?.desc && hasArabic(data.desc)) ? data.desc : "نبني نُظماً رقمية تجمع بين دقة الهندسة وجماليات التصميم السويسري.",
            ctaPrimary: "ابدأ العمل",
            ctaSecondary: "معرض الأعمال"
        },
        en: {
            status: "STATUS: AVAILABLE_FOR_WORK",
            title: data?.title_en || "DIGITAL\nPRODUCT\nARCHITECT.",
            subtitle: data?.subtitle_en || "TURNING CHAOS INTO ORDER.",
            desc: data?.desc_en || "Engineering digital systems that combine technical precision with Swiss minimalist aesthetics.",
            ctaPrimary: "INITIATE_PROJECT",
            ctaSecondary: "VIEW_INDEX"
        }
    };

    const t = content[lang];

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background text-foreground pt-20 border-b border-foreground/5 dark:border-white/5">

            {/* Strict Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center flex-1">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* TEXT CONTENT (Strict Typographic Hierarchy) */}
                    <div className="lg:col-span-7 rtl:text-right ltr:text-left">

                        {/* Status Indicator (Technical) */}
                        <div className="inline-flex items-center gap-3 border-b border-foreground/20 pb-2 mb-8 md:mb-12 font-sans text-xs tracking-widest uppercase text-muted-foreground w-fit">
                            <span className="w-2 h-2 bg-emerald-500 rounded-none animate-pulse" />
                            {t.status}
                        </div>

                        {/* Monumental Title */}
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                            className={`${lang === 'ar' ? 'text-5xl md:text-7xl lg:text-8xl leading-tight font-bold tracking-normal py-2 mb-6' : 'text-[11vw] md:text-[8vw] lg:text-[7vw] leading-[0.8] font-black tracking-tighter mb-8'} text-foreground mix-blend-difference`}
                        >
                            {(t.title || "").split("\n").map((line, i) => (
                                <div key={i} className={`overflow-hidden ${lang === 'ar' ? 'pb-4' : ''}`}>
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
                        <div className="flex flex-col gap-10 items-start border-t border-foreground/10 pt-8 mt-4">
                            <p className={`${lang === 'ar' ? 'text-xl md:text-2xl leading-relaxed opacity-90' : 'text-lg md:text-xl text-muted-foreground leading-relaxed'} max-w-xl`}>
                                {t.desc}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 w-full">
                                <Link
                                    href="/works"
                                    className="px-8 py-4 bg-foreground text-background font-sans text-sm font-bold tracking-widest uppercase hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/10"
                                >
                                    {t.ctaPrimary}
                                </Link>
                                <Link
                                    href="/about"
                                    className="group flex items-center gap-2 px-4 py-4 text-foreground font-sans text-sm font-bold tracking-widest uppercase hover:text-blue-600 transition-colors"
                                >
                                    <span>{t.ctaSecondary}</span>
                                    <div className="w-1 h-1 bg-foreground rounded-full group-hover:bg-blue-600 transition-colors" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* VISUAL CONTENT (Technical Display) */}
                    <div className="lg:col-span-5 h-[400px] lg:h-[600px] relative flex items-center justify-center">
                        {/* Frame Markers */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-foreground/30" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-foreground/30" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-foreground/30" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-foreground/30" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                            className="w-full"
                        >
                            {/* The Dashboard Widget lives inside this strict frame */}
                            <DashboardWidget />
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-12 border-t border-foreground/5 dark:border-white/5 flex items-center justify-between px-6 text-[10px] font-sans tracking-widest text-muted-foreground uppercase bg-background/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <RiArrowDownLine className="w-3 h-3 animate-bounce" />
                    <span>SCROLL_TO_EXPLORE</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <span>CAIRO, EG</span>
                    <span>30.0444° N, 31.2357° E</span>
                </div>
                <div>
                    <span>V3.0.0 SYS_ACTIVE</span>
                </div>
            </div>

        </section>
    );
}
