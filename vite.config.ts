/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "import.meta.vitest": undefined,
  },
  test: {
    includeSource: ["src/**/*.ts"],
  },
  build: {
    minify: "terser",
    terserOptions: {
      mangle: {
        properties: {
          regex: /_.*/,
        },
      },
    },
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "FormStorage",
      fileName: "index",
    },
  },
});
