import { objectLiteralToString } from '../utils/object-literals-to-string';
import { webpackPlugins } from '../utils/webpack-plugins';
import type {
  Options,
  WebpackConfig,
  WebpackBuildConfigOptions,
} from '../types';

function buildImports(plugins: Options['plugins']) {
  let output = '';
  plugins?.forEach((plugin) => {
    output += webpackPlugins[plugin].importDeclaration + ';' + '\n';
  });

  return output;
}

function buildConfig(
  plugins?: Options['plugins'],
  lib?: Options['lib'],
  transpiler?: Options['transpiler']
) {
  const config: WebpackConfig = {
    entry: './src/index.js',
    output: {
      path: "[code]path.resolve(__dirname, 'dist')[/code]",
      filename: 'bundle.js',
    },
  };

  // adding plugins
  if (plugins && plugins.length > 0) {
    config.plugins = [];
    plugins.forEach((plugin) => {
      config.plugins?.push(
        `[code]${webpackPlugins[plugin].pluginEntry}[/code]` as ''
      );
    });
  }

  // adding loaders
  if (lib === 'react') {
    if (!config['module']) {
      config.module = {
        rules: [],
      };
    }

    if (!config['resolve']) {
      config.resolve = {};
    }

    if (transpiler?.includes('babel')) {
      config.module.rules?.push({
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      });

      config.resolve.extensions = ['.js', '.jsx'];
    }

    if (transpiler?.includes('ts')) {
      config.module.rules?.push({
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      });

      config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];
    }

    config.devServer = {
      static: {
        directory: './dist',
      },
    };
  }

  return `const config = ${objectLiteralToString(config)}`;
}

export function buildWebpackConfig(options?: WebpackBuildConfigOptions) {
  let output =
    "const path = require('path);\nconst webpack = require('webpack');\n";
  if (options) {
    output += buildImports(options.plugins) + '\n';
  }

  if (options) {
    output +=
      buildConfig(options.plugins, options.lib, options.transpiler) + '\n\n';
  } else {
    output += '\n' + buildConfig() + '\n\n';
  }

  output += 'module.exports = config;';
  return output;
}