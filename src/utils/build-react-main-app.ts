import type { Options } from '../types';

export function buildReactMainApp(options: Options) {
  let output = '';

  if (options.styling?.includes('css')) {
    output += "import './src/styles.css'\n\n";
  }

  output += `const App = () => {
  return (
    <div>
      <h1>Hello, React with Webpack!</h1>
    </div>
  );
};

export default App;`;

  return output;
}
