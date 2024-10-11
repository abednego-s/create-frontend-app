export function getExtensions({
  useBabel,
  useTypescript,
}: {
  useBabel: boolean;
  useTypescript: boolean;
}) {
  let extensions = ['js'];

  if (useBabel) {
    extensions = [...extensions, 'jsx'];
  }

  if (useTypescript) {
    extensions = ['ts'];
    if (useBabel) {
      extensions = [...extensions, 'tsx'];
    }
  }

  return extensions;
}
