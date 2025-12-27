'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import SmartCompass from '@/components/ui/SmartCompass';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log to console for Vercel Runtime Logs
        console.error("PAGE_LEVEL_ERROR:", error);
    }, [error]);

    const errorCode = error.digest || "ERR_UNKNOWN";

    const handleCopyReport = () => {
        const report = `[PAGE_ERROR] [CODE: ${errorCode}] [TIME: ${new Date().toISOString()}] \n${error.message}`;
        navigator.clipboard.writeText(report);
        toast.success("Error report copied to clipboard");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center space-y-8">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">System Glitch Detected</h2>
                <div className="bg-muted px-4 py-2 rounded-lg font-mono text-xs text-muted-foreground w-fit mx-auto border border-foreground/5">
                    REF: {errorCode}
                </div>
            </div>

            <div className="max-w-md text-muted-foreground space-y-6">
                <p>
                    A local component failure has occurred. The rest of the structure is intact.
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => reset()}
                        className="bg-foreground text-background px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
                    >
                        Retry Component
                    </button>
                    <button
                        onClick={handleCopyReport}
                        className="px-4 py-2 rounded-md border border-foreground/10 hover:bg-foreground/5 transition-colors text-sm"
                    >
                        Copy Report
                    </button>
                </div>
            </div>

            <div className="w-full max-w-sm pt-8 border-t border-foreground/5">
                <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">Alternative Routes</p>
                <SmartCompass />
            </div>
        </div>
    );
}
