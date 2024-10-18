import { stripIndent } from 'common-tags';
import { Options } from '../../types';

export function buildReactMainApp(options: Options) {
  const { styling } = options;
  const useCss = styling?.includes('css') ?? false;
  let cssImport = '';

  if (useCss) {
    cssImport += "import './styles.css';";
  }

  const template = stripIndent`
    import React from 'react';
    
    const App = () => {
      return (
        <div>
          <h1>Hello World!</h1>
        </div>
      );
    }

    export default App;
  `;

  return cssImport ? cssImport + '\n\n' + template : template;
}
