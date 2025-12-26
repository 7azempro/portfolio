'use client';
import { useState } from 'react';
import { PiEnvelopeSimpleLight, PiQuestionLight, PiCalendarCheckLight, PiSparkleLight, PiArrowUpRightLight, PiCheckLight, PiCopyLight } from 'react-icons/pi';
import Link from 'next/link';
import { CONTACT_CONFIG } from '@/lib/config/contact';

export default function ConnectTab({ content, lang, setIsOpen }) {
    const messages = CONTACT_CONFIG.messages[lang] || CONTACT_CONFIG.messages['en'];
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('hazem.gamal1@outlook.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-3">

            {/* 1. HERO CTA: START PROJECT (Golden/Premium) */}
            <a
                href={`mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(messages.email_subject)}`}
                className="relative overflow-hidden flex items-center justify-between p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl group transition-all duration-300 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10"
            >
                {/* Shine animation: LTR: -100% -> 100% | RTL: 100% -> -100% */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 translate-x-[-100%] rtl:translate-x-[100%] group-hover:translate-x-[100%] rtl:group-hover:translate-x-[-100%] transition-transform duration-1000" />

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center rounded-lg shadow-sm shadow-amber-500/20">
                        <PiSparkleLight className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wide text-amber-600 dark:text-amber-400 font-sans">
                            {messages.start_project}
                        </h4>
                        <p className="text-[10px] text-muted-foreground font-sans mt-0.5 font-medium">
                            {messages.coffee_hint}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                </div>
            </a>

            {/* 2. SECONDARY CTA: SCHEDULE CALL (Upwork) */}
            <a
                href={CONTACT_CONFIG.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-foreground/5 hover:bg-emerald-600/10 hover:border-emerald-600/20 border border-foreground/5 rounded-xl transition-all group"
            >
                <div className="w-10 h-10 bg-[#14a800] text-white flex items-center justify-center rounded-lg shadow-sm">
                    <PiCalendarCheckLight className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-xs uppercase tracking-wide group-hover:text-[#14a800] transition-colors font-sans">
                        {lang === 'ar' ? 'احجز مكالمة فيديو' : 'SCHEDULE A CALL'}
                    </h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5 font-sans">
                        {lang === 'ar' ? 'استشارة مهنية عبر Upwork' : 'Video consultation via Upwork'}
                    </p>
                </div>
                <div className="p-1.5 rounded-full bg-background/50 border border-foreground/10 group-hover:border-[#14a800]/30 transition-colors">
                    <PiArrowUpRightLight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:text-[#14a800] rtl:rotate-180" />
                </div>
            </a>

            {/* 3. QUICK LINKS (Email Copy) */}
            <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 p-3 bg-foreground/5 hover:bg-foreground/10 border border-transparent hover:border-foreground/10 rounded-lg transition-colors group text-left"
            >
                <div className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white'}`}>
                    {copied ? <PiCheckLight className="w-5 h-5" /> : <PiCopyLight className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-[10px] uppercase tracking-wide group-hover:text-foreground transition-colors">
                        {copied ? (lang === 'ar' ? 'تم النسخ!' : 'COPIED!') : 'Email'}
                    </h4>
                    <span className="text-[9px] text-muted-foreground block font-mono">
                        {copied ? 'hazem.gamal1@outlook.com' : 'Click to Copy'}
                    </span>
                </div>
            </button>

            {/* Legal Link */}
            <Link
                href="/legal"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 px-4 hover:bg-foreground/5 rounded-lg transition-colors group border border-transparent hover:border-foreground/5"
            >
                <div className="flex items-center gap-2">
                    <PiQuestionLight className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">{content.legal}</span>
                </div>
                <span className="text-[9px] text-muted-foreground opacity-50">v2.1</span>
            </Link>
        </div>
    );
}
