import { stripIndent } from 'common-tags';
import { Options } from '../../types';

export function buildReactMainApp(options: Options) {
  const { styling } = options;
  const isCss = styling?.includes('css') ?? false;
  let cssImport = '';

  if (isCss) {
    cssImport += "import './styles.css'";
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
  `;

  return cssImport ? cssImport + '\n\n' + template : template;
}
