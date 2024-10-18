import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ChangeEvent } from 'react';
import { ProjectFiles } from '../types';

export type DownloadFormProps = {
  // eslint-disable-next-line no-unused-vars
  onChangeProjectName: (e: ChangeEvent<HTMLInputElement>) => void;
  projectName: string;
  files: ProjectFiles | null;
};

export function DownloadForm({
  onChangeProjectName,
  projectName,
  files,
}: DownloadFormProps) {
  async function handleClickDownload() {
    if (files) {
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
  }

  return (
    <form>
      <div className="mb-2">
        <label htmlFor="project-name" className="inline-block mb-2">
          Project Name:
        </label>
        <input
          type="text"
          id="project-name"
          className="w-full px-4 py-2 border-2 border-gray-800 rounded-md"
          onChange={onChangeProjectName}
          value={projectName}
        />
      </div>
      <button
        className="w-full px-4 py-2 text-white border-2 rounded-md bg-stone-800 border-stone-800 hover:bg-white hover:text-stone-800 disabled:cursor-not-allowed"
        onClick={handleClickDownload}
        disabled={!files}
        type="button"
      >
        Download Zip
      </button>
    </form>
  );
}
