export function buildPrettierConfig() {
  const config = {
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
  };

  return JSON.stringify(config, null, 2);
}
