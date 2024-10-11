import { objectLiteralToString } from '../object-literal-to-string';
import { Options } from '../../types';

export function buildJestConfig(options: Options) {
  const { styling } = options;
  const useCssModule = styling?.includes('css-module');

  const config: {
    testEnvironment: string;
    moduleNameMapper: Record<string, string>;
    setupFilesAfterEnv: string[];
  } = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
      '\\\\.(jpg|jpeg|png|gif|svg|eot|otf|ttf|woff|woff2)$':
        '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };

  if (useCssModule) {
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      '\\\\.module\\\\.(css|less|scss)$': 'identity-obj-proxy',
    };
  }

  return `module.exports = ${objectLiteralToString(config)}`;
}
