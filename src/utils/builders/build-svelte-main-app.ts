import { Options } from '../../types';

export function buildSvelteMainApp(options: Options) {
  const { transpiler } = options;
  const isTypescript = transpiler?.includes('ts') ?? false;

  let variableDeclaration = `<script>\n  let name = world;`;

  if (isTypescript) {
    variableDeclaration = `<script lang="ts">\n  let name: string = 'world';`;
  }

  const output = `${variableDeclaration}
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
