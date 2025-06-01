/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net', 'bigjpg.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "estampador-ia.vercel.app"]
    }
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

module.exports = nextConfig;
