import type { ConfigurationStrategy, PackageConfig } from '../../types';

export class MaterialUiStrategy implements ConfigurationStrategy {
  apply(packageJson: PackageConfig) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      '@mui/material': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
    };
  }
}
