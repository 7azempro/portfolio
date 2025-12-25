'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className = "", onClick }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;

        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Slightly increased ease for smoother feel
        setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            onClick={onClick}
            className={`relative overflow-visible z-10 group ${className}`} // changed overflow-hidden to visible just in case, and ensured z-index
        >
            <span className="relative z-10 block">{children}</span>
        </motion.button>
    );
}
