import type { Options } from '../types';

export function buildSvelteMainApp(options: Options) {
  const useTypescript = options.transpiler?.includes('ts');

  let output = `<script>\n  let name = world;\n`;

  if (useTypescript) {
    output = `<script lang="ts">\n  let name: string = 'world';\n`;
  }

  output += `</script>

<style>
  h1 {
    color: teal;
  }
</style>

<h1>Hello {name}!</h1>

<input bind:value={name} placeholder="Enter your name">`;

  return output;
}
