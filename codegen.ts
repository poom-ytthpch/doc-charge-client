
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql",
  generates: {
    "types/gql.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;
