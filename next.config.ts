import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', "192.168.100.29"],

};

export default nextConfig;
