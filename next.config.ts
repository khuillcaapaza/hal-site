import type { NextConfig } from "next";

// The site is served from the domain root (https://hospitalantoniolorena.gob.pe),
// so no base path is needed. NEXT_PUBLIC_BASE_PATH stays empty in CI and locally.
// (Set it to "/sub" only if you ever serve the app from a sub-path.)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Produce a fully static site in the `out/` folder on `next build`.
  output: "export",

  // Static hosting (Apache/Nginx on HestiaCP) serves plain files,
  // so disable the Image Optimization server.
  images: { unoptimized: true },

  // Emit `route/index.html` so static hosts serve nested routes correctly.
  trailingSlash: true,

  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
