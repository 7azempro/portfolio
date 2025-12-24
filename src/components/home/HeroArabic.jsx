'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/context/LanguageContext';
import MagneticButton from '@/components/ui/MagneticButton';
import { useEffect, useState } from 'react';
import DashboardWidget from './DashboardWidget';

export default function HeroArabic({ data }) {
    const { lang } = useLanguage();

    // Content Dictionary
    const hasArabic = (text) => /[\u0600-\u06FF]/.test(text || "");

    const content = {
        ar: {
            available: "متاح لمشاريع جديدة",
            title: (data?.title && hasArabic(data.title)) ? data.title : "نبتكر تجارب رقمية",
            subtitle: (data?.subtitle && hasArabic(data.subtitle)) ? data.subtitle : "تسبق المستقبل.",
            desc: (data?.desc && hasArabic(data.desc)) ? data.desc : "نحول الأفكار المعقدة إلى منتجات رقمية استثنائية تجمع بين جمال التصميم وقوة الأداء.",
            ctaPrimary: "ابدأ مشروعك",
            ctaSecondary: "تصفح أعمالنا"
        },
        en: {
            available: "Available for new projects",
            title: data?.title_en || "Crafting Digital",
            subtitle: data?.subtitle_en || "Experiences.",
            desc: data?.desc_en || "We transform complex ideas into exceptional digital products that combine beautiful design with powerful performance.",
            ctaPrimary: "Start Project",
            ctaSecondary: "View Work"
        }
    };

    const t = content[lang];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-background text-foreground transition-colors duration-500">

            {/* Grid Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.1]" />

            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">



                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* RIGHT (Text Content) */}
                    <div className="lg:col-span-7 rtl:text-right ltr:text-left order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 px-4 py-1.5 rounded-full text-sm font-medium text-blue-600 dark:text-blue-200 mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
                            {t.available}
                        </motion.div>

                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.2] text-foreground"
                        >
                            {(t.title || "").split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                    }}
                                    className="inline-block ml-3"
                                >
                                    {word}
                                </motion.span>
                            ))}
                            <br />
                            <span className="text-muted-foreground block mt-2 text-4xl md:text-6xl font-light">
                                {t.subtitle}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-gray-400 max-w-2xl ml-auto mb-10 leading-relaxed"
                        >
                            {t.desc}
                        </motion.p>

                        <div className="flex flex-wrap gap-4 rtl:justify-end ltr:justify-start">
                            <MagneticButton className="bg-foreground text-background dark:bg-white dark:text-black px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity">
                                {t.ctaPrimary}
                            </MagneticButton>
                            <MagneticButton className="px-8 py-4 rounded-full font-bold border border-foreground/10 dark:border-white/20 hover:bg-foreground/5 dark:hover:bg-white/5 transition-colors text-foreground">
                                {t.ctaSecondary}
                            </MagneticButton>
                        </div>
                    </div>

                    {/* LEFT (Visual - Abstract Interface) */}
                    <div className="lg:col-span-5 order-1 lg:order-2 relative h-[500px] hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full h-full flex items-center justify-center rtl:pl-12 ltr:pr-12"
                        >
                            <DashboardWidget />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
