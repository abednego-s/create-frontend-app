import { objectLiteralToString } from '../object-literal-to-string';
import { Options } from '../../types';

export function buildRollupConfig(options: Options) {
  const { transpiler, styling, image, font } = options;
  const isBabel = transpiler?.includes('babel') ?? false;
  const isTypescript = transpiler?.includes('ts') ?? false;
  const isCss = styling?.includes('css') ?? false;
  const isSass = styling?.includes('scss') ?? false;
  const isLess = styling?.includes('less') ?? false;
  const isStaticAssets = image || font;

  const config = {
    input: isTypescript ? 'src/index.ts' : 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
    },
    plugins: [`[code]resolve()[/code]`, `[code]commonjs()[/code]`],
  };

  if (isBabel) {
    config.plugins.push(`[code]babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })[/code]`);
  }

  if (isTypescript) {
    config.plugins.push(`[code]typescript()[/code]`);
  }

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

  image?.forEach((extension) => {
    if (extension === 'jpe?g') {
      includeExtensions.add(`**/*.jpg`);
      includeExtensions.add(`**/*.jpeg`);
    } else {
      includeExtensions.add(`**/*.${extension}`);
    }
  });

  font?.forEach((extension) => {
    includeExtensions.add(`**/*.${extension}`);
  });

  const pluginUrlConfig = {
    limit: 8192,
    include: Array.from(includeExtensions),
    emitFiles: true,
    fileName: '[name][hash][extname]',
  };

  if (isSass) {
    const sassEntry = ['sass', { includePaths: ['./src'] }];

    styleSheetExtensions.add('.css');
    styleSheetExtensions.add('.scss');
    styleSheetExtensions.add('.sass');
    postCssConfig.styleSheetExtensions = Array.from(styleSheetExtensions);

    postCssConfig.use = postCssConfig.use
      ? [...postCssConfig.use, sassEntry]
      : [sassEntry];
  }

  if (isLess) {
    const lessEntry = ['less', { javascriptEnabled: true }];

    styleSheetExtensions.add('.css');
    styleSheetExtensions.add('.less');
    postCssConfig.styleSheetExtensions = Array.from(styleSheetExtensions);

    postCssConfig.use = postCssConfig.use
      ? [...postCssConfig.use, lessEntry]
      : [lessEntry];
  }

  if (isCss) {
    config.plugins.push(
      `[code]postcss(${objectLiteralToString(postCssConfig, 2)}),[/code]`
    );
  }

  if (isStaticAssets) {
    config.plugins.push(
      `[code]url(${objectLiteralToString(pluginUrlConfig, 2)})[/code]`
    );
  }

  const imports = [
    "import resolve from '@rollup/plugin-node-resolve';",
    "import commonjs from '@rollup/plugin-commonjs';",
  ];

  if (isBabel) {
    imports.push("import { babel } from '@rollup/plugin-babel';");
  }

  if (isTypescript) {
    imports.push("import typescript from '@rollup/plugin-typescript';");
  }

  if (isCss || isSass || isLess) {
    imports.push("import postcss from 'rollup-plugin-postcss';");
  }

  if (image || font) {
    imports.push("import url from '@rollup/plugin-url'");
  }

  const template = `${imports.join('\n')}
  
export default ${objectLiteralToString(config)}
  `;

  return template;
}
