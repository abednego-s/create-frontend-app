import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import LoadingSkeleton from './LoadingSkeleton';
import { ProjectFiles } from '../types';

export type CodePreviewProps = {
  files: ProjectFiles | null;
};

const extensionLang: Record<string, string> = {
  babelrc: 'json',
  css: 'css',
  cjs: 'javascript',
  html: 'cshtml',
  md: 'markdown',
  js: 'javascript',
  json: 'json',
  jsx: 'jsx',
  prettierrc: 'json',
  svelte: 'cshtml',
  ts: 'typescript',
  tsx: 'tsx',
  vue: 'cshtml',
};

export function CodePreview({ files }: CodePreviewProps) {
  const [selectedFile, setSelectedFile] =
    useState<keyof ProjectFiles>('package.json');

  const [language, setLanguage] = useState('javascript');

  function handleClickFile(file: keyof ProjectFiles) {
    setSelectedFile(file);
    const extension = file.split('.').at(-1);
    if (extension) {
      const lang = extensionLang[extension] || 'bash';
      setLanguage(lang);
    }
  }

  if (!files) {
    return <WaitingForProjectBuild />;
  }

  const projectFiles = Object.keys(files) as (keyof ProjectFiles)[];

  return (
    <div className="flex overflow-hidden rounded-md h-[650px]">
      <ul className="pt-4 bg-black w-60">
        {projectFiles.map((projectFile) => (
          <li
            key={projectFile}
            className={`block px-4 py-1 text-gray-400 cursor-pointer hover:bg-stone-800 ${selectedFile === projectFile ? 'bg-stone-800' : ''}`}
          >
            <button onClick={() => handleClickFile(projectFile)}>
              {projectFile}
            </button>
          </li>
        ))}
      </ul>
      <CodeBlock code={files[selectedFile]} language={language} />
    </div>
  );
}

export function WaitingForProjectBuild() {
  return (
    <div className="flex overflow-hidden rounded-md h-[650px]">
      <div className="bg-black w-60">
        <div className="space-y-4 animate-pulse">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="w-full bg-stone-800">
        <LoadingSkeleton />
      </div>
    </div>
  );
}
