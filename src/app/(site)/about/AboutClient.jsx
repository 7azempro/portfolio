'use client';
import { useLanguage } from '@/lib/context/LanguageContext';
import { motion } from 'framer-motion';
import { PiArrowUpRightLight, PiDownloadSimpleLight, PiMapPinLight, PiClockLight, PiStackLight, PiGraduationCapLight } from 'react-icons/pi';
import Image from 'next/image';

export default function AboutClient({ data }) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    const FALLBACK_CONTENT = {
        role: "Product Design Engineer & UX/UI Designer",
        role_en: "Product Design Engineer & UX/UI Designer",
        location: "القاهرة، مصر",
        location_en: "Cairo, Egypt",
        bio: "أمتلك خبرة تزيد عن 3 سنوات في تصميم تجربة المستخدم وتطوير Webflow. متخصص في تصميم تجارب رقمية باستخدام Figma و Framer و React.",
        bio_en: "Over 3 years of experience in UX/UI design and Webflow development. Specializing in creating digital experiences using Figma, Framer, Webflow, and React.",
        stats: [
            { label: "حركة المرور", label_en: "TRAFFIC", value: "+25%", unit: "زيادة", unit_en: "INCREASE" },
            { label: "معدل الارتداد", label_en: "BOUNCE RATE", value: "-15%", unit: "تحسن", unit_en: "REDUCED" },
            { label: "سهولة الوصول", label_en: "ACCESSIBILITY", value: "+30%", unit: "نتيجة", unit_en: "SCORE" },
        ],
        tools: ['Adobe Creative Suite', 'Figma', 'Adobe XD', 'Webflow', 'Framer', 'React', 'Next.js'],
        education: [
            { degree: "Bachelor of Arts", institution: "Al-Azhar University", year: "2020" },
            { degree: "Nanodegree (UX Design)", institution: "Udacity", year: "2021" }
        ],
        experience: [
            {
                role: "Senior Product Designer",
                company: "TechCompany Inc.",
                year: "2023 - Present",
                desc: "Leading design ops and core system architecture.",
                desc_en: "Leading design ops and core system architecture."
            }
        ]
    };

    const finalData = {
        role: (isAr ? data?.role : data?.role_en) || (isAr ? FALLBACK_CONTENT.role : FALLBACK_CONTENT.role_en),
        location: (isAr ? data?.location : data?.location_en) || (isAr ? FALLBACK_CONTENT.location : FALLBACK_CONTENT.location_en),
        bio: (isAr ? data?.bio : data?.bio_en) || (isAr ? FALLBACK_CONTENT.bio : FALLBACK_CONTENT.bio_en),
        image: data?.image || '/assets/hazem-upwork.jpg',
        stats: (data?.stats && data.stats.length > 0) ? data.stats : FALLBACK_CONTENT.stats,
        tools: (data?.tools && data.tools.length > 0) ? data.tools : FALLBACK_CONTENT.tools,
        education: (data?.education && data.education.length > 0) ? data.education : FALLBACK_CONTENT.education,
        experience: (data?.experience && data.experience.length > 0) ? data.experience : FALLBACK_CONTENT.experience
    };

    const t = {
        ar: {
            title: "المطور",
            subtitle: "السيرة الذاتية",
            download: "تحميل السيرة الذاتية",
            sections: { exp: "سجل العمل", edu: "التعليم", stack: "الترسانة التقنية" }
        },
        en: {
            title: "THE_ARCHITECT",
            subtitle: "PROFILE_BIO",
            download: "DOWNLOAD_CV",
            sections: { exp: "Noteworthy History", edu: "Education", stack: "Tech Arsenal" }
        }
    };
    const labels = t[lang];

    return (
        <main className="min-h-screen pt-24 pb-20 container mx-auto px-6">
            {/* Header */}
            <header className="border-b border-foreground/10 pb-12 mb-20 relative">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground border border-foreground/10 px-3 py-1 rounded-full">
                        {labels.subtitle} // 001
                    </span>
                    <PiArrowUpRightLight className="w-6 h-6 text-muted-foreground" />
                </div>
                <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-foreground mix-blend-difference">
                    {labels.title}
                </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-l border-foreground/10">

                {/* Left: Bio & Stats */}
                <aside className="lg:col-span-4 border-r border-b border-foreground/10 p-8 lg:p-12 bg-foreground/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                        <div>
                            {/* Profile Picture */}
                            <div className="relative w-24 h-24 mb-8">
                                <div className="w-full h-full rounded-full overflow-hidden border-2 border-foreground/10 shadow-xl relative z-10">
                                    <Image
                                        src={finalData.image}
                                        alt="Hazem"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {/* Decorative Rings */}
                                <div className="absolute inset-0 rounded-full border border-blue-500/30 scale-110 animate-pulse" />
                                <div className="absolute -right-2 -bottom-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20 border-2 border-background">
                                    PRO
                                </div>
                            </div>

                            <h2 className="text-xl font-bold uppercase tracking-tight mb-2 leading-tight">{finalData.role}</h2>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm font-sans mb-8">
                                <PiMapPinLight />
                                <span className="uppercase">{finalData.location}</span>
                            </div>
                            <p className="text-lg leading-relaxed text-foreground/80 font-medium">{finalData.bio}</p>
                        </div>

                        <div className="space-y-6">
                            {finalData.stats.map((stat, i) => (
                                <div key={i} className="flex justify-between items-end border-b border-foreground/10 pb-2">
                                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                                        {isAr ? stat.label : (stat.label_en || stat.label)}
                                    </span>
                                    <div className="text-right">
                                        <span className="block text-2xl font-bold leading-none">{stat.value}</span>
                                        <span className="text-[10px] text-muted-foreground uppercase">
                                            {isAr ? stat.unit : (stat.unit_en || stat.unit)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-4 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            {labels.download}
                            <PiDownloadSimpleLight />
                        </button>
                    </div>
                </aside>

                {/* Right: History, Education, Tools */}
                <div className="lg:col-span-8">
                    {/* Experience */}
                    <section className="border-b border-foreground/10">
                        <div className="p-6 border-b border-foreground/10 bg-background flex items-center gap-3">
                            <PiClockLight className="text-blue-500" />
                            <h3 className="text-sm font-bold uppercase tracking-widest">{labels.sections.exp}</h3>
                        </div>
                        <div className="divide-y divide-foreground/10">
                            {finalData.experience.map((item, i) => (
                                <div key={i} className="group p-8 hover:bg-foreground/5 transition-colors grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                    <div className="md:col-span-3 text-sm text-muted-foreground font-sans uppercase tracking-widest">{item.year}</div>
                                    <div className="md:col-span-9">
                                        <h4 className="text-xl font-bold mb-1 flex items-center gap-2">{item.role}</h4>
                                        <h5 className="text-sm font-semibold text-foreground/70 mb-3">{item.company}</h5>
                                        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                                            {isAr ? item.desc : (item.desc_en || item.desc)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education (New Section) */}
                    <section className="border-b border-foreground/10">
                        <div className="p-6 border-b border-foreground/10 bg-background flex items-center gap-3">
                            <PiGraduationCapLight className="text-amber-500" />
                            <h3 className="text-sm font-bold uppercase tracking-widest">{labels.sections.edu}</h3>
                        </div>
                        <div className="divide-y divide-foreground/10">
                            {finalData.education.map((item, i) => (
                                <div key={i} className="p-8 hover:bg-foreground/5 transition-colors grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                    <div className="md:col-span-3 text-sm text-muted-foreground font-sans uppercase tracking-widest">{item.year}</div>
                                    <div className="md:col-span-9">
                                        <h4 className="text-lg font-bold">{item.degree}</h4>
                                        <h5 className="text-sm text-muted-foreground">{item.institution}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Stack */}
                    <section className="border-b border-foreground/10">
                        <div className="p-6 border-b border-foreground/10 bg-background flex items-center gap-3">
                            <PiStackLight className="text-purple-500" />
                            <h3 className="text-sm font-bold uppercase tracking-widest">{labels.sections.stack}</h3>
                        </div>
                        <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
                            {finalData.tools.map((tech) => (
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
