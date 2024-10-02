import type { ConfigurationStrategy, PackageConfig } from '../../types';
import { getExtensions } from '../get-extensions';

export class EsLintStrategy implements ConfigurationStrategy {
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
      lint: `eslint 'src/**/*.{${getExtensions(options).join(',')}}'`,
      'lint:fix': `eslint --fix 'src/**/*.{${getExtensions(options).join(',')}}}'`,
    };
  }
}
