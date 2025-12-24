import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{
                    width: '24px',
                    height: '24px',
                    background: 'linear-gradient(45deg, #3b82f6, #06b6d4)',
                    transform: 'rotate(45deg)',
                    borderRadius: '4px',
                    boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ transform: 'rotate(-45deg)', fontSize: 16, fontWeight: 900, color: 'white' }}>7</div>
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
