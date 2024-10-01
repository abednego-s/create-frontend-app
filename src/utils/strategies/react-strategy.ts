/* eslint-disable no-unused-vars */
import type {
  ConfigurationStrategy,
  Options,
  PackageConfig,
  WebpackConfig,
} from '../../types';

export class ReactStrategy implements ConfigurationStrategy {
  constructor(private transpiler?: Options['transpiler']) {}

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
    const isBabel = this.transpiler ? this.transpiler.includes('babel') : false;
    const isTypescript = this.transpiler
      ? this.transpiler.includes('ts')
      : false;

    webpackConfig.module = {
      ...webpackConfig.module,
    };

    webpackConfig.resolve = {
      ...webpackConfig.resolve,
    };

    if (isBabel && !isTypescript) {
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

    if (isTypescript && !isBabel) {
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

    if (isBabel && isTypescript) {
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
