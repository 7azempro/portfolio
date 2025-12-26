'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FocusSpotlight() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[9990] bg-black/50 mix-blend-hard-light"
            style={{
                // Radial gradient mask to create the spotlight hole
                maskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        />
    );
}
