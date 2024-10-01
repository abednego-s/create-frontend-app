/* eslint-disable no-unused-vars */
import type {
  ConfigurationStrategy,
  Options,
  PackageConfig,
  WebpackConfig,
} from '../../types';

export class CssModuleStrategy implements ConfigurationStrategy {
  constructor(private plugins?: Options['plugins']) {}

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

    let styleLoader = 'style-loader';

    if (this.plugins?.includes('mini-css-extract-plugin')) {
      styleLoader = '[code]MiniCssExtractPlugin.loader[/code]';
    }

    webpackConfig.module.rules.push({
      test: /\.module\.css$/,
      use: [
        styleLoader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
        },
      ],
    });
  }
}
