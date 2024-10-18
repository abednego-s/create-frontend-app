import { html } from 'common-tags';

export function buildVueMainApp() {
  return html`
    <template>
      <div id="root">
        <h1>Hello World!</h1>
      </div>
    </template>

    <script>
      export default {
        name: 'App',
      };
    </script>

    <style>
      h1 {
        color: #42b983;
      }
    </style>
  `;
}
