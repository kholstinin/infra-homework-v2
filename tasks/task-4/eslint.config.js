import { defineConfig } from "eslint/config";
import ImportPlugin from "./eslint-plugin-import/index.js";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      import: ImportPlugin,
    },
    rules: {
      "import/order": "error",
    },
  },
]);
