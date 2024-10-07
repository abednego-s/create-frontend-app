/* eslint-disable no-unused-vars */
import { Options } from '../../types';

export type ESLintConfig = {
  env?: {
    [K in string]: boolean;
  };
  extends?: string[];
  parser?: string;
  parserOptions?: {
    [K in string]: string | unknown;
  };
  plugins?: string[];
  rules?: {
    [K in string]?: 'warn' | 'off' | 'error';
  };
  settings?: {
    [K in string]: unknown;
  };
  overrides?: unknown[];
};

// eslint-disable-next-line no-unused-vars
function applyReactConfig(this: ESLintConfig) {
  const pluginExtensions = [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ];

  const plugins = ['react'];

  this.parserOptions = {
    ...this.parserOptions,
    ecmaFeatures: {
      jsx: true,
    },
  };

  this.extends = this.extends
    ? [...this.extends, ...pluginExtensions]
    : pluginExtensions;

  this.rules = {
    ...this.rules,
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  };

  this.plugins = this.plugins ? [...this.plugins, ...plugins] : plugins;

  this.settings = {
    ...this.settings,
    react: {
      version: 'detect',
    },
  };
}

// eslint-disable-next-line no-unused-vars
function applySvelteConfig(this: ESLintConfig) {
  const svelteConfigOverride = {
    files: ['*.svelte'],
    processor: 'svelte3/svelte3',
  };
  const pluginExtensions = ['plugin:svelte3/recommended'];
  const plugins = ['svelte3'];
  const settings = {
    'svelte3/ignore-warnings': () => true,
  };

  this.extends = this.extends
    ? [...this.extends, ...pluginExtensions]
    : pluginExtensions;

  this.overrides = this.overrides
    ? [...this.overrides, svelteConfigOverride]
    : [svelteConfigOverride];

  this.plugins = this.plugins ? [...this.plugins, ...plugins] : plugins;

  this.settings = this.settings ? { ...this.settings, ...settings } : settings;
}

// eslint-disable-next-line no-unused-vars
function applyTypescriptConfig(this: ESLintConfig) {
  const pluginExtensions = ['plugin:@typescript-eslint/recommended'];
  const plugins = ['@typescript-eslint'];

  this.extends = this.extends
    ? [...this.extends, ...pluginExtensions]
    : pluginExtensions;

  this.plugins = this.plugins ? [...this.plugins, ...plugins] : plugins;

  this.parser = '@typescript-eslint/parser';
}

// eslint-disable-next-line no-unused-vars
function applyPrettierConfig(this: ESLintConfig) {
  const pluginExtensions = ['prettier'];
  const plugins = ['prettier'];

  this.plugins = this.plugins ? [...this.plugins, ...plugins] : plugins;

  this.extends = this.extends
    ? [...this.extends, ...pluginExtensions]
    : pluginExtensions;
}

export function buildEslintConfig(options: Options) {
  const { lib, linting, transpiler } = options;
  const isReact = lib === 'react';
  const isSvelte = lib === 'svelte';
  const isPrettier = linting?.includes('prettier') ?? false;
  const isTypecript = transpiler?.includes('ts') ?? false;

  const config: ESLintConfig = {
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

  if (isReact) {
    applyReactConfig.call(config);
  }

  if (isSvelte) {
    applySvelteConfig.call(config);
  }

  if (isTypecript) {
    applyTypescriptConfig.call(config);
  }

  if (isPrettier) {
    applyPrettierConfig.call(config);
  }

  return JSON.stringify(config, null, 2);
}
