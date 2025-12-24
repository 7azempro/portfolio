'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../providers/LanguageProvider';
import { motion } from 'framer-motion';
import { Home, PenTool, LayoutGrid } from 'lucide-react';

const NavItem = ({ href, icon: Icon, label, isActive }) => (
    <Link href={href} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '20px',
        background: isActive ? 'var(--text-color)' : 'transparent',
        color: isActive ? 'var(--bg-color)' : 'var(--text-muted)',
        transition: 'all 0.3s ease',
        fontSize: '0.9rem',
        fontWeight: 500
    }}>
        {Icon && <Icon size={16} />}
        <span>{label}</span>
    </Link>
);

const Navbar = () => {
    const { lang, toggleLanguage, t } = useLanguage();
    const pathname = usePathname();

    return (
        <motion.nav
            initial={{ y: -100, x: '-50%' }}
            animate={{ y: 0, x: '-50%' }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
            style={{
                position: 'fixed',
                top: '24px',
                left: '50%',
                zIndex: 1000,
                background: 'var(--nav-bg)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid var(--card-border)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                direction: 'ltr' // Force LTR for Navbar layout consistency
            }}
        >
            {/* Navigation Links */}
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '6px' }}>
                <NavItem href="/" icon={Home} label={t.nav.home} isActive={pathname === '/'} />
                <NavItem href="/#work" icon={LayoutGrid} label={t.nav.work} isActive={pathname === '/#work'} />
                <NavItem href="/blog" icon={PenTool} label={t.nav.writing || "Writing"} isActive={pathname.startsWith('/blog')} />
            </div>

            <div style={{ width: '1px', height: '24px', background: 'var(--card-border)', margin: '0 4px' }}></div>

            {/* Language Toggle */}
            <button
                onClick={toggleLanguage}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid var(--card-border)',
                    background: 'transparent',
                    color: 'var(--text-color)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    fontSize: '0.8rem'
                }}
            >
                {lang === 'en' ? 'AR' : 'EN'}
            </button>

            {/* Profile Avatar */}
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
                <img src="/profile.jpg" alt="Hazem" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

        </motion.nav>
    );
};

export default Navbar;
