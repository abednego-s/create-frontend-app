import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class ReactStrategy implements ConfigurationStrategy {
  apply(packageJson: PackageConfig): void {
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: 'webpack serve --mode development',
    };
    packageJson.dependencies = {
      ...packageJson.dependencies,
      react: '^18.3.1',
      'react-dom': '^18.3.1',
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      'webpack-dev-server': '^5.1.0',
    };
  }
}
