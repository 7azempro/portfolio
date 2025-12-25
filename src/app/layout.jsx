import '../styles/globals.css';
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
            <body className="bg-background text-foreground transition-colors duration-300">
                {children}
            </body>
        </html>
    );
}
