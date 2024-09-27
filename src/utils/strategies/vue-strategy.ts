import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class VueStrategy implements ConfigurationStrategy {
  apply(packageJson: PackageConfig): void {
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: 'webpack serve --mode development',
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      vue: '^3.3.4',
      'vue-loader': '^17.2.4',
      'vue-template-compiler': '^2.7.14',
      'webpack-dev-server': '^5.1.0',
    };
  }
}
