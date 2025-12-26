import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Dynamic Params
        const title = searchParams.get('title') || '7AZEMPRO';
        const subtitle = searchParams.get('subtitle') || 'SYSTEM ARCHITECT';
        const type = searchParams.get('type')?.toUpperCase() || 'INDEX';

        // Helper to reconstruct Sanity URL
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

        const imageId = searchParams.get('imageId');
        const authorImageId = searchParams.get('authorImageId');

        const bgImage = imageId ? buildSanityUrl(imageId) : searchParams.get('image');
        const authorImage = buildSanityUrl(authorImageId);

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
                        backgroundColor: '#050505',
                        color: 'white',
                        fontFamily: '"Plus Jakarta Sans", "IBM Plex Sans Arabic", sans-serif',
                    }}
                >
                    {/* LEFT PANEL (Content) - 65% */}
                    <div style={{
                        width: '65%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '60px',
                        position: 'relative',
                        borderRight: '1px solid rgba(255,255,255,0.1)',
                    }}>
                        {/* Grid Background */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: 'linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)',
                                backgroundSize: '40px 40px',
                                zIndex: 0,
                            }}
                        />

                        {/* TOP: Full Brand Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, zIndex: 10 }}>
                            {/* Logo Mark */}
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ fontSize: 40, fontWeight: 900, color: 'white', letterSpacing: '-0.05em' }}>7azem</div>
                                <div style={{ fontSize: 40, fontWeight: 300, color: '#94a3b8', letterSpacing: '-0.05em' }}>pro</div>
                                <div style={{ width: 10, height: 10, marginLeft: 4, background: '#3b82f6', transform: 'rotate(45deg)', borderRadius: 2 }} />
                            </div>

                            {/* Divider */}
                            <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.2)' }} />

                            {/* System Tag */}
                            <div style={{
                                fontFamily: 'monospace',
                                fontSize: 14,
                                letterSpacing: '0.2em',
                                color: '#64748b',
                                textTransform: 'uppercase',
                                display: 'flex',
                            }}>
                                {`SYS :: ${type}`}
                            </div>
                        </div>

                        {/* MIDDLE: Title */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                            zIndex: 10,
                        }}>
                            <div style={{
                                fontSize: 64,
                                fontWeight: 900,
                                lineHeight: 1,
                                letterSpacing: '-0.03em',
                                textTransform: 'uppercase',
                                color: 'white',
                                // Clamp title length visualization
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}>
                                {title}
                            </div>
                            <div style={{
                                fontFamily: '"IBM Plex Sans Arabic", monospace',
                                fontSize: 24,
                                color: '#64748b',
                                marginTop: 10,
                                display: 'flex', // Safety
                            }}>
                                {`${subtitle} // KNOWLEDGE_BASE`}
                            </div>
                        </div>

                        {/* BOTTOM: Author & Meta */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
                            {/* Author */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                {authorImage ? (
                                    <img src={authorImage} style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)' }} />
                                ) : (
                                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#333' }} />
                                )}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <div style={{ fontSize: 18, fontWeight: 700 }}>7AZEMPRO</div>
                                    <div style={{ fontSize: 12, fontFamily: 'monospace', color: '#94a3b8', letterSpacing: '0.1em' }}>EDITOR_IN_CHIEF</div>
                                </div>
                            </div>

                            {/* Tech Markers */}
                            <div style={{ display: 'flex', gap: 10 }}>
                                <div style={{ width: 10, height: 10, background: '#3b82f6' }} />
                                <div style={{ width: 10, height: 10, background: '#10b981' }} />
                                <div style={{ width: 10, height: 10, background: '#f59e0b' }} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL (Image) - 35% */}
                    <div style={{
                        width: '35%',
                        height: '100%',
                        position: 'relative',
                        backgroundColor: '#111',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}>
                        {bgImage ? (
                            <img
                                src={bgImage}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: 'grayscale(100%) contrast(120%)',
                                    opacity: 0.8,
                                }}
                            />
                        ) : (
                            // Geometric Fallback
                            <div style={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: 'repeating-linear-gradient(45deg, #1f2937 0, #1f2937 10px, #111827 0, #111827 50%)',
                                opacity: 0.5,
                            }} />
                        )}

                        {/* Overlay Tint */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.2), transparent)',
                            mixBlendMode: 'overlay',
                        }} />

                        {/* Technical Crosshair */}
                        <div style={{ position: 'absolute', inset: 0, border: '20px solid rgba(0,0,0,0.5)' }} />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 2, height: 40, background: 'rgba(255,255,255,0.5)' }} />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 40, height: 2, background: 'rgba(255,255,255,0.5)' }} />
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
