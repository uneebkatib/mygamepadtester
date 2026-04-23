/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
    // Remove unused React imports from client bundles (smaller JS)
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Gzip / Brotli compression for the dev server and any Node.js host
  compress: true,
  // Enable React production optimisations (production already does this,
  // but being explicit avoids surprises with custom server setups)
  reactStrictMode: false,
  // Reduce JS payload — externalize only packages that are truly not needed client-side
  experimental: {
    // Optimise styled-components class-name generation to avoid duplicate styles
    optimizePackageImports: ['react-icons', 'styled-components'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
