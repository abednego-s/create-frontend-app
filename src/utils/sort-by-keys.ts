export function sortByKeys<T extends Record<string, unknown>>(obj: T): T {
  return Object.keys(obj)
    .sort()
    .reduce<T>((result, key) => {
      result = {
        ...result,
        [key]: obj[key],
      };
      return result;
    }, {} as T);
}
