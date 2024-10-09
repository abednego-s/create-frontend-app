import { stripIndent } from 'common-tags';
import { Options } from '../../types';

function vanillaTemplate() {
  return `console.log('hello world!')`;
}

function svelteTemplate() {
  return stripIndent`
    import App from './App.svelte

    const app = new App({
      target: document.getElementById('root'),
    });

    export default app;
`;
}

function vueTemplate() {
  return stripIndent`
    import { createApp } from 'vue';
    import App from './App.vue';

    createApp(App).mount('#root');
  `;
}

function reactTemplate(isTypescript: boolean) {
  return stripIndent`
    import App from './App';
    import { createRoot } from 'react-dom/client';

    const domNode = document.getElementById('root') ${isTypescript ? 'as HTMLElement' : ''};
    const root = createRoot(domNode);

    root.render(<App />);
  `;
}

export function buildEntryPoint(options: Options) {
  const { styling, lib, transpiler, ui } = options;

  const isCss = styling?.includes('css') ?? false;
  const isReact = lib === 'react';
  const isSvelte = lib === 'svelte';
  const isVue = lib === 'vue';
  const isTypescript = transpiler?.includes('ts') ?? false;
  const isTailwind = ui?.includes('tailwind');

  let cssImport = '';
  let template = vanillaTemplate();

  if (isCss || isTailwind) {
    cssImport += "import './styles.css';\n";
  }

  if (isReact) {
    template = reactTemplate(isTypescript);
  }

  if (isSvelte) {
    template = svelteTemplate();
  }

  if (isVue) {
    template = vueTemplate();
  }

  return cssImport ? cssImport + '\n' + template : template;
}
