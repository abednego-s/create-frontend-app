import { stripIndents } from 'common-tags';
import { objectLiteralToString } from '../object-literal-to-string';
import { webpackPlugins } from '../webpack-plugins';
import { WebpackConfig, WebpackRuleSetRule, Options } from '../../types';

export type WebpackBuildConfigOptions = Omit<Options, 'name' | 'bundler'>;

export type BuildConfigOptions = Pick<
  Options,
  | 'plugins'
  | 'lib'
  | 'transpiler'
  | 'styling'
  | 'image'
  | 'optimization'
  | 'font'
>;

function applyReact(
  this: WebpackConfig,
  { isBabel, isTypescript }: { isBabel: boolean; isTypescript: boolean }
) {
  this.module = {
    ...this.module,
  };

  this.resolve = {
    ...this.resolve,
  };

  if (isBabel && !isTypescript) {
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

  if (isTypescript && !isBabel) {
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

  if (isBabel && isTypescript) {
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

function applySvelte(
  this: WebpackConfig,
  { isBabel, isTypescript }: { isBabel: boolean; isTypescript: boolean }
) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  this.resolve = {
    ...this.resolve,
  };

  const extensions = ['.js', '.mjs', '.svelte'];

  this.module.rules = [
    ...this.module.rules,
    {
      test: /\.svelte$/,
      use: {
        loader: 'svelte-loader',
        options: {
          preprocess: isTypescript
            ? '[code]sveltePreprocess({ typescript: true })[/code]'
            : '[code]sveltePreprocess()[/code]',
        },
      },
    },
  ];

  if (isBabel) {
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

  if (isTypescript) {
    this.module.rules = [
      ...this.module.rules,
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ];
    extensions.unshift('.ts');
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

function applyVue(
  this: WebpackConfig,
  { isTypescript }: { isTypescript: boolean }
) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  this.resolve = {
    ...this.resolve,
  };

  const extensions = ['.js', '.vue', '.json'];

  this.module.rules?.push({
    test: /\.vue$/,
    loader: 'vue-loader',
  });

  if (!this.plugins) {
    this.plugins = [];
  }

  this.plugins?.push('[code]new VueLoaderPlugin()[/code]' as '');

  this.resolve.alias = {
    vue$: 'vue/dist/vue.esm-bundler.js',
  };

  if (isTypescript) {
    extensions.unshift('.ts');
  }

  this.resolve.extensions = extensions;
}

function applyCss(
  this: WebpackConfig,
  {
    isVue,
    useMiniCssExtractPlugin,
  }: { isVue: boolean; useMiniCssExtractPlugin: boolean }
) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  let styleLoader = 'style-loader';

  if (isVue) {
    styleLoader = 'vue-style-loader';
  }

  let use = [styleLoader, 'css-loader'];

  if (useMiniCssExtractPlugin) {
    use = [
      `[code]process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : '${styleLoader}'[/code]`,
      'css-loader',
    ];
  }

  this.module.rules.push({
    test: /\.css$/,
    use,
  });
}

function applyCssModule(
  this: WebpackConfig,
  {
    isVue,
    useMiniCssExtractPlugin,
  }: { isVue: boolean; useMiniCssExtractPlugin: boolean }
) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  let styleLoader = 'style-loader';

  if (isVue) {
    styleLoader = 'vue-style-loader';
  }

  if (useMiniCssExtractPlugin) {
    styleLoader = `[code]process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : '${styleLoader}'[/code]`;
  }

  this.module.rules.push({
    test: /\.module\.css$/,
    use: [
      styleLoader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
    ],
  });

  const updatedRules = this.module.rules?.map((moduleRule) => {
    const rule = moduleRule as WebpackRuleSetRule;
    if (rule?.test?.toString() === /\.css$/.toString()) {
      return {
        ...rule,
        exclude: /\.module\.css$/,
      };
    }
    return rule;
  });

  this.module.rules = updatedRules;
}

function applyLess(
  this: WebpackConfig,
  {
    isVue,
    useMiniCssExtractPlugin,
  }: { isVue: boolean; useMiniCssExtractPlugin: boolean }
) {
  let styleLoader = 'style-loader';

  if (isVue) {
    styleLoader = 'vue-style-loader';
  }

  if (useMiniCssExtractPlugin) {
    styleLoader = `[code]process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : '${styleLoader}'[/code]`;
  }

  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  this.module.rules.push({
    test: /\.less$/,
    use: [styleLoader, 'css-loader', 'less-loader'],
  });
}

function applySass(
  this: WebpackConfig,
  {
    isVue,
    useMiniCssExtractPlugin,
  }: { isVue: boolean; useMiniCssExtractPlugin: boolean }
) {
  let styleLoader = 'style-loader';

  if (isVue) {
    styleLoader = 'vue-style-loader';
  }

  if (useMiniCssExtractPlugin) {
    styleLoader = `[code]process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : '${styleLoader}'[/code]`;
  }

  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  this.module?.rules?.push({
    test: /\.scss$/,
    use: [styleLoader, 'css-loader', 'sass-loader'],
  });
}

function applyFileLoader(
  this: WebpackConfig,
  { assets }: { assets: string[] }
): void {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  this.module.rules.push({
    test: `[code]/\\.(${assets.join('|')})$/i[/code]`,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  });
}

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

function registerPlugins(this: WebpackConfig, plugins: Options['plugins']) {
  const allPlugins = plugins?.map(
    (plugin) => `[code]${webpackPlugins[plugin].pluginEntry}[/code]` as ''
  );

  if (allPlugins) {
    this.plugins = this.plugins ? [...this.plugins, ...allPlugins] : allPlugins;
  }
}

// eslint-disable-next-line no-unused-vars
function optimizer(this: WebpackConfig) {
  this.output = {
    ...this.output,
    filename: '[name].[contenthash].js',
  };
  this.optimization = {
    ...this.optimization,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: '[code]/[\\\\/]node_modules[\\\\/]/[/code]',
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  };
}

function buildConfig(options?: BuildConfigOptions) {
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

    const isReact = lib === 'react';
    const isVue = lib === 'vue';
    const isSvelte = lib === 'svelte';
    const isBabel = transpiler?.includes('babel') ?? false;
    const isTypescript = transpiler?.includes('ts') ?? false;
    const isCss = styling?.includes('css') ?? false;
    const isCssModule = styling?.includes('css-module') ?? false;
    const isLess = styling?.includes('less') ?? false;
    const isSass = styling?.includes('scss') ?? false;

    const useMiniCssExtractPlugin =
      plugins?.includes('mini-css-extract-plugin') ?? false;

    if (isTypescript) {
      config.entry = './src/index.ts';
    }

    if (isReact) {
      applyReact.call(config, { isBabel, isTypescript });
    }

    if (isSvelte) {
      applySvelte.call(config, { isBabel, isTypescript });
    }

    if (isVue) {
      applyVue.call(config, { isCss, isTypescript });
    }

    if (isCss) {
      applyCss.call(config, {
        isVue,
        useMiniCssExtractPlugin,
      });
    }

    if (isCssModule) {
      applyCssModule.call(config, { isVue, useMiniCssExtractPlugin });
    }

    if (isLess) {
      applyLess.call(config, { isVue, useMiniCssExtractPlugin });
    }

    if (isSass) {
      applySass.call(config, {
        isVue,
        useMiniCssExtractPlugin,
      });
    }

    if (image) {
      applyFileLoader.call(config, { assets: image });
    }

    if (font) {
      applyFileLoader.call(config, { assets: font });
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
  let template = stripIndents`
    const path = require('path');
    const webpack = require('webpack');
  `;

  if (options) {
    template += '\n' + buildImports(options);
    template += '\n' + buildConfig(options) + '\n\n';
  } else {
    template += '\n' + buildConfig() + '\n\n';
  }

  template += 'module.exports = config;';
  return template;
}
