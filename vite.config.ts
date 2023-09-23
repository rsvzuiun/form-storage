import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
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
