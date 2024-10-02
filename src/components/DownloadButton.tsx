import type { ReactNode } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { ProjectFiles } from '../types';

export type DownloadButtonProps = {
  projectName: string;
  files: ProjectFiles;
  children: ReactNode;
};

export function DownloadButton({
  projectName,
  files,
  children,
}: Readonly<DownloadButtonProps>) {
  async function handleClickDownload() {
    const zip = new JSZip();

    for (const [key, value] of Object.entries(files)) {
      zip.file(key, value);
    }

    try {
      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, `${projectName}.zip`);
    } catch (err) {
      console.error('error:', err);
    }
  }

  return (
    <button
      className="w-full px-4 py-2 text-white border-2 rounded-md bg-stone-800 border-stone-800 hover:bg-white hover:text-stone-800"
      onClick={handleClickDownload}
    >
      {children}
    </button>
  );
}
