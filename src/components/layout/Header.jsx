'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PiListLight, PiXLight, PiArrowUpRightLight } from 'react-icons/pi';
import { useLanguage } from '@/lib/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';

export default function Header() {
    const { lang, toggleLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Close menu when route changes or lang changes
    useEffect(() => {
        setIsOpen(false);
    }, [lang]);

    const links = [
        { href: "/", label: { ar: "الرئيسية", en: "INDEX" } },
        { href: "/works", label: { ar: "أعمالي", en: "PROJECTS" } },
        { href: "/about", label: { ar: "عني", en: "BIO" } },
    ];

    const socials = [
        { name: "Twitter / X", link: "https://twitter.com/7azempro" },
        { name: "LinkedIn", link: "https://linkedin.com/in/7azempro" },
    ];

    return (
        <>
            {/* COMMAND BAR */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-foreground/10 h-20 transition-all duration-300">
                <div className="container mx-auto px-0 h-full flex items-center justify-between border-x border-foreground/10">

                    {/* 1. Brand Identity (Left) */}
                    <div className="h-full flex items-center px-6 md:px-8 border-r rtl:border-r-0 rtl:border-l border-foreground/10 md:w-auto w-full justify-between md:justify-start">
                        <Link href="/" onClick={() => setIsOpen(false)}>
                            <Logo />
                        </Link>

                        {/* Mobile Trigger (Inside Logo Box for Mobile) */}
                        <div className="flex items-center gap-4 md:hidden">
                            <button onClick={toggleLanguage} className="text-xs font-sans font-bold tracking-widest uppercase">
                                {lang === 'ar' ? 'EN' : 'AR'}
                            </button>
                            <button onClick={toggleMenu} className="p-2 -mr-2">
                                {isOpen ? <PiXLight className="w-6 h-6" /> : <PiListLight className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* 2. Desktop Navigation (Center-Right) */}
                    <nav className="hidden md:flex h-full flex-1 items-center justify-end">
                        <ul className="flex h-full">
                            {links.map((link) => (
                                <li key={link.href} className="h-full">
                                    <Link
                                        href={link.href}
                                        className="h-full flex items-center px-8 text-xs font-sans tracking-widest text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors uppercase border-l border-foreground/10 rtl:border-l-0 rtl:border-r"
                                    >
                                        {lang === 'ar' ? link.label.ar : link.label.en}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* 3. Tools (Right) */}
                    <div className="hidden md:flex h-full">
                        {/* Language */}
                        <button
                            onClick={toggleLanguage}
                            className="h-full px-6 flex items-center justify-center text-xs font-sans font-bold tracking-widest hover:bg-foreground/5 transition-colors border-l border-foreground/10 rtl:border-l-0 rtl:border-r w-20"
                        >
                            {lang === 'ar' ? 'EN' : 'AR'}
                        </button>

                        {/* CTA */}
                        <Link
                            href="mailto:hazem.gamal1@outlook.com"
                            className="h-full px-8 flex items-center gap-2 bg-foreground text-background hover:bg-blue-600 transition-colors text-xs font-sans tracking-widest uppercase border-l border-foreground/10 rtl:border-l-0 rtl:border-r"
                        >
                            <span>{lang === 'ar' ? "تواصل" : "LET'S_TALK"}</span>
                            <PiArrowUpRightLight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* MOBILE DIRECTORY OVERLAY (Strict Blueprint) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        className="fixed inset-0 z-40 bg-background flex flex-col pt-20"
                    >
                        {/* Directory Content */}
                        <div className="flex-1 container mx-auto px-6 py-12 flex flex-col justify-center">
                            <div className="flex flex-col gap-2">
                                {links.map((link, i) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={toggleMenu}
                                        className="group flex items-end justify-between border-b border-foreground/10 pb-4"
                                    >
                                        <motion.span
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 + (i * 0.1) }}
                                            className="text-[12vw] leading-none font-black tracking-tighter uppercase text-foreground group-hover:text-blue-500 transition-colors"
                                        >
                                            {lang === 'ar' ? link.label.ar : link.label.en}
                                        </motion.span>
                                        <PiArrowUpRightLight className="w-6 h-6 md:w-12 md:h-12 opacity-50 group-hover:opacity-100 transition-opacity mb-2" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Status Bar (Active Directory style) */}
                        <div className="border-t border-foreground/10 bg-foreground/5 py-8">
                            <div className="container mx-auto px-6 flex justify-between items-end">
                                <div>
                                    <h4 className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-4">
                                        {lang === 'ar' ? "تواصل" : "CONNECT"}
                                    </h4>
                                    <div className="flex flex-col gap-2">
                                        {socials.map((social) => (
                                            <a
                                                key={social.name}
                                                href={social.link}
                                                target="_blank"
                                                className="text-sm font-sans hover:text-blue-500 uppercase flex items-center gap-2"
                                            >
                                                {social.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                                        {lang === 'ar' ? "الموقع" : "LOCATION"}
                                    </h4>
                                    <p className="text-sm font-mono uppercase">CAIRO, EG</p>
                                    <p className="text-sm font-mono uppercase text-muted-foreground mt-1">GMT+2</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
