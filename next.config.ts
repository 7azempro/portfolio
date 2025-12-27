import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'react-icons',
      'lucide-react',
      'framer-motion',
      '@sanity/ui',
      '@sanity/icons'
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog/:path*',
        destination: '/articles/:path*',
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(withPWA(nextConfig));
