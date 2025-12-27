'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function TopLoader() {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 800); // Simulate load time on route change
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <div className="fixed top-0 left-0 right-0 z-[10000] pointer-events-none font-mono">
            {/* 1. The Progress Line (Scanner) - Gradient Upgrade */}
            {isLoading && (
                <motion.div
                    className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)]"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{
                        scaleX: [0, 0.4, 0.8, 1],
                        transition: { duration: 0.8, ease: "circOut" }
                    }}
                    exit={{ opacity: 0 }}
                />
            )}

            {/* 2. Tech Status Indicator (Relocated to Bottom Right for "System Monitor" feel) */}
            <AnimatePresence>
                {isLoading && (
                    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-[10001]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-[#050505] backdrop-blur-md border border-white/10 px-5 py-2 text-xs text-blue-400 tracking-widest uppercase flex items-center gap-3 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                        >
                            <div className="relative flex items-center justify-center">
                                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping absolute opacity-75" />
                                <span className="w-2 h-2 bg-blue-400 rounded-full relative" />
                            </div>
                            <span className="font-bold">SYSTEM_LOADING...</span>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
