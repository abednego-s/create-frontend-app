/* eslint-disable no-unused-vars */
import type {
  ConfigurationStrategy,
  PackageConfig,
  WebpackConfig,
} from '../../types';

export class ReactStrategy implements ConfigurationStrategy {
  constructor(
    private options?: {
      isBabel?: boolean;
      isTypescript?: boolean;
    }
  ) {}

  applyPackageConfig(packageJson: PackageConfig): void {
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: 'webpack serve --mode development',
    };
    packageJson.dependencies = {
      ...packageJson.dependencies,
      react: '^18.3.1',
      'react-dom': '^18.3.1',
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      'webpack-dev-server': '^5.1.0',
    };
  }

  applyWebpackConfig(webpackConfig: WebpackConfig): void {
    webpackConfig.module = {
      ...webpackConfig.module,
    };

    webpackConfig.resolve = {
      ...webpackConfig.resolve,
    };

    if (this.options?.isBabel && !this.options?.isTypescript) {
      const rule = {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      };

      webpackConfig.module.rules = webpackConfig.module.rules
        ? [...webpackConfig.module.rules, rule]
        : [rule];

      webpackConfig.resolve.extensions = ['.js', '.jsx'];
    }

    if (this.options?.isTypescript && !this.options?.isBabel) {
      const rule = {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      };

      webpackConfig.module.rules = webpackConfig.module.rules
        ? [...webpackConfig.module.rules, rule]
        : [rule];

      webpackConfig.resolve.extensions = ['.ts', '.tsx', '.js'];
    }

    if (this.options?.isBabel && this.options?.isTypescript) {
      const rule = {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      };

      webpackConfig.module.rules = webpackConfig.module.rules
        ? [...webpackConfig.module.rules, rule]
        : [rule];

      webpackConfig.resolve.extensions = ['.ts', '.tsx', '.js'];
    }
  }
}
