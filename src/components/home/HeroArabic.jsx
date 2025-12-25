'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useEffect, useState } from 'react';
import DashboardWidget from './DashboardWidget';
import { PiArrowDownLight } from 'react-icons/pi';

export default function HeroArabic({ data }) {
    const { lang } = useLanguage();

    // Content Dictionary
    const hasArabic = (text) => /[\u0600-\u06FF]/.test(text || "");

    const content = {
        ar: {
            status: "الحالة: متاح للمشاريع",
            title: (data?.title && hasArabic(data.title)) ? data.title : "مهندس\nالنظم\nالرقمية.",
            subtitle: (data?.subtitle && hasArabic(data.subtitle)) ? data.subtitle : "دقة. وضوح. هدف.",
            desc: (data?.desc && hasArabic(data.desc)) ? data.desc : "نصمم بنية رقمية متكاملة تجمع بين الصرامة الهندسية وجماليات التصميم.",
            ctaPrimary: "ابدأ العمل",
            ctaSecondary: "معرض الأعمال"
        },
        en: {
            status: "STATUS: AVAILABLE_FOR_WORK",
            title: data?.title_en || "SYSTEM\nINTERFACE\nARCHITECT.",
            subtitle: data?.subtitle_en || "PRECISION. CLARITY. PURPOSE.",
            desc: data?.desc_en || "Constructing digital infrastructures that combine technical precision with Swiss minimalist aesthetics.",
            ctaPrimary: "INITIATE_PROJECT",
            ctaSecondary: "VIEW_INDEX"
        }
    };

    const t = content[lang];

    return (
        <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-background text-foreground pt-20 lg:pt-24 border-b border-foreground/5 dark:border-white/5">

            {/* Strict Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center flex-1">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* TEXT CONTENT (Strict Typographic Hierarchy) */}
                    <div className="lg:col-span-7 rtl:text-right ltr:text-left">

                        {/* Status Indicator (Technical) */}
                        <div className="inline-flex items-center gap-3 border border-foreground/10 px-3 py-1 mb-8 md:mb-12 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground w-fit bg-foreground/5 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse shadow-sm shadow-emerald-500/50" />
                            <span className="opacity-50">sys_001 ::</span>
                            {t.status}
                        </div>

                        {/* Monumental Title */}
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                            className={`${lang === 'ar' ? 'text-4xl md:text-6xl lg:text-8xl leading-[1.4] font-bold tracking-normal py-2 mb-8 mt-4' : 'text-[11vw] md:text-[8vw] lg:text-[7vw] leading-[0.95] font-black tracking-tighter mb-8'} text-foreground mix-blend-difference`}
                        >
                            {(t.title || "").split("\n").map((line, i) => (
                                <div key={i} className={`overflow-hidden py-1 ${lang === 'ar' ? 'pb-4' : 'pb-1'}`}>
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
                        <div className="flex flex-col gap-10 items-start border-t border-foreground/10 pt-8 mt-4 mb-12 lg:mb-0 relative">
                            {/* Decorative Marker */}
                            <div className="absolute top-0 right-0 w-8 h-px bg-foreground" />

                            <div className="space-y-6 max-w-xl ltr:pl-6 rtl:pr-6 border-l rtl:border-r rtl:border-l-0 border-foreground/20">
                                <h3 className={`font-bold ${lang === 'ar' ? 'text-2xl text-foreground' : 'text-xl text-foreground font-mono tracking-widest'}`}>
                                    {t.subtitle}
                                </h3>
                                <p className={`${lang === 'ar' ? 'text-xl leading-relaxed opacity-90' : 'text-lg text-muted-foreground leading-relaxed'}`}>
                                    {t.desc}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 w-full mt-4">
                                <Link
                                    href="/works"
                                    className="relative overflow-hidden px-8 py-4 bg-foreground text-background font-sans text-xs font-bold tracking-widest uppercase hover:bg-blue-600 transition-colors group"
                                >
                                    <span className="relative z-10">{t.ctaPrimary}</span>
                                    {/* Tech Corner */}
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-background opacity-50" />
                                </Link>
                                <Link
                                    href="/about"
                                    className="group flex items-center gap-3 px-4 py-4 text-foreground font-sans text-xs font-bold tracking-widest uppercase hover:text-blue-600 transition-colors"
                                >
                                    <span>{t.ctaSecondary}</span>
                                    <div className="w-1.5 h-1.5 border border-foreground group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors rotate-45" />
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
                    <PiArrowDownLight className="w-3 h-3 animate-bounce" />
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
