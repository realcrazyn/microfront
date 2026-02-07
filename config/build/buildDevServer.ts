import { Configuration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export const buildDevServer = (options: BuildOptions): Configuration => ({
  port: options.port ?? 3000,
  open: true,
  static: "./public",
  historyApiFallback: true,
  hot: true,
});
