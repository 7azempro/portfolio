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
import { wrap } from "@motionone/utils";

export default function Marquee({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollyVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollyVelocity, {
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

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
            <motion.div className="flex flex-nowrap items-center" style={{ x }}>
                <span className="flex items-center gap-8 mr-8">{children}</span>
                <span className="flex items-center gap-8 mr-8">{children}</span>
                <span className="flex items-center gap-8 mr-8">{children}</span>
                <span className="flex items-center gap-8 mr-8">{children}</span>
            </motion.div>
        </div>
    );
}
