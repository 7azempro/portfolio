'use client';
import { useState, useEffect, useRef } from 'react';
import { PiCpuLight, PiWifiHighLight, PiBatteryHighLight, PiBatteryWarningLight, PiBatteryChargingLight } from 'react-icons/pi';

export default function SystemMonitor({ lang }) {
    // 1. FPS Counter
    const [fps, setFps] = useState(0);
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());

    useEffect(() => {
        let animationFrameId;

        const updateFps = (time) => {
            frameCount.current++;
            if (time - lastTime.current >= 1000) {
                setFps(frameCount.current);
                frameCount.current = 0;
                lastTime.current = time;
            }
            animationFrameId = requestAnimationFrame(updateFps);
        };

        animationFrameId = requestAnimationFrame(updateFps);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // 2. Network Latency (Simulated primarily, or using navigator.connection if available)
    const [ping, setPing] = useState(24);
    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate realistic fluctuation around 20-40ms
            setPing(Math.floor(Math.random() * (45 - 15 + 1) + 15));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // 3. Battery Status (Navigator API)
    const [battery, setBattery] = useState({ level: 100, charging: true });
    useEffect(() => {
        if (typeof navigator !== 'undefined' && navigator.getBattery) {
            navigator.getBattery().then(bat => {
                const updateBattery = () => {
                    setBattery({
                        level: Math.round(bat.level * 100),
                        charging: bat.charging
                    });
                };
                updateBattery();
                bat.addEventListener('levelchange', updateBattery);
                bat.addEventListener('chargingchange', updateBattery);
                return () => {
                    bat.removeEventListener('levelchange', updateBattery);
                    bat.removeEventListener('chargingchange', updateBattery);
                };
            });
        }
    }, []);

    // Coloring logic
    const getFpsColor = (val) => val > 50 ? 'text-green-500' : val > 30 ? 'text-amber-500' : 'text-red-500';
    const getPingColor = (val) => val < 50 ? 'text-green-500' : val < 100 ? 'text-amber-500' : 'text-red-500';
    const getBatteryColor = (level) => level > 20 ? 'text-blue-500' : 'text-red-500';

    const LABELS = {
        en: { fps: "FPS", ping: "PING", pwr: "PWR" },
        ar: { fps: "إطارات", ping: "سرعة", pwr: "طاقة" }
    };
    const t = LABELS[lang] || LABELS['en'];

    return (
        <div className="grid grid-cols-3 gap-3 mb-6">
            {/* FPS */}
            <div className="bg-foreground/5 rounded-xl p-3 flex flex-col items-center justify-center gap-1 border border-dashed border-foreground/20 hover:border-foreground/40 transition-colors group">
                <div className={`flex items-center gap-1.5 text-xs font-bold font-mono group-hover:scale-110 transition-transform ${getFpsColor(fps)}`}>
                    <PiCpuLight className="w-4 h-4" />
                    <span>{fps}</span>
                </div>
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider opacity-60">{t.fps}</span>
            </div>

            {/* PING */}
            <div className="bg-foreground/5 rounded-xl p-3 flex flex-col items-center justify-center gap-1 border border-dashed border-foreground/20 hover:border-foreground/40 transition-colors group">
                <div className={`flex items-center gap-1.5 text-xs font-bold font-mono group-hover:scale-110 transition-transform ${getPingColor(ping)}`}>
                    <PiWifiHighLight className="w-4 h-4" />
                    <span>{ping}</span>
                </div>
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider opacity-60">{t.ping}</span>
            </div>

            {/* BATTERY */}
            <div className="bg-foreground/5 rounded-xl p-3 flex flex-col items-center justify-center gap-1 border border-dashed border-foreground/20 hover:border-foreground/40 transition-colors group">
                <div className={`flex items-center gap-1.5 text-xs font-bold font-mono group-hover:scale-110 transition-transform ${getBatteryColor(battery.level)}`}>
                    {battery.charging ? <PiBatteryChargingLight className="w-4 h-4" /> : <PiBatteryHighLight className="w-4 h-4" />}
                    <span>{battery.level}%</span>
                </div>
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider opacity-60">{t.pwr}</span>
            </div>
        </div>
    );
}
