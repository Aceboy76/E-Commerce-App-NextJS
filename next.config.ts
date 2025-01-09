import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  experimental: {
    taint: true,
  },
}
export default nextConfig;
