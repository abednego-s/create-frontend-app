export function buildJestTest() {
  return `test('adds 1 + 2 to equal 3', () => {\n  expect(1+2).toBe(3);\n});`;
}
