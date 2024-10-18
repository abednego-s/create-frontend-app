import { stripIndent } from 'common-tags';
import { Options } from '../../types';

function vanillaTemplate() {
  return `console.log('hello world!')`;
}

function svelteTemplate(useTypescript: boolean) {
  return stripIndent`
    import App from './App.svelte';

    const app = new App({
      target: document.getElementById('root')${useTypescript ? ' as HTMLElement' : ''},
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

function reactTemplate(useTypescript: boolean) {
  return stripIndent`
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    
    import App from './App';

    const domNode = document.getElementById('root') ${useTypescript ? 'as HTMLElement' : ''};
    const root = createRoot(domNode);

    root.render(<App />);
  `;
}

export function buildEntryPoint(options: Options) {
  const { styling, lib, transpiler, ui } = options;

  const useCss = styling?.includes('css') ?? false;
  const useReact = lib === 'react';
  const useSvelte = lib === 'svelte';
  const useVue = lib === 'vue';
  const useTypescript = transpiler?.includes('ts') ?? false;
  const useTailwind = ui?.includes('tailwind');

  let cssImport = '';
  let template = vanillaTemplate();

  if (useCss || useTailwind) {
    cssImport += "import './styles.css';\n";
  }

  if (useReact) {
    template = reactTemplate(useTypescript);
  }

  if (useSvelte) {
    template = svelteTemplate(useTypescript);
  }

  if (useVue) {
    template = vueTemplate();
  }

  return cssImport ? cssImport + '\n' + template : template;
}
