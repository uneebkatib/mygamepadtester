/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
  // Gzip / Brotli compression for the dev server and any Node.js host
  compress: true,
  reactStrictMode: false,
  // Tree-shake react-icons to only include the icons actually imported
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
