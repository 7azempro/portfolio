'use client';

import { useEffect } from "react";
import { toast } from 'sonner';
import SmartCompass from '@/components/ui/SmartCompass';

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        // Log to console for Vercel Runtime Logs
        console.error("CRITICAL_SYSTEM_FAILURE:", error);
    }, [error]);

    const errorCode = error.digest || Math.random().toString(36).substring(7).toUpperCase();

    const handleCopyReport = () => {
        const report = `[CRITICAL_ERROR] [CODE: ${errorCode}] [TIME: ${new Date().toISOString()}] \n${error.message}`;
        navigator.clipboard.writeText(report);
        toast.success("Error report copied to clipboard");
    };

    return (
        <html lang="en">
            <body className="bg-[#030303] text-white font-sans flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden relative">

                {/* Ambient Red Alert */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

                <main className="flex flex-col items-center max-w-md w-full gap-8 z-10 relative">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">System Critical</h1>
                            <p className="text-white/60 text-sm font-mono mt-1">REF: {errorCode}</p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 w-full">
                        <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-lg font-mono text-xs text-red-400 break-all border-l-4 border-l-red-500/50">
                            {error.message || "Unknown Structural Failure"}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => reset()}
                                className="bg-white text-black px-6 py-3 rounded-md font-bold hover:bg-white/90 transition-colors flex-1"
                            >
                                Reboot System
                            </button>
                            <button
                                onClick={handleCopyReport}
                                className="bg-white/5 hover:bg-white/10 text-xs py-3 px-4 rounded-md text-white/70 transition-colors border border-white/5 flex items-center justify-center"
                                title="Copy Error Report"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                            </button>
                        </div>
                    </div>

                    <SmartCompass />

                </main>
            </body>
        </html>
    );
}
