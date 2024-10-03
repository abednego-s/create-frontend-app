import type { Options } from '../../types';

export function buildSvelteMainApp(options: Options) {
  let varDeclaration = `<script>\n  let name = world;`;

  if (options.transpiler?.includes('ts')) {
    varDeclaration = `<script lang="ts">\n  let name: string = 'world';`;
  }

  const output = `${varDeclaration}
</script>

<style>
  h1 {
    color: teal;
  }
</style>

<h1>Hello {name}!</h1>

<input bind:value={name} placeholder="Enter your name">`;

  return output;
}
