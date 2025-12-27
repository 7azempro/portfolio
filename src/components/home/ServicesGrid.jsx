'use client';
import { motion } from 'framer-motion';
import { PiLayoutLight, PiDeviceMobileLight, PiHardDrivesLight, PiPenNibLight, PiArrowUpRightLight, PiAppWindowLight } from 'react-icons/pi';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useSound } from '@/lib/context/SoundContext';

import { getIcon } from '@/components/ui/IconMapper';

function ServiceCard({ service, index, spanClass, onHover }) {
    const Icon = getIcon(service.iconKey) || PiAppWindowLight;

    // Format number strictly: 01, 02..
    const num = (index + 1).toString().padStart(2, '0');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={onHover}
            className={`group relative flex flex-col justify-between p-6 md:p-12 border border-foreground/10 bg-background hover:bg-foreground/5 transition-colors duration-500 ${spanClass}`}
        >
            {/* Top Row: Icon & Number */}
            <div className="flex justify-between items-start mb-12">
                <div className="p-3 border border-foreground/10 text-foreground group-hover:scale-110 transition-transform duration-500">
                    <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className="font-sans text-xs text-muted-foreground/50 group-hover:text-foreground transition-colors">
                    {num}
                </span>
            </div>

            {/* Bottom Row: Content */}
            <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                    {service.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm font-sans border-l rtl:border-r rtl:border-l-0 border-foreground/10 pl-4 rtl:pr-4 rtl:pl-0">
                    {service.desc}
                </p>
            </div>

            {/* Corner Decor */}
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PiArrowUpRightLight className="w-5 h-5 text-blue-500" />
            </div>
        </motion.div>
    );
}

export default function ServicesGrid({ services = [], settings = {} }) {
    const { lang } = useLanguage();
    const { playHover } = useSound();

    // Helper for Localization
    const getLoc = (item, field) => {
        if (lang === 'ar') return item[field] || item[`${field}_ar`] || "";
        return item[`${field}_en`] || item[field] || "";
    };

    // Fallback Data to match Schema
    const FALLBACK_SERVICES = [
        { _id: '1', title: 'تطوير الواجهات', title_en: 'Frontend Architecture', description: 'بناء واجهات تفاعلية سريعة باستخدام React و Next.js.', description_en: 'Building performant, interactive UIs with React & Next.js.', iconKey: 'web' },
        { _id: '2', title: 'تصميم النظم', title_en: 'System Design', description: 'تصميم أنظمة تصميم متكاملة وقابلة للتوسع.', description_en: 'Creating scalable, atomic design systems.', iconKey: 'design' },
        { _id: '3', title: 'تطبيقات الجوال', title_en: 'Mobile Hubs', description: 'تطبيقات جوال عابرة للمنصات بأداء أصلي.', description_en: 'Cross-platform mobile experiences with native performance.', iconKey: 'mobile' },
        { _id: '4', title: 'تطوير الخلفيات', title_en: 'Backend Systems', description: 'حلول خادم قوية ومعالجة بيانات آمنة.', description_en: 'Robust server solutions and secure data handling.', iconKey: 'backend' }
    ];

    const finalServices = services.length > 0 ? services : FALLBACK_SERVICES;

    // Map passed services to structure
    const displayServices = finalServices.map(s => ({
        _id: s._id,
        title: getLoc(s, 'title'),
        desc: getLoc(s, 'description'), // Schema says 'description'
        iconKey: s.iconKey
    }));

    return (
        <section className="py-32 container mx-auto px-6">
            {/* Minimal Header */}
            <div className="flex items-end justify-between mb-16 border-b border-foreground/10 pb-8">
                <h2 className="text-4xl md:text-6xl tracking-tighter font-bold">
                    {lang === 'ar' ? (settings?.services_title || "خدماتنا") : (settings?.services_title_en || "SERVICES")}
                </h2>
                <span className="hidden md:block font-sans text-xs uppercase tracking-widest text-muted-foreground">
                    {/* Dynamic Subtitle */}
                    {lang === 'ar' ? "// قدرات" : (settings?.services_subtitle_en || "// CAPABILITIES")}
                </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {displayServices.map((service, index) => {
                    // Strict 2x2 Grid logic
                    // Ensure borders don't double up strictly (optional, but gap-px is easier or just -ml-px)
                    // For simplicity in this stack, let's use gap-4 and explicit borders first, or -margin.
                    // Let's go with gap-6 for "Cards" feel or gap-0 for "Table" feel.
                    // User liked Footer (Table), so let's try gap-px bg-foreground/10 (Grid Lines)

                    // Actually, let's stick to the component structure:
                    let spanClass = ""; // Regular 2-col
                    return (
                        <ServiceCard
                            key={service._id}
                            service={service}
                            index={index}
                            spanClass={spanClass}
                            onHover={playHover}
                        />
                    );
                })}
            </div>
        </section>
    );
}
