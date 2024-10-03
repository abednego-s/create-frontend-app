import { DownloadForm, DownloadFormProps } from './DownloadForm';
import { SidebarMenu, SidebarMenuProps } from './SidebarMenu';

export type SidebarProps = SidebarMenuProps & DownloadFormProps;

export function Sidebar({
  files,
  menuItems,
  onChangeProjectName,
  projectName,
}: SidebarProps) {
  return (
    <>
      <div className="mb-5">
        <SidebarMenu menuItems={menuItems} />
      </div>
      <DownloadForm
        onChangeProjectName={onChangeProjectName}
        projectName={projectName}
        files={files}
      />
    </>
  );
}
