import { Options } from '../../types';

export function buildBabelConfig(options: Options) {
  const { transpiler, lib } = options;

  const useBabel = transpiler?.includes('babel') ?? false;
  const useReact = lib === 'react';
  const useTypescript = transpiler?.includes('ts') ?? false;

  const presets = [];

  if (useBabel) {
    presets.push('@babel/preset-env');
  }

  if (useReact) {
    presets.push(['@babel/preset-react']);
  }

  if (useTypescript) {
    presets.push('@babel/preset-typescript');
  }

  const config = {
    presets,
  };

  return JSON.stringify(config, null, 2);
}
