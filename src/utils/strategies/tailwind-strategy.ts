import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class TailwindStrategy implements ConfigurationStrategy {
  apply(packageJson: PackageConfig) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      tailwindcss: 'latest',
      autoprefixer: 'latest',
      postcss: 'latest',
      'postcss-loader': 'latest',
    };
  }
}
