import { Checkbox } from './Checkbox';
import { Collapsible } from './Collapsible';
import { Radio } from './Radio';

const menus = [
  {
    label: 'Library',
    name: 'lib',
    items: [
      { id: 'react', label: 'React' },
      { id: 'svelte', label: 'Svelte' },
      { id: 'vue', label: 'Vue' },
    ],
    canMultiple: false,
  },
  {
    label: 'UI Library',
    name: 'ui',
    items: [
      { id: 'tailwind', label: 'Tailwind' },
      { id: 'material-ui', label: 'Material UI' },
    ],
    canMultiple: true,
  },
  {
    label: 'Testing Framework',
    name: 'testing',
    items: [
      { id: 'jest', label: 'Jest' },
      { id: 'vitest', label: 'Vitest' },
    ],
    canMultiple: true,
  },
  {
    label: 'Transpiler',
    name: 'transpiler',
    items: [
      { id: 'babel', label: 'Babel' },
      { id: 'ts', label: 'Typescript' },
    ],
    canMultiple: true,
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
    canMultiple: true,
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
    canMultiple: true,
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
    canMultiple: true,
  },
  {
    label: 'Linting',
    name: 'linting',
    items: [
      { id: 'eslint', label: 'ESLint' },
      { id: 'prettier', label: 'Prettier' },
    ],
    canMultiple: true,
  },
  {
    label: 'Optimization',
    name: 'optimization',
    items: [{ id: 'split-vendors', label: 'Code split vendors' }],
    canMultiple: true,
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
    canMultiple: true,
  },
];

export function Sidebar() {
  return (
    <>
      {menus.map((menu) => {
        return (
          <Collapsible key={menu.name} trigger={menu.label}>
            <ul className="mb-4">
              {menu.canMultiple
                ? menu.items.map((item) => (
                    <li key={item.id}>
                      <Checkbox
                        id={item.id}
                        name={menu.name}
                        label={item.label}
                      />
                    </li>
                  ))
                : menu.items.map((item) => (
                    <li key={item.id}>
                      <Radio id={item.id} name={menu.name} label={item.label} />
                    </li>
                  ))}
            </ul>
          </Collapsible>
        );
      })}
    </>
  );
}
