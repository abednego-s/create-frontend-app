import { objectLiteralToString } from '../utils/object-literals-to-string';
import { webpackPlugins } from '../utils/webpack-plugins';
import type {
  Options,
  WebpackConfig,
  WebpackBuildConfigOptions,
} from '../types';

type BuildConfig = Pick<
  Options,
  | 'plugins'
  | 'lib'
  | 'transpiler'
  | 'styling'
  | 'image'
  | 'optimization'
  | 'font'
>;

function buildImports(plugins: Options['plugins']) {
  let output = '';
  plugins?.forEach((plugin) => {
    output += webpackPlugins[plugin].importDeclaration + ';' + '\n';
  });

  return output;
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

      let loader: {
        test: RegExp;
        use: string[];
        exclude?: RegExp;
      } = {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      };

      if (styling.includes('css-module')) {
        loader = {
          ...loader,
          exclude: /\.module\.css$/,
        };
      }

      config.module.rules?.push(loader);
    }

    if (styling?.includes('css-module')) {
      if (!config['module']) {
        config.module = {
          rules: [],
        };
      }

      let loader: {
        test: RegExp;
        use: (
          | string
          | {
              loader: string;
              options: {
                importLoaders: number;
                modules: boolean;
              };
            }
        )[];
        include?: RegExp;
      } = {
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
      };

      if (styling.includes('css')) {
        loader = {
          ...loader,
          include: /\.module\.css$/,
        };
      }

      config.module.rules?.push(loader);
    }

    if (styling?.includes('less')) {
      if (!config['module']) {
        config.module = {
          rules: [],
        };
      }
      config.module?.rules?.push({
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      });
    }

    if (styling?.includes('scss')) {
      if (!config['module']) {
        config.module = {
          rules: [],
        };
      }
      config.module?.rules?.push({
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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

    if (font) {
      if (!config['module']) {
        config.module = {
          rules: [],
        };
      }
      config.module.rules?.push({
        test: `[code]/\\.(${font.join('|')})$/i[/code]`,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'fonts/',
            },
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
    output += buildConfig(options) + '\n\n';
  } else {
    output += '\n' + buildConfig() + '\n\n';
  }

  output += 'module.exports = config;';
  return output;
}
