/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL || "http://localhost:5207";
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
