import type {
  ConfigurationStrategy,
  Options,
  PackageConfig,
} from '../../types';

export class JestStrategy implements ConfigurationStrategy {
  // eslint-disable-next-line no-unused-vars
  constructor(private transpiler: Options['transpiler']) {}

  applyPackageConfig(packageJson: PackageConfig) {
    packageJson.scripts = {
      ...packageJson.scripts,
      test: 'jest',
    };

    if (this.transpiler?.includes('babel')) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'babel-jest': 'latest',
      };
    }

    if (this.transpiler?.includes('ts')) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'ts-jest': 'latest',
        '@types/jest': 'latest',
      };
    }
  }
}
