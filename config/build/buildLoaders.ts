import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypescript from "react-refresh-typescript";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export const buildLoaders = (options: BuildOptions): ModuleOptions["rules"] => {
  const isDev = options.mode === "development";
  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  };

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const babelLoader = buildBabelLoader(options);

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypescript()].filter(Boolean),
          }),
          transpileOnly: isDev,
        },
      },
    ],
  };

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  return [scssLoader, svgLoader, assetLoader, babelLoader];
};
