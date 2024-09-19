import { useSearchParams } from 'react-router-dom';
import { buildProjectFiles } from '../utils/build-project-files';
import { Checkbox } from '../components/Checkbox';
import { Radio } from '../components/Radio';
import { CodePreview } from '../components/CodePreview';
import { DownloadButton } from '../components/DownloadButton';
import type { Options } from '../types';

const multipleOptionParams = ['transpiler', 'plugins'];

export default function Webpack() {
  const [searchParams] = useSearchParams();

  const params = Array.from(searchParams).reduce((prev, current) => {
    const [key, value] = current;

    prev = {
      ...prev,
      [key]: multipleOptionParams.includes(key) ? value.split(',') : value,
    };

    return prev;
  }, {} as Options);

  const files = buildProjectFiles({ ...params, bundler: 'webpack' });

  return (
    <div className="flex">
      <div className="flex-grow">
        <h2 className="mb-2 text-2xl font-semibold">Library</h2>
        <ul className="mb-4">
          <li>
            <Radio id="react" name="lib" label="React" />
          </li>
          <li>
            <Radio id="svelte" name="lib" label="Svelte" />
          </li>
        </ul>
        <h2 className="mb-2 text-2xl font-semibold">UI library</h2>
        <ul className="mb-4">
          <li>
            <Checkbox id="tailwind" name="ui" label="Tailwind" />
          </li>
          <li>
            <Checkbox id="material" name="ui" label="Material UI" />
          </li>
        </ul>
        <h2 className="mb-2 text-2xl font-semibold">Transpiler</h2>
        <ul className="mb-4">
          <li>
            <Checkbox id="babel" name="transpiler" label="Babel" />
          </li>
          <li>
            <Checkbox id="ts" name="transpiler" label="Typescript" />
          </li>
        </ul>
        <h2 className="mb-2 text-2xl font-semibold">Webpack Plugins</h2>
        <ul className="mb-4">
          <li>
            <Checkbox
              id="html-webpack-plugin"
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
              id="clean-webpack-plugin"
              name="plugins"
              label="CleanWebpackPlugin"
            />
          </li>
        </ul>
        <DownloadButton files={files}>Download</DownloadButton>
      </div>
      <CodePreview files={files} />
    </div>
  );
}
