import { useSearchParams } from 'react-router-dom';
import { CodePreview } from '../components/CodePreview';
import { DownloadButton } from '../components/DownloadButton';
import { Sidebar } from '../components/Sidebar';
import { buildProjectFiles } from '../utils/build-project-files';
import type { Options, ProjectFiles } from '../types';

const multipleOptionParams: Array<keyof Options> = [
  'transpiler',
  'plugins',
  'styling',
  'image',
  'font',
];

export default function Webpack() {
  const [searchParams] = useSearchParams();

  const params = Array.from(searchParams).reduce((prev, current) => {
    const [key, value] = current as [keyof Options, string];

    prev = {
      ...prev,
      [key]: multipleOptionParams.includes(key) ? value.split(',') : value,
    };

    return prev;
  }, {} as Options);

  const projectFiles = buildProjectFiles({ ...params, bundler: 'webpack' });
  const files = Array.from(projectFiles.keys())
    .sort()
    .reduce((prev, current) => {
      prev = {
        ...prev,
        [current]: projectFiles.get(current) as string,
      };
      return prev;
    }, {} as ProjectFiles);

  return (
    <div className="flex">
      <div className="flex-grow pr-10">
        <div className="mb-10">
          <Sidebar />
        </div>
        <DownloadButton files={files}>Download Zip</DownloadButton>
      </div>
      <div className="w-[750px]">
        <CodePreview files={files} />
      </div>
    </div>
  );
}
