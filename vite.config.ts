import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3555,
  },
  resolve: {
    alias: {
      assets: path.resolve(
        "./src/assets/kanban-task-management-web-app/starter-code/assets"
      ),
    },
  },
});
