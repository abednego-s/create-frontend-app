import type { Options } from '../../types';

function getStyleSheetModuleDeclaration(extension: string) {
  return `declare module '*.${extension}' {
  const content: { [className: string]: string };
  export default content;
}`;
}

function getStaticAssetDeclaration(extension: string) {
  return `declare module '*.${extension}' {
  const content: string;
  export default content;
}`;
}

export function buildModuleDeclaration(options: Options) {
  let template = '';

  const styleSheets = new Set<string>();
  const staticAssets = new Set<string>();

  options.styling?.forEach((styleType) => {
    const extension = styleType === 'css-module' ? 'css' : styleType;
    styleSheets.add(extension);
  });

  options.image?.forEach((imageType) => {
    if (imageType === 'jpe?g') {
      staticAssets.add('jpg');
      staticAssets.add('jpeg');
    } else {
      staticAssets.add(imageType);
    }
  });

  options.font?.forEach((fontType) => {
    staticAssets.add(fontType);
  });

  styleSheets.forEach((fileType) => {
    template += getStyleSheetModuleDeclaration(fileType) + '\n\n';
  });

  staticAssets.forEach((fileType) => {
    template += getStaticAssetDeclaration(fileType) + '\n\n';
  });

  return template;
}
