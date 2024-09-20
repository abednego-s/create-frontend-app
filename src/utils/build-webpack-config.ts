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
  transpiler?: Options['transpiler'],
  styling?: Options['styling'],
  image?: Options['image'],
  optimization?: Options['optimization']
) {
  const config: WebpackConfig = {
    entry: './src/index.js',
    output: {
      path: "[code]path.resolve(__dirname, 'dist')[/code]",
      filename: 'bundle.js',
    },
  };

  if (transpiler?.includes('ts')) {
    config.entry = './src/index.ts';
  }

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

    if (transpiler?.includes('babel') && !transpiler.includes('ts')) {
      config.module.rules?.push({
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      });

      config.resolve.extensions = ['.js', '.jsx'];
    }

    if (transpiler?.includes('ts') && !transpiler.includes('babel')) {
      config.module.rules?.push({
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      });

      config.resolve.extensions = ['.ts', '.tsx', '.js'];
    }

    if (transpiler?.includes('ts') && transpiler.includes('babel')) {
      config.module.rules?.push({
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      });

      config.resolve.extensions = ['.ts', '.tsx'];
    }

    config.devServer = {
      port: 3000,
      open: true,
    };
  }

  if (plugins?.includes('mini-css-extract-plugin')) {
    if (!config['module']) {
      config.module = {
        rules: [],
      };
    }
    config.module.rules?.push({
      test: /\.css$/i,
      use: ['[code]MiniCssExtractPlugin.loader[/code]', 'css-loader'],
    });
  }

  if (styling?.includes('css')) {
    if (!config['module']) {
      config.module = {
        rules: [],
      };
    }
    config.module.rules?.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
  }

  if (styling?.includes('css-module')) {
    if (!config['module']) {
      config.module = {
        rules: [],
      };
    }
    config.module.rules?.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
      ],
    });
  }

  if (image) {
    if (!config['module']) {
      config.module = {
        rules: [],
      };
    }

    config.module.rules?.push({
      test: `[code]/\\.(${image.join('|')})$/i[/code]`,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    });
  }

  if (optimization?.includes('split-vendors')) {
    config.output = {
      ...config.output,
      filename: '[name].[contenthash].js',
    };
    config.optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    };
  }

  return `const config = ${objectLiteralToString(config)}`;
}

export function buildWebpackConfig(options?: WebpackBuildConfigOptions) {
  let output =
    "const path = require('path');\nconst webpack = require('webpack');\n";
  if (options) {
    output += buildImports(options.plugins) + '\n';
  }

  if (options) {
    output +=
      buildConfig(
        options.plugins,
        options.lib,
        options.transpiler,
        options.styling,
        options.image,
        options.optimization
      ) + '\n\n';
  } else {
    output += '\n' + buildConfig() + '\n\n';
  }

  output += 'module.exports = config;';
  return output;
}
