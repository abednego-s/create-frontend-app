import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import type { ProjectFiles, ProjectFileNames } from '../types';

type CodePreviewProps = {
  files: ProjectFiles;
};

const extensionLang: Record<string, string> = {
  babelrc: 'json',
  css: 'css',
  html: 'cshtml',
  md: 'markdown',
  js: 'javascript',
  json: 'json',
  jsx: 'jsx',
  prettierrc: 'json',
  ts: 'typescript',
  tsx: 'tsx',
};

export function CodePreview({ files }: CodePreviewProps) {
  const [selectedFile, setSelectedFile] =
    useState<ProjectFileNames>('webpack.config.js');

  const [language, setLanguage] = useState('javascript');

  function handleClickFile(file: ProjectFileNames) {
    setSelectedFile(file);
    const extension = file.split('.').at(-1);
    if (extension) {
      const lang = extensionLang[extension] || 'bash';
      setLanguage(lang);
    }
  }

  return (
    <div className="flex overflow-hidden rounded-md h-[650px]">
      <ul className="pt-4 bg-black">
        {(Object.keys(files) as ProjectFileNames[]).map((projectFile) => (
          <li
            key={projectFile}
            onClick={() => handleClickFile(projectFile)}
            className={`block px-4 py-1 text-gray-400 cursor-pointer hover:bg-stone-800 ${selectedFile === projectFile ? 'bg-stone-800' : ''}`}
          >
            {projectFile}
          </li>
        ))}
      </ul>
      <CodeBlock code={files[selectedFile]} language={language} />
    </div>
  );
}
