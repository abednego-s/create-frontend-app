import { objectLiteralToString } from '../utils/object-literals-to-string';
import { webpackPlugins } from '../utils/webpack-plugins';
import type {
  BuildConfig,
  WebpackConfig,
  WebpackBuildConfigOptions,
} from '../types';
import { ReactStrategy } from './strategies/react-strategy';
import { SvelteStrategy } from './strategies/svelte-strategy';
import { VueStrategy } from './strategies/vue-strategy';
import { CssStrategy } from './strategies/css-strategy';
import { LessStrategy } from './strategies/less-strategy';
import { SassStrategy } from './strategies/sass-strategy';
import { FileLoaderStrategy } from './strategies/file-loader-strategy';
import { CssModuleStrategy } from './strategies/css-module-strategy';

function buildImports(options: WebpackBuildConfigOptions) {
  const pluginImports =
    options.plugins
      ?.map((plugin) => `${webpackPlugins[plugin].importDeclaration};`)
      .join('\n') || '';

  let output = pluginImports;

  if (options.lib === 'svelte') {
    output += "\nconst sveltePreprocess = require('svelte-preprocess');\n";
  }

  if (options.lib === 'vue') {
    output += "\nconst { VueLoaderPlugin } = require('vue-loader');\n";
  }

  return output;
}

function registerPlugins(this: WebpackConfig, plugins: BuildConfig['plugins']) {
  this.plugins = plugins?.map(
    (plugin) => `[code]${webpackPlugins[plugin].pluginEntry}[/code]` as ''
  );
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

    if (transpiler?.includes('ts')) {
      config.entry = './src/index.ts';
    }

    if (lib === 'react') {
      new ReactStrategy(options.transpiler).applyWebpackConfig(config);
    }

    if (lib === 'svelte') {
      new SvelteStrategy(options.transpiler).applyWebpackConfig(config);
    }

    if (lib === 'vue') {
      new VueStrategy().applyWebpackConfig(config);
    }

    if (styling?.includes('css')) {
      new CssStrategy(options.plugins, options.styling).applyWebpackConfig(
        config
      );
    }

    if (styling?.includes('css-module')) {
      new CssModuleStrategy(options.plugins).applyWebpackConfig(config);
    }

    if (styling?.includes('less')) {
      new LessStrategy().applyWebpackConfig(config);
    }

    if (styling?.includes('scss')) {
      new SassStrategy().applyWebpackConfig(config);
    }

    if (image) {
      new FileLoaderStrategy(image).applyWebpackConfig(config);
    }

    if (font) {
      new FileLoaderStrategy(font).applyWebpackConfig(config);
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
