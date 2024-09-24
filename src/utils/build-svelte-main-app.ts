export function buildSvelteMainApp() {
  return `<script>
  let name = 'world';
</script>

<style>
  h1 {
    color: teal;
  }
</style>

<h1>Hello {name}!</h1>

<input bind:value={name} placeholder="Enter your name">`;
}
