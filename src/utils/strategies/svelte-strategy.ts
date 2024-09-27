import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class SvelteStrategy implements ConfigurationStrategy {
  apply(packageJson: PackageConfig): void {
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: 'webpack serve --mode development',
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      svelte: '^4.2.19',
      'svelte-loader': '^3.2.3',
      'svelte-preprocess': '^6.0.2',
      'webpack-dev-server': '^5.1.0',
    };
  }
}
