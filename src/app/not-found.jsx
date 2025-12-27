import Link from 'next/link';
import SmartCompass from '@/components/ui/SmartCompass';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] p-8 text-center space-y-8 relative overflow-hidden bg-[#050505] text-white">
            {/* Ambient Backlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <h1 className="text-[120px] sm:text-[180px] font-black leading-none opacity-5 select-none font-mono tracking-tighter">404</h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/5">
                        <span className="font-mono text-xl font-bold tracking-widest text-white">NULL</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4 max-w-lg relative z-10">
                <h2 className="text-3xl font-bold tracking-tight">Out of Bounds</h2>
                <p className="text-white/60 leading-relaxed">
                    You've ventured beyond the blueprint. The structure you're looking for hasn't been built yet, or it was demolished in a previous version.
                </p>
            </div>

            <SmartCompass />
        </div>
    );
}
