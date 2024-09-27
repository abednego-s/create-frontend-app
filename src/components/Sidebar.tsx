import { Collapsible } from './Collapsible';
import { MenuItems } from './MenuItems';

const menus = [
  {
    label: 'Library',
    name: 'lib',
    items: [
      { id: 'react', label: 'React' },
      { id: 'svelte', label: 'Svelte' },
      { id: 'vue', label: 'Vue' },
    ],
    isMultiple: false,
  },
  {
    label: 'UI Library',
    name: 'ui',
    items: [
      { id: 'tailwind', label: 'Tailwind' },
      { id: 'material-ui', label: 'Material UI' },
    ],
    isMultiple: true,
  },
  {
    label: 'Testing Framework',
    name: 'testing',
    items: [
      { id: 'jest', label: 'Jest' },
      { id: 'vitest', label: 'Vitest' },
    ],
    isMultiple: true,
  },
  {
    label: 'Transpiler',
    name: 'transpiler',
    items: [
      { id: 'babel', label: 'Babel' },
      { id: 'ts', label: 'Typescript' },
    ],
    isMultiple: true,
  },
  {
    label: 'Styling',
    name: 'styling',
    items: [
      { id: 'css', label: 'CSS' },
      { id: 'scss', label: 'SASS' },
      { id: 'less', label: 'LESS' },
      { id: 'css-module', label: 'CSS Module' },
    ],
    isMultiple: true,
  },
  {
    label: 'Image',
    name: 'image',
    items: [
      { id: 'svg', label: 'SVG' },
      { id: 'png', label: 'PNG' },
      { id: 'jpe?g', label: 'JPG' },
      { id: 'gif', label: 'GIF' },
    ],
    isMultiple: true,
  },
  {
    label: 'Fonts',
    name: 'font',
    items: [
      { id: 'ttf', label: 'TTF' },
      { id: 'eot', label: 'EOT' },
      { id: 'woff', label: 'WOFF' },
      { id: 'woff2', label: 'WOFF2' },
    ],
    isMultiple: true,
  },
  {
    label: 'Linting',
    name: 'linting',
    items: [
      { id: 'eslint', label: 'ESLint' },
      { id: 'prettier', label: 'Prettier' },
    ],
    isMultiple: true,
  },
  {
    label: 'Optimization',
    name: 'optimization',
    items: [{ id: 'split-vendors', label: 'Code split vendors' }],
    isMultiple: true,
  },
  {
    label: 'Webpack Plugins',
    name: 'plugins',
    items: [
      { id: 'HotModuleReplacementPlugin', label: 'Hot Module Replacement' },
      { id: 'html-webpack-plugin', label: 'HTML Webpack Plugins' },
      { id: 'webpack-bundle-analyzer', label: 'Webpack Bundle Analyzer' },
      { id: 'mini-css-extract-plugin', label: 'MiniCSSExtractPlugin' },
      { id: 'clean-webpack-plugin', label: 'CleanWebpackPlugin' },
    ],
    isMultiple: true,
  },
];

export function Sidebar() {
  return (
    <>
      {menus.map((menu) => {
        return (
          <Collapsible key={menu.name} trigger={menu.label}>
            <nav>
              <ul className="mb-4">
                <MenuItems
                  items={menu.items}
                  name={menu.name}
                  isMultiple={menu.isMultiple}
                />
              </ul>
            </nav>
          </Collapsible>
        );
      })}
    </>
  );
}
