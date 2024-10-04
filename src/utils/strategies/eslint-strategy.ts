import type { ConfigurationStrategy, PackageConfig } from '../../types';
import { getExtensions } from '../get-extensions';

export class EsLintStrategy implements ConfigurationStrategy {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private options?: {
      isBabel?: boolean;
      isReact?: boolean;
      isSvelte?: boolean;
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

    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      eslint: 'latest',
      'eslint-config-prettier': 'latest',
    };

    if (this.options?.isReact) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'eslint-plugin-react': 'latest',
        'eslint-plugin-react-hooks': 'latest',
      };
    }

    if (this.options?.isSvelte) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'eslint-plugin-svelte3': 'latest',
      };
    }

    if (this.options?.isTypescript) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        '@typescript-eslint/parser': 'latest',
        '@typescript-eslint/eslint-plugin': 'latest',
      };
    }
  }
}
