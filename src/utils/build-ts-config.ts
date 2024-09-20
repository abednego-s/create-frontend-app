export function buildTypescriptConfig() {
  const config = {
    compilerOptions: {
      target: 'ES6',
      module: 'ES6',
      jsx: 'react-jsx',
      moduleResolution: 'node',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
    },
    include: ['src/**/*'],
  };

  return JSON.stringify(config, null, 2);
}
