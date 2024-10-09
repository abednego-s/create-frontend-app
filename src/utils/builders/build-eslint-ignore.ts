import { stripIndents } from 'common-tags';

export function buildEslintIgnore() {
  return stripIndents`
    node_modules
    dist/
  `;
}
