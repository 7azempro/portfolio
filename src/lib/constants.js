
// Swiss "Blueprint" Placeholder
// Dark Navy background with subtle grid and crosshairs
const SVG_PLACEHOLDER = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#020408"/>
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563EB" stroke-width="0.5" stroke-opacity="0.2"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#grid)" />
  <line x1="0" y1="0" x2="800" y2="600" stroke="#2563EB" stroke-width="1" stroke-opacity="0.1" />
  <line x1="800" y1="0" x2="0" y2="600" stroke="#2563EB" stroke-width="1" stroke-opacity="0.1" />
  <circle cx="400" cy="300" r="50" stroke="#2563EB" stroke-width="1" fill="none" stroke-opacity="0.2" />
  <text x="400" y="300" font-family="monospace" font-size="14" fill="#2563EB" text-anchor="middle" dy="5" opacity="0.5">NO_SIGNAL</text>
</svg>
`.trim().replace(/\n/g, '');


export const FALLBACK_IMAGE = `data:image/svg+xml;base64,${Buffer.from(SVG_PLACEHOLDER).toString('base64')}`;

// Helper to safely get Image URL
import { urlFor } from '@/sanity/lib/image';

export function getSafeImage(source) {
    if (source && source.asset) {
        return urlFor(source).url();
    }
    return FALLBACK_IMAGE;
}
