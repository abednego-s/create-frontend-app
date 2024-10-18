export const packages = [
  '@babel/core',
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-typescript',
  '@emotion/react',
  '@emotion/styled',
  '@mui/material',
  '@parcel/transformer-vue',
  '@rollup/plugin-babel',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-replace',
  '@rollup/plugin-typescript',
  '@rollup/plugin-terser',
  '@rollup/plugin-url',
  '@sveltejs/vite-plugin-svelte',
  '@tsconfig/svelte',
  '@types/jest',
  '@types/react',
  '@types/react-dom',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  '@vitejs/plugin-react',
  '@vitejs/plugin-vue',
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
  'html-webpack-plugin',
  'identity-obj-proxy',
  'jest',
  'jsdom',
  'less',
  'less-loader',
  'parcel',
  'postcss',
  'postcss-loader',
  'prettier',
  'react',
  'react-dom',
  'rollup',
  'rollup-plugin-css-only',
  'rollup-plugin-livereload',
  'rollup-plugin-postcss',
  'rollup-plugin-serve',
  'rollup-plugin-svelte',
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
  'tslib',
  'typescript',
  'typescript-plugin-css-modules',
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
