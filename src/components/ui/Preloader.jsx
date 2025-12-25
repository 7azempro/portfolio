'use client';
import { motion } from 'framer-motion';

export default function Preloader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-background z-[9999]"
        >
            <div className="relative flex flex-col items-center">

                {/* Rotating Diamond */}
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ rotate: { duration: 2, repeat: Infinity, ease: "linear" }, scale: { duration: 1, repeat: Infinity } }}
                    className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-cyan-400 rotate-45 rounded-lg shadow-2xl shadow-blue-500/50 mb-8"
                />

                {/* Text Reveal */}
                <div className="flex items-center gap-1 overflow-hidden" dir="ltr" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold tracking-tighter"
                    >
                        7azem
                    </motion.span>
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl font-light text-muted-foreground"
                    >
                        pro
                    </motion.span>
                </div>
            </div>
        </motion.div>
    );
}
