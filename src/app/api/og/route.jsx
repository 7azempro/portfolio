import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Params
        const title = searchParams.get('title') || '7AZEMPRO';
        const titleAr = searchParams.get('title_ar');
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
        const authorImage = searchParams.get('authorImageId') ? buildSanityUrl(searchParams.get('authorImageId')) : null;

        // Load Fonts safely
        const loadFont = async (url, name, weight) => {
            try {
                const data = await fetch(new URL(url, request.url)).then((res) => res.arrayBuffer());
                return { name, data, style: 'normal', weight };
            } catch (e) {
                console.error(`Failed to load font ${name}:`, e);
                return null;
            }
        };

        const [fontJakarta, fontJakartaLight, fontArabic] = await Promise.all([
            loadFont('https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin-800-normal.woff', 'Plus Jakarta Sans', 800),
            loadFont('https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin-400-normal.woff', 'Plus Jakarta Sans', 400),
            loadFont('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans-arabic@latest/arabic-700-normal.woff', 'IBM Plex Sans Arabic', 700)
        ]);

        const validFonts = [fontJakarta, fontJakartaLight, fontArabic].filter(Boolean);
        const hasArabic = (text) => /[\u0600-\u06FF]/.test(text || "");

        // Theme Constants (Swiss Clean)
        const COLOR_BG = '#020617';
        const COLOR_GRID = '#ffffff08';
        const COLOR_TEXT = '#ffffff';
        const COLOR_MUTED = '#94a3b8';
        const COLOR_BORDER = 'rgba(255,255,255,0.1)';

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
                        backgroundColor: COLOR_BG,
                        color: COLOR_TEXT,
                        fontFamily: '"Plus Jakarta Sans", "IBM Plex Sans Arabic", sans-serif',
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '60px',
                    }}
                >
                    {/* 1. LAYER: Blueprint Grid (No Aurora) */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `linear-gradient(to right, ${COLOR_GRID} 1px, transparent 1px), linear-gradient(to bottom, ${COLOR_GRID} 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                            zIndex: 1,
                        }}
                    />

                    {/* 2. LAYER: Background Image */}
                    {bgImage && (
                        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2, display: 'flex' }}>
                            <img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                    {bgImage && (
                        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.3, background: `radial-gradient(circle at center, transparent 20%, ${COLOR_BG} 100%)` }} />
                    )}

                    {/* 3. LAYER: Tech Tags (Minimal) */}
                    <div style={{ position: 'absolute', top: 40, left: 40, display: 'flex', alignItems: 'center', gap: 8, zIndex: 10 }}>
                        <div style={{ width: 6, height: 6, background: 'white', borderRadius: '50%' }} />
                        <div style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.2em', color: COLOR_MUTED, textTransform: 'uppercase', display: 'flex' }}>
                            SYS :: {type}
                        </div>
                    </div>

                    {/* Barcode (Swiss style) */}
                    <div style={{ position: 'absolute', top: 40, right: 40, display: 'flex', gap: 3, opacity: 0.3, zIndex: 10 }}>
                        {[...Array(12)].map((_, i) => (
                            <div key={i} style={{ width: [1, 2, 1, 3][i % 4], height: 20, background: 'white' }} />
                        ))}
                    </div>

                    {/* 4. LAYER: Framing - Clean Lines */}
                    <div style={{ position: 'absolute', top: 30, left: 30, width: 1, height: 30, background: 'white', zIndex: 5, opacity: 0.3 }} />
                    <div style={{ position: 'absolute', top: 30, left: 30, width: 30, height: 1, background: 'white', zIndex: 5, opacity: 0.3 }} />

                    <div style={{ position: 'absolute', bottom: 30, right: 30, width: 1, height: 30, background: 'white', zIndex: 5, opacity: 0.3 }} />
                    <div style={{ position: 'absolute', bottom: 30, right: 30, width: 30, height: 1, background: 'white', zIndex: 5, opacity: 0.3 }} />


                    {/* 5. LAYER: Content Core (Centered) */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 24,
                        zIndex: 10,
                        maxWidth: '90%',
                        textAlign: 'center',
                    }}>

                        {/* 7AZEMPRO Signature (Stark White) */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            marginBottom: 10
                        }}>
                            <div style={{ fontSize: 14, fontFamily: 'monospace', letterSpacing: '0.1em', color: COLOR_MUTED, display: 'flex' }}>
                                 // 7AZEMPRO
                            </div>
                        </div>

                        {/* Monumental Title */}
                        <div style={{
                            fontSize: 84,
                            fontWeight: hasArabic(title) ? 700 : 900,
                            fontFamily: hasArabic(title) ? '"IBM Plex Sans Arabic", sans-serif' : '"Plus Jakarta Sans", sans-serif',
                            lineHeight: 0.9,
                            letterSpacing: hasArabic(title) ? '0' : '-0.06em',
                            textTransform: 'uppercase',
                            color: COLOR_TEXT,
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            maxWidth: '100%',
                            wordBreak: 'break-word',
                        }}>
                            {title}
                        </div>

                        {/* Subtitle / Category */}
                        {titleAr && (
                            <div style={{
                                display: 'flex',
                                fontFamily: '"IBM Plex Sans Arabic", sans-serif',
                                fontSize: 36,
                                fontWeight: 600,
                                color: '#cbd5e1',
                                marginTop: -8,
                            }}>
                                {titleAr}
                            </div>
                        )}

                        {!titleAr && (
                            <div style={{
                                display: 'flex',
                                fontFamily: 'monospace',
                                fontSize: 16,
                                letterSpacing: '0.2em',
                                color: COLOR_MUTED, // Muted instead of Accent
                                textTransform: 'uppercase',
                                marginTop: 8
                            }}>
                                {subtitle} _
                            </div>
                        )}

                    </div>

                    {/* 6. Footer */}
                    <div style={{
                        position: 'absolute',
                        bottom: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        zIndex: 10,
                        opacity: 0.8,
                    }}>
                        {authorImage ? (
                            <img
                                src={authorImage}
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: `1px solid ${COLOR_BORDER}`,
                                }}
                            />
                        ) : (
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#334155', border: `1px solid ${COLOR_BORDER}` }} />
                        )}
                        <div style={{ fontSize: 12, fontFamily: 'monospace', color: COLOR_MUTED, letterSpacing: '0.1em', display: 'flex' }}>
                            7AZEMPRO.COM
                        </div>
                    </div>

                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: validFonts,
            }
        );

    } catch (e) {
        console.error("OG Error:", e);
        return new Response(`Failed to generate the image: ${e.message}`, { status: 500 });
    }
}
