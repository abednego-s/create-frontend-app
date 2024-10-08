import { CodePreview } from '../components/CodePreview';
import { MainLayout } from '../components/MainLayout';
import { Sidebar } from '../components/Sidebar';
import { commonMenuItems } from '../utils/common-menu-items';
import { useProjectConfiguration } from '../utils/hooks/useProjectConfiguration';

const parcelMenuItems = [...commonMenuItems];

export default function Rollup() {
  const { handleChangeProjectName, projectName, files } =
    useProjectConfiguration('rollup');

  return (
    <MainLayout
      leftElement={
        <Sidebar
          menuItems={parcelMenuItems}
          onChangeProjectName={handleChangeProjectName}
          projectName={projectName}
          files={files}
        />
      }
      rightElement={<CodePreview files={files} />}
    />
  );
}
