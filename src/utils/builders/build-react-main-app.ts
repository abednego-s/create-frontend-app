import type { Options } from '../../types';

export function buildReactMainApp(options: Options) {
  const isCss = options.styling?.includes('css');

  let importStatement = '';

  if (isCss) {
    importStatement += "import './styles.css'\n\n";
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
