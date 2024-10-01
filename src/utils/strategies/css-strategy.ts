/* eslint-disable no-unused-vars */
import type {
  ConfigurationStrategy,
  Options,
  PackageConfig,
  WebpackConfig,
} from '../../types';

export class CssStrategy implements ConfigurationStrategy {
  constructor(
    private plugins?: Options['plugins'],
    private styling?: Options['styling']
  ) {}

  applyPackageConfig(packageJson: PackageConfig): void {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      'css-loader': '^7.1.2',
      'style-loader': '^4.0.0',
    };
  }

  applyWebpackConfig(webpackConfig: WebpackConfig): void {
    webpackConfig.module = {
      ...webpackConfig.module,
    };

    if (!webpackConfig.module.rules) {
      webpackConfig.module.rules = [];
    }

    let use = ['style-loader', 'css-loader'];

    if (this.plugins?.includes('mini-css-extract-plugin')) {
      use = ['[code]MiniCssExtractPlugin.loader[/code]', 'css-loader'];
    }

    if (this.styling?.includes('css-module')) {
      webpackConfig.module.rules.push({
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use,
      });
    } else {
      webpackConfig.module.rules.push({
        test: /\.css$/,
        use,
      });
    }
  }
}
