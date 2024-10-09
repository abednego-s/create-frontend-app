import { stripIndents } from 'common-tags';

export function buildGitIgnore() {
  return stripIndents`
    .cache/
    coverage/
    dist/*
    !dist/index.html
    node_modules/
    *.log

    # OS generated files
    .DS_Store
    .DS_Store?
    ._*
    .Spotlight-V100
    .Trashes
    ehthumbs.db
    Thumbs.db
  `;
}
