/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Critical for manual toggling
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--background) / <alpha-value>)',
                foreground: 'rgb(var(--foreground) / <alpha-value>)',
                primary: '#3B82F6', // Electric Blue
                secondary: {
                    DEFAULT: '#F1F5F9',
                    foreground: '#0F172A',
                },
                border: '#E2E8F0',
                muted: {
                    DEFAULT: '#64748B',
                    foreground: '#94A3B8',
                },
            },
            fontFamily: {
                sans: ['var(--font-primary)', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
