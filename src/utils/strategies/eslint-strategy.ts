import type {
  ConfigurationStrategy,
  Options,
  PackageConfig,
} from '../../types';
import { getExtensions } from '../get-extenstions';

export class EsLintStrategy implements ConfigurationStrategy {
  // eslint-disable-next-line no-unused-vars
  constructor(private transpiler: Options['transpiler']) {}

  applyPackageConfig(packageJson: PackageConfig): void {
    packageJson.scripts = {
      ...packageJson.scripts,
      lint: `eslint 'src/**/*.{${getExtensions(this.transpiler).join(',')}}'`,
      'lint:fix': `eslint --fix 'src/**/*.{${getExtensions(this.transpiler).join(',')}}}'`,
    };
  }
}
