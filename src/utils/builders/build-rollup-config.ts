import { objectLiteralToString } from '../object-literal-to-string';
import { Options } from '../../types';

export function buildRollupConfig(options: Options) {
  const { transpiler, lib, styling, image, font } = options;
  const isBabel = transpiler?.includes('babel') ?? false;
  const isTypescript = transpiler?.includes('ts') ?? false;
  const isSvelte = lib === 'svelte';
  const isVue = lib === 'vue';
  const isCss = styling?.includes('css') ?? false;
  const isSass = styling?.includes('scss') ?? false;
  const isLess = styling?.includes('less') ?? false;
  const useStaticAssets = image || font;

  const config: {
    input: string;
    output: unknown;
    plugins?: string[];
    watch?: unknown;
  } = {
    input: isTypescript ? 'src/index.ts' : 'src/index.js',
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

  if (isSvelte) {
    resolveParam = {
      browser: true,
      dedupe: ['svelte'],
    };
  }

  config.plugins = [
    `[code]resolve(${resolveParam ? objectLiteralToString(resolveParam, 2) : ''})[/code]`,
    `[code]commonjs()[/code]`,
  ];

  if (isBabel) {
    config.plugins.push(`[code]babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })[/code]`);
  }

  if (isTypescript) {
    config.plugins.push(`[code]typescript()[/code]`);
  }

  const staticAssets = [...(image || []), ...(font || [])];

  staticAssets.forEach((extension) => {
    if (extension === 'jpe?g') {
      includeExtensions.add(`**/*.jpg`);
      includeExtensions.add(`**/*.jpeg`);
    } else {
      includeExtensions.add(`**/*.${extension}`);
    }
  });

  if (isSass) {
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

  if (isLess) {
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

  if (isCss) {
    config.plugins.push(
      `[code]postcss(${objectLiteralToString(postCssConfig, 2)})[/code]`
    );
  }

  if (useStaticAssets) {
    config.plugins.push(
      `[code]url(${objectLiteralToString(pluginUrlConfig, 2)})[/code]`
    );
  }

  if (isSvelte) {
    config.plugins = [
      ...config.plugins,
      `[code]svelte({
      compilerOptions: {
        dev: !isProduction
      }
    })[/code]`,
      `[code]css({ output: 'bundle.css' })[/code]`,
    ];
    config.watch = {
      clearScreen: false,
    };
  }

  if (isVue) {
    config.plugins.push(`[code]vue()[/code]`);
  }

  config.plugins.push(`[code]isProduction && terser()[/code]`);

  const imports = [
    "import resolve from '@rollup/plugin-node-resolve';",
    "import commonjs from '@rollup/plugin-commonjs';",
    "import terser from 'rollup-plugin-terser';",
  ];

  if (isBabel) {
    imports.push("import { babel } from '@rollup/plugin-babel';");
  }

  if (isTypescript) {
    imports.push("import typescript from '@rollup/plugin-typescript';");
  }

  if (isSvelte) {
    imports.push("import css from 'rollup-plugin-css-only';");
  }

  if (isVue) {
    imports.push("import vue from 'rollup-plugin-vue';");
  }

  if (isCss || isSass || isLess) {
    imports.push("import postcss from 'rollup-plugin-postcss';");
  }

  if (useStaticAssets) {
    imports.push("import url from '@rollup/plugin-url'");
  }

  const template = `${imports.join('\n')}

const isProduction = !process.env.ROLLUP_WATCH;

export default ${objectLiteralToString(config)}
  `;

  return template;
}
