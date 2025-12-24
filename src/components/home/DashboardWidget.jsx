'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

// Counter Component
function Counter({ from, to, duration, suffix = "", decimals = 0, colorClass = "" }) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => latest.toFixed(decimals) + suffix);
    const [display, setDisplay] = useState(from.toFixed(decimals) + suffix);

    useEffect(() => {
        const controls = animate(count, to, { duration: duration, ease: "circOut" });
        return controls.stop;
    }, [count, to, duration]);

    useEffect(() => {
        const unsubscribe = rounded.on("change", (v) => setDisplay(v));
        return unsubscribe;
    }, [rounded]);

    return <span className={`font-sans font-bold text-2xl ${colorClass}`}>{display}</span>;
}

// Live Graph Component
function LiveArchitectureGraph() {
    return (
        <div className="flex gap-2 h-16 items-end">
            {[40, 70, 50, 90].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: `${h}%` }}
                    animate={{ height: [`${h}%`, `${Math.max(20, h + (Math.random() * 40 - 20))}%`, `${h}%`] }}
                    transition={{
                        duration: 3 + Math.random(),
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                    className="w-1/4 rounded-t-sm bg-blue-500 hover:bg-blue-400 transition-colors cursor-pointer"
                    style={{ opacity: 0.2 + (i * 0.1) }}
                />
            ))}
        </div>
    );
}



// User Time Widget (24h Format)
function UserTimeDisplay() {
    const [timeData, setTimeData] = useState({ time: "", date: "" });

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // 24-hour time
            const timeStr = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            // Date: DD/MM/YYYY
            const dateStr = now.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            setTimeData({ time: timeStr, date: dateStr });
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!timeData.time) return <span>INITIALIZING...</span>;

    return (
        <span className="flex items-center gap-3">
            <span>{timeData.date}</span>
            <span className="w-px h-3 bg-muted-foreground/30" />
            <span className="text-foreground font-bold">{timeData.time}</span>
        </span>
    );
}

import { useLanguage } from '@/lib/context/LanguageContext';

// Performance Cycler Component
function PerformanceCycler() {
    const { lang } = useLanguage();

    const t = {
        ar: { perf: "الأداء", access: "سهولة الوصول", seo: "تصدر النتائج" },
        en: { perf: "Performance", access: "Accessibility", seo: "SEO" }
    };

    const metrics = [
        { label: t[lang].perf, value: 100, color: "text-emerald-500" },
        { label: t[lang].access, value: 100, color: "text-blue-500" },
        { label: t[lang].seo, value: 100, color: "text-purple-500" },
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % metrics.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [lang]); // Reset on lang change

    const metric = metrics[index];

    return (
        <div className="flex flex-col h-full justify-between">
            <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col"
            >
                <span className={`text-xs uppercase tracking-wider block mb-2 transition-colors ${metric.color}`}>
                    {metric.label}
                </span>
                <span className={`font-sans font-bold text-2xl ${metric.color}`}>
                    {metric.value}%
                </span>
            </motion.div>

            {/* Tiny Progress Bar */}
            <div className="w-full h-1 bg-foreground/10 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                <motion.div
                    key={`bar-${index}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className={`h-full ${metric.color.replace('text-', 'bg-')}`}
                />
            </div>
        </div>
    );
}

export default function DashboardWidget() {
    const { lang } = useLanguage();

    const t = {
        ar: {
            system: "النظام_نشط",
            uptime: "وقت العمل",
            traffic: "حركة المرور",
            logs: "سجلات النظام",
            cpu: "المعالج",
            memory: "الذاكرة"
        },
        en: {
            system: "System_Active",
            uptime: "Uptime",
            traffic: "Traffic",
            logs: "Sys_Logs",
            cpu: "CPU_Load",
            memory: "Memory"
        }
    };

    const content = t[lang];

    return (
        <div className="w-full bg-foreground/5 dark:bg-white/5 backdrop-blur-3xl border border-foreground/10 dark:border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-colors duration-500">

            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b border-foreground/10 dark:border-white/10 pb-6">
                <div className="flex gap-4 items-center">
                    {/* Diamond Logo */}
                    <div className="w-12 h-12 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-400 rotate-45 shadow-lg shadow-blue-500/20 flex items-center justify-center">
                            <span className="text-white font-black text-xl -rotate-45 select-none">7</span>
                        </div>
                    </div>
                    <div className="flex flex-col text-foreground">
                        <span className="text-sm font-bold tracking-widest uppercase">{content.system}</span>
                        <span className="text-xs text-muted-foreground font-sans mt-1">
                            <UserTimeDisplay />
                        </span>
                    </div>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse relative">
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
                </div>
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-2 gap-4">

                {/* Uptime Module */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-foreground/5 dark:bg-white/5 p-4 rounded-xl border border-foreground/5 dark:border-white/5 cursor-crosshair group"
                >
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-2 group-hover:text-blue-500 transition-colors">
                        {content.uptime}
                    </span>
                    <Counter from={0} to={99.9} duration={2} suffix="%" decimals={1} colorClass="text-foreground" />
                </motion.div>


                {/* Performance Module (Replaces Latency) */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-foreground/5 dark:bg-white/5 p-4 rounded-xl border border-foreground/5 dark:border-white/5 cursor-crosshair group relative overflow-hidden"
                >
                    <PerformanceCycler />
                </motion.div>

                {/* Architecture Graph Module */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-foreground/5 dark:bg-white/5 p-4 rounded-xl border border-foreground/5 dark:border-white/5 relative overflow-hidden group min-h-[120px]"
                >
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-4 group-hover:text-purple-500 transition-colors">
                        {content.traffic}
                    </span>
                    <LiveArchitectureGraph />
                </motion.div>

                {/* System Logs Module (New) */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-foreground/5 dark:bg-white/5 p-4 rounded-xl border border-foreground/5 dark:border-white/5 relative overflow-hidden group min-h-[120px] flex flex-col"
                >
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-2 group-hover:text-amber-500 transition-colors">
                        {content.logs}
                    </span>
                    <div className="flex-1 overflow-hidden relative mask-linear-fade">
                        <div className="flex flex-col gap-1 text-[10px] font-sans text-muted-foreground opacity-70" dir="ltr">
                            <span className="text-emerald-500/80">&gt; init_core.js [OK]</span>
                            <span>&gt; loading_assets...</span>
                            <span>&gt; fetching_data {`{20ms}`}</span>
                            <span className="text-blue-500/80">&gt; connected_to_v3</span>
                            <span>&gt; verifying_hash...</span>
                        </div>
                    </div>
                </motion.div>

                {/* Resource Dials (New Row) */}
                <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div className="bg-foreground/5 dark:bg-white/5 p-3 rounded-lg border border-foreground/5 dark:border-white/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase text-muted-foreground font-sans">{content.cpu}</span>
                        <div className="h-1.5 w-24 bg-foreground/10 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: ["40%", "70%", "30%", "50%"] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="h-full bg-blue-500 rounded-full"
                            />
                        </div>
                    </div>
                    <div className="bg-foreground/5 dark:bg-white/5 p-3 rounded-lg border border-foreground/5 dark:border-white/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase text-muted-foreground font-sans">{content.memory}</span>
                        <div className="h-1.5 w-24 bg-foreground/10 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: ["60%", "65%", "55%", "62%"] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="h-full bg-purple-500 rounded-full"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
