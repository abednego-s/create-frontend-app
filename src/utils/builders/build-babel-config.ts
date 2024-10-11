import { Options } from '../../types';

export function buildBabelConfig(options: Options) {
  const { transpiler, lib } = options;

  const isBabel = transpiler?.includes('babel') ?? false;
  const isReact = lib === 'react';
  const isTypescript = transpiler?.includes('ts') ?? false;

  const presets = [];

  if (isBabel) {
    presets.push('@babel/preset-env');
  }

  if (isReact) {
    presets.push(['@babel/preset-react']);
  }

  if (isTypescript) {
    presets.push('@babel/preset-typescript');
  }

  const config = {
    presets,
  };

  return JSON.stringify(config, null, 2);
}
