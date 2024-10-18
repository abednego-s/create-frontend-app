import { stripIndent, stripIndents } from 'common-tags';
import { objectLiteralToString } from '../object-literal-to-string';
import { Options } from '../../types';

export function buildRollupConfig(options: Options) {
  const { transpiler, lib, styling, image, font } = options;

  const useBabel = transpiler?.includes('babel') ?? false;
  const useCss = styling?.includes('css') ?? false;
  const useSass = styling?.includes('scss') ?? false;
  const useLess = styling?.includes('less') ?? false;
  const useTypescript = transpiler?.includes('ts') ?? false;
  const useSvelte = lib === 'svelte';
  const useReact = lib === 'react';
  const useVue = lib === 'vue';

  const config: {
    input: string;
    output: unknown;
    plugins?: string[];
    watch?: unknown;
  } = {
    input: useTypescript
      ? useReact
        ? 'src/index.tsx'
        : 'src/index.ts'
      : 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
      sourcemap: true,
      name: 'MyApp',
    },
  };

  const postCssConfig: {
    styleSheetExtensions?: string[];
    extract?: boolean;
    minimize?: boolean;
    use?: Array<Array<unknown>>;
  } = {
    extract: true,
    minimize: true,
  };

  const styleSheetExtensions = new Set<string>();
  const includeExtensions = new Set<string>();

  const staticAssets = [...(image || []), ...(font || [])];

  staticAssets.forEach((extension) => {
    if (extension === 'jpe?g') {
      includeExtensions.add('**/*.jpg');
      includeExtensions.add('**/*.jpeg');
    } else {
      includeExtensions.add(`**/*.${extension}`);
    }
  });

  const pluginUrlConfig = {
    limit: 8192,
    include: Array.from(includeExtensions),
    emitFiles: true,
    fileName: '[name][hash][extname]',
  };

  let resolveParam = null;

  const imports = new Map();

  imports.set('resolve', '@rollup/plugin-node-resolve');
  imports.set('commonjs', '@rollup/plugin-commonjs');
  imports.set('terser', '@rollup/plugin-terser');

  if (useSvelte) {
    resolveParam = {
      browser: true,
      dedupe: ['svelte'],
    };
  }

  if (useReact) {
    resolveParam = {
      extensions: ['.js', '.jsx'],
    };
  }

  config.plugins = [
    `resolve(${resolveParam ? objectLiteralToString(resolveParam, 2) : ''})`,
    `commonjs()`,
    `isProduction && terser()`,
  ];

  if (useBabel) {
    imports.set('{ babel }', '@rollup/plugin-babel');

    const babelConfig = {
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx'],
    };

    config.plugins.unshift(`babel(${objectLiteralToString(babelConfig, 2)})`);
  }

  if (useTypescript) {
    imports.set('typescript', '@rollup/plugin-typescript');
    config.plugins.push(`typescript()`);
  }

  if (useSass) {
    const sassEntry = ['sass', { includePaths: ['./src'] }];
    const extensions = ['.css', '.scss', '.sass'];

    extensions.forEach((extension) => {
      styleSheetExtensions.add(extension);
    });

    postCssConfig.styleSheetExtensions = Array.from(styleSheetExtensions);

    postCssConfig.use = postCssConfig.use
      ? [...postCssConfig.use, sassEntry]
      : [sassEntry];
  }

  if (useLess) {
    const lessEntry = ['less', { javascriptEnabled: true }];
    const extensions = ['.css', '.less'];

    extensions.forEach((extension) => {
      styleSheetExtensions.add(extension);
    });

    postCssConfig.styleSheetExtensions = Array.from(styleSheetExtensions);

    postCssConfig.use = postCssConfig.use
      ? [...postCssConfig.use, lessEntry]
      : [lessEntry];
  }

  if (image || font) {
    imports.set('url', '@rollup/plugin-url');
    config.plugins.push(`url(${objectLiteralToString(pluginUrlConfig, 2)})`);
  }

  if (useSvelte) {
    imports.set('svelte', 'rollup-plugin-svelte');
    imports.set('css', 'rollup-plugin-css-only');
    imports.set('sveltePreprocess', 'svelte-preprocess');

    const sveltePluginConfig = {
      preprocess: '[code]sveltePreprocess({ sourceMap: !isProduction })[/code]',
      include: 'src/**/*.svelte',
    };

    config.plugins = [
      ...config.plugins,
      `svelte(${objectLiteralToString(sveltePluginConfig, 2)})`,
      `css({ output: 'bundle.css' })`,
    ];

    config.watch = {
      clearScreen: false,
    };
  }

  if (useVue) {
    imports.set('vue', 'rollup-plugin-vue');
    config.plugins.unshift('vue()');
    imports.set('postcss', 'rollup-plugin-postcss');
    config.plugins.push(`postcss(${objectLiteralToString(postCssConfig, 2)})`);
  }

  if ((useCss || useSass || useLess) && !imports.has('postcss')) {
    imports.set('postcss', 'rollup-plugin-postcss');
    config.plugins.push(`postcss(${objectLiteralToString(postCssConfig, 2)})`);
  }

  if (useReact || useSvelte || useVue) {
    const serveConfig = {
      open: true,
      contentBase: ['dist'],
      port: 3000,
    };

    const liveReloadConfig = {
      watch: 'dist',
    };

    const replaceConfig = {
      'process.env.NODE_ENV': `[code]JSON.stringify(
        isProduction ? 'production' : 'development'
      )[/code]`,
      preventAssignment: true,
    };

    imports.set('serve', 'rollup-plugin-serve');
    imports.set('livereload', 'rollup-plugin-livereload');
    imports.set('replace', '@rollup/plugin-replace');

    config.plugins.push(
      `!isProduction && serve(${objectLiteralToString(serveConfig, 2)})`
    );
    config.plugins.push(
      `!isProduction && livereload(${objectLiteralToString(liveReloadConfig, 2)})`
    );
    config.plugins.push(`replace(${objectLiteralToString(replaceConfig, 2)})`);
  }

  let allImports = '';

  imports.forEach((value, key) => {
    allImports += `import ${key} from '${value}';\n`;
  });

  config.plugins = config.plugins.map((plugin) => `[code]${plugin}[/code]`);

  return stripIndent`
    ${stripIndents`
      ${allImports}
      const isProduction = process.env.NODE_ENV === 'production';
    `}
    \nexport default ${objectLiteralToString(config)}
  `;
}
