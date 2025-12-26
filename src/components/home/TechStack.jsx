'use client';
import Marquee from "@/components/ui/Marquee";
import { useLanguage } from "@/lib/context/LanguageContext";
import { getIcon, TechLabels } from "@/components/ui/IconMapper";

// Helper to render items
const RenderTechItems = ({ items }) => (
    items.map((item, i) => {
        // Resolve Icon from Mapper
        // CMS might send 'React', 'react', 'next.js' etc.
        // We normalize to lowercase and trim to match IconMapper keys.
        const rawKey = item.iconKey || '';
        const normKey = rawKey.toLowerCase().trim();

        const Icon = getIcon(normKey);

        // Use CMS name if provided, otherwise fallback to mapped label, then raw key
        const displayName = item.name || TechLabels[normKey] || rawKey;

        return (
            <div
                key={item._id || i}
                className="flex items-center gap-3 mx-8 md:mx-16 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 cursor-default group"
            >
                <Icon className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-500" />
                <span className="font-sans text-lg md:text-2xl font-bold tracking-tighter uppercase mt-1 hidden md:block text-foreground/80 group-hover:text-foreground transition-colors">
                    {displayName}
                </span>
            </div>
        );
    })
);

export default function TechStack({ data = [] }) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    const v1 = isAr ? 1 : -1;
    const v2 = isAr ? -1 : 1;

    // Fallback Data (Matches IconMapper keys)
    const FALLBACK_TECH = [
        { _id: '1', name: 'React', iconKey: 'react', row: 1 },
        { _id: '2', name: 'Next.js', iconKey: 'nextjs', row: 1 },
        { _id: '3', name: 'TypeScript', iconKey: 'typescript', row: 1 },
        { _id: '4', name: 'Tailwind', iconKey: 'tailwind', row: 1 },
        { _id: '5', name: 'Node.js', iconKey: 'nodejs', row: 2 },
        { _id: '6', name: 'Python', iconKey: 'python', row: 2 },
        { _id: '7', name: 'Figma', iconKey: 'figma', row: 2 },
        { _id: '8', name: 'Git', iconKey: 'git', row: 2 }
    ];

    // Priority: Sanity Data > Fallback
    // Ensure data is an array to prevent crashes
    const displayData = Array.isArray(data) ? data : [];

    // Filter rows (if data has 'row' field, otherwise split evenly or default to row 1)
    // If coming from CMS without explicit row, we might want to distribute them.
    // For now, assume Sanity schema has 'row'.
    const row1 = displayData.filter(item => item.row === 1 || !item.row); // Default to row 1
    const row2 = displayData.filter(item => item.row === 2);

    if (displayData.length === 0) return null;

    return (
        <section className="py-16 border-b border-foreground/5 dark:border-white/5 bg-background overflow-hidden relative" dir="ltr">

            {/* Gradient Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex flex-col gap-12">
                {/* Row 1 */}
                <Marquee baseVelocity={v1}>
                    <RenderTechItems items={row1} />
                </Marquee>

                {/* Row 2 */}
                {row2.length > 0 && (
                    <Marquee baseVelocity={v2}>
                        <RenderTechItems items={row2} />
                    </Marquee>
                )}
            </div>
        </section>
    );
}
