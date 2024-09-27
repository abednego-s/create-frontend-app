export function objectLiteralToString(obj: unknown) {
  const objString = JSON.stringify(
    obj,
    function (_, value) {
      if (value instanceof RegExp) {
        return value.toString();
      }
      return value;
    },
    2
  )
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'")
    .replace(/\\\\/g, '\\')
    .replace(/'\/(.+?)\/([gimyus]*)'/g, '/$1/$2')
    .replace(/'\[code\]|\[\/code\]'/g, '');

  return objString;
}
