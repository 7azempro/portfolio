'use client';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

export default function LiveCounter({ value, label, suffix = '', prefix = '' }) {
    // Parse numeric part for animation
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    // Keep non-numeric chars if any remaining in value that aren't covere by suffix? 
    // Usually value is "100" and suffix is "%".
    // If value is "4+", numeric is 4. Suffix passed separately or extracted?
    // The prop usually comes as value="4" suffix="+" from CMS or mapped. 
    // If value is "4+", we should extract the "+" to suffix if suffix is empty.

    // Auto-detect suffix if not provided but exists in value
    let finalSuffix = suffix;
    let finalNumeric = numericValue;

    if (!suffix && value.includes('+')) finalSuffix = '+';
    if (!suffix && value.includes('%')) finalSuffix = '%';

    return (
        <div className="flex flex-col items-start">
            <div className="flex items-baseline gap-1 mb-1">
                {prefix && <span className="text-xl md:text-2xl font-light text-blue-500/60">{prefix}</span>}

                <span className="text-4xl md:text-6xl font-black tracking-tighter text-foreground group-hover:text-blue-500 transition-colors duration-500">
                    <CountUp
                        end={finalNumeric}
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                        separator=","
                    />
                </span>

                {finalSuffix && <span className="text-xl md:text-2xl font-light text-blue-500 translate-y-[-4px]">{finalSuffix}</span>}
            </div>

            <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] rtl:tracking-normal text-muted-foreground/60 group-hover:text-blue-500/80 transition-colors font-bold">
                {label}
            </p>
        </div>
    );
}
