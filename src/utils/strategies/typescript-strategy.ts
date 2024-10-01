import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class TypescriptStrategy implements ConfigurationStrategy {
  applyPackageConfig(packageJson: PackageConfig): void {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      '@types/react': '^18.3.5',
      '@types/react-dom': '^18.3.0',
      typescript: '^5.6.2',
      'ts-loader': '^9.5.1',
    };
  }
}
