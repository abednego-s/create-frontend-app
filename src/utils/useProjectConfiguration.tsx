import { ChangeEvent, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { convertParamsToOptions } from './convert-params-to-options';
import { buildProjectFiles } from './build-project-files';
import { arrangeProjectFiles } from './arrange-project-files';
import { Options } from '../types';

export function useProjectConfiguration(bundler: Options['bundler']) {
  const [searchParams] = useSearchParams();
  const [projectName, setProjectName] = useState('empty-project');

  const handleChangeProjectName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setProjectName(e.target.value);
    },
    []
  );

  const options = convertParamsToOptions(searchParams);

  const projectFiles = buildProjectFiles({
    ...options,
    name: projectName,
    bundler,
  });

  const files = arrangeProjectFiles(projectFiles);

  return { files, projectName, handleChangeProjectName };
}
