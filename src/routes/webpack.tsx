import { useSearchParams } from 'react-router-dom';
import { buildProjectFiles } from '../utils/build-project-files';
import { Checkbox } from '../components/Checkbox';
import { Radio } from '../components/Radio';
import { CodePreview } from '../components/CodePreview';
import { DownloadButton } from '../components/DownloadButton';
import type { Options, ProjectFiles } from '../types';

const multipleOptionParams = ['transpiler', 'plugins', 'styling', 'image'];

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

  const projectFiles = buildProjectFiles({ ...params, bundler: 'webpack' });
  const files = Array.from(projectFiles.keys())
    .sort()
    .reduce<ProjectFiles>((prev, current) => {
      prev = {
        ...prev,
        [current]: projectFiles.get(current) as string,
      };
      return prev;
    }, {});

  return (
    <div className="flex">
      <div className="flex-grow">
        <h2 className="mb-2 text-lg font-semibold">Library</h2>
        <ul className="mb-4">
          <li>
            <Radio id="react" name="lib" label="React" />
          </li>
          <li>
            <Radio id="svelte" name="lib" label="Svelte" />
          </li>
        </ul>
        <h2 className="mb-2 text-lg font-semibold">UI library</h2>
        <ul className="mb-4">
          <li>
            <Checkbox id="tailwind" name="ui" label="Tailwind" />
          </li>
          <li>
            <Checkbox id="material" name="ui" label="Material UI" />
          </li>
        </ul>
        <h2 className="mb-2 text-lg font-semibold">Styling</h2>
        <ul className="mb-4">
          <li>
            <Checkbox id="css" name="styling" label="CSS" />
          </li>
          <li>
            <Checkbox id="css-module" name="styling" label="CSS Module" />
          </li>
        </ul>
        <h2 className="mb-2 text-lg font-semibold">Transpiler</h2>
        <ul className="mb-4">
          <li>
            <Checkbox id="babel" name="transpiler" label="Babel" />
          </li>
          <li>
            <Checkbox id="ts" name="transpiler" label="Typescript" />
          </li>
        </ul>
        <h2 className="mb-2 text-lg font-semibold">Image</h2>
        <ul className="mb-4">
          <li>
            <Checkbox id="svg" name="image" label="SVG" />
          </li>
          <li>
            <Checkbox id="png" name="image" label="PNG" />
          </li>
          <li>
            <Checkbox id="jpe?g" name="image" label="JPG" />
          </li>
          <li>
            <Checkbox id="gif" name="image" label="GIF" />
          </li>
        </ul>
        <h2 className="mb-2 text-lg font-semibold">Webpack Plugins</h2>
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
