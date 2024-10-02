import type {
  ConfigurationStrategy,
  PackageConfig,
  WebpackConfig,
} from '../../types';

export class VueStrategy implements ConfigurationStrategy {
  constructor(
    /* eslint-disable no-unused-vars */
    private options?: {
      isCss?: boolean;
      isTypescript?: boolean;
    }
  ) {}

  applyPackageConfig(packageJson: PackageConfig): void {
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: 'webpack serve --mode development',
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      vue: '^3.3.4',
      'vue-loader': '^17.2.4',
      'vue-template-compiler': '^2.7.14',
      'webpack-dev-server': '^5.1.0',
    };

    if (this.options?.isCss) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'vue-style-loader': '^7.1.2',
      };
    }
  }

  applyWebpackConfig(webpackConfig: WebpackConfig): void {
    webpackConfig.module = {
      ...webpackConfig.module,
    };

    if (!webpackConfig.module.rules) {
      webpackConfig.module.rules = [];
    }

    webpackConfig.resolve = {
      ...webpackConfig.resolve,
    };

    const extensions = ['.js', '.vue', '.json'];

    webpackConfig.module.rules?.push({
      test: /\.vue$/,
      loader: 'vue-loader',
    });

    if (!webpackConfig.plugins) {
      webpackConfig.plugins = [];
    }

    webpackConfig.plugins?.push('[code]new VueLoaderPlugin()[/code]' as '');

    webpackConfig.resolve.alias = {
      vue$: 'vue/dist/vue.esm-bundler.js',
    };

    if (this.options?.isTypescript) {
      extensions.unshift('.ts');
    }

    webpackConfig.resolve.extensions = extensions;
  }
}
