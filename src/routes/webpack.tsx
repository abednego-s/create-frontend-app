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
