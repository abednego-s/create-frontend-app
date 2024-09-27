import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class CssStrategy implements ConfigurationStrategy {
  apply(packageJson: PackageConfig): void {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      'css-loader': '^7.1.2',
      'style-loader': '^4.0.0',
    };
  }
}
