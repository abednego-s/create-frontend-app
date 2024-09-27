import type {
  ConfigurationStrategy,
  Options,
  PackageConfig,
} from '../../types';
import { getExtensions } from '../get-extenstions';

export class PrettierStrategy implements ConfigurationStrategy {
  // eslint-disable-next-line no-unused-vars
  constructor(private transpiler: Options['transpiler']) {}

  apply(packageJson: PackageConfig): void {
    packageJson.scripts = {
      ...packageJson.scripts,
      format: `prettier --write 'src/**/*.{${getExtensions(this.transpiler).join(',')}}'`,
    };

    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      prettier: 'latest',
    };
  }
}
