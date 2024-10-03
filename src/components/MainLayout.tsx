import { ReactNode } from 'react';

export type MainLayoutProps = {
  codePreviewElement: ReactNode;
  downloadFormElement: ReactNode;
  sidebarElement: ReactNode;
};

export function MainLayout({
  codePreviewElement,
  downloadFormElement,
  sidebarElement,
}: MainLayoutProps) {
  return (
    <div className="flex">
      <div className="w-1/4 pr-4">
        <div className="mb-5">{sidebarElement}</div>
        {downloadFormElement}
      </div>
      <div className="w-3/4">{codePreviewElement}</div>
    </div>
  );
}
