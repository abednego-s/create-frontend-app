export function buildHtml() {
  let output = '<!DOCTYPE html>';

  output += `
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Empty Poject</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

  return output;
}
