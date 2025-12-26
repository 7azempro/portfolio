'use client';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

export default function ReadingGuide() {
    const mouseY = useMotionValue(0);
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.1 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <motion.div
                style={{ y: smoothY }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(239,68,68,1)]"
            >
                {/* Center marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full blur-[1px]" />
            </motion.div>
        </div>
    );
}
