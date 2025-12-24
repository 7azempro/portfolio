import { motion } from 'framer-motion';


export default function Logo({ className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            dir="ltr"
            className={`group flex items-center font-bold tracking-tighter text-2xl ${className} cursor-pointer select-none`}
            style={{ fontFamily: 'var(--font-jakarta)' }}
        >
            <span className="text-foreground group-hover:text-primary transition-colors duration-300">7azem</span>
            <span className="text-muted-foreground font-light">pro</span>

            {/* Animated Dot/Mark */}
            <span className="relative flex items-center justify-center ml-1 w-2.5 h-2.5">
                <span className="absolute inset-0 bg-primary/40 blur-md rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="w-2 h-2 bg-gradient-to-tr from-blue-500 to-cyan-400 rotate-45 rounded-[1px] shadow-lg shadow-blue-500/50"
                />
            </span>
        </motion.div>
    );
}
