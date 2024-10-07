import { ProjectFileNames, ProjectFiles } from '../types';

export function arrangeProjectFiles(
  projectFiles: Map<ProjectFileNames, string>
) {
  return Array.from(projectFiles.keys())
    .sort()
    .reduce((prev, current) => {
      prev = {
        ...prev,
        [current]: projectFiles.get(current),
      };
      return prev;
    }, {} as ProjectFiles);
}
