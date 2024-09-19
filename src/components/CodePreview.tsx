import { useState } from 'react';
import type { CodePreviewProps, ProjectFiles } from '../types';

export function CodePreview({ files }: CodePreviewProps) {
  const [selectedFile, setSelectedFile] = useState<keyof ProjectFiles>(
    'webpack.config.json'
  );

  function handleClickFile(file: string) {
    setSelectedFile(file as keyof ProjectFiles);
  }

  return (
    <div className="flex border-2 rounded-md md:w-[700px]">
      <ul className="p-4 border-r-2">
        {Object.keys(files).map((projectFile) => (
          <li
            key={projectFile}
            onClick={() => handleClickFile(projectFile)}
            className="block py-1 cursor-pointer"
          >
            {projectFile}
          </li>
        ))}
      </ul>
      <pre className="p-4">
        <code className="text-wrap">{files[selectedFile]}</code>
      </pre>
    </div>
  );
}
