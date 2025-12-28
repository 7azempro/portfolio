'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCloseLine, RiDownloadLine, RiLoader4Line, RiUserLine, RiMailLine, RiBriefcaseLine } from 'react-icons/ri';
import { PiFilePdf } from 'react-icons/pi';

// Schema
const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    purpose: z.string().min(3, "Please specify a purpose (e.g., Hiring, Reference)"),
});

export default function ResumeGateModal({ isOpen, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            // check for json error response even if status is 200 (though ideally it shouldn't be)
            const contentType = response.headers.get('content-type');
            const errorData = await response.json();
            console.error("Backend Error Details:", errorData); // Log for debugging
            throw new Error(errorData.details || errorData.error || 'Server returned an error.');
        }

            if (!response.ok) throw new Error('Download failed. Server Error.');

        // Handle Blob Download
        const blob = await response.blob();
        if (blob.size < 100) throw new Error('Generated file is empty.'); // Safety check

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // Use date in filename to avoid duplicates
        a.download = `Hazem_Gamal_Resume_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();

        // Clean up
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 100);

        setIsSuccess(true);
        setTimeout(() => {
            onClose(); // Auto close after success
            setIsSuccess(false);
        }, 3000);

    } catch (err) {
        console.error("Resume Download Error:", err);
        setError(err.message || 'System Error: Could not generate PDF.');
    } finally {
        setIsLoading(false);
    }
};

return (
    <AnimatePresence>
        {isOpen && (
            <>
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="fixed inset-0 m-auto w-full max-w-md h-fit bg-background border border-foreground/10 shadow-2xl z-[101] overflow-hidden rounded-sm"
                >
                    {/* Header */}
                    <div className="bg-muted px-6 py-4 border-b border-foreground/10 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Request Access :: PDF</h3>
                        </div>
                        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                            <RiCloseLine size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {isSuccess ? (
                            <div className="flex flex-col items-center text-center py-8 text-green-500">
                                <PiFilePdf size={48} className="mb-4" />
                                <h4 className="text-lg font-bold uppercase tracking-tight">Access Granted</h4>
                                <p className="font-mono text-xs mt-2 text-muted-foreground">Downloading secure document...</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Please identify yourself to generate the latest version of the Bio-Data document.
                                </p>

                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Identity // Name</label>
                                    <div className="relative">
                                        <RiUserLine className="absolute left-3 top-3 text-muted-foreground" />
                                        <input
                                            {...register('name')}
                                            className="w-full bg-muted/50 border border-foreground/10 px-10 py-2 text-base sm:text-sm focus:border-blue-500 outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Contact // Email</label>
                                    <div className="relative">
                                        <RiMailLine className="absolute left-3 top-3 text-muted-foreground" />
                                        <input
                                            {...register('email')}
                                            className="w-full bg-muted/50 border border-foreground/10 px-10 py-2 text-base sm:text-sm focus:border-blue-500 outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                                </div>

                                {/* Purpose */}
                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Protocol // Purpose</label>
                                    <div className="relative">
                                        <RiBriefcaseLine className="absolute left-3 top-3 text-muted-foreground" />
                                        <select
                                            {...register('purpose')}
                                            className="w-full bg-muted/50 border border-foreground/10 px-10 py-2 text-base sm:text-sm focus:border-blue-500 outline-none transition-colors appearance-none"
                                        >
                                            <option value="">Select Purpose...</option>
                                            <option value="recruitment">Recruitment / Hiring</option>
                                            <option value="freelance">Project Proposal</option>
                                            <option value="reference">Reference Check</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    {errors.purpose && <span className="text-xs text-red-500">{errors.purpose.message}</span>}
                                </div>

                                {error && <div className="text-xs text-red-500 bg-red-500/10 p-2 border border-red-500/20">{error}</div>}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? <RiLoader4Line className="animate-spin" /> : <RiDownloadLine />}
                                    {isLoading ? 'GENERATING STREAM...' : 'INITIALIZE DOWNLOAD'}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </>
        )}
    </AnimatePresence>
);
}
