import { Options } from '../types';

export function buildBabelConfig(options: Options) {
  const presets = [];

  if (options.transpiler?.includes('babel')) {
    presets.push('@babel/preset-env');
    presets.push(['@babel/preset-react', { runtime: 'automatic' }]);
  }

  if (options.transpiler?.includes('ts')) {
    presets.push('@babel/preset-typescript');
  }

  const config = {
    presets,
  };

  return JSON.stringify(config, null, 2);
}
