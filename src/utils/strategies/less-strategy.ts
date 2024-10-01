import type {
  ConfigurationStrategy,
  PackageConfig,
  WebpackConfig,
} from '../../types';

export class LessStrategy implements ConfigurationStrategy {
  applyPackageConfig(packageJson: PackageConfig): void {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      'css-loader': '^7.1.2',
      'style-loader': '^4.0.0',
      less: 'latest',
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
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
    });
  }
}
