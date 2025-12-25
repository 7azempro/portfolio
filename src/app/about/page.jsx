'use client';
import { useLanguage } from '@/lib/context/LanguageContext';
import { motion } from 'framer-motion';
import { RiArrowRightUpLine, RiDownloadLine, RiMapPinLine, RiTimeLine, RiStackLine } from 'react-icons/ri';
import Link from 'next/link';

export default function AboutPage() {
    const { lang } = useLanguage();

    const t = {
        ar: {
            title: "المطور",
            subtitle: "السيرة الذاتية",
            role: "مهندس نظم رقمية",
            bio: "أعمل عند تقاطع التصميم والهندسة. لا أبني مجرد مواقع، بل أنظمة رقمية حية، دقيقة، وقابلة للتوسع. أومن بأن الجودة تكمن في التفاصيل التي لا يراها المستخدم، ولكن يشعر بها.",
            stats: [
                { label: "الخبرة", value: "05+", unit: "سنوات" },
                { label: "المشاريع", value: "40+", unit: "منجزة" },
                { label: "العملاء", value: "100%", unit: "رضاء" },
            ],
            sections: {
                exp: "سجل العمل",
                stack: "الترسانة التقنية",
                contact: "تواصل"
            },
            history: [
                { role: "Senior Product Designer", company: "TechCompany Inc.", year: "2023 - Present", desc: "قيادة فريق التصميم وتطوير نظام التصميم المركزي." },
                { role: "Frontend Architect", company: "CreativeAgency", year: "2020 - 2023", desc: "بناء واجهات معقدة لأكثر من 20 عميل عالمي." },
                { role: "UI Developer", company: "Freelance", year: "2018 - 2020", desc: "تطوير واجهات تفاعلية باستخدام React & GSAP." },
            ],
            download: "تحميل الـ CV"
        },
        en: {
            title: "THE_ARCHITECT",
            subtitle: "PROFILE_BIO",
            role: "DIGITAL SYSTEMS ENGINEER",
            bio: "Operating at the intersection of design and engineering. I don't just build websites; I construct living, precise, and scalable digital systems. Quality lies in the invisible details.",
            stats: [
                { label: "EXPERIENCE", value: "05+", unit: "YEARS" },
                { label: "PROJECTS", value: "40+", unit: "SHIPPED" },
                { label: "SATISFACTION", value: "100%", unit: "RATING" },
            ],
            sections: {
                exp: "HISTORY_LOG",
                stack: "TECH_ARSENAL",
                contact: "CONNECT"
            },
            history: [
                { role: "Senior Product Designer", company: "TechCompany Inc.", year: "2023 - Present", desc: "Leading design ops and core system architecture." },
                { role: "Frontend Architect", company: "CreativeAgency", year: "2020 - 2023", desc: "Delivered complex UIs for 20+ global clients." },
                { role: "UI Developer", company: "Freelance", year: "2018 - 2020", desc: "Interactive development with React & GSAP." },
            ],
            download: "DOWNLOAD_CV"
        }
    };

    const content = t[lang];

    return (
        <main className="min-h-screen pt-24 pb-20 container mx-auto px-6">

            {/* 1. Header: Monumental & Blueprint Style */}
            <header className="border-b border-foreground/10 pb-12 mb-20 relative">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground border border-foreground/10 px-3 py-1 rounded-full">
                        {content.subtitle} // 001
                    </span>
                    <RiArrowRightUpLine className="w-6 h-6 text-muted-foreground" />
                </div>

                <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-foreground mix-blend-difference">
                    {content.title}
                </h1>
            </header>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-l border-foreground/10">

                {/* LEFT COLUMN: ID CARD & MANIFESTO */}
                <aside className="lg:col-span-4 border-r border-b border-foreground/10 p-8 lg:p-12 bg-foreground/5 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                        <div>
                            <div className="w-20 h-20 bg-foreground text-background flex items-center justify-center text-3xl font-bold mb-8 rounded-full">
                                7Z
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">{content.role}</h2>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm font-sans mb-8">
                                <RiMapPinLine />
                                <span>CAIRO, EG (GMT+2)</span>
                            </div>

                            <p className="text-lg leading-relaxed text-foreground/80 font-medium">
                                {content.bio}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {content.stats.map((stat, i) => (
                                <div key={i} className="flex justify-between items-end border-b border-foreground/10 pb-2">
                                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                                    <div className="text-right">
                                        <span className="block text-2xl font-bold leading-none">{stat.value}</span>
                                        <span className="text-[10px] text-muted-foreground uppercase">{stat.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-4 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            {content.download}
                            <RiDownloadLine />
                        </button>
                    </div>
                </aside>


                {/* RIGHT COLUMN: DATA TABLES */}
                <div className="lg:col-span-8">

                    {/* History Section */}
                    <section className="border-b border-foreground/10">
                        <div className="p-6 border-b border-foreground/10 bg-background flex items-center gap-3">
                            <RiTimeLine className="text-blue-500" />
                            <h3 className="text-sm font-bold uppercase tracking-widest">{content.sections.exp}</h3>
                        </div>
                        <div className="divide-y divide-foreground/10">
                            {content.history.map((item, i) => (
                                <div key={i} className="group p-8 hover:bg-foreground/5 transition-colors grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                    <div className="md:col-span-3 text-sm text-muted-foreground font-sans uppercase tracking-widest">
                                        {item.year}
                                    </div>
                                    <div className="md:col-span-9">
                                        <h4 className="text-xl font-bold mb-1 flex items-center gap-2">
                                            {item.role}
                                            <RiArrowRightUpLine className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                        </h4>
                                        <h5 className="text-sm font-semibold text-foreground/70 mb-3">{item.company}</h5>
                                        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>


                    {/* Stack Section */}
                    <section className="border-b border-foreground/10">
                        <div className="p-6 border-b border-foreground/10 bg-background flex items-center gap-3">
                            <RiStackLine className="text-purple-500" />
                            <h3 className="text-sm font-bold uppercase tracking-widest">{content.sections.stack}</h3>
                        </div>
                        <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
                            {['Next.js', 'React', 'Tailwind', 'TypeScript', 'Framer', 'Sanity', 'Node.js', 'Figma'].map((tech) => (
                                <div key={tech} className="bg-background p-6 flex flex-col items-center justify-center gap-2 text-center hover:bg-foreground/5 transition-colors group">
                                    <span className="text-sm font-bold uppercase tracking-wider group-hover:text-blue-600 transition-colors">{tech}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
}
