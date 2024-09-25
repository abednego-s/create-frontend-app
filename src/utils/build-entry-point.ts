import { Options } from '../types';

export function buildEntryPoint(options: Options) {
  // if vanilla JS
  let output = '';

  if (options.styling?.includes('css')) {
    output += "import './src/styles.css';\n";
  }

  output += "console.log('hello world!')";

  // if using library
  if (options.lib === 'react') {
    output =
      "import App from './App';\nimport { createRoot } from 'react-dom/client';\n\n";

    if (options.transpiler?.includes('ts')) {
      output +=
        "const domNode = document.getElementById('root') as HTMLElement;\n";
    } else {
      output += "const domNode = document.getElementById('root');\n";
    }
    output += 'const root = createRoot(domNode);\n\nroot.render(<App />);';
  }

  if (options.lib === 'svelte') {
    output = `import App from './App.svelte';

const app = new App({
  target: document.getElementById('root'),
});

export default app;`;
  }

  if (options.lib === 'vue') {
    output = `import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: h => h(App),
}).$mount('#root');`;
  }

  return output;
}
