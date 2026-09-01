import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import { CV_PUBLIC_PATH } from "./lib/data/cv";

const cvFilePath = path.join(
  process.cwd(),
  "public",
  ...CV_PUBLIC_PATH.split("/").filter(Boolean),
);

/** Set in CI for username.github.io/repo-name project pages. Leave empty for custom domain root. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_CV_AVAILABLE: fs.existsSync(cvFilePath) ? "true" : "false",
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
