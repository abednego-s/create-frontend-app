/* eslint-disable no-unused-vars */
import type {
  ConfigurationStrategy,
  Options,
  PackageConfig,
  WebpackConfig,
} from '../../types';

export class SvelteStrategy implements ConfigurationStrategy {
  constructor(private transpiler?: Options['transpiler']) {}

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
    const isBabel = this.transpiler ? this.transpiler.includes('babel') : false;
    const isTypescript = this.transpiler
      ? this.transpiler.includes('ts')
      : false;

    webpackConfig.module = {
      ...webpackConfig.module,
    };

    if (!webpackConfig.module.rules) {
      webpackConfig.module.rules = [];
    }

    webpackConfig.resolve = {
      ...webpackConfig.resolve,
    };

    const extensions = ['.mjs', '.js', '.svelte'];

    webpackConfig.module.rules = [
      ...webpackConfig.module.rules,
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

    if (isTypescript) {
      webpackConfig.module.rules = [
        ...webpackConfig.module.rules,
        {
          test: /\.ts?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ];
      extensions.push('.ts');
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
