export const commonMenuItems = [
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
];
