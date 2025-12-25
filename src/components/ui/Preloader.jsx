import Logo from '@/components/ui/Logo';

// ... (keep loadingMessages logic)

export default function Preloader() {
    const { lang } = useLanguage();
    const messages = loadingMessages[lang];
    const [count, setCount] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Counter Animation
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsComplete(true), 800); // Slight delay before exit
                    return 100;
                }
                // Faster loading for better UX
                const increment = Math.floor(Math.random() * 8) + 2;
                return Math.min(prev + increment, 100);
            });
        }, 30);

        // Message Cycler
        const messageInterval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % messages.length);
        }, 400);

        return () => {
            clearInterval(interval);
            clearInterval(messageInterval);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Custom bezier for "Curtain" feel
                    className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#050505] text-white p-4 md:p-8 overflow-hidden font-mono"
                    dir="ltr"
                >
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Top Bar */}
                    <div className={`relative z-10 flex justify-between items-start text-xs md:text-sm uppercase tracking-widest opacity-50 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <span>{lang === 'ar' ? 'إقلاع النظام // v2.0' : 'System Boot // v2.0'}</span>
                        <span>7azempro</span>
                    </div>

                    {/* Center Content - UNIFIED LOGO */}
                    <div className="relative z-10 flex flex-col items-center justify-center flex-grow gap-8">

                        <div className="transform scale-[2] md:scale-[2.5]">
                            <Logo />
                        </div>

                        {/* Loading Percentage */}
                        <div className="font-mono text-blue-500/80 text-lg mt-4">
                            <motion.span
                                key={count}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                [{count.toString().padStart(3, '0')}%]
                            </motion.span>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className={`relative z-10 flex justify-between items-end text-xs md:text-sm uppercase tracking-widest ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>

                        {/* Dynamic Message */}
                        <div className={`flex flex-col gap-1 ${lang === 'ar' ? 'items-end' : ''}`}>
                            <span className="opacity-50">{lang === 'ar' ? 'الحالة:' : 'Status:'}</span>
                            <motion.span
                                key={messageIndex}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-blue-400 font-semibold"
                            >
                                {count === 100 ? (lang === 'ar' ? "النظام جاهز." : "SYSTEM READY.") : `> ${messages[messageIndex]}`}
                            </motion.span>
                        </div>

                        {/* Progress Bar Line */}
                        <div className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-100 ease-out" style={{ width: `${count}%` }} />
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
