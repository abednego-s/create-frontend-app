import { objectLiteralToString } from '../object-literal-to-string';
import { stripIndent, stripIndents } from 'common-tags';
import { Options } from '../../types';

export function buildRollupConfig(options: Options) {
  const { transpiler, lib, styling, image, font } = options;

  const useBabel = transpiler?.includes('babel') ?? false;
  const useCss = styling?.includes('css') ?? false;
  const useSass = styling?.includes('scss') ?? false;
  const useLess = styling?.includes('less') ?? false;
  const useSvelte = lib === 'svelte';
  const useTypescript = transpiler?.includes('ts') ?? false;
  const useVue = lib === 'vue';

  const config: {
    input: string;
    output: unknown;
    plugins?: string[];
    watch?: unknown;
  } = {
    input: useTypescript ? 'src/index.ts' : 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
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

  const pluginUrlConfig = {
    limit: 8192,
    include: Array.from(includeExtensions),
    emitFiles: true,
    fileName: '[name][hash][extname]',
  };

  let resolveParam = null;

  const staticAssets = [...(image || []), ...(font || [])];

  const imports = new Map();

  imports.set('resolve', '@rollup/plugin-node-resolve');
  imports.set('commonjs', '@rollup/plugin-commonjs');
  imports.set('terser', 'rollup-plugin-terser');

  if (useSvelte) {
    resolveParam = {
      browser: true,
      dedupe: ['svelte'],
    };
  }

  config.plugins = [
    `resolve(${resolveParam ? objectLiteralToString(resolveParam, 2) : ''})`,
    `commonjs()`,
  ];

  if (useBabel) {
    config.plugins.push(`babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })`);

    imports.set('{ babel }', '@rollup/plugin-babel');
  }

  if (useTypescript) {
    config.plugins.push(`typescript()`);
    imports.set('typescript', '@rollup/plugin-typescript');
  }

  staticAssets.forEach((extension) => {
    if (extension === 'jpe?g') {
      includeExtensions.add(`**/*.jpg`);
      includeExtensions.add(`**/*.jpeg`);
    } else {
      includeExtensions.add(`**/*.${extension}`);
    }
  });

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

  if (useCss) {
    config.plugins.push(`postcss(${objectLiteralToString(postCssConfig, 2)})`);
  }

  if (image || font) {
    config.plugins.push(`url(${objectLiteralToString(pluginUrlConfig, 2)})`);

    imports.set('url', '@rollup/plugin-url');
  }

  if (useSvelte) {
    config.plugins = [
      ...config.plugins,
      `svelte({
      compilerOptions: {
        dev: !isProduction
      }
    })`,
      `css({ output: 'bundle.css' })`,
    ];

    config.watch = {
      clearScreen: false,
    };

    imports.set('css', 'rollup-plugin-css-only');
  }

  if (useVue) {
    config.plugins.push(`vue()`);
    imports.set('vue', 'rollup-plugin-vue');
  }

  if (useCss || useSass || useLess) {
    imports.set('postcss', 'rollup-plugin-postcss');
  }

  let allImports = '';

  imports.forEach((value, key) => {
    allImports += `import ${key} from '${value}';\n`;
  });

  config.plugins.push(`isProduction && terser()`);

  config.plugins = config.plugins.map((plugin) => `[code]${plugin}[/code]`);

  return stripIndent`
    ${stripIndents`
      ${allImports}
      const isProduction = !process.env.ROLLUP_WATCH;
    `}
    \nexport default ${objectLiteralToString(config)}
  `;
}