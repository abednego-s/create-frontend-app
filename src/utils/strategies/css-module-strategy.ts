import type {
  ConfigurationStrategy,
  PackageConfig,
  WebpackConfig,
  WebpackRuleSetRule,
} from '../../types';

export class CssModuleStrategy implements ConfigurationStrategy {
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

    if (this.options?.useMiniCssExtractPlugin) {
      styleLoader = `[code]process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : '${styleLoader}'[/code]`;
    }

    webpackConfig.module.rules.push({
      test: /\.module\.css$/,
      use: [
        styleLoader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    });

    const updatedRules = webpackConfig.module.rules?.map((moduleRule) => {
      const rule = moduleRule as WebpackRuleSetRule;
      if (rule?.test?.toString() === /\.css$/.toString()) {
        return {
          ...rule,
          exclude: /\.module\.css$/,
        };
      }
      return rule;
    });

    webpackConfig.module.rules = updatedRules;
  }
}
