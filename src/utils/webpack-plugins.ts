export const webpackPlugins = {
  'html-webpack-plugin': {
    importDeclaration:
      "const HTMLWebpackPlugin = require('html-webpack-plugin')",
    pluginEntry: 'new HTMLWebpackPlugin()',
  },
  'webpack-bundle-analyzer': {
    importDeclaration:
      "const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin",
    pluginEntry: `new BundleAnalyzerPlugin()`,
  },
  'mini-css-extract-plugin': {
    importDeclaration:
      "const MiniCssExtractPlugin = require('mini-css-extract-plugin')",
    pluginEntry: 'new MiniCssExtractPlugin()',
  },
  'clean-webpack-plugin': {
    importDeclaration:
      "const { CleanWebpackPlugin } = require('clean-webpack-plugin')",
    pluginEntry: 'new CleanWebpackPlugin()',
  },
  'terser-webpack-plugin': {
    importDeclaration: "const TerserPlugin = require('terser-webpack-plugin')",
    pluginEntry: 'new TerserPlugin()',
  },
  'dotenv-webpack': {
    importDeclaration: "const Dotenv = require('dotenv-webpack')",
    pluginEntry: 'new Dotenv()',
  },
};
