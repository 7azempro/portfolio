'use client';
import { motion } from 'framer-motion';

export default function WireframeLoader() {
    return (
        <div className="min-h-screen bg-[#020617] relative overflow-hidden flex flex-col pt-32 px-6">

            {/* 1. Background Grid (Blueprint) */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* 2. Container Frame */}
            <div className="container mx-auto relative z-10 max-w-7xl h-full flex flex-col gap-12">

                {/* Header Wireframe */}
                <div className="w-full flex justify-between items-center mb-12 border-b border-blue-900/30 pb-4 border-dashed">
                    <div className="w-32 h-8 border border-blue-500/30 rounded bg-blue-500/5 animate-pulse" />
                    <div className="w-64 h-8 border border-blue-500/20 rounded bg-blue-500/5 hidden md:block animate-pulse" />
                    <div className="w-12 h-12 border border-blue-500/30 rounded-full bg-blue-500/5 animate-pulse" />
                </div>

                {/* Hero / Title Section */}
                <div className="flex flex-col gap-6">
                    {/* Meta Tag */}
                    <motion.div
                        className="w-48 h-4 border border-blue-500/30 bg-blue-500/5 rounded-full"
                        initial={{ width: 0 }} animate={{ width: 150 }} transition={{ duration: 0.5 }}
                    />

                    {/* Big Title Lines */}
                    <div className="space-y-4">
                        <motion.div
                            className="h-16 md:h-24 w-3/4 border border-blue-500/40 bg-blue-500/10 rounded-sm relative overflow-hidden"
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent w-full animate-shimmer" />
                        </motion.div>
                        <motion.div
                            className="h-16 md:h-24 w-1/2 border border-blue-500/40 bg-blue-500/10 rounded-sm relative overflow-hidden"
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.4 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent w-full animate-shimmer" />
                        </motion.div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 flex-1">
                    {/* Sidebar / Info */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                        <div className="h-64 border border-blue-500/20 bg-blue-500/5 rounded p-4 relative">
                            {/* Crosshair */}
                            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-blue-500" />
                            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-blue-500" />
                            <div className="text-[10px] font-mono text-blue-500/50 uppercase tracking-widest mt-auto">Loading_Module...</div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-8 flex flex-col gap-4">
                        <div className="h-6 w-full bg-blue-500/10 rounded animate-pulse delay-75" />
                        <div className="h-6 w-full bg-blue-500/10 rounded animate-pulse delay-100" />
                        <div className="h-6 w-5/6 bg-blue-500/10 rounded animate-pulse delay-150" />
                        <div className="h-6 w-full bg-blue-500/10 rounded animate-pulse delay-200" />
                    </div>
                </div>

            </div>

            {/* Tech Overlay: Scanner Line */}
            <motion.div
                className="fixed top-0 left-0 w-full h-1 bg-blue-500 z-50 shadow-[0_0_20px_#3b82f6]"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />

            <div className="fixed bottom-8 right-8 font-mono text-xs text-blue-500/70 tracking-widest uppercase animate-pulse">
                Constructing_View //
            </div>
        </div>
    );
}
