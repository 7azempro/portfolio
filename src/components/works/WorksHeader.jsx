'use client';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function WorksHeader({ settings }) {
    const { lang } = useLanguage();

    return (
        <div className="pt-32 pb-12 container mx-auto px-6">
            <div className="flex items-end justify-between border-b border-foreground/10 pb-8 mb-12">
                <h1 className="text-4xl md:text-6xl tracking-tighter font-bold uppercase">
                    {lang === 'ar' ? (settings?.projects_title || "أعمال مختارة") : (settings?.projects_title_en || "Selected Work")}
                </h1>
                <span className="hidden md:block font-sans text-xs uppercase tracking-widest text-muted-foreground">
                    {lang === 'ar' ? "// الأرشيف" : (settings?.projects_subtitle_en || "// ARCHIVE")}
                </span>
            </div>
        </div>
    );
}
