import { Options } from '../../types';

export function buildEntryPoint(options: Options) {
  const { styling, lib, transpiler } = options;
  const isCss = styling?.includes('css') ?? false;
  const isReact = lib === 'react';
  const isSvelte = lib === 'svelte';
  const isVue = lib === 'vue';
  const isTypescript = transpiler?.includes('ts') ?? false;

  let cssImport = '';

  if (isCss) {
    cssImport += "import './styles.css';\n\n";
  }

  const vanillaTemplate = () => `${cssImport}console.log('hello world!')`;

  const reactTemplate = (
    isTypescript: boolean
  ) => `${cssImport}import App from './App';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root') ${isTypescript ? 'as HTMLElement' : ''};
const root = createRoot(domNode);

root.render(<App />);`;

  const svelteTemplate = () => `${cssImport}import App from './App.svelte

const app = new App({
  target: document.getElementById('root'),
});

export default app;
`;

  const vueTemplate = () => `${cssImport}import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#root');`;

  if (isReact) {
    return reactTemplate(isTypescript);
  }

  if (isSvelte) {
    return svelteTemplate();
  }

  if (isVue) {
    return vueTemplate();
  }

  return vanillaTemplate();
}
