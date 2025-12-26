import { useSound } from '@/lib/context/SoundContext';
import {
    PiMinusLight, PiPlusLight,
    PiSunLight, PiApertureLight, PiWaveformLight, PiSpeakerSlashLight,
    PiPauseLight, PiPlayLight, PiArrowCounterClockwise,
    PiWheelchairLight, PiGlobeLight, PiRowsLight, PiSpeakerHighLight
} from 'react-icons/pi';
import StatusHub from './StatusHub';
import SmartActions from './SmartActions';

export default function SystemTab({ content, lang, isOpen, a11y, setIsOpen }) {
    const {
        textScale, setTextScale,
        acModes, setAcModes,
        isReading, setIsReading,
        guide, setGuide
        // soundEnabled is now managed globally
    } = a11y;

    const { soundEnabled, toggleSound, playHover, playClick } = useSound();

    // ... (helper functions same as before)
    const withSound = (action) => () => {
        playClick();
        action();
    };

    const cycleColorMode = () => {
        if (acModes.includes('high-contrast')) {
            setAcModes(prev => prev.filter(m => m !== 'high-contrast').concat('grayscale'));
        } else if (acModes.includes('grayscale')) {
            setAcModes(prev => prev.filter(m => m !== 'grayscale').concat('invert'));
        } else if (acModes.includes('invert')) {
            setAcModes(prev => prev.filter(m => m !== 'invert').concat('yellow-black'));
        } else if (acModes.includes('yellow-black')) {
            setAcModes(prev => prev.filter(m => m !== 'yellow-black')); // Reset
        } else {
            setAcModes(prev => [...prev, 'high-contrast']);
        }
    };

    const toggleMotion = () => {
        setAcModes(prev => prev.includes('reduce-motion')
            ? prev.filter(m => m !== 'reduce-motion')
            : [...prev, 'reduce-motion']
        );
    };

    const resetAll = () => {
        setTextScale(1);
        setAcModes([]);
        setIsReading(false);
        setGuide(false);
        if (!soundEnabled) toggleSound(); // Reset to ON
    };

    const isActive = (key) => {
        if (key === 'color') return acModes.some(m => ['high-contrast', 'grayscale', 'invert', 'yellow-black'].includes(m));
        if (key === 'guide') return guide;
        if (key === 'speak') return isReading;
        if (key === 'motion') return acModes.includes('reduce-motion');
        if (key === 'sound') return !soundEnabled; // Highlight if MUTED
        return false;
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                <PiWheelchairLight className="w-4 h-4" />
                ACCESSIBILITY
            </h4>

            {/* 1. Text Scale "Control Strip" */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 flex items-center justify-between p-1.5 rounded-xl border border-dashed border-foreground/20 bg-foreground/5 relative group hover:border-foreground/40 transition-colors">
                    {/* Label Absolute (Top Center) - Optional, or just inline */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-background px-2 text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60">
                        Scale
                    </div>

                    <button
                        onMouseEnter={playHover}
                        onClick={withSound(() => setTextScale(prev => Math.max(0.8, prev - 0.1)))}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-background border border-foreground/10 hover:bg-foreground hover:text-background hover:border-foreground transition-all active:scale-95"
                    >
                        <PiMinusLight className="w-3 h-3" />
                    </button>

                    <div className="font-mono text-xs font-bold tracking-widest min-w-[3rem] text-center">
                        {Math.round(textScale * 100)}%
                    </div>

                    <button
                        onMouseEnter={playHover}
                        onClick={withSound(() => setTextScale(prev => Math.min(1.5, prev + 0.1)))}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-background border border-foreground/10 hover:bg-foreground hover:text-background hover:border-foreground transition-all active:scale-95"
                    >
                        <PiPlusLight className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* 2. Controls Grid */}
            <div className="grid grid-cols-3 gap-2">
                {/* Color */}
                <button
                    onMouseEnter={playHover}
                    onClick={withSound(cycleColorMode)}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all active:scale-95 aspect-square ${isActive('color') ? 'bg-foreground text-background border-foreground shadow-lg' : 'bg-foreground/5 border-transparent hover:border-foreground/20 hover:bg-foreground/10'}`}
                >
                    <PiSunLight className="w-5 h-5" />
                    <span className="text-[8px] font-bold font-mono uppercase tracking-widest">Color</span>
                </button>

                {/* Focus */}
                <button
                    onMouseEnter={playHover}
                    onClick={withSound(() => setGuide(guide === 'spotlight' ? false : 'spotlight'))}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all active:scale-95 aspect-square ${guide === 'spotlight' ? 'bg-foreground text-background border-foreground shadow-lg' : 'bg-foreground/5 border-transparent hover:border-foreground/20 hover:bg-foreground/10'}`}
                >
                    <PiApertureLight className="w-5 h-5" />
                    <span className="text-[8px] font-bold font-mono uppercase tracking-widest">Focus</span>
                </button>

                {/* Guide */}
                <button
                    onMouseEnter={playHover}
                    onClick={withSound(() => setGuide(guide === 'reading' ? false : 'reading'))}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all active:scale-95 aspect-square ${guide === 'reading' ? 'bg-foreground text-background border-foreground shadow-lg' : 'bg-foreground/5 border-transparent hover:border-foreground/20 hover:bg-foreground/10'}`}
                >
                    <PiRowsLight className="w-5 h-5" />
                    <span className="text-[8px] font-bold font-mono uppercase tracking-widest">Guide</span>
                </button>

                {/* Speak */}
                <button
                    onMouseEnter={playHover}
                    onClick={withSound(() => setIsReading(!isReading))}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all active:scale-95 aspect-square ${isActive('speak') ? 'bg-foreground text-background border-foreground shadow-lg' : 'bg-foreground/5 border-transparent hover:border-foreground/20 hover:bg-foreground/10'}`}
                >
                    <PiWaveformLight className="w-5 h-5" />
                    <span className="text-[8px] font-bold font-mono uppercase tracking-widest">Speak</span>
                </button>

                {/* Motion */}
                <button
                    onMouseEnter={playHover}
                    onClick={withSound(toggleMotion)}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all active:scale-95 aspect-square ${isActive('motion') ? 'bg-foreground text-background border-foreground shadow-lg' : 'bg-foreground/5 border-transparent hover:border-foreground/20 hover:bg-foreground/10'}`}
                >
                    {isActive('motion') ? <PiPauseLight className="w-5 h-5" /> : <PiPlayLight className="w-5 h-5" />}
                    <span className="text-[8px] font-bold font-mono uppercase tracking-widest">Motion</span>
                </button>

                {/* Sound */}
                <button
                    onMouseEnter={playHover}
                    onClick={withSound(toggleSound)}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all active:scale-95 aspect-square ${isActive('sound') ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20' : 'bg-foreground/5 border-transparent hover:border-foreground/20 hover:bg-foreground/10'}`}
                >
                    {soundEnabled ? <PiSpeakerHighLight className="w-5 h-5" /> : <PiSpeakerSlashLight className="w-5 h-5" />}
                    <span className="text-[8px] font-bold font-mono uppercase tracking-widest">Sound</span>
                </button>

                {/* Reset (Full Width) */}
                <button
                    onMouseEnter={playHover}
                    onClick={withSound(resetAll)}
                    className="col-span-3 flex items-center justify-center gap-3 p-3 rounded-xl border border-dashed border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500 hover:text-white transition-all active:scale-95 mt-2"
                >
                    <PiArrowCounterClockwise className="w-4 h-4" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Reset System Config</span>
                </button>
            </div>

            <div className="w-full h-px bg-foreground/5" />

            {/* Smart Actions (Context Aware) */}
            <SmartActions lang={lang} setIsOpen={setIsOpen} />

            {/* Status Hub (Live Reality) */}
            <div>
                <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
                    <PiGlobeLight className="w-4 h-4" />
                    {lang === 'ar' ? 'الحالة الحية' : 'LIVE_STATUS'}
                </h4>
                <StatusHub lang={lang} />
            </div>
        </div>
    );
}
