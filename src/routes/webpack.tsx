import { ChangeEvent, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CodePreview } from '../components/CodePreview';
import { DownloadForm } from '../components/DownloadForm';
import { SidebarMenu } from '../components/SidebarMenu';
import { MainLayout } from '../components/MainLayout';
import { arrangeProjectFiles } from '../utils/arrange-project-files';
import { buildProjectFiles } from '../utils/build-project-files';
import { commonMenuItems } from '../utils/common-menu-items';
import { convertParamsToOptions } from '../utils/convert-params-to-options';

const webpackMenuItems = [
  ...commonMenuItems,
  {
    label: 'Optimization',
    name: 'optimization',
    items: [{ id: 'split-vendors', label: 'Code split vendors' }],
    isMultiple: true,
  },
  {
    label: 'Webpack Plugins',
    name: 'plugins',
    items: [
      { id: 'HotModuleReplacementPlugin', label: 'Hot Module Replacement' },
      { id: 'html-webpack-plugin', label: 'HTML Webpack Plugins' },
      { id: 'webpack-bundle-analyzer', label: 'Webpack Bundle Analyzer' },
      { id: 'mini-css-extract-plugin', label: 'MiniCSSExtractPlugin' },
      { id: 'clean-webpack-plugin', label: 'CleanWebpackPlugin' },
    ],
    isMultiple: true,
  },
];

export default function Webpack() {
  const [searchParams] = useSearchParams();
  const [projectName, setProjectName] = useState('empty-project');

  const handleChangeProjectName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setProjectName(e.target.value);
    },
    []
  );

  const options = convertParamsToOptions(searchParams);

  const projectFiles = buildProjectFiles({
    ...options,
    name: projectName,
    bundler: 'webpack',
  });

  const files = arrangeProjectFiles(projectFiles);

  return (
    <MainLayout
      sidebarElement={<SidebarMenu menuItems={webpackMenuItems} />}
      downloadFormElement={
        <DownloadForm
          onChangeProjectName={handleChangeProjectName}
          projectName={projectName}
          files={files}
        />
      }
      codePreviewElement={<CodePreview files={files} />}
    />
  );
}
