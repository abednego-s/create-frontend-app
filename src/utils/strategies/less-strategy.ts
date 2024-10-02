import type {
  ConfigurationStrategy,
  PackageConfig,
  WebpackConfig,
} from '../../types';

export class LessStrategy implements ConfigurationStrategy {
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
      less: 'latest',
    };
  }

  applyWebpackConfig(webpackConfig: WebpackConfig): void {
    let styleLoader = 'style-loader';

    if (this.options?.isVue) {
      styleLoader = 'vue-style-loader';
    }

    if (this.options?.useMiniCssExtractPlugin) {
      styleLoader = `[code]process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : '${styleLoader}'[/code]`;
    }

    webpackConfig.module = {
      ...webpackConfig.module,
    };

    if (!webpackConfig.module.rules) {
      webpackConfig.module.rules = [];
    }

    webpackConfig.module.rules.push({
      test: /\.less$/,
      use: [styleLoader, 'css-loader', 'less-loader'],
    });
  }
}
