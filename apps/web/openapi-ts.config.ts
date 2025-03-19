import { defineConfig } from '@hey-api/openapi-ts';
import { defaultPlugins } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'swagger.json',
  output: 'src/app/client',
  plugins: [...defaultPlugins, '@hey-api/client-fetch', '@tanstack/react-query'],
});