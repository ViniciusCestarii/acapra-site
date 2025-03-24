import { defineConfig } from "@hey-api/openapi-ts";
import { defaultPlugins } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "swagger.json",
  output: {
    path: "src/client",
    format: "prettier",
  },
  plugins: [
    ...defaultPlugins,
    "@hey-api/client-fetch",
    "@tanstack/react-query",
  ],
});
