import { objectLiteralToString } from '../utils/object-literals-to-string';
import { webpackPlugins } from '../utils/webpack-plugins';
import type {
  BuildConfig,
  WebpackConfig,
  WebpackBuildConfigOptions,
} from '../types';

function buildImports(options: WebpackBuildConfigOptions) {
  let output = '';
  options.plugins?.forEach((plugin) => {
    output += webpackPlugins[plugin].importDeclaration + ';' + '\n';
  });

  if (options.lib === 'svelte') {
    output += "const sveltePreprocess = require('svelte-preprocess');\n";
  }

  if (options.lib === 'vue') {
    output += "const { VueLoaderPlugin } = require('vue-loader');\n";
  }

  return output;
}

function setEntryPoint(
  this: WebpackConfig,
  transpiler: BuildConfig['transpiler']
) {
  if (transpiler?.includes('ts')) {
    this.entry = './src/index.ts';
  }
}

function registerPlugins(this: WebpackConfig, plugins: BuildConfig['plugins']) {
  this.plugins = plugins?.map(
    (plugin) => `[code]${webpackPlugins[plugin].pluginEntry}[/code]` as ''
  );
}

function react(this: WebpackConfig, transpiler: BuildConfig['transpiler']) {
  const useBabel = transpiler ? transpiler.includes('babel') : false;
  const useTypescript = transpiler ? transpiler.includes('ts') : false;

  this.module = {
    ...this.module,
  };

  this.resolve = {
    ...this.resolve,
  };

  if (useBabel && !useTypescript) {
    const rule = {
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
      },
      exclude: /node_modules/,
    };

    this.module.rules = this.module.rules
      ? [...this.module.rules, rule]
      : [rule];

    this.resolve.extensions = ['.js', '.jsx'];
  }

  if (useTypescript && !useBabel) {
    const rule = {
      test: /\.ts(x)?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    };

    this.module.rules = this.module.rules
      ? [...this.module.rules, rule]
      : [rule];

    this.resolve.extensions = ['.ts', '.tsx', '.js'];
  }

  if (useBabel && useTypescript) {
    const rule = {
      test: /\.(js|ts)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    };

    this.module.rules = this.module.rules
      ? [...this.module.rules, rule]
      : [rule];

    this.resolve.extensions = ['.ts', '.tsx', '.js'];
  }
}

function svelte(this: WebpackConfig, transpiler: BuildConfig['transpiler']) {
  const useBabel = transpiler ? transpiler.includes('babel') : false;
  const useTypescript = transpiler ? transpiler.includes('ts') : false;

  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  this.resolve = {
    ...this.resolve,
  };

  const extensions = ['.mjs', '.js', '.svelte'];

  this.module.rules = [
    ...this.module.rules,
    {
      test: /\.svelte$/,
      use: {
        loader: 'svelte-loader',
        options: {
          preprocess: useTypescript
            ? '[code]sveltePreprocess({ typescript: true, })[/code]'
            : '[code]sveltePreprocess()[/code]',
        },
      },
    },
  ];

  if (useBabel) {
    this.module.rules = [
      ...this.module.rules,
      {
        test: /\.(js|mjs)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
    ];
  }

  if (useTypescript) {
    this.module.rules = [
      ...this.module.rules,
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ];
    extensions.push('.ts');
  }

  this.resolve = {
    ...this.resolve,
    alias: {
      ...this.resolve.alias,
      svelte: "[code]path.resolve('node_modules', 'svelte')[/code]",
    },
    extensions,
    mainFields: ['svelte', 'browser', 'module', 'main'],
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

    setEntryPoint.call(config, transpiler);

    registerPlugins.call(config, plugins);

    if (lib === 'react') {
      react.call(config, transpiler);
    }

    if (lib === 'svelte') {
      svelte.call(config, transpiler);
    }

    if (lib) {
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

    if (lib === 'vue') {
      if (!config['module']) {
        config.module = {
          rules: [],
        };
      }

      if (!config['resolve']) {
        config.resolve = {};
      }

      const extensions = ['*', '.js', '.vue', '.json'];

      config.module.rules?.push({
        test: /\.vue$/,
        loader: 'vue-loader',
      });

      if (!config['plugins']) {
        config.plugins = [];
      }

      config.plugins?.push('[code]new VueLoaderPlugin()[/code]' as '');

      config.resolve.alias = {
        vue$: 'vue/dist/vue.esm.js',
      };

      config.resolve.extensions = extensions;

      config.devServer = {
        port: 3000,
        open: true,
      };
    }

    // add styling
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

    // add image
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

    // add font
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

    // add optimization
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
              test: '[code]/[\\/]node_modules[\\/]/[/code]',
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
    output += buildImports(options) + '\n';
  }

  if (options) {
    output += buildConfig(options) + '\n\n';
  } else {
    output += '\n' + buildConfig() + '\n\n';
  }

  output += 'module.exports = config;';
  return output;
}
