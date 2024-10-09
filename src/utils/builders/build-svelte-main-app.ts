import { html } from 'common-tags';
import { Options } from '../../types';

export function buildSvelteMainApp(options: Options) {
  const { transpiler } = options;
  const isTypescript = transpiler?.includes('ts') ?? false;

  let scriptTag = isTypescript
    ? `<script lang="ts">\n  let name: string = 'world';`
    : `<script>\n  let name = world;`;

  scriptTag += '\n</script>';

  const output = html`
    ${scriptTag}

    <style>
      h1 {
        color: teal;
      }
    </style>

    <h1>Hello {name}!</h1>

    <input bind:value="{name}" placeholder="Enter your name" />
  `;

  return output;
}
