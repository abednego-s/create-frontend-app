/* eslint-disable no-unused-vars */
import type {
  ConfigurationStrategy,
  Options,
  PackageConfig,
} from '../../types';

export class BabelStrategy implements ConfigurationStrategy {
  constructor(
    private lib: Options['lib'],
    private bundler: Options['bundler']
  ) {}

  applyPackageConfig(packageJson: PackageConfig) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      '@babel/core': '^7.25.2',
      '@babel/preset-env': '^7.25.4',
    };

    if (this.lib === 'react') {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        '@babel/preset-react': '^7.24.7',
      };
    }

    if (this.bundler === 'webpack') {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'babel-loader': '^9.1.3',
      };
    }
  }
}
