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

        // Filter out failed fonts
        const validFonts = [fontJakarta, fontJakartaLight, fontArabic].filter(Boolean);

        // Helper: Detect Arabic
        const hasArabic = (text) => /[\u0600-\u06FF]/.test(text || "");

        // Theme Constants
        const COLOR_BG = '#020617';
        const COLOR_GRID = '#ffffff08';
        const COLOR_ACCENT = '#3b82f6';
        const COLOR_ACCENT_2 = '#8b5cf6';
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
                    {/* 1. LAYER: Aurora Gradient (Atmospheric Background) */}
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-20%',
                        width: '140%',
                        height: '200%',
                        background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 60%)',
                        zIndex: 0,
                        transform: 'rotate(-10deg)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '-50%',
                        right: '-20%',
                        width: '140%',
                        height: '200%',
                        background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 60%)',
                        zIndex: 0,
                        transform: 'rotate(10deg)',
                    }} />

                    {/* 2. LAYER: Blueprint Grid */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `linear-gradient(to right, ${COLOR_GRID} 1px, transparent 1px), linear-gradient(to bottom, ${COLOR_GRID} 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                            zIndex: 1,
                        }}
                    />

                    {/* 3. LAYER: Geometric Scaffolding (Thin Circles) */}
                    <div style={{
                        position: 'absolute',
                        width: 900,
                        height: 900,
                        border: '1px solid rgba(255,255,255,0.03)',
                        borderRadius: '50%',
                        zIndex: 1,
                    }} />
                    <div style={{
                        position: 'absolute',
                        width: 1200,
                        height: 1200,
                        border: '1px dashed rgba(255,255,255,0.02)',
                        borderRadius: '50%',
                        zIndex: 1,
                        transform: 'rotate(45deg)',
                    }} />

                    {/* 4. LAYER: Background Image (Deep Integration) */}
                    {bgImage && (
                        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.3, display: 'flex' }}>
                            <img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                    {bgImage && (
                        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.3, background: `radial-gradient(circle at center, transparent 20%, ${COLOR_BG} 100%)` }} />
                    )}

                    {/* 5. LAYER: Tech Tags */}
                    {/* System Tag */}
                    <div style={{ position: 'absolute', top: 40, left: 40, display: 'flex', alignItems: 'center', gap: 8, zIndex: 10 }}>
                        <div style={{ width: 6, height: 6, background: COLOR_ACCENT, borderRadius: '50%', boxShadow: `0 0 10px ${COLOR_ACCENT}` }} />
                        <div style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.2em', color: COLOR_MUTED, textTransform: 'uppercase', display: 'flex' }}>
                            SYS :: {type}
                        </div>
                    </div>

                    {/* Barcode */}
                    <div style={{ position: 'absolute', top: 40, right: 40, display: 'flex', gap: 3, opacity: 0.4, zIndex: 10 }}>
                        {[...Array(12)].map((_, i) => (
                            <div key={i} style={{ width: [1, 2, 1, 3][i % 4], height: 20, background: 'white' }} />
                        ))}
                    </div>

                    {/* 6. LAYER: Framing - FLATTENED for Satori Stability */}
                    {/* Top Left */}
                    <div style={{ position: 'absolute', top: 30, left: 30, width: 1, height: 30, background: 'linear-gradient(to bottom, white, transparent)', zIndex: 5 }} />
                    <div style={{ position: 'absolute', top: 30, left: 30, width: 30, height: 1, background: 'linear-gradient(to right, white, transparent)', zIndex: 5 }} />

                    {/* Bottom Right */}
                    <div style={{ position: 'absolute', bottom: 30, right: 30, width: 1, height: 30, background: 'linear-gradient(to top, white, transparent)', zIndex: 5 }} />
                    <div style={{ position: 'absolute', bottom: 30, right: 30, width: 30, height: 1, background: 'linear-gradient(to left, white, transparent)', zIndex: 5 }} />


                    {/* 7. LAYER: Content Core (Centered) */}
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

                        {/* Brand Pill */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '6px 16px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: 100,
                            border: `1px solid ${COLOR_BORDER}`,
                            marginBottom: 10
                        }}>
                            <div style={{ fontSize: 16, fontWeight: 700, color: 'white', display: 'flex' }}>7azempro</div>
                            <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)' }} />
                            <div style={{ width: 16, height: 16, borderRadius: '50%', background: `linear-gradient(135deg, ${COLOR_ACCENT}, ${COLOR_ACCENT_2})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: 6, height: 6, background: 'white', borderRadius: '50%' }} />
                            </div>
                        </div>

                        {/* Monumental Title */}
                        <div style={{
                            fontSize: 84, // Slightly larger
                            fontWeight: hasArabic(title) ? 700 : 900,
                            fontFamily: hasArabic(title) ? '"IBM Plex Sans Arabic", sans-serif' : '"Plus Jakarta Sans", sans-serif',
                            lineHeight: 0.9,
                            letterSpacing: hasArabic(title) ? '0' : '-0.06em',
                            textTransform: 'uppercase',
                            color: COLOR_TEXT,
                            textShadow: '0 0 80px rgba(59, 130, 246, 0.5)',
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
                                display: 'flex', // Satori Fix
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
                                color: COLOR_ACCENT,
                                textTransform: 'uppercase',
                                marginTop: 8
                            }}>
                                // {subtitle}
                            </div>
                        )}

                    </div>

                    {/* 8. LAYER: Footer (Reduced Visual Weight) */}
                    <div style={{
                        position: 'absolute',
                        bottom: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        zIndex: 10,
                        opacity: 0.8,
                    }}>
                        {/* Minimalist Avatar */}
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
