import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { type Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === "development";

  return {
    mode: options.mode ?? "development",
    entry: {
      main: paths.entry,
    },
    module: {
      rules: buildLoaders(options),
    },
    devServer: isDev ? buildDevServer(options) : undefined,
    resolve: buildResolvers(options),
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    optimization: {
      runtimeChunk: isDev ? "single" : false,
    },
    devtool: isDev ? "inline-source-map" : "source-map",
    plugins: buildPlugins(options),
  };
}
