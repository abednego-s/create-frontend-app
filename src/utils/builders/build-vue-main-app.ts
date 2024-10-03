export function buildVueMainApp() {
  return `<template>
  <div id="root">
    <h1>Hello Vue with Webpack!</h1>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#root {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
`;
}
