import type {
  ConfigurationStrategy,
  Options,
  PackageConfig,
} from '../../types';

export class WebpackStrategy implements ConfigurationStrategy {
  // eslint-disable-next-line no-unused-vars
  constructor(private plugins: Options['plugins']) {}

  applyPackageConfig(packageJson: PackageConfig) {
    packageJson.scripts = {
      ...packageJson.scripts,
      build: 'webpack --mode production',
    };

    if (this.plugins) {
      const webpackPlugins = this.plugins.reduce((prev, current) => {
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
        webpack: '^5.94.0',
        'webpack-cli': '^5.1.4',
        ...webpackPlugins,
      };
    }
  }
}
