import { objectLiteralToString } from '../utils/object-literals-to-string';
import { webpackPlugins } from '../utils/webpack-plugins';
import type {
  BuildConfig,
  WebpackConfig,
  WebpackBuildConfigOptions,
} from '../types';

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
            ? '[code]sveltePreprocess({ typescript: true })[/code]'
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

// eslint-disable-next-line no-unused-vars
function vue(this: WebpackConfig) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  this.resolve = {
    ...this.resolve,
  };

  const extensions = ['*', '.js', '.vue', '.json'];

  this.module.rules?.push({
    test: /\.vue$/,
    loader: 'vue-loader',
  });

  if (!this.plugins) {
    this.plugins = [];
  }

  this.plugins?.push('[code]new VueLoaderPlugin()[/code]' as '');

  this.resolve.alias = {
    vue$: 'vue/dist/vue.esm.js',
  };

  this.resolve.extensions = extensions;
}

function css(
  this: WebpackConfig,
  styling: BuildConfig['styling'],
  plugins: BuildConfig['plugins']
) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  let use = ['style-loader', 'css-loader'];

  if (plugins?.includes('mini-css-extract-plugin')) {
    use = ['[code]MiniCssExtractPlugin.loader[/code]', 'css-loader'];
  }

  if (styling?.includes('css-module')) {
    this.module.rules.push({
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use,
    });
  } else {
    this.module.rules.push({
      test: /\.css$/,
      use,
    });
  }
}

function cssModule(this: WebpackConfig, plugins: BuildConfig['plugins']) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  let styleLoader = 'style-loader';

  if (plugins?.includes('mini-css-extract-plugin')) {
    styleLoader = '[code]MiniCssExtractPlugin.loader[/code]';
  }

  this.module.rules.push({
    test: /\.module\.css$/,
    use: [
      styleLoader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
    ],
  });
}

// eslint-disable-next-line no-unused-vars
function less(this: WebpackConfig) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  this.module.rules.push({
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
  });
}

// eslint-disable-next-line no-unused-vars
function scss(this: WebpackConfig) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  this.module?.rules?.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  });
}

function imageLoader(this: WebpackConfig, image: string[]) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  this.module.rules.push({
    test: `[code]/\\.(${image.join('|')})$/i[/code]`,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  });
}

function fontLoader(this: WebpackConfig, font: string[]) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  this.module.rules?.push({
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

// eslint-disable-next-line no-unused-vars
function bundleOptimizer(this: WebpackConfig) {
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

    setEntryPoint.call(config, transpiler);

    if (lib === 'react') {
      react.call(config, transpiler);
    }

    if (lib === 'svelte') {
      svelte.call(config, transpiler);
    }

    if (lib === 'vue') {
      vue.call(config);
    }

    if (styling?.includes('css')) {
      css.call(config, styling, plugins);
    }

    if (styling?.includes('css-module')) {
      cssModule.call(config, plugins);
    }

    if (styling?.includes('less')) {
      less.call(config);
    }

    if (styling?.includes('scss')) {
      scss.call(config);
    }

    if (image) {
      imageLoader.call(config, image);
    }

    if (font) {
      fontLoader.call(config, font);
    }

    if (optimization?.includes('split-vendors')) {
      bundleOptimizer.call(config);
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
