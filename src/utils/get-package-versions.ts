export const packages = [
  '@babel/core',
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-typescript',
  '@emotion/react',
  '@emotion/styled',
  '@mui/material',
  '@parcel/transformer-svelte',
  '@parcel/transformer-vue',
  '@rollup/plugin-babel',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-typescript',
  '@rollup/plugin-url',
  '@types/jest',
  '@types/react',
  '@types/react-dom',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  '@vitejs/plugin-react',
  'autoprefixer',
  'babel-jest',
  'babel-loader',
  'css-loader',
  'eslint',
  'eslint-config-prettier',
  'eslint-plugin-react',
  'eslint-plugin-react-hooks',
  'eslint-plugin-svelte3',
  'file-loader',
  'jsdom',
  'less',
  'parcel',
  'postcss',
  'postcss-loader',
  'prettier',
  'react',
  'react-dom',
  'rollup',
  'rollup-plugin-css-only',
  'rollup-plugin-postcss',
  'rollup-plugin-svelte',
  'rollup-plugin-terser',
  'rollup-plugin-vue',
  'sass',
  'sass-loader',
  'style-loader',
  'svelte',
  'svelte-loader',
  'svelte-preprocess',
  'tailwindcss',
  'ts-jest',
  'ts-loader',
  'typescript',
  'vitest',
  'vue',
  'vue-loader',
  'vue-style-loader',
  'vue-template-compiler',
  'webpack',
  'webpack-cli',
  'webpack-dev-server',
] as const;

export type RegisteredPackage = (typeof packages)[number];

export async function getLatestVersion(pkg: RegisteredPackage) {
  const cache = sessionStorage.getItem(pkg);
  if (cache) {
    return cache;
  } else {
    try {
      const req = await fetch(`https://registry.npmjs.org/${pkg}/latest`);
      const result = (await req.json()) as { version: string };
      const version = `^${result.version}`;
      sessionStorage.setItem(pkg, version);
      return version;
    } catch (err) {
      console.error(err);
      return 'latest';
    }
  }
}
