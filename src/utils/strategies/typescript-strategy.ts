import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class TypescriptStrategy implements ConfigurationStrategy {
  constructor(
    /* eslint-disable no-unused-vars */
    private options?: {
      isBabel?: boolean;
      isReact?: boolean;
      isWebpack?: boolean;
    }
  ) {}

  applyPackageConfig(packageJson: PackageConfig): void {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      typescript: '^5.6.2',
    };

    if (this.options?.isReact) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        '@types/react': '^18.3.5',
        '@types/react-dom': '^18.3.0',
      };
    }

    if (this.options?.isWebpack) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'ts-loader': '^9.5.1',
      };
    }

    if (this.options?.isBabel) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        '@babel/preset-typescript': 'latest',
      };
    }
  }
}
