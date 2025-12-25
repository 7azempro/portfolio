'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { PiArrowUpRightLight, PiArrowRightLight } from 'react-icons/pi';
import { useLanguage } from '@/lib/context/LanguageContext';

// --- Configuration & Data ---
const STATIC_IMAGES = {
    '4': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop', // Behance (Abstract)
};

const FALLBACK_IMAGES = {
    '1': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200', // Medical
    '2': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200', // Real Estate
    '3': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200', // Travel
    '5': 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200', // Business
    '6': 'https://images.unsplash.com/photo-1555421689-492a6c3ae4eb?q=80&w=1200', // Tech
};

// Fallback Data if Sanity is empty
const FALLBACK_PROJECTS = [
    {
        _id: '1',
        title_ar: 'نادي الاستسقاء المصري', title_en: 'Egyptian Club of Ascites',
        category_ar: 'طبي / مؤسسي', category_en: 'Medical / Organization',
        year: '2025',
        link: 'https://egyptianclubofascites.com/',
        desc_ar: 'المنصة الرقمية الرسمية لنادي الاستسقاء المصري.', desc_en: 'Official digital presence for the Egyptian Club of Ascites.',
        color: 'bg-emerald-500'
    },
    // ... (Keep strictly necessary fallbacks to avoid clutter, or rely on empty state)
];

// --- Sub-Components ---

// Helper to safely get localized text from flat structure
const getLoc = (item, field, lang) => {
    // field: 'title', 'desc', 'category'
    // item: { title: '...', title_en: '...' }
    if (lang === 'ar') return item[field] || item[`${field}_ar`] || "";
    return item[`${field}_en`] || item[field] || "";
};

function ProjectCard({ project, lang }) {
    // Determine Image Source:
    // 1. If ID 4 (Behance), use Static Abstract.
    // 2. Otherwise, try Microlink (Live Screenshot).
    const imageUrl = project._id === '4'
        ? STATIC_IMAGES['4']
        : `https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&overlay.browser=dark&viewport.width=1280&viewport.height=800`;

    return (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative group-hover:-translate-y-2 transition-transform duration-500">
            {/* Browser Frame */}
            <div className="overflow-hidden rounded-xl border border-foreground/10 dark:border-white/10 bg-background/50 backdrop-blur-sm mb-6 shadow-2xl transition-all duration-700 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
                {/* Browser Toolbar */}
                <div className="h-9 bg-foreground/5 border-b border-foreground/5 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 group-hover:bg-amber-500 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors" />
                    <div className="flex-1 ml-4">
                        <div className="h-1.5 w-32 bg-foreground/5 rounded-full" />
                    </div>
                </div>

                {/* Viewport */}
                <div className="aspect-[16/9] relative group">
                    <img
                        src={imageUrl}
                        alt={getLoc(project, 'title', lang)}
                        className="absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-[1.1] group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
                        onError={(e) => {
                            // Fallback to Thematic Unsplash if Screenshot Fails
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = FALLBACK_IMAGES[project._id] || "https://placehold.co/1200x800/101010/FFFFFF/png?text=Preview";
                        }}
                    />

                    {/* Effects */}
                    <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay pointer-events-none" />
                    <div className="absolute inset-0 bg-foreground/5 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-500" />

                    {/* Action Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="px-6 py-3 rounded-full bg-background/90 backdrop-blur text-foreground border border-foreground/10 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-sans text-sm">
                            <span>VISIT_SITE</span>
                            <PiArrowUpRightLight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Meta Data */}
            <div className="flex justify-between items-start border-t border-foreground/10 dark:border-white/10 pt-6">
                <div>
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {getLoc(project, 'title', lang)}
                    </h3>
                    <p className="text-muted-foreground text-lg max-w-md">{getLoc(project, 'desc', lang)}</p>
                </div>
                <div className="text-right">
                    <span className="block text-4xl font-sans font-bold text-foreground/10 group-hover:text-foreground/30 transition-colors">
                        {project.year}
                    </span>
                    <span className="inline-block mt-2 px-3 py-1 bg-foreground/5 rounded text-xs font-sans text-foreground/60 uppercase tracking-wider">
                        {getLoc(project, 'category', lang) || "PROJECT"}
                    </span>
                </div>
            </div>
        </a>
    );
}

// --- Main Component ---

export default function ProjectSlider({ projects = [] }) {
    const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS;
    const containerRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: containerRef });
    const { lang } = useLanguage();

    const t = {
        ar: { title: "أعمال مختارة", subtitle: "مشروعات حية" },
        en: { title: "Selected Work", subtitle: "Live Projects" }
    };
    const content = t[lang];

    return (
        <section className="py-32 border-b border-foreground/5 dark:border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-16 flex items-end justify-between">
                <div>
                    <h2 className="text-6xl md:text-8xl tracking-tighter font-bold mb-4 text-foreground">
                        {content.title}
                    </h2>
                    <p className="text-xl text-muted-foreground font-sans uppercase tracking-widest pl-2 border-l-2 border-blue-500">
                        // {content.subtitle}
                    </p>
                </div>

                <div className="hidden md:flex flex-col gap-2 items-end">
                    <span className="text-xs font-sans text-muted-foreground">SCROLL_X</span>
                    <div className="w-48 h-1 bg-foreground/10 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-600 dark:bg-blue-500"
                            style={{ scaleX: scrollXProgress, transformOrigin: lang === 'ar' ? "right" : "left" }}
                        />
                    </div>
                </div>

            </div>

            {/* Mobile Floating Hint (Fixed relative to section) */}
            {/* Mobile Floating Hint (Centered Bottom) */}
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 md:hidden z-30 pointer-events-none">
                <div className="flex items-center gap-2 bg-background/90 backdrop-blur border border-foreground/10 px-4 py-2 rounded-full shadow-2xl animate-pulse whitespace-nowrap">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-blue-500">
                        {lang === 'ar' ? 'اسحب للتصفح' : 'SWIPE_TO_EXPLORE'}
                    </span>
                    <PiArrowRightLight className={`w-4 h-4 text-blue-500 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex gap-12 overflow-x-auto px-6 pb-20 snap-x snap-mandatory scrollbar-hide pt-4 relative"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {displayProjects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                        className="min-w-[90vw] md:min-w-[800px] snap-center group"
                    >
                        <ProjectCard project={project} lang={lang} />
                    </motion.div>
                ))}
            </div>
        </section >
    );
}
