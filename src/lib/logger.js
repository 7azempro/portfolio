/**
 * Structured Logger for Server & Client (Lite Version)
 * Uses native console methods which Vercel/Next.js automatically captures.
 */

const LOG_LEVELS = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG'
};

class Logger {
    constructor(context = 'Global') {
        this.context = context;
    }

    format(level, message) {
        // Vercel logs include timestamps automatically, but we add ISO for local debugging
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] [${this.context}]: ${message}`;
    }

    info(message, data = null) {
        console.log(this.format(LOG_LEVELS.INFO, message), data ? JSON.stringify(data, null, 2) : '');
    }

    warn(message, data = null) {
        console.warn(this.format(LOG_LEVELS.WARN, message), data ? JSON.stringify(data, null, 2) : '');
    }

    error(message, error = null, data = null) {
        console.error(this.format(LOG_LEVELS.ERROR, message));
        if (error) console.error(error);
        if (data) console.error("Context:", JSON.stringify(data, null, 2));
    }
}

export const logger = new Logger();
export const createLogger = (context) => new Logger(context);
