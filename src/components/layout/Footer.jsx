'use client';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import Logo from '@/components/ui/Logo';
import { RiArrowRightUpLine } from 'react-icons/ri';

export default function Footer() {
    const { lang } = useLanguage();
    const year = new Date().getFullYear();

    const socials = [
        { name: "Twitter / X", link: "https://twitter.com/7azempro" },
        { name: "LinkedIn", link: "https://linkedin.com/in/7azempro" },
        { name: "GitHub", link: "https://github.com/7azempro" },
        { name: "Behance", link: "https://www.behance.net/hazempro" },
        { name: "Dribbble", link: "https://dribbble.com/7azempro" },
    ];

    return (
        <footer className="bg-background mt-32 border-t border-foreground/10">

            {/* 1. Header Row (Call to Action) */}
            <a
                href="mailto:hazem.gamal1@outlook.com"
                className="group block border-b border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-500"
            >
                <div className="container mx-auto px-6 py-16 md:py-24 flex items-center justify-between">
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">
                        {lang === 'ar' ? "ابدأ مشروعاً" : "START A PROJECT"}
                    </h2>
                    <RiArrowRightUpLine className="w-12 h-12 md:w-24 md:h-24 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" />
                </div>
            </a>

            {/* 2. Grid Row (Technical Directory) */}
            <div className="container mx-auto px-0 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-foreground/10 md:divide-x divide-foreground/10 rtl:divide-x-reverse">

                    {/* Col 1: Brand */}
                    <div className="p-8 md:p-12 md:border-l border-foreground/10 rtl:border-r rtl:border-l-0">
                        <Logo />
                        <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xs font-sans">
                            {lang === 'ar'
                                ? "تصميم وتطوير واجهات رقمية تركز على الأداء والجمال."
                                : "Designing and developing digital interfaces focused on performance and beauty."}
                        </p>
                    </div>

                    {/* Col 2: Socials */}
                    <div className="p-8 md:p-12 hover:bg-foreground/5 transition-colors border-t md:border-t-0 border-foreground/10">
                        <h4 className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-6">
                            {lang === 'ar' ? "تواصل" : "CONNECT"}
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {socials.map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg hover:text-blue-500 transition-colors flex items-center gap-2 group"
                                    >
                                        <span>{social.name}</span>
                                        <RiArrowRightUpLine className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Sitemap */}
                    <div className="p-8 md:p-12 hover:bg-foreground/5 transition-colors border-t md:border-t-0 border-foreground/10">
                        <h4 className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-6">
                            {lang === 'ar' ? "القائمة" : "INDEX"}
                        </h4>
                        <ul className="flex flex-col gap-3 font-medium">
                            <li><Link href="/" className="hover:text-blue-500 transition-colors">{lang === 'ar' ? "الرئيسية" : "Home"}</Link></li>
                            <li><Link href="/works" className="hover:text-blue-500 transition-colors">{lang === 'ar' ? "الأعمال" : "Works"}</Link></li>
                            <li><Link href="/about" className="hover:text-blue-500 transition-colors">{lang === 'ar' ? "عني" : "About"}</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Metadata */}
                    <div className="p-8 md:p-12 hover:bg-foreground/5 transition-colors border-t md:border-t-0 border-foreground/10">
                        <h4 className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-6">
                            {lang === 'ar' ? "بيانات" : "DATA"}
                        </h4>
                        <div className="space-y-6 font-sans text-sm">
                            <div>
                                <span className="block text-muted-foreground text-xs mb-1">LOCATION</span>
                                CAIRO, EG
                            </div>
                            <div>
                                <span className="block text-muted-foreground text-xs mb-1">LOCAL TIME</span>
                                GMT+2
                            </div>
                            <div>
                                <span className="block text-muted-foreground text-xs mb-1">VERSION</span>
                                3.0.0 (STABLE)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Bottom Row (Copyright) */}
            <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-muted-foreground uppercase tracking-widest">
                <p>© {year} 7AZEM.PRO</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <span className="hover:text-foreground cursor-pointer">PRIVACY</span>
                    <span className="hover:text-foreground cursor-pointer">LEGAL</span>
                </div>
            </div>
        </footer>
    );
}

