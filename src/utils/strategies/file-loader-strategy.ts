/* eslint-disable no-unused-vars */
import type {
  ConfigurationStrategy,
  PackageConfig,
  WebpackConfig,
} from '../../types';

export class FileLoaderStrategy implements ConfigurationStrategy {
  constructor(private assets: string[]) {}

  applyPackageConfig(packageJson: PackageConfig): void {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      'file-loader': '^6.2.0',
    };
  }

  applyWebpackConfig(webpackConfig: WebpackConfig): void {
    webpackConfig.module = {
      ...webpackConfig.module,
    };

    if (!webpackConfig.module.rules) {
      webpackConfig.module.rules = [];
    }

    webpackConfig.module.rules.push({
      test: `[code]/\\.(${this.assets.join('|')})$/i[/code]`,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    });
  }
}
