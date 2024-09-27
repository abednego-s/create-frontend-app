import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class FileLoaderStrategy implements ConfigurationStrategy {
  apply(packageJson: PackageConfig): void {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      'file-loader': '^6.2.0',
    };
  }
}
