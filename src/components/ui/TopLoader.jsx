'use client';
import { motion } from 'framer-motion';

export default function TopLoader() {
    return (
        <div className="fixed top-0 left-0 right-0 z-[10000] pointer-events-none font-mono">
            {/* 1. The Progress Line (Scanner) */}
            <motion.div
                className="h-[2px] w-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{
                    scaleX: [0, 0.5, 0.8, 0.95],
                    transition: { duration: 4, ease: "circOut" }
                }}
            />

            {/* 2. Tech Status Indicator (Top Right) */}
            <div className="absolute top-2 right-4 flex items-center gap-3">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] text-blue-400 tracking-widest uppercase flex items-center gap-2 rounded-full"
                >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    <span>Processing_Request</span>
                </motion.div>
            </div>

            {/* 3. Ambient Glow Overlay (Top) */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
        </div>
    );
}
