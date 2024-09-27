import type { Options } from '../types';

export function getExtensions(transpiler: Options['transpiler']) {
  let exts = ['js'];

  if (transpiler?.includes('babel')) {
    exts = [...exts, 'jsx'];
  }

  if (transpiler?.includes('ts')) {
    exts = ['ts'];
    if (transpiler?.includes('babel')) {
      exts = [...exts, 'tsx'];
    }
  }

  return exts;
}
