import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class ParcelStrategy implements ConfigurationStrategy {
  applyPackageConfig(packageJson: PackageConfig) {
    packageJson.scripts = {
      ...packageJson.scripts,
      start: 'parcel src/index.html',
      build: 'parcel build src/index.html',
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      parcel: 'latest',
    };
  }
}
