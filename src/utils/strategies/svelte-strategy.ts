/* eslint-disable no-unused-vars */
import type {
  ConfigurationStrategy,
  PackageConfig,
  WebpackConfig,
} from '../../types';

export class SvelteStrategy implements ConfigurationStrategy {
  constructor(
    private options?: {
      isBabel?: boolean;
      isTypescript?: boolean;
    }
  ) {}

  applyPackageConfig(packageJson: PackageConfig): void {
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: 'webpack serve --mode development',
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      svelte: '^4.2.19',
      'svelte-loader': '^3.2.3',
      'svelte-preprocess': '^6.0.2',
      'webpack-dev-server': '^5.1.0',
    };
  }

  applyWebpackConfig(webpackConfig: WebpackConfig): void {
    webpackConfig.module = {
      ...webpackConfig.module,
    };

    if (!webpackConfig.module.rules) {
      webpackConfig.module.rules = [];
    }

    webpackConfig.resolve = {
      ...webpackConfig.resolve,
    };

    const extensions = ['.js', '.mjs', '.svelte'];

    webpackConfig.module.rules = [
      ...webpackConfig.module.rules,
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: this.options?.isTypescript
              ? '[code]sveltePreprocess({ typescript: true })[/code]'
              : '[code]sveltePreprocess()[/code]',
          },
        },
      },
    ];

    if (this.options?.isBabel) {
      webpackConfig.module.rules = [
        ...webpackConfig.module.rules,
        {
          test: /\.(js|mjs)$/,
          use: {
            loader: 'babel-loader',
          },
          exclude: /node_modules/,
        },
      ];
    }

    if (this.options?.isTypescript) {
      webpackConfig.module.rules = [
        ...webpackConfig.module.rules,
        {
          test: /\.ts?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ];
      extensions.unshift('.ts');
    }

    webpackConfig.resolve = {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve.alias,
        svelte: "[code]path.resolve('node_modules', 'svelte')[/code]",
      },
      extensions,
      mainFields: ['svelte', 'browser', 'module', 'main'],
    };
  }
}
