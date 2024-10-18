import { stripIndent } from 'common-tags';
import { Options } from '../../types';

function getStyleSheetModuleDeclaration(extension: string) {
  return stripIndent`
    declare module '*.${extension}' {
      const content: { [className: string]: string };
      export default content;
    }
  `;
}

function getStaticAssetDeclaration(extension: string) {
  return stripIndent`
    declare module '*.${extension}' {
      const content: string;
      export default content;
    }
  `;
}

export function buildModuleDeclaration(options: Options) {
  const { styling, image, lib } = options;
  const useSvelte = lib === 'svelte';
  const useVue = lib === 'vue';
  const useCssModule = styling?.includes('css-module');

  let template = '';

  const styleSheets = new Set<string>();
  const staticAssets = new Set<string>();

  styling?.forEach((styleType) => {
    const extension = styleType === 'css-module' ? 'css' : styleType;
    styleSheets.add(extension);
  });

  image?.forEach((imageType) => {
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

  if (useSvelte) {
    template += stripIndent`
    import type { ComponentType } from 'svelte';
    const component: ComponentType;
    export default component;`;
  }

  if (useVue) {
    template += stripIndent`
    declare module "*.vue" {
      import { DefineComponent } from "vue";
      const component: DefineComponent<{}, {}, any>;
      export default component;
    }
    `;
  }

  if (useCssModule) {
    template += stripIndent`
      declare module "*.module.css";
    `;
  }

  return template;
}
