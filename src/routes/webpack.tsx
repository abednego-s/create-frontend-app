import { Checkbox } from '../components/Checkbox';
import { Radio } from '../components/Radio';

export default function Webpack() {
  return (
    <div>
      <h1>Build a Webpack Project</h1>
      <h2>Library</h2>
      <ul>
        <li>
          <Radio id="react" name="library" label="React" />
        </li>
        <li>
          <Radio id="svelte" name="library" label="Svelte" />
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
  );
}
