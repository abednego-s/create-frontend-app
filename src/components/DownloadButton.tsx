import type { ReactNode } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { ProjectFiles } from '../types';

type DownloadButtonProps = {
  files: ProjectFiles;
  children: ReactNode;
};

export function DownloadButton({ files, children }: DownloadButtonProps) {
  async function handleClickDownload() {
    const zip = new JSZip();

    for (const [key, value] of Object.entries(files)) {
      zip.file(key, value);
    }

    try {
      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'hello.zip');
    } catch (err) {
      console.error('error:', err);
    }
  }

  return (
    <button
      className="px-4 py-2 border-2 rounded-md"
      onClick={handleClickDownload}
    >
      {children}
    </button>
  );
}
