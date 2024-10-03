import type { Options } from '../../types';

export function buildReactMainApp(options: Options) {
  let importStatement = '';

  if (options.styling?.includes('css')) {
    importStatement += "import './src/styles.css'\n\n";
  }

  const output = `${importStatement}const App = () => {
  return (
    <div>
      <h1>Hello, React with Webpack!</h1>
    </div>
  );
}`;

  return output;
}
