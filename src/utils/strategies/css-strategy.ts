import type {
  ConfigurationStrategy,
  PackageConfig,
  WebpackConfig,
} from '../../types';

export class CssStrategy implements ConfigurationStrategy {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private options?: {
      useMiniCssExtractPlugin?: boolean;
      isVue?: boolean;
    }
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

    let styleLoader = 'style-loader';

    if (this.options?.isVue) {
      styleLoader = 'vue-style-loader';
    }

    let use = [styleLoader, 'css-loader'];

    if (this.options?.useMiniCssExtractPlugin) {
      use = [
        `[code]process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : '${styleLoader}'[/code]`,
        'css-loader',
      ];
    }

    webpackConfig.module.rules.push({
      test: /\.css$/,
      use,
    });
  }
}
