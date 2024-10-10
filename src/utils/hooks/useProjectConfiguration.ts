import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { convertParamsToOptions } from '../convert-params-to-options';
import { buildProjectFiles } from '../builders/build-project-files';
import { arrangeProjectFiles } from '../arrange-project-files';
import { Options, ProjectFileNames } from '../../types';

export function useProjectConfiguration(bundler: Options['bundler']) {
  const [searchParams] = useSearchParams();
  const [projectName, setProjectName] = useState('empty-project');
  const [projectFiles, setProjectFiles] = useState<Map<
    ProjectFileNames,
    string
  > | null>(null);

  useEffect(() => {
    async function buildProject() {
      const options = convertParamsToOptions(searchParams);

      const generatedFiles = await buildProjectFiles({
        ...options,
        name: projectName,
        bundler,
      });

      setProjectFiles(generatedFiles);
    }

    buildProject();
  }, [bundler, projectName, searchParams]);

  const handleChangeProjectName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setProjectName(e.target.value);
    },
    []
  );

  const files = projectFiles ? arrangeProjectFiles(projectFiles) : null;

  return { files, projectName, handleChangeProjectName };
}
