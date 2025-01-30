import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import checker from "vite-plugin-checker";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });


export default defineConfig({
  resolve: {
    alias: {
      "@app": "/src/app",
      "@entities": "/src/entities",
      "@shared": "/src/shared",
      "@pages": "/src/pages",
      "@features": "/src/features", 
      "@widgets": "/src/widgets",
      "@providers": "/src/providers",
    },
  },
  server: {
    open: true,
    port: 5173,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "tailwindcss";',
      },
    },
  },
  plugins: [
    checker({
      typescript: {
        tsconfigPath: "tsconfig.json",
      },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
    react(),
    libInjectCss(),
    dts(),
  ],
});
