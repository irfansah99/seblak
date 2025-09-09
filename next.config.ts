import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', 
    },
  },
};

export default withFlowbiteReact(nextConfig);
