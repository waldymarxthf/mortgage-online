import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~pages": path.resolve("src/pages"),
      "~shared": path.resolve("src/shared"),
      "~components": path.resolve("src/components"),
      "~utils": path.resolve("src/utils"),
      "~hooks": path.resolve("src/hooks"),
      "~api": path.resolve("src/api"),
      "~store": path.resolve("src/store"),
      "~context": path.resolve("src/context"),
    },
  },
});
