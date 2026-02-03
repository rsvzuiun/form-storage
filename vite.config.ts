import { resolve } from "path";
import { defineConfig } from "vitest/config";

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
      fileName: (format) => `index${format === "es" ? "" : `.${format}`}.js`,
    },
  },
});
