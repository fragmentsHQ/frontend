import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    'https://api.studio.thegraph.com/proxy/18071/fragments/version/latest',
  documents: ['src/**/*.graphql'],
  overwrite: true,
  generates: {
    './src/graphql/types.generated.ts': {
      plugins: ['typescript'],
    },
    './src/graphql/hooks': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: '../types.generated.ts',
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
