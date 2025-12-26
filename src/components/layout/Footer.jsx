'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import Logo from '@/components/ui/Logo';
import {
    PiArrowUpRightLight, PiTwitterLogoLight, PiLinkedinLogoLight, PiGithubLogoLight,
    PiInstagramLogoLight, PiBehanceLogoLight, PiCalendarCheckLight, PiSparkleLight
} from 'react-icons/pi';
import { SiUpwork } from 'react-icons/si';
import { useSound } from '@/lib/context/SoundContext';
import { getIcon } from '@/components/ui/IconMapper';
import UpworkCard from '@/components/ui/UpworkCard';

export default function Footer({ socials }) {
    const { lang } = useLanguage();
    const { playHover, playClick } = useSound();
    const year = new Date().getFullYear();
    const [isUpworkHovered, setIsUpworkHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePos({ x, y });
    };

    // Default Fallback
    const defaultSocials = [
        { name: "Twitter / X", link: "https://twitter.com/7azempro", iconKey: "twitter" },
        { name: "LinkedIn", link: "https://linkedin.com/in/7azempro", iconKey: "linkedin" },
        { name: "GitHub", link: "https://github.com/7azempro", iconKey: "github" },
        { name: "Behance", link: "https://www.behance.net/hazempro", iconKey: "behance" },
        { name: "Dribbble", link: "https://dribbble.com/7azempro", iconKey: "dribbble" },
    ];

    const displaySocials = (socials || defaultSocials).map(s => ({
        name: s.platform || s.name,
        link: s.url || s.link,
        Icon: getIcon(s.iconKey) || PiArrowUpRightLight
    }));

    return (
        <footer className="bg-background mt-32 border-t border-foreground/10 text-foreground">

            {/* 1. DUAL CTA ROW (Project | Consultation) */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-foreground/10 divide-y md:divide-y-0 md:divide-x divide-foreground/10 rtl:divide-x-reverse">

                {/* CTA 1: Start Project */}
                <a
                    href="mailto:hazem.gamal1@outlook.com"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="group relative block p-8 md:p-16 hover:bg-foreground hover:text-background transition-all duration-500 overflow-hidden"
                >
                    {/* Hover Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0" />

                    <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                        <div className="flex items-start justify-between">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase max-w-md">
                                {lang === 'ar' ? "ابدأ مشروعك" : "START A PROJECT"}
                            </h2>
                            <PiArrowUpRightLight className="w-8 h-8 md:w-12 md:h-12 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:-scale-x-100" />
                        </div>
                        <p className="text-sm opacity-60 font-mono tracking-widest uppercase">
                            {lang === 'ar' ? "حوّل فكرتك لواقع" : "TURN YOUR IDEA INTO REALITY"}
                        </p>
                    </div>
                </a>

                {/* CTA 2: Book Consultation (Upwork) */}
                <a
                    href="https://www.upwork.com/services/consultation/development-it-hazem-1937212328936650549?ref=project_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={() => { playHover(); setIsUpworkHovered(true); }}
                    onMouseLeave={() => { setIsUpworkHovered(false); setMousePos({ x: 0, y: 0 }); }}
                    onMouseMove={handleMouseMove}
                    className="group relative block p-8 md:p-16 transition-all duration-500 z-10 hover:z-50"
                >
                    {/* Background & Shine Container (Clipped) */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        {/* Green Background Fade */}
                        <div className="absolute inset-0 bg-[#14a800] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                    </div>

                    {/* Magnetic Card (Overflows Parent) */}
                    <UpworkCard isHovered={isUpworkHovered} mousePos={mousePos} />

                    <div className="flex flex-col h-full justify-between gap-8 relative z-10 transition-opacity duration-300">
                        <div className="flex items-start justify-between">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase max-w-md group-hover:text-white group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-colors duration-300 transform translate-z-0">
                                {lang === 'ar' ? "احجز استشارة" : "BOOK A CONSULTATION"}
                            </h2>
                            <SiUpwork className="w-8 h-8 md:w-12 md:h-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:text-white group-hover:drop-shadow-md" />
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm opacity-60 font-mono tracking-widest uppercase group-hover:opacity-100 group-hover:text-white flex items-center gap-2 font-bold">
                                <span className="w-2 h-2 rounded-full bg-[#14a800] group-hover:bg-white animate-pulse" />
                                {lang === 'ar' ? "نصيحة وخبرة عبر UPWORK" : "EXPERT ADVICE VIA UPWORK"}
                            </p>
                            <span className="bg-foreground/5 group-hover:bg-white/20 group-hover:text-white px-3 py-1 rounded-full text-xs font-bold font-sans backdrop-blur-sm transition-colors border border-transparent group-hover:border-white/30 shadow-sm">
                                $5.00 / 30m
                            </span>
                        </div>
                    </div>
                </a>
            </div>

            {/* 2. Grid Row (Technical Directory) */}
            <div className="container mx-auto px-0 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-foreground/10 md:divide-x divide-foreground/10 rtl:divide-x-reverse">

                    {/* Col 1: Brand */}
                    <div className="p-8 md:p-12 md:border-l border-foreground/10 rtl:border-r rtl:border-l-0">
                        <Logo className="text-4xl md:text-5xl mb-4 w-fit" />
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
                            {displaySocials.map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={playClick}
                                        onMouseEnter={playHover}
                                        className="text-lg hover:text-blue-500 transition-colors flex items-center gap-2 group"
                                    >
                                        <social.Icon className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <span>{social.name}</span>
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
                            <li><Link href="/" onClick={playClick} onMouseEnter={playHover} className="hover:text-blue-500 transition-colors">{lang === 'ar' ? "الرئيسية" : "Home"}</Link></li>
                            <li><Link href="/works" onClick={playClick} onMouseEnter={playHover} className="hover:text-blue-500 transition-colors">{lang === 'ar' ? "الأعمال" : "Works"}</Link></li>
                            <li><Link href="/about" onClick={playClick} onMouseEnter={playHover} className="hover:text-blue-500 transition-colors">{lang === 'ar' ? "عني" : "About"}</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Metadata */}
                    <div className="p-8 md:p-12 hover:bg-foreground/5 transition-colors border-t md:border-t-0 border-foreground/10">
                        <h4 className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-6">
                            {lang === 'ar' ? "بيانات" : "DATA"}
                        </h4>
                        <div className="space-y-6 font-sans text-sm">
                            <div>
                                <span className="block text-muted-foreground text-xs mb-1">{lang === 'ar' ? 'الموقع' : 'LOCATION'}</span>
                                {lang === 'ar' ? 'القاهرة، مصر' : 'CAIRO, EG'}
                            </div>
                            <div>
                                <span className="block text-muted-foreground text-xs mb-1">{lang === 'ar' ? 'التوقيت المحلي' : 'LOCAL TIME'}</span>
                                GMT+2
                            </div>
                            <div>
                                <span className="block text-muted-foreground text-xs mb-1">{lang === 'ar' ? 'الإصدار' : 'VERSION'}</span>
                                3.1.0 ({lang === 'ar' ? 'مستقر' : 'STABLE'})
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Bottom Row (Copyright) */}
            <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-muted-foreground uppercase tracking-widest">
                <p>© {year} 7AZEM.PRO</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="/legal" className="hover:text-foreground cursor-pointer">{lang === 'ar' ? 'السياسات والأحكام' : 'LEGAL_FRAMEWORK'}</Link>
                </div>
            </div>
        </footer>
    );
}
