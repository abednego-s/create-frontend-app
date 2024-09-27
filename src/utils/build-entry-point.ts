import { Options } from '../types';

export function buildEntryPoint(options: Options) {
  let cssImport = '';

  if (options.styling?.includes('css')) {
    cssImport += "import './src/styles.css';\n\n";
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

  const vueTemplate = () => `${cssImport}import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: h => h(App),
}).$mount('#root');`;

  if (options.lib === 'react') {
    const useTypescript = options.transpiler?.includes('ts') ?? false;
    return reactTemplate(useTypescript);
  }

  if (options.lib === 'svelte') {
    return svelteTemplate();
  }

  if (options.lib === 'vue') {
    return vueTemplate();
  }

  return vanillaTemplate();
}
