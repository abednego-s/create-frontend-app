import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class BabelStrategy implements ConfigurationStrategy {
  constructor(
    /* eslint-disable no-unused-vars */
    private options: {
      isReact: boolean;
      isWebpack: boolean;
    }
  ) {}

  applyPackageConfig(packageJson: PackageConfig) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      '@babel/core': '^7.25.2',
      '@babel/preset-env': '^7.25.4',
    };

    if (this.options.isReact) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        '@babel/preset-react': '^7.24.7',
      };
    }

    if (this.options.isWebpack) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'babel-loader': '^9.1.3',
      };
    }
  }
}
