import '../styles/globals.css';
import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from 'next/font/google';
import ClientProviders from '@/components/layout/ClientProviders';

const ibmArabic = IBM_Plex_Sans_Arabic({
    subsets: ['arabic'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-ibm',
    display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta',
    display: 'swap',
});

import { getLocalData } from '@/lib/data.server';

export async function generateMetadata() {
    const settings = await getLocalData('settings');

    // Fallback if settings are empty (during initial setup)
    const title = settings?.siteTitle || '7azempro';
    const description = settings?.seoDescription || 'Transforming complex ideas into elegant digital systems.';
    const baseUrl = 'https://7azem.pro'; // Or fetch from env if needed

    return {
        metadataBase: new URL(baseUrl),
        title: {
            template: `%s | ${title}`,
            default: `${title} | Premium Product Design & Development`,
        },
        description: description,
        keywords: ['Portfolio', 'Product Design', 'Next.js', 'React', 'Design Systems', 'Arabic UI', 'Frontend Architecture'],
        authors: [{ name: 'Hazem Gamal', url: baseUrl }],
        creator: 'Hazem Gamal',
        publisher: 'Hazem Gamal',
        openGraph: {
            title: `${title} | Premium Product Design & Development`,
            description: description,
            url: baseUrl,
            siteName: title,
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: '/og-default.jpg',
                    width: 1200,
                    height: 630,
                    alt: `${title} Preview`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Premium Product Design & Development`,
            description: description,
            creator: '@7azempro',
            images: ['/og-default.jpg'],
        },
        icons: {
            icon: '/icon.svg',
            shortcut: '/favicon.ico',
            apple: '/apple-touch-icon.png',
        },
        manifest: '/site.webmanifest',
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

import ScrollProgress from '@/components/ui/ScrollProgress';

export default function RootLayout({ children }) {
    return (
        <html lang="en" dir="ltr" className="scroll-smooth" suppressHydrationWarning>
            <body className={`${ibmArabic.variable} ${jakarta.variable} bg-background text-foreground transition-colors duration-300`}>
                <ClientProviders fontVariables={{ ibmFont: ibmArabic.variable, jakartaFont: jakarta.variable }}>
                    <ScrollProgress />
                    {/* Atmospheric Layers */}
                    <div className="fixed inset-0 z-[-1] bg-background">
                        <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-overlay pointer-events-none" />
                        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
                        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>

                    <div className="relative z-10">
                        {children}
                    </div>
                </ClientProviders>
            </body>
        </html>
    );
}
