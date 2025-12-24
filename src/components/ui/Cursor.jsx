'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function Cursor() {
    const [isPointer, setIsPointer] = useState(false);

    // Mouse position state
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for smooth trailing
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);

            // Check if hovering over clickable element
            const target = e.target;
            setIsPointer(
                window.getComputedStyle(target).getPropertyValue("cursor") === "pointer" ||
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a'
            );
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary z-[9999] pointer-events-none hidden md:flex items-center justify-center mix-blend-exclusion"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
            animate={{
                scale: isPointer ? 1.5 : 1,
                backgroundColor: isPointer ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
            }}
        >
            <div className="w-1 h-1 bg-primary rounded-full absolute" />
        </motion.div>
    );
}
