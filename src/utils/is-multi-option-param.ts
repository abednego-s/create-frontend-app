import type { Options } from '../types';

const multipleOptionParams = new Set<keyof Options>([
  'font',
  'image',
  'plugins',
  'styling',
  'transpiler',
]);

export function isMultiOptionParam(param: string) {
  return multipleOptionParams.has(param as keyof Options);
}
