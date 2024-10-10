import { CodePreview } from '../components/CodePreview';
import { MainLayout } from '../components/MainLayout';
import { Sidebar } from '../components/Sidebar';
import { commonMenuItems } from '../utils/common-menu-items';
import { useProjectConfiguration } from '../utils/hooks/useProjectConfiguration';

const webpackMenuItems = [
  ...commonMenuItems,
  {
    label: 'Optimization',
    name: 'optimization',
    items: [{ id: 'split-vendors', label: 'Code split vendors' }],
    isMultiple: true,
  },
  // {
  //   label: 'Webpack Plugins',
  //   name: 'plugins',
  //   items: [
  //     { id: 'HotModuleReplacementPlugin', label: 'Hot Module Replacement' },
  //     { id: 'html-webpack-plugin', label: 'HTML Webpack Plugins' },
  //     { id: 'webpack-bundle-analyzer', label: 'Webpack Bundle Analyzer' },
  //     { id: 'mini-css-extract-plugin', label: 'MiniCSSExtractPlugin' },
  //     { id: 'clean-webpack-plugin', label: 'CleanWebpackPlugin' },
  //   ],
  //   isMultiple: true,
  // },
];

export default function Webpack() {
  const { handleChangeProjectName, projectName, files } =
    useProjectConfiguration('webpack');

  return (
    <MainLayout
      leftElement={
        <Sidebar
          menuItems={webpackMenuItems}
          onChangeProjectName={handleChangeProjectName}
          projectName={projectName}
          files={files}
        />
      }
      rightElement={<CodePreview files={files} />}
    />
  );
}
