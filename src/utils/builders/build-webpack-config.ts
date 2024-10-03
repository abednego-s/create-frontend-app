import { objectLiteralToString } from '../object-literals-to-string';
import { webpackPlugins } from '../webpack-plugins';
import type {
  BuildConfig,
  WebpackConfig,
  WebpackBuildConfigOptions,
} from '../../types';
import { ReactStrategy } from '../strategies/react-strategy';
import { SvelteStrategy } from '../strategies/svelte-strategy';
import { VueStrategy } from '../strategies/vue-strategy';
import { CssStrategy } from '../strategies/css-strategy';
import { LessStrategy } from '../strategies/less-strategy';
import { SassStrategy } from '../strategies/sass-strategy';
import { FileLoaderStrategy } from '../strategies/file-loader-strategy';
import { CssModuleStrategy } from '../strategies/css-module-strategy';

function buildImports(options: WebpackBuildConfigOptions) {
  let template = '';

  if (options.lib === 'svelte') {
    template += "const sveltePreprocess = require('svelte-preprocess');\n";
  }

  if (options.lib === 'vue') {
    template += "const { VueLoaderPlugin } = require('vue-loader');\n";
  }

  const pluginImports =
    options.plugins
      ?.map((plugin) => `${webpackPlugins[plugin].importDeclaration};`)
      .join('\n') || '';

  if (pluginImports) {
    template += pluginImports + '\n';
  }

  return template;
}

function registerPlugins(this: WebpackConfig, plugins: BuildConfig['plugins']) {
  const allPlugins = plugins?.map(
    (plugin) => `[code]${webpackPlugins[plugin].pluginEntry}[/code]` as ''
  );

  if (this.plugins) {
    this.plugins = [...this.plugins];

    if (allPlugins) {
      this.plugins = [...this.plugins, ...allPlugins];
    }
  }
}

// eslint-disable-next-line no-unused-vars
function optimizer(this: WebpackConfig) {
  this.output = {
    ...this.output,
    filename: '[name].[contenthash].js',
  };
  this.optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: '[code]/[\\/]node_modules[\\/]/[/code]',
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  };
}

function buildConfig(options?: BuildConfig) {
  const config: WebpackConfig = {
    entry: './src/index.js',
    output: {
      path: "[code]path.resolve(__dirname, 'dist')[/code]",
      filename: 'bundle.js',
    },
  };

  if (options) {
    const { plugins, lib, transpiler, styling, image, optimization, font } =
      options;

    const isBabel = transpiler?.includes('babel');
    const isTypescript = transpiler?.includes('ts');
    const useMiniCssExtractPlugin =
      plugins?.includes('mini-css-extract-plugin') ?? false;
    const isVue = lib === 'vue';
    const isCss = styling?.includes('css');

    if (transpiler?.includes('ts')) {
      config.entry = './src/index.ts';
    }

    if (lib === 'react') {
      new ReactStrategy({
        isBabel,
        isTypescript,
      }).applyWebpackConfig(config);
    }

    if (lib === 'svelte') {
      new SvelteStrategy({
        isBabel,
        isTypescript,
      }).applyWebpackConfig(config);
    }

    if (lib === 'vue') {
      new VueStrategy({
        isCss,
        isTypescript,
      }).applyWebpackConfig(config);
    }

    if (styling?.includes('css')) {
      new CssStrategy({
        useMiniCssExtractPlugin,
        isVue,
      }).applyWebpackConfig(config);
    }

    if (styling?.includes('css-module')) {
      new CssModuleStrategy({
        useMiniCssExtractPlugin,
        isVue,
      }).applyWebpackConfig(config);
    }

    if (styling?.includes('less')) {
      new LessStrategy({
        useMiniCssExtractPlugin,
        isVue,
      }).applyWebpackConfig(config);
    }

    if (styling?.includes('scss')) {
      new SassStrategy({
        useMiniCssExtractPlugin,
        isVue,
      }).applyWebpackConfig(config);
    }

    if (image) {
      new FileLoaderStrategy({ assets: image }).applyWebpackConfig(config);
    }

    if (font) {
      new FileLoaderStrategy({ assets: font }).applyWebpackConfig(config);
    }

    if (optimization?.includes('split-vendors')) {
      optimizer.call(config);
    }

    if (plugins) {
      registerPlugins.call(config, plugins);
    }

    if (lib) {
      config.devServer = {
        port: 3000,
        open: true,
      };
    }
  }

  return `const config = ${objectLiteralToString(config)}`;
}

export function buildWebpackConfig(options?: WebpackBuildConfigOptions) {
  let template =
    "const path = require('path');\nconst webpack = require('webpack');\n";
  if (options) {
    template += buildImports(options) + '\n';
  }

  if (options) {
    template += buildConfig(options) + '\n\n';
  } else {
    template += '\n' + buildConfig() + '\n\n';
  }

  template += 'module.exports = config;';
  return template;
}
