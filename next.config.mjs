/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Generate out/stick-drift-test/index.html instead of out/stick-drift-test.html
  // so that a standard Nginx try_files $uri $uri/ /index.html; works without
  // needing the non-standard $uri.html lookup.
  trailingSlash: true,
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
