import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

import { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import path from "path";

export const buildPlugins = ({
  mode,
  paths,
  analyzer,
  platform,
}: BuildOptions): Configuration["plugins"] => {
  const isProd = mode === "production";
  const isDev = mode === "development";
  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, "favicon.svg"),
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __MODE__: JSON.stringify(mode),
    }),
  ];

  if (isDev) {
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }
  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      }),
    );
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, "locales"),
            to: path.resolve(paths.output, "locales"),
          },
        ],
      }),
    );
  }
  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return plugins;
};
