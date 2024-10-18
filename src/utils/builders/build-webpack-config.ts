import { stripIndents } from 'common-tags';
import { WebpackPluginInstance, RuleSetRule } from 'webpack';
import { objectLiteralToString } from '../object-literal-to-string';
import { WebpackConfig, Options } from '../../types';

export type WebpackBuildConfigOptions = Omit<Options, 'name' | 'bundler'>;

export type BuildConfigOptions = Pick<
  Options,
  'lib' | 'transpiler' | 'styling' | 'image' | 'optimization' | 'font' | 'ui'
>;

function applyReact(
  this: WebpackConfig,
  { useBabel, useTypescript }: { useBabel: boolean; useTypescript: boolean }
) {
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

function applySvelte(
  this: WebpackConfig,
  { useBabel, useTypescript }: { useBabel: boolean; useTypescript: boolean }
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
  { useTypescript }: { useTypescript: boolean }
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

  if (useTypescript) {
    extensions.unshift('.ts');
  }

  this.resolve.extensions = extensions;
}

function applyCss(this: WebpackConfig, { useVue }: { useVue: boolean }) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  let styleLoader = 'style-loader';

  if (useVue) {
    styleLoader = 'vue-style-loader';
  }

  const use = [styleLoader, 'css-loader'];

  this.module.rules.push({
    test: /\.css$/,
    use,
  });
}

function applyCssModule(this: WebpackConfig, { useVue }: { useVue: boolean }) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  let styleLoader = 'style-loader';

  if (useVue) {
    styleLoader = 'vue-style-loader';
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
    const rule = moduleRule as RuleSetRule;
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

function applyLess(this: WebpackConfig, { useVue }: { useVue: boolean }) {
  let styleLoader = 'style-loader';

  if (useVue) {
    styleLoader = 'vue-style-loader';
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

function applySass(this: WebpackConfig, { useVue }: { useVue: boolean }) {
  let styleLoader = 'style-loader';

  if (useVue) {
    styleLoader = 'vue-style-loader';
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

function applyTailwind(this: WebpackConfig, { useVue }: { useVue: boolean }) {
  this.module = {
    ...this.module,
  };

  if (!this.module.rules) {
    this.module.rules = [];
  }

  let styleLoader = 'style-loader';

  if (useVue) {
    styleLoader = 'vue-style-loader';
  }

  const use = [styleLoader, 'css-loader', 'postcss-loader'];

  this.module.rules.push({
    test: /\.css$/,
    use,
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

  return template;
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
    plugins: [
      `[code]new HtmlWebpackPlugin({\n\t  template: './src/index.html'\n\t})[/code]` as unknown as WebpackPluginInstance,
    ],
    devServer: {
      static: './dist',
      port: 9000,
      hot: true,
      open: true,
    },
  };

  if (options) {
    const { lib, transpiler, styling, image, optimization, font, ui } = options;

    const useReact = lib === 'react';
    const useVue = lib === 'vue';
    const useSvelte = lib === 'svelte';
    const useBabel = transpiler?.includes('babel') ?? false;
    const useTypescript = transpiler?.includes('ts') ?? false;
    const useCss = styling?.includes('css') ?? false;
    const useCssModule = styling?.includes('css-module') ?? false;
    const useLess = styling?.includes('less') ?? false;
    const useSass = styling?.includes('scss') ?? false;
    const useTailwind = ui?.includes('tailwind') ?? false;

    if (useTypescript) {
      config.entry = './src/index.ts';
    }

    if (useReact) {
      config.entry = useTypescript ? './src/index.tsx' : './src/index.jsx';
      applyReact.call(config, { useBabel, useTypescript });
    }

    if (useSvelte) {
      applySvelte.call(config, { useBabel, useTypescript });
    }

    if (useVue) {
      applyVue.call(config, { useCss, useTypescript });
    }

    if (useCss) {
      applyCss.call(config, {
        useVue,
      });
    }

    if (useCssModule) {
      applyCssModule.call(config, { useVue });
    }

    if (useLess) {
      applyLess.call(config, { useVue });
    }

    if (useSass) {
      applySass.call(config, {
        useVue,
      });
    }

    if (useTailwind) {
      applyTailwind.call(config, { useVue });
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
  }

  return `const config = ${objectLiteralToString(config)}`;
}

export function buildWebpackConfig(options?: WebpackBuildConfigOptions) {
  let template = stripIndents`
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
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
