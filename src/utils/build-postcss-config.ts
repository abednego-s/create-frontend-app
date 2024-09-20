export function buildPostCssConfig() {
  return `module.exports = {
  plugins: [ 
    require('tailwindcss'), 
    require('autoprefixer')
  ],
};`;
}
