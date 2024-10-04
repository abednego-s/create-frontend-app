import type {
  ConfigurationStrategy,
  Options,
  PackageConfig,
} from '../../types';

export class WebpackStrategy implements ConfigurationStrategy {
  constructor(
    /* eslint-disable no-unused-vars */
    private options?: {
      plugins?: Options['plugins'];
    }
  ) {}

  applyPackageConfig(packageJson: PackageConfig) {
    packageJson.scripts = {
      ...packageJson.scripts,
      build: 'webpack --mode production',
    };

    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      webpack: '^5.94.0',
      'webpack-cli': '^5.1.4',
    };

    if (this.options?.plugins) {
      const webpackPlugins = this.options?.plugins.reduce((prev, current) => {
        if (current !== 'HotModuleReplacementPlugin') {
          prev = {
            ...prev,
            [current]: 'latest',
          };
        }

        return prev;
      }, {});

      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        ...webpackPlugins,
      };
    }
  }
}
