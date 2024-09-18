import { useSearchParams } from 'react-router-dom';
import { buildProjectFiles } from '../utils/build-project-files';
import { Checkbox } from '../components/Checkbox';
import { Radio } from '../components/Radio';
import { CodePreview } from '../components/CodePreview';
import type { Options } from '../types';

export default function Webpack() {
  const [searchParams] = useSearchParams();

  const obj = Array.from(searchParams).reduce((prev, current) => {
    const [key, value] = current;
    prev = {
      ...prev,
      [key]: value,
    };
    return prev;
  }, {} as Options);

  const files = buildProjectFiles({ ...obj, bundler: 'webpack' });

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h2>Library</h2>
        <ul>
          <li>
            <Radio id="react" name="lib" label="React" />
          </li>
          <li>
            <Radio id="svelte" name="lib" label="Svelte" />
          </li>
        </ul>
        <h2>UI Library</h2>
        <ul>
          <li>
            <Checkbox id="tailwind" name="ui" label="Tailwind" />
          </li>
          <li>
            <Checkbox id="material" name="ui" label="Material UI" />
          </li>
        </ul>
        <h2>Transpiler</h2>
        <ul>
          <li>
            <Checkbox id="babel" name="transpiler" label="Babel" />
          </li>
          <li>
            <Checkbox id="ts" name="transpiler" label="Typescript" />
          </li>
        </ul>
        <h2>Webpack Plugins</h2>
        <ul>
          <li>
            <Checkbox
              id="html-webpack-plugins"
              name="plugins"
              label="HTML Webpack Plugins"
            />
          </li>
          <li>
            <Checkbox
              id="webpack-bundle-analyzer"
              name="plugins"
              label="Webpack Bundle Analyzer"
            />
          </li>
          <li>
            <Checkbox
              id="mini-css-extract-plugin"
              name="plugins"
              label="MiniCSSExtractPlugin"
            />
          </li>
          <li>
            <Checkbox
              id="copy-webpack-plugin"
              name="plugins"
              label="CopyWebpackPlugin"
            />
          </li>
          <li>
            <Checkbox
              id="clean-webpack-plugin"
              name="plugins"
              label="CleanWebpackPlugin"
            />
          </li>
        </ul>
      </div>
      <CodePreview files={files} />
    </div>
  );
}
