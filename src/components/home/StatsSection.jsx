'use client';
import { useLanguage } from '@/lib/context/LanguageContext';
import LiveCounter from '@/components/ui/LiveCounter';
import { motion } from 'framer-motion';
import { RiServerLine, RiEyeLine, RiFileTextLine, RiStackLine } from 'react-icons/ri';

export default function StatsSection({ stats = [], liveStats = {} }) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    // Fallback if liveStats is missing
    const totalViews = liveStats?.totalViews || 0;
    const totalArticles = liveStats?.totalArticles || 0;
    const totalProjects = liveStats?.totalProjects || 0;

    // Calculate Years of Experience (Base year 2020?) - fallback to static
    const startYear = 2020;
    const currentYear = new Date().getFullYear();
    const expYears = currentYear - startYear;

    const dataPoints = [
        {
            label: isAr ? 'إجمالي المشاهدات' : 'SYSTEM_VIEWS',
            value: totalViews,
            suffix: '',
            prefix: '+',
            icon: RiEyeLine,
            color: 'text-green-500'
        },
        {
            label: isAr ? 'المشاريع المنجزة' : 'SHIPPED_PROJECTS',
            value: totalProjects,
            suffix: '',
            prefix: '',
            icon: RiStackLine,
            color: 'text-blue-500'
        },
        {
            label: isAr ? 'المقالات المنشورة' : 'KNOWLEDGE_LOGS',
            value: totalArticles,
            suffix: '',
            prefix: '#',
            icon: RiFileTextLine,
            color: 'text-purple-500'
        },
        {
            label: isAr ? 'سنوات الخبرة' : 'YEARS_ONLINE',
            value: expYears, // Or use static from CMS if preferred
            suffix: '+',
            prefix: '',
            icon: RiServerLine,
            color: 'text-orange-500'
        }
    ];

    return (
        <section className="py-20 border-b border-foreground/10 bg-background relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="flex items-center gap-3 mb-12 opacity-60">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <span className={`font-mono text-xs tracking-[0.2em] uppercase ${isAr ? 'text-foreground font-bold' : 'text-blue-300'}`}>
                        {isAr ? 'بيانات النظام الحية' : 'LIVE_SYSTEM_TELEMETRY'}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-foreground/10 to-transparent" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
                    {dataPoints.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative group bg-muted/30 border border-foreground/5 p-6 rounded-sm hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
                                {/* Hover Gradient */}
                                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon Header */}
                                <div className="flex items-center justify-between mb-4 opacity-50 group-hover:opacity-80 transition-opacity">
                                    <stat.icon className={`text-xl ${stat.color}`} />
                                    <span className={`text-[10px] font-mono tracking-widest rtl:tracking-normal text-muted-foreground/50`}>
                                        {isAr ? `0${i + 1}` : `DATAPOINT_0${i + 1}`}
                                    </span>
                                </div>

                                <LiveCounter
                                    value={String(stat.value)}
                                    label={stat.label}
                                    suffix={stat.suffix}
                                    prefix={stat.prefix}
                                    isAr={isAr}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
