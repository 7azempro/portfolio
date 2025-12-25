'use client';
import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";

// Inline wrap utility to avoid dependency issues
const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function Marquee({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // Safeguard velocity
        const velocity = velocityFactor.get();
        if (velocity) {
            if (velocity < 0) {
                directionFactor.current = -1;
            } else if (velocity > 0) {
                directionFactor.current = 1;
            }
            moveBy += directionFactor.current * moveBy * velocity;
        }

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap pointer-events-none select-none">
            <motion.div className="flex flex-nowrap items-center" style={{ x }}>
                <span className="flex items-center gap-8 mr-8">{children}</span>
                <span className="flex items-center gap-8 mr-8">{children}</span>
                <span className="flex items-center gap-8 mr-8">{children}</span>
                <span className="flex items-center gap-8 mr-8">{children}</span>
            </motion.div>
        </div>
    );
}
