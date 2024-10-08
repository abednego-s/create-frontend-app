import { objectLiteralToString } from '../object-literal-to-string';
import { Options } from '../../types';

export function buildJestConfig(options: Options) {
  const { lib } = options;
  const isReact = lib === 'react';

  const config = {
    testEnvironment: 'node',
  };

  if (isReact) {
    config.testEnvironment = 'jsdom';
  }

  return `module.exports = ${objectLiteralToString(config)}`;
}
