import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Dynamic Params
        const title = searchParams.get('title') || '7AZEMPRO';
        const subtitle = searchParams.get('subtitle') || 'SYSTEM ARCHITECT';
        const type = searchParams.get('type')?.toUpperCase() || 'INDEX';
        const bgImage = searchParams.get('image');

        // Font Loading (Theme Fonts)
        const fontJakarta = await fetch(new URL('https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin-700-normal.woff', request.url)).then((res) => res.arrayBuffer());
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
                        overflow: 'hidden', // Ensure image doesn't bleed
                    }}
                >
                    {/* 0. BACKGROUND IMAGE (Optional) */}
                    {bgImage && (
                        <img
                            src={bgImage}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0.4, // Dim it for text readability
                                filter: 'grayscale(100%)', // Swiss style
                            }}
                        />
                    )}

                    {/* 1. BLUEPRINT GRID BACKGROUND */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                            opacity: 0.2, // Boosted opacity
                        }}
                    />

                    {/* 2. BRAND LOGO (Top Left) */}
                    <div style={{
                        position: 'absolute',
                        top: 60,
                        left: 60,
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        {/* The "7" Diamond */}
                        <div style={{
                            width: 60,
                            height: 60,
                            background: 'linear-gradient(45deg, #3b82f6, #06b6d4)',
                            transform: 'rotate(45deg)',
                            borderRadius: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
                        }}>
                            <div style={{
                                transform: 'rotate(-45deg)',
                                fontSize: 32,
                                fontWeight: 900,
                                color: 'white',
                                fontFamily: '"Plus Jakarta Sans", sans-serif'
                            }}>7</div>
                        </div>
                    </div>

                    {/* 3. DYNAMIC GRAPHIC (Right Side - Abstract) */}
                    <div style={{
                        position: 'absolute',
                        right: -100,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        opacity: 0.1,
                    }}>
                        {type === 'PROJECT' && (
                            // Diamond Cluster (Structure)
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: 300, height: 300, border: '4px solid white', transform: 'rotate(45deg)', margin: -50 }} />
                                <div style={{ width: 300, height: 300, border: '4px solid white', transform: 'rotate(45deg)', margin: -50 }} />
                            </div>
                        )}
                        {type === 'ARTICLE' && (
                            // Text Lines (Knowledge)
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'flex-end' }}>
                                <div style={{ width: 600, height: 20, background: 'white' }} />
                                <div style={{ width: 400, height: 20, background: 'white' }} />
                                <div style={{ width: 500, height: 20, background: 'white' }} />
                                <div style={{ width: 300, height: 20, background: 'white' }} />
                                <div style={{ width: 600, height: 20, background: 'white' }} />
                                <div style={{ width: 400, height: 20, background: 'white' }} />
                            </div>
                        )}
                        {type !== 'PROJECT' && type !== 'ARTICLE' && (
                            // Radar/Pulse (System)
                            <div style={{
                                width: 600,
                                height: 600,
                                border: '2px dashed white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{ width: 400, height: 400, border: '2px solid white', borderRadius: '50%' }} />
                            </div>
                        )}
                    </div>


                    {/* 4. CORNER MARKERS (Remaining) */}
                    <div style={{ position: 'absolute', top: 60, right: 60, width: 20, height: 20, borderTop: '2px solid rgba(255,255,255,0.3)', borderRight: '2px solid rgba(255,255,255,0.3)' }} />
                    <div style={{ position: 'absolute', bottom: 60, left: 60, width: 20, height: 20, borderBottom: '2px solid rgba(255,255,255,0.3)', borderLeft: '2px solid rgba(255,255,255,0.3)' }} />
                    <div style={{ position: 'absolute', bottom: 60, right: 60, width: 20, height: 20, borderBottom: '2px solid rgba(255,255,255,0.3)', borderRight: '2px solid rgba(255,255,255,0.3)' }} />


                    {/* 5. CENTER CONTENT */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, textAlign: 'center', padding: '0 80px', gap: 20, maxWidth: 900 }}>

                        {/* TYPE BADGE */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            fontSize: 18,
                            fontFamily: 'monospace',
                            letterSpacing: '0.2em',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: '10px 30px',
                            color: '#94a3b8'
                        }}>
                            <div style={{ width: 8, height: 8, background: '#3b82f6' }} />
                            SYS :: {type}
                        </div>

                        {/* TITLE */}
                        <div style={{
                            fontSize: 70,
                            fontWeight: 900,
                            lineHeight: 1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.03em',
                            color: 'white',
                            textShadow: '0 0 40px rgba(255,255,255,0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            {title}
                        </div>

                        {/* SUBTITLE */}
                        <div style={{
                            fontSize: 32, // Bumped up slightly
                            color: '#94a3b8',
                            lineHeight: 1.4,
                            fontFamily: '"IBM Plex Sans Arabic", monospace'
                        }}>
                            {subtitle}
                        </div>
                    </div>

                    {/* 6. FOOTER METADATA */}
                    <div style={{
                        position: 'absolute',
                        bottom: 60,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 40,
                        fontSize: 16,
                        fontFamily: 'monospace',
                        color: 'rgba(255,255,255,0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        <div>30.0444° N, 31.2357° E</div>
                        <div>///</div>
                        <div>SYSTEM ARCHITECTURE</div>
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
                        name: 'IBM Plex Sans Arabic',
                        data: fontArabic,
                        style: 'normal',
                        weight: 700,
                    },
                ],
            },
        );
    } catch (e) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
