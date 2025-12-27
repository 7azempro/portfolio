import { ImageResponse } from 'next/og';
import { createClient } from '@sanity/client';

export const runtime = 'nodejs'; // Switch to Node for robust upload/buffering

// --- CONFIG ---
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Required for 'save' & fetching drafts
    useCdn: false, // Always fresh data
});

// --- THEME CONSTANTS ---
const THEME = {
    colors: {
        bg: '#020617',
        grid: '#ffffff15',
        accent: '#3b82f6',
        text: '#ffffff',
        muted: '#94a3b8',
        border: 'rgba(255,255,255,0.2)',
        white: '#ffffff',
        verified: '#3b82f6',
    },
    fonts: {
        en: '"Plus Jakarta Sans", sans-serif',
        ar: '"IBM Plex Sans Arabic", sans-serif',
        mono: 'monospace',
    }
};

// --- HELPER COMPONENTS ---
const SwissGraphics = () => (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex' }}>
        <div
            style={{
                position: 'absolute', inset: 0,
                backgroundImage: `linear-gradient(to right, ${THEME.colors.grid} 1px, transparent 1px), linear-gradient(to bottom, ${THEME.colors.grid} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
            }}
        />
        <div style={{
            position: 'absolute', top: '50%', left: '50%', width: 800, height: 800,
            transform: 'translate(-400px, -400px)', borderRadius: '50%',
            border: `2px solid ${THEME.colors.border}`, opacity: 0.3,
        }} />
        <div style={{
            position: 'absolute', top: '50%', left: '50%', width: 550, height: 550,
            transform: 'translate(-275px, -275px)', borderRadius: '50%',
            border: `1px dashed ${THEME.colors.border}`, opacity: 0.4,
        }} />
        <div style={{
            position: 'absolute', top: '50%', left: '50%', width: 300, height: 300,
            transform: 'translate(-150px, -150px)', borderRadius: '50%',
            border: `1px solid ${THEME.colors.accent}`, opacity: 0.2,
        }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: THEME.colors.border, opacity: 0.5 }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: THEME.colors.border, opacity: 0.5 }} />
        <div style={{
            position: 'absolute', top: 0, right: 0, width: 300, height: 300,
            background: `repeating-linear-gradient(45deg, ${THEME.colors.grid} 0px, ${THEME.colors.grid} 10px, transparent 10px, transparent 20px)`, opacity: 0.4
        }} />
        <div style={{
            position: 'absolute', bottom: 0, left: 0, width: 300, height: 300,
            background: `repeating-linear-gradient(45deg, ${THEME.colors.grid} 0px, ${THEME.colors.grid} 10px, transparent 10px, transparent 20px)`, opacity: 0.4
        }} />
        <div style={{ position: 'absolute', top: 60, right: 60, display: 'flex', gap: 6, opacity: 0.8 }}>
            <div style={{ width: 6, height: 6, background: THEME.colors.accent, borderRadius: '50%' }} />
            <div style={{ width: 6, height: 6, background: THEME.colors.white, borderRadius: '50%' }} />
            <div style={{ width: 6, height: 6, background: THEME.colors.muted, borderRadius: '50%' }} />
        </div>
        <div style={{
            position: 'absolute', bottom: 40, left: 40,
            fontFamily: THEME.fonts.mono, fontSize: 12, color: THEME.colors.muted,
            display: 'flex', flexDirection: 'column', gap: 4, fontWeight: 700
        }}>
            <div style={{ display: 'flex' }}>POS: 50.00 / 50.00</div>
            <div style={{ display: 'flex' }}>SYS: ONLINE</div>
        </div>
        <div style={{ position: 'absolute', top: 30, left: 30, width: 2, height: 20, background: THEME.colors.white, opacity: 0.8 }} />
        <div style={{ position: 'absolute', top: 30, left: 30, width: 20, height: 2, background: THEME.colors.white, opacity: 0.8 }} />
        <div style={{ position: 'absolute', bottom: 30, right: 30, width: 2, height: 20, background: THEME.colors.white, opacity: 0.8 }} />
        <div style={{ position: 'absolute', bottom: 30, right: 30, width: 20, height: 2, background: THEME.colors.white, opacity: 0.8 }} />
    </div>
);

const BackgroundImage = ({ src }) => {
    if (!src) return null;
    return (
        <div style={{ display: 'flex', position: 'absolute', inset: 0, zIndex: 0 }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2, display: 'flex' }}>
                <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.7, background: `radial-gradient(circle at center, transparent 0%, ${THEME.colors.bg} 100%)` }} />
        </div>
    );
};

const SiteLogo = () => (
    <div style={{ position: 'absolute', top: 60, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 20 }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.05em', color: THEME.colors.white, display: 'flex', lineHeight: 1 }}>7azem</div>
        <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: '-0.05em', color: THEME.colors.muted, display: 'flex', lineHeight: 1 }}>pro</div>
        <div style={{ width: 10, height: 10, marginLeft: 6, background: `linear-gradient(to top right, #3b82f6, #22d3ee)`, borderRadius: 1, transform: 'rotate(45deg)', boxShadow: `0 4px 6px -1px rgba(59, 130, 246, 0.5)` }} />
    </div>
);

const VerifiedBadge = () => (
    <div style={{ display: 'flex', marginLeft: 6, alignItems: 'center', justifyContent: 'center' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 12.5C22.5 12.5 22.5 12.5 22.5 12.5C22.5 11.2371 21.8494 10.0822 20.8062 9.38072C20.875 8.16335 20.4578 6.94165 19.569 5.98668C18.4907 4.82823 16.8913 4.26629 15.3213 4.47881C14.5029 3.53856 13.3639 2.94303 12.1228 2.82563C10.8817 2.70823 9.64805 3.07842 8.64866 3.86877C7.30607 3.32832 5.79201 3.53594 4.63605 4.43679C3.48008 5.33763 2.8686 6.78652 3.01633 8.24355C1.88939 8.87595 1.25827 10.1584 1.34116 11.4554C1.42405 12.7523 2.20336 13.7933 3.41508 14.2858C3.1207 15.7071 3.59388 17.2023 4.69539 18.2917C5.7969 19.3811 7.29131 19.8291 8.70376 19.5085C9.22489 20.6974 10.2796 21.4926 11.5177 21.6141C12.7558 21.7356 13.9856 21.1643 14.8016 20.0898C16.3533 20.2581 17.9255 19.6644 18.9836 18.4849C19.8517 17.5173 20.2458 16.2872 20.129 15.0664C21.1465 14.3323 21.7699 13.1539 21.7699 11.875V12.5H22.5Z" fill="#3B82F6" />
            <path d="M10.1818 15.2727L6.54541 11.4909L7.63632 10.3563L10.1818 13.0036L15.9999 6.95454L17.0909 8.08909L10.1818 15.2727Z" fill="white" />
        </svg>
    </div>
);

const AuthorFooter = ({ name, role, image, isArabic }) => (
    <div style={{ position: 'absolute', bottom: 50, display: 'flex', flexDirection: isArabic ? 'row-reverse' : 'row', alignItems: 'center', gap: 16, zIndex: 10, opacity: 0.95 }}>
        {image && (
            <img src={image} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${THEME.colors.border}`, boxShadow: `0 4px 12px rgba(0,0,0,0.5)` }} />
        )}
        <div style={{ display: 'flex', flexDirection: isArabic ? 'row-reverse' : 'row', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: isArabic ? '0' : '0.02em', color: THEME.colors.white, display: 'flex', alignItems: 'center', fontFamily: isArabic ? THEME.fonts.ar : THEME.fonts.en }}>
                {name.toUpperCase()}
                {!isArabic && <VerifiedBadge />}
                {isArabic && <div style={{ marginRight: 6 }}><VerifiedBadge /></div>}
            </div>
            <div style={{ fontSize: 14, fontFamily: isArabic ? THEME.fonts.ar : THEME.fonts.mono, color: THEME.colors.accent, display: 'flex', letterSpacing: '0.05em', direction: isArabic ? 'rtl' : 'ltr', backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '4px 8px', borderRadius: 4 }}>
                {role.toUpperCase()}
            </div>
        </div>
    </div>
);

// --- MAIN HANDLER ---

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // 1. Initial Params (Defaults)
        let title = searchParams.get('title') || '7AZEMPRO';
        let titleAr = searchParams.get('title_ar');
        let subtitle = searchParams.get('subtitle') || 'SYSTEM ARCHITECT';
        let type = searchParams.get('type')?.toUpperCase() || 'INDEX';
        let authorName = searchParams.get('authorName') || 'HAZEM ISMAIL';
        let authorRole = searchParams.get('authorRole') || 'SYSTEM ARCHITECT';
        let imageId = searchParams.get('imageId') || searchParams.get('image');
        let authorImageId = searchParams.get('authorImageId');

        const shouldSave = searchParams.get('save') === 'true';
        const docId = searchParams.get('id');

        // 2. FETCH FROM SANITY (If ID Provided)
        // This mirrors the input technique: verifying data from the source.
        if (docId) {
            const query = `{
                "doc": *[_id == $id][0] {
                    title,
                    title_en,
                    category,
                    thumbnail { asset-> },
                    author-> { name, role, image { asset-> } }
                },
                "settings": *[_type == "settings"][0] {
                    authorName,
                    authorRole,
                    profileImage { asset-> }
                }
            }`;

            try {
                const data = await client.fetch(query, { id: docId });

                if (data?.doc) {
                    title = data.doc.title_en || data.doc.title || title;
                    titleAr = data.doc.title !== title ? data.doc.title : titleAr; // Assuming title_en is main
                    subtitle = (data.doc.category || 'ARTICLE').toUpperCase();
                    if (data.doc.thumbnail?.asset?._ref) imageId = data.doc.thumbnail.asset._ref;
                }

                if (data?.settings) {
                    authorName = data.settings.authorName || authorName;
                    authorRole = data.settings.authorRole || authorRole;
                    if (data.settings.profileImage?.asset?._ref) authorImageId = data.settings.profileImage.asset._ref;
                }
            } catch (err) {
                console.error("Fetch Data Error:", err);
                // Fallback to URL params if fetch fails
            }
        }

        // 3. Build Assets
        const buildSanityUrl = (ref) => {
            if (!ref) return null;
            const parts = ref.split('-');
            if (parts.length >= 4) return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${parts[1]}-${parts[2]}.${parts[3]}`;
            return null;
        }

        const bgImage = buildSanityUrl(imageId);
        const authorImage = buildSanityUrl(authorImageId);

        const hasArabic = (text) => /[\u0600-\u06FF]/.test(text || "");
        const isTitleArabic = hasArabic(title);
        const isAuthorArabic = hasArabic(authorName);

        // 4. Load Fonts
        const loadFont = async (url, name, weight) => {
            const res = await fetch(new URL(url, request.url));
            if (!res.ok) return null;
            const data = await res.arrayBuffer();
            return { name, data, style: 'normal', weight };
        };

        const fonts = await Promise.all([
            loadFont('https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin-800-normal.woff', 'Plus Jakarta Sans', 800),
            loadFont('https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin-400-normal.woff', 'Plus Jakarta Sans', 400),
            loadFont('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans-arabic@latest/arabic-700-normal.woff', 'IBM Plex Sans Arabic', 700)
        ]);

        // 5. Render API
        const imageResponse = new ImageResponse(
            (
                <div style={{
                    height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: THEME.colors.bg, color: THEME.colors.text, fontFamily: `${THEME.fonts.en}, ${THEME.fonts.ar}`,
                    position: 'relative', overflow: 'hidden', padding: '40px',
                }}>
                    <SwissGraphics />
                    <BackgroundImage src={bgImage} />
                    <SiteLogo />

                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: 24, zIndex: 10, maxWidth: '85%', textAlign: 'center',
                    }}>
                        <div style={{ display: 'flex', fontFamily: THEME.fonts.mono, fontSize: 16, letterSpacing: '0.25em', color: THEME.colors.accent, textTransform: 'uppercase' }}>
                            [{type}]
                        </div>
                        <div style={{
                            fontSize: 84, fontWeight: isTitleArabic ? 700 : 900, fontFamily: isTitleArabic ? THEME.fonts.ar : THEME.fonts.en,
                            lineHeight: 0.95, letterSpacing: isTitleArabic ? '0' : '-0.04em', textTransform: 'uppercase', color: THEME.colors.text,
                            textAlign: 'center', display: 'flex', justifyContent: 'center', maxWidth: '100%', wordBreak: 'break-word', direction: isTitleArabic ? 'rtl' : 'ltr', textShadow: `0 10px 30px rgba(0,0,0,0.5)`
                        }}>
                            {title}
                        </div>
                        {titleAr && <div style={{ display: 'flex', fontFamily: THEME.fonts.ar, fontSize: 32, fontWeight: 500, color: '#cbd5e1', marginTop: -4, direction: 'rtl' }}>{titleAr}</div>}
                        {!titleAr && <div style={{ display: 'flex', width: 60, height: 3, background: THEME.colors.accent, marginTop: 10 }} />}
                    </div>

                    <AuthorFooter name={authorName} role={authorRole} image={authorImage} isArabic={isAuthorArabic} />
                </div>
            ),
            { width: 1200, height: 630, fonts: fonts.filter(Boolean) }
        );

        // --- SAVE TO SANITY LOGIC ---
        if (shouldSave && docId) {
            if (!process.env.SANITY_API_TOKEN) {
                return new Response(JSON.stringify({ error: "Missing SANITY_API_TOKEN" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
            }

            // Upload & Patch
            const blob = await imageResponse.blob();
            const assetFn = `og-${title.substring(0, 20).replace(/\s+/g, '-').toLowerCase()}.png`;
            const asset = await client.assets.upload('image', blob, { filename: assetFn });

            await client.patch(docId).set({
                thumbnail: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
            }).commit();

            return new Response(JSON.stringify({ success: true, assetId: asset._id, docId }), { headers: { 'Content-Type': 'application/json' } });
        }

        return imageResponse;

    } catch (e) {
        console.error("OG Error:", e);
        return new Response(`Failed to generate: ${e.message}`, { status: 500 });
    }
}
