import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class JestStrategy implements ConfigurationStrategy {
  constructor(
    /* eslint-disable no-unused-vars */
    private options?: {
      isBabel?: boolean;
      isTypescript?: boolean;
    }
  ) {}

  applyPackageConfig(packageJson: PackageConfig) {
    packageJson.scripts = {
      ...packageJson.scripts,
      test: 'jest',
    };

    if (this.options?.isBabel) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'babel-jest': 'latest',
      };
    }

    if (this.options?.isTypescript) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'ts-jest': 'latest',
        '@types/jest': 'latest',
      };
    }
  }
}
