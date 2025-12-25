'use client';
import { motion } from 'framer-motion';
import { PiLayoutLight, PiDeviceMobileLight, PiHardDrivesLight, PiPenNibLight, PiArrowUpRightLight } from 'react-icons/pi';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useSound } from '@/lib/context/SoundContext';

function ServiceCard({ service, index, spanClass, onHover }) {
    const icons = {
        web: PiLayoutLight,
        mobile: PiDeviceMobileLight,
        backend: PiHardDrivesLight,
        design: PiPenNibLight
    };
    const Icon = icons[service.iconKey] || AppWindow;

    // Format number strictly: 01, 02..
    const num = (index + 1).toString().padStart(2, '0');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={onHover}
            className={`group relative flex flex-col justify-between p-8 md:p-12 border border-foreground/10 bg-background hover:bg-foreground/5 transition-colors duration-500 ${spanClass}`}
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

export default function ServicesGrid({ services = [] }) {
    const { lang } = useLanguage();
    const { playHover } = useSound();

    const t = {
        ar: {
            web: { title: 'هندسة الواجهات', desc: 'تصميم وبناء واجهات مستخدم معقدة تركز على الأداء وتجربة المستخدم.' },
            mobile: { title: 'تطوير الأنظمة', desc: 'بناء تطبيقات ويب متكاملة، من الخوادم السحابية إلى واجهة العميل.' },
            design: { title: 'تصميم المنتجات', desc: 'نهج علمي قائم على البيانات لتحويل الأفكار إلى منتجات رقمية قابلة للتنفيذ.' },
            backend: { title: 'حلول الجوال', desc: 'تطبيقات عالية الأداء تعمل بكفاءة على جميع الأجهزة والمنصات.' }
        },
        en: {
            web: { title: 'UI Engineering', desc: 'Architecting complex frontend systems with pixel-perfect precision.' },
            mobile: { title: 'Full-Stack Systems', desc: 'End-to-end development of scalable, secure, and robust digital products.' },
            design: { title: 'Product Design', desc: 'Data-driven prototyping and interface design committed to usability.' },
            backend: { title: 'Mobile Solutions', desc: 'Native-grade performance for mission-critical mobile applications.' }
        }
    };

    const displayServices = [
        { _id: '1', ...t[lang].web, iconKey: 'web' },
        { _id: '2', ...t[lang].mobile, iconKey: 'mobile' },
        { _id: '3', ...t[lang].design, iconKey: 'design' },
        { _id: '4', ...t[lang].backend, iconKey: 'backend' },
    ];

    return (
        <section className="py-32 container mx-auto px-6">
            {/* Minimal Header */}
            <div className="flex items-end justify-between mb-16 border-b border-foreground/10 pb-8">
                <h2 className="text-4xl md:text-6xl tracking-tighter font-bold">
                    {lang === 'ar' ? "خدماتنا" : "SERVICES"}
                </h2>
                <span className="hidden md:block font-sans text-xs uppercase tracking-widest text-muted-foreground">
                    // CAPABILITIES
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
