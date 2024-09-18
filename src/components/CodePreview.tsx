import { useState } from 'react';
import type { ProjectFiles } from '../types';

export type CodePreviewProps = {
  files: ProjectFiles;
};

export function CodePreview({ files }: CodePreviewProps) {
  const [selectedFile, setSelectedFile] = useState<keyof ProjectFiles>(
    'webpack.config.json'
  );

  function handleClickFile(file: string) {
    setSelectedFile(file as keyof ProjectFiles);
  }

  return (
    <div style={{ display: 'flex' }}>
      <ul>
        {Object.keys(files).map((projectFile) => (
          <li key={projectFile} onClick={() => handleClickFile(projectFile)}>
            {projectFile}
          </li>
        ))}
      </ul>
      <pre>
        <code>{files[selectedFile]}</code>
      </pre>
    </div>
  );
}
