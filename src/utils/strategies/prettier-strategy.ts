import type { ConfigurationStrategy, PackageConfig } from '../../types';
import { getExtensions } from '../get-extensions';

export class PrettierStrategy implements ConfigurationStrategy {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private options?: {
      isBabel?: boolean;
      isTypescript?: boolean;
    }
  ) {}

  applyPackageConfig(packageJson: PackageConfig): void {
    const options = {
      isBabel: this.options?.isBabel ?? false,
      isTypescript: this.options?.isTypescript ?? false,
    };

    packageJson.scripts = {
      ...packageJson.scripts,
      format: `prettier --write 'src/**/*.{${getExtensions(options).join(',')}}'`,
    };

    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      prettier: 'latest',
    };
  }
}
