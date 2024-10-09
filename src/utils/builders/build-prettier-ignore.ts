import { stripIndents } from 'common-tags';

export function buildPrettierIgnore() {
  return stripIndents`
    node_modules
    dist/
  `;
}
