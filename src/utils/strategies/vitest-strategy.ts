import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class VitestStrategy implements ConfigurationStrategy {
  constructor(
    /* eslint-disable no-unused-vars */
    private options: {
      isReact: boolean;
    }
  ) {}

  applyPackageConfig(packageJson: PackageConfig) {
    packageJson.scripts = {
      ...packageJson.scripts,
      test: 'vitest',
    };

    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      vitest: 'latest',
    };

    if (this.options.isReact) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        jsdom: 'latest',
        '@vitejs/plugin-react': 'latest',
      };
    }
  }
}
