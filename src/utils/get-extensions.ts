export function getExtensions({
  isBabel,
  isTypescript,
}: {
  isBabel: boolean;
  isTypescript: boolean;
}) {
  let extensions = ['js'];

  if (isBabel) {
    extensions = [...extensions, 'jsx'];
  }

  if (isTypescript) {
    extensions = ['ts'];
    if (isBabel) {
      extensions = [...extensions, 'tsx'];
    }
  }

  return extensions;
}
