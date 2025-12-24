import { useState } from 'react';
import Link from 'next/link';
import { Menu, Globe, X } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';

export default function Header() {
    const { lang, toggleLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVariants = {
        closed: { opacity: 0, x: "100%" },
        open: { opacity: 1, x: 0, transition: { type: "spring", damping: 20 } }
    };

    const links = [
        { href: "/", label: { ar: "الرئيسية", en: "Home" } },
        { href: "/works", label: { ar: "أعمالي", en: "Work" } },
        { href: "/about", label: { ar: "عني", en: "About" } },
        { href: "/blog", label: { ar: "المقالات", en: "Blog" } },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/5 h-20 transition-all duration-300">
            <div className="container mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <Logo />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground items-center">
                    {links.map(link => (
                        <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
                            {lang === 'ar' ? link.label.ar : link.label.en}
                        </Link>
                    ))}

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 border border-border px-3 py-1.5 rounded-full hover:bg-secondary transition-colors text-xs"
                    >
                        <Globe className="w-3 h-3" />
                        {lang === 'ar' ? 'English' : 'العربية'}
                    </button>
                </nav>

                {/* Mobile Trigger */}
                <div className="flex items-center gap-4 md:hidden">
                    <button onClick={toggleLanguage} className="text-sm font-medium">
                        {lang === 'ar' ? 'EN' : 'AR'}
                    </button>
                    <button onClick={toggleMenu} className="p-2">
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 top-16 bg-background border-t border-border p-6 md:hidden flex flex-col gap-6"
                    >
                        {links.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={toggleMenu}
                                className="text-2xl font-bold hover:text-primary transition-colors"
                            >
                                {lang === 'ar' ? link.label.ar : link.label.en}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
