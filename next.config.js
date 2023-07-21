/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["moneybridge.s3.ap-northeast-2.amazonaws.com"],
  },
  env: {
    NEXT_PUBLIC_KAKAO_API_KEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
    NEXT_PUBLIC_KAKAO_REST_API_KEY: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
    NEXT_PUBLIC_KAKAO_API_COORD_URL: process.env.NEXT_PUBLIC_KAKAO_API_COORD_URL,
    NEXT_PUBLIC_KAKAO_API_SEARCH_URL: process.env.NEXT_PUBLIC_KAKAO_API_SEARCH_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.moneybridge.co.kr/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
