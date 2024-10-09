import { Options } from '../../types';

export function buildReactMainApp(options: Options) {
  const { styling } = options;
  const isCss = styling?.includes('css') ?? false;
  let importStatement = '';

  if (isCss) {
    importStatement += "import './styles.css'\n\n";
  }

  const output = `${importStatement}const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}`;

  return output;
}
