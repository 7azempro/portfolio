'use client';
import Marquee from "@/components/ui/Marquee";
// Icons are now mapped in IconMapper
import { useLanguage } from "@/lib/context/LanguageContext";

import { getIcon } from "@/components/ui/IconMapper";

// Helper to render items
const RenderTechItems = ({ items }) => (
    items.map((item, i) => {
        const Icon = getIcon(item.iconKey);
        return (
            <div key={item._id || i} className="flex items-center gap-2 mx-4 md:mx-8 text-foreground/40 font-sans text-sm md:text-xl font-bold tracking-tighter uppercase whitespace-nowrap">
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                <span>{item.name}</span>
            </div>
        );
    })
);

export default function TechStack({ data = [] }) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    const v1 = isAr ? 1 : -1;
    const v2 = isAr ? -1 : 1;

    // Filter by Row (if data exists)
    // If no data (first load), use fallback? User said "everything from sanity", so maybe empty is fine.
    // But to avoid ugly empty space, let's keep fallback for now OR show nothing.
    // Let's assume user WILL add data.

    const row1 = data.filter(item => item.row === 1);
    const row2 = data.filter(item => item.row === 2);

    if (data.length === 0) return null; // Hide if no data

    return (
        <section className="py-12 border-b border-foreground/5 dark:border-white/5 bg-background overflow-hidden relative" dir="ltr">

            {/* Gradient Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex flex-col gap-8 opacity-80 hover:opacity-100 transition-opacity duration-500">
                {/* Row 1 */}
                <Marquee baseVelocity={v1}>
                    <RenderTechItems items={row1} />
                </Marquee>

                {/* Row 2 */}
                <Marquee baseVelocity={v2}>
                    <RenderTechItems items={row2} />
                </Marquee>
            </div>
        </section>
    );
}
