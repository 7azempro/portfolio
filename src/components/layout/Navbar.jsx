'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, PenTool, User, Languages } from 'lucide-react';
import { useLanguage } from '../../lib/context/LanguageContext';

const NavItem = ({ href, icon: Icon, label, isActive }) => (
    <Link href={href} className={`
        flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
        ${isActive ? 'bg-white text-black' : 'text-white/60 hover:text-white hover:bg-white/10'}
    `}>
        {Icon && <Icon size={16} />}
        <span className="text-sm font-medium">{label}</span>
    </Link>
);

const Navbar = () => {
    const pathname = usePathname();
    const { lang, toggleLanguage, t } = useLanguage();

    const navItems = [
        { href: '/', icon: Home, label: t?.nav?.home || 'Home' },
        { href: '/#work', icon: LayoutGrid, label: t?.nav?.work || 'Work' },
        { href: '/blog', icon: PenTool, label: t?.nav?.writing || 'Writing' },
        // { href: '#about', icon: User, label: 'About' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, x: '-50%' }}
            animate={{ y: 0, x: '-50%' }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-full"
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
            }}
        >
            <div className="flex items-center px-2">
                {navItems.map((item) => (
                    <NavItem
                        key={item.href}
                        {...item}
                        isActive={pathname === item.href}
                    />
                ))}
            </div>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <button
                onClick={toggleLanguage}
                className="w-10 h-10 flex items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-colors border border-transparent hover:border-white/10"
            >
                {lang === 'en' ? 'AR' : 'EN'}
            </button>

            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 ml-2">
                <img src="/profile.jpg" alt="Hazem" className="w-full h-full object-cover" />
            </div>

        </motion.nav>
    );
};

export default Navbar;
