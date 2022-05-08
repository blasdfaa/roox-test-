const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CSSModuleLoader = {
  loader: "css-loader",
  options: {
    importLoaders: 2,
    sourceMap: false,
    modules: {
      localIdentName: "[name]_[local]_[hash:base64:5]",
    },
  },
};

const CSSLoader = {
  loader: "css-loader",
  options: {
    modules: "global",
    importLoaders: 2,
    sourceMap: false,
  },
};

const PostCSSLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      ident: "postcss",
      sourceMap: false,
      plugins: () => [
        autoprefixer({
          browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"],
        }),
      ],
    },
  },
};

const devMode = process.env.NODE_ENV !== "production";
const styleLoader = devMode ? "style-loader" : MiniCssExtractPlugin.loader;

module.exports = {
  mode: "none",
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
  },
  target: "web",
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "scss"],
    alias: {
      process: "process/browser",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [styleLoader, CSSLoader, PostCSSLoader, "sass-loader"],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [styleLoader, CSSModuleLoader, PostCSSLoader, "sass-loader"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
