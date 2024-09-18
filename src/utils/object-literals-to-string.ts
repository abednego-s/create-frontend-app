export function objectLiteralToString(obj: unknown) {
  const objString = JSON.stringify(
    obj,
    (_: string, value: unknown) =>
      value instanceof RegExp ? value.toString() : value,
    2
  )
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'")
    .replace(/'\/(.+?)\/([gimyus]*)'/g, '/$1/$2')
    .replace(/'\[code\]|\[\/code\]'/g, '');

  return objString;
}
