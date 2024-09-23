/* eslint-disable no-useless-escape */
import { objectLiteralToString } from './object-literals-to-string';
import type { Options } from '../types';

export function buildJestConfig(options: Options) {
  const config = {
    testEnvironment: 'node',
  };

  if (options.lib === 'react') {
    config.testEnvironment = 'jsdom';
  }

  return `module.exports = ${objectLiteralToString(config)}`;
}
