'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SmartCompass() {
    const pathname = usePathname();

    const routes = [
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/works' },
        { name: 'About', path: '/about' },
        { name: 'Articles', path: '/articles' }
    ];

    // Filter out current page if possible (though for 404/Error it doesn't matter much as path is likely broken)
    const suggestions = routes.filter(r => r.path !== pathname);

    return (
        <div className="w-full max-w-md mx-auto mt-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
            >
                {/* Decorative "Scanner" Line */}
                <motion.div
                    initial={{ top: 0 }}
                    animate={{ top: "100%" }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                />

                <div className="text-center mb-6">
                    <h3 className="text-sm uppercase tracking-widest text-white/50 font-mono mb-2">Smart Navigation</h3>
                    <p className="text-white/80">I can help you find what you were looking for.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {suggestions.map((route, i) => (
                        <Link key={route.path} href={route.path} className="group relative block">
                            <motion.div
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.98 }}
                                className="px-4 py-3 rounded-lg bg-white/5 border border-white/5 transition-colors flex items-center justify-between"
                            >
                                <span className="text-sm font-medium text-white group-hover:text-white transition-colors">
                                    {route.name}
                                </span>
                                <span className="text-white/20 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300">
                                    →
                                </span>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-center">
                    <p className="text-xs text-white/40 font-mono">
                        COORDINATES: {pathname}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
