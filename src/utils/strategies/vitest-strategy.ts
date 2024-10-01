import type {
  ConfigurationStrategy,
  Options,
  PackageConfig,
} from '../../types';

export class VitestStrategy implements ConfigurationStrategy {
  // eslint-disable-next-line no-unused-vars
  constructor(private lib: Options['lib']) {}

  applyPackageConfig(packageJson: PackageConfig) {
    packageJson.scripts = {
      ...packageJson.scripts,
      test: 'vitest',
    };

    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      vitest: 'latest',
    };

    if (this.lib === 'react') {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        jsdom: 'latest',
        '@vitejs/plugin-react': 'latest',
      };
    }
  }
}
