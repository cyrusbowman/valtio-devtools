import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import jsconfigPaths from 'vite-jsconfig-paths'
import fs from "node:fs/promises";
import path from "node:path";

// <https://github.com/neutralinojs/neutralinojs/issues/909>.
const neutralino = () => {
  let config;

  return {
    name: "neutralino",

    configResolved (resolvedConfig) {
      config = resolvedConfig;
    },

    async transformIndexHtml (html) {
      if (config.mode === "development") {
        const auth_info_file = await fs.readFile(path.join(__dirname, "../.tmp", "auth_info.json"), {
          encoding: "utf-8"
        });
        const auth_info = JSON.parse(auth_info_file);
        const port = auth_info.port;
        return html.replace(
          /(http:\/\/localhost.*)?__neutralino_globals.js/,
          `http://localhost:${port}/__neutralino_globals.js`
        );
      }
      return html;
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5678,
    strictPort: true
  },
  plugins: [
    neutralino(),
    react(),
    jsconfigPaths()
  ],
})
