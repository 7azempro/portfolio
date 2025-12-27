import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from 'next/font/google';
import ClientProviders from '@/components/layout/ClientProviders';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { Suspense } from 'react';

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

export default async function SiteLayout({ children }) {
    const settings = await getLocalData('settings');

    return (
        <Suspense fallback={null}>
            <ClientProviders
                fontVariables={{ ibmFont: ibmArabic.variable, jakartaFont: jakarta.variable }}
                nav={settings?.mainNav}
                socials={settings?.socialLinks}
            >
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
        </Suspense>
    );
}
