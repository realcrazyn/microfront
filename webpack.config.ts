import path from "path";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildPaths, EnvVars } from "./config/build/types/types";

export default (env: EnvVars) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
    output: path.resolve(__dirname, "build"),
    src: path.resolve(__dirname, "src"),
  };

  const config = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer ?? false,
    platform: env.platform ?? "desktop",
  });
  return config;
};
