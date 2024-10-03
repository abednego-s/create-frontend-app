import type { ESLintConfig, Options } from '../../types';

export function buildEslintConfig(options: Options) {
  let config: ESLintConfig = {
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
    },
  };

  let plugins: string[] = [];

  if (config.plugins) {
    plugins = [...config.plugins];
  }

  if (options.lib === 'react') {
    plugins.push('react');

    config = {
      ...config,
      parserOptions: {
        ...config.parserOptions,
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        ...(config.extends as string[]),
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
      ],
      rules: {
        ...config.rules,
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
      },
      plugins,
      settings: {
        ...config.settings,
        react: {
          version: 'detect',
        },
      },
    };
  }

  if (options.linting?.includes('prettier')) {
    config = {
      ...config,
      plugins: [...plugins, 'prettier'],
    };
  }

  if (options.transpiler?.includes('ts')) {
    plugins.push('@typescript-eslint');

    config = {
      ...config,
      extends: [
        ...(config.extends as string[]),
        'plugin:@typescript-eslint/recommended',
      ],
      parser: '@typescript-eslint/parser',
      plugins,
    };
  }

  return JSON.stringify(config, null, 2);
}
