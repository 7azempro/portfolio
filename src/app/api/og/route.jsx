import { ImageResponse } from 'next/og';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Params
        const title = searchParams.get('title') || '7AZEMPRO';
        const titleAr = searchParams.get('title_ar'); // Allow explicit Arabic title
        const subtitle = searchParams.get('subtitle') || 'SYSTEM ARCHITECT';
        const type = searchParams.get('type')?.toUpperCase() || 'INDEX';

        // Helper: Construct Sanity URL
        const buildSanityUrl = (ref) => {
            if (!ref) return null;
            const parts = ref.split('-');
            if (parts.length >= 4) {
                const assetId = parts[1];
                const dimensions = parts[2];
                const format = parts[3];
                const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
                const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
                if (projectId && dataset) {
                    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}`;
                }
            }
            return null;
        }

        const bgImage = buildSanityUrl(searchParams.get('imageId') || searchParams.get('image'));

        // Load Fonts
        const fontJakarta = await fetch(new URL('https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin-700-normal.woff', request.url)).then((res) => res.arrayBuffer());
        const fontJakartaLight = await fetch(new URL('https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin-300-normal.woff', request.url)).then((res) => res.arrayBuffer());
        const fontArabic = await fetch(new URL('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans-arabic@latest/arabic-700-normal.woff', request.url)).then((res) => res.arrayBuffer());

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#050505',
                        color: 'white',
                        fontFamily: '"Plus Jakarta Sans", "IBM Plex Sans Arabic", sans-serif',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Background Grid */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                            zIndex: 0,
                        }}
                    />

                    {/* Background Image (Subtle Tint) */}
                    {bgImage && (
                        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.15, display: 'flex' }}>
                            <img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, #050505 100%)' }} />
                        </div>
                    )}

                    {/* Central Safe Zone Container */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 40,
                        zIndex: 10,
                        maxWidth: '80%',
                        textAlign: 'center',
                    }}>

                        {/* 1. Main Site Logo (Replicated) */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                            {/* '7azem' */}
                            <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.05em', color: 'white' }}>7azem</div>

                            {/* 'pro' */}
                            <div style={{ fontSize: 48, fontWeight: 300, letterSpacing: '-0.02em', color: '#94a3b8' }}>pro</div>

                            {/* Animated Dot (Static for OG) */}
                            <div style={{
                                width: 16,
                                height: 16,
                                marginLeft: 8,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                                transform: 'rotate(45deg)',
                                boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                            }} />
                        </div>

                        {/* 2. Content Block */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                            {/* Primary Title (English/Main) */}
                            <div style={{
                                fontSize: 72,
                                fontWeight: 900,
                                lineHeight: 1,
                                letterSpacing: '-0.04em',
                                textTransform: 'uppercase',
                                color: 'white',
                                textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}>
                                {title}
                            </div>

                            {/* Secondary Title (Arabic/Optional) */}
                            {titleAr && (
                                <div style={{
                                    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
                                    fontSize: 48,
                                    fontWeight: 700,
                                    color: '#cbd5e1',
                                    lineHeight: 1.2,
                                }}>
                                    {titleAr}
                                </div>
                            )}

                            {/* Subtitle / Type */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                marginTop: 10,
                                padding: '8px 20px',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: 50,
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} />
                                <div style={{
                                    fontFamily: 'monospace',
                                    fontSize: 16,
                                    letterSpacing: '0.15em',
                                    color: '#94a3b8',
                                    textTransform: 'uppercase',
                                }}>
                                    {type} :: {subtitle}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer / URL */}
                    <div style={{
                        position: 'absolute',
                        bottom: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        zIndex: 10,
                        fontFamily: 'monospace',
                        fontSize: 14,
                        color: '#475569',
                        letterSpacing: '0.2em',
                    }}>
                        7AZEMPRO.COM
                    </div>

                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Plus Jakarta Sans',
                        data: fontJakarta,
                        style: 'normal',
                        weight: 700,
                    },
                    {
                        name: 'Plus Jakarta Sans',
                        data: fontJakartaLight,
                        style: 'normal',
                        weight: 300,
                    },
                    {
                        name: 'IBM Plex Sans Arabic',
                        data: fontArabic,
                        style: 'normal',
                        weight: 700,
                    },
                ],
            }
        );

    } catch (e) {
        console.error("OG Error:", e);
        return new Response(`Failed to generate the image: ${e.message}`, { status: 500 });
    }
}
