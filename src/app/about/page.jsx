'use client';
import { useLanguage } from '@/lib/context/LanguageContext';
import { motion } from 'framer-motion';
import { RiArrowRightUpLine, RiDownloadLine } from 'react-icons/ri';

export default function AboutPage() {
    const { lang } = useLanguage();

    const t = {
        ar: {
            title: "عن حازم",
            role: "مهندس واجهات & مصمم منتجات",
            bio: "أنا مهندس برمجيات متخصص في بناء النظم الرقمية الدقيقة. أركز على تقليص الفجوة بين التصميم والهندسة، حيث أؤمن بأن الجمال يكمن في الأداء والوظيفة.",
            stats: [
                { label: "سنوات خبرة", value: "05+" },
                { label: "مشاريع مكتملة", value: "40+" },
                { label: "موقع", value: "القاهرة" },
            ],
            stackTitle: "التقنيات",
            historyTitle: "الخبرات",
            downloadCV: "تحميل السيرة الذاتية",
            history: [
                { role: "Senior Product Designer", company: "TechCompany Inc.", year: "2023 - Present" },
                { role: "Frontend Architect", company: "CreativeAgency", year: "2020 - 2023" },
                { role: "UI Developer", company: "Freelance", year: "2018 - 2020" },
            ]
        },
        en: {
            title: "ABOUT_7AZEM",
            role: "UI ENGINEER & PRODUCT DESIGNER",
            bio: "I am a software engineer specializing in precise digital systems. I focus on bridging the gap between design and engineering, believing that true beauty lies in performance and function.",
            stats: [
                { label: "YEARS_EXP", value: "05+" },
                { label: "PROJECTS", value: "40+" },
                { label: "BASE", value: "CAIRO" },
            ],
            stackTitle: "TECHNOLOGIES",
            historyTitle: "HISTORY",
            downloadCV: "DOWNLOAD_CV",
            history: [
                { role: "Senior Product Designer", company: "TechCompany Inc.", year: "2023 - Present" },
                { role: "Frontend Architect", company: "CreativeAgency", year: "2020 - 2023" },
                { role: "UI Developer", company: "Freelance", year: "2018 - 2020" },
            ]
        }
    };

    const content = t[lang];

    return (
        <main className="min-h-screen pt-32 pb-20 container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                {/* LEFT COLUMN: IDENTITY & METRICS */}
                <div className="lg:col-span-5 flex flex-col gap-12">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-bold tracking-tighter mb-6"
                        >
                            {content.title}
                        </motion.h1>
                        <p className="text-sm font-sans uppercase tracking-widest text-muted-foreground mb-8 border-l-2 border-blue-500 pl-4">
                            {content.role}
                        </p>
                        <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-sans">
                            {content.bio}
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 border-t border-foreground/10 pt-8">
                        {content.stats.map((stat, i) => (
                            <div key={i}>
                                <span className="block text-2xl md:text-3xl font-bold mb-1">{stat.value}</span>
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-sans">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    <button className="flex items-center gap-3 px-6 py-4 bg-foreground text-background text-xs font-sans font-bold tracking-widest uppercase hover:bg-blue-600 transition-colors w-fit">
                        <span>{content.downloadCV}</span>
                        <RiDownloadLine className="w-4 h-4" />
                    </button>
                </div>

                {/* RIGHT COLUMN: TECHNICAL DATA */}
                <div className="lg:col-span-7 flex flex-col gap-16 lg:pt-8">

                    {/* History Section */}
                    <div>
                        <h3 className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-8 pb-4 border-b border-foreground/10 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            {content.historyTitle}
                        </h3>
                        <div className="space-y-0">
                            {content.history.map((item, i) => (
                                <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-foreground/10 hover:bg-foreground/5 transition-colors px-4 -mx-4">
                                    <div>
                                        <h4 className="text-xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-300">{item.role}</h4>
                                        <p className="text-muted-foreground font-sans text-sm">{item.company}</p>
                                    </div>
                                    <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground mt-2 md:mt-0 opacity-50 bg-foreground/5 px-2 py-1 rounded">
                                        {item.year}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stack Section (Abstract) */}
                    <div>
                        <h3 className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-8 pb-4 border-b border-foreground/10 flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full" />
                            {content.stackTitle}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {['Next.js', 'React', 'Tailwind', 'Node.js', 'Framer Motion', 'Sanity', 'TypeScript', 'Figma'].map((tech) => (
                                <span key={tech} className="px-4 py-2 border border-foreground/10 text-xs font-sans uppercase tracking-wider hover:border-foreground transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
