'use client';
import { motion } from 'framer-motion';
import { AppWindow, Smartphone, Database, PenTool } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useState, useRef } from 'react';

const icons = {
    web: AppWindow,
    mobile: Smartphone,
    backend: Database,
    design: PenTool
};

function ServiceCard({ service, index, spanClass }) {
    const Icon = icons[service.iconKey] || AppWindow;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group relative overflow-hidden backdrop-blur-sm border border-foreground/10 dark:border-white/5 p-10 rounded-2xl transition-all duration-500 flex flex-col justify-between ${spanClass}`}
        >
            {/* Spotlight Gradient */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
                }}
            />

            {/* Content Layer (z-10) */}
            <div className="relative z-10">
                <div className="w-16 h-16 bg-foreground/5 dark:bg-white/5 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500 border border-foreground/5 dark:border-white/5 rotate-45">
                    <div className="-rotate-45">
                        <Icon size={28} />
                    </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">{service.title}</h3>
            </div>

            <div className="relative z-10 flex items-end justify-between">
                <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                    {service.desc}
                </p>
                <div className="w-10 h-10 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 group-hover:rotate-0 transform duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </div>
            </div>

            {/* Tech Decor */}
            <div className="absolute top-6 right-6 w-2 h-2 bg-blue-500/20 rounded-full" />
        </motion.div>
    );
}

export default function ServicesGrid({ services = [] }) {
    const { lang } = useLanguage();

    const t = {
        ar: {
            web: { title: 'هندسة الويب', desc: 'بناء منصات رقمية معقدة بأعلى معايير الأداء.' },
            mobile: { title: 'تطبيقات تفاعلية', desc: 'تجارب جوال سلسة مبنية على React Native.' },
            design: { title: 'تصميم المنتجات', desc: 'نهج علمي لتصميم واجهات تركز على النتائج.' },
            backend: { title: 'البنية التحتية', desc: 'أنظمة خوادم قوية قابلة للتوسع والنمو.' }
        },
        en: {
            web: { title: 'Web Engineering', desc: 'Complex digital platforms built for scale.' },
            mobile: { title: 'Mobile Ecosystems', desc: 'Native-grade performance with React Native.' },
            design: { title: 'Product Design', desc: 'Data-driven interfaces engineered for conversion.' },
            backend: { title: 'Infrastructure', desc: 'Scalable cloud architectures & robust APIs.' }
        }
    };

    // Fallback data if services is empty
    const displayServices = services.length > 0 ? services : [
        { _id: '1', ...t[lang].web, iconKey: 'web' },
        { _id: '2', ...t[lang].mobile, iconKey: 'mobile' },
        { _id: '3', ...t[lang].design, iconKey: 'design' },
        { _id: '4', ...t[lang].backend, iconKey: 'backend' },
    ];

    return (
        <section className="py-20 container mx-auto px-6">
            <div className="mb-16">
                <h2 className="text-4xl md:text-6xl tracking-tighter mb-4">
                    <span className="font-bold text-foreground">{lang === 'ar' ? "خدماتي" : "My"}</span>
                    <span className="font-light text-muted-foreground ml-3">{lang === 'ar' ? "الاحترافية" : "Services"}</span>
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[300px]">
                {displayServices.map((service, index) => {
                    let spanClass = "md:col-span-3 lg:col-span-3"; // Default

                    if (index === 0) spanClass = "md:col-span-6 lg:col-span-7 bg-foreground/5 dark:bg-white/5 border-foreground/10 dark:border-white/10"; // Feature
                    if (index === 1) spanClass = "md:col-span-6 lg:col-span-5"; // Normal
                    if (index === 2) spanClass = "md:col-span-6 lg:col-span-5"; // Normal
                    if (index === 3) spanClass = "md:col-span-6 lg:col-span-7"; // Feature

                    return (
                        <ServiceCard
                            key={service._id}
                            service={service}
                            index={index}
                            spanClass={spanClass}
                        />
                    );
                })}
            </div>
        </section>
    );
}
