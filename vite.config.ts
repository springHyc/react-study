import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { TransformOptions } from "@babel/core";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // 使用函数形式的 babel 选项，根据文件 ID 条件性地应用插件
      babel: (id: string): TransformOptions => {
        const plugins: NonNullable<TransformOptions["plugins"]> = [];

        // 只对 React19Component.tsx 文件应用 React Compiler
        if (id.includes("React19Component.tsx")) {
          plugins.push(["babel-plugin-react-compiler"]);
        }

        // 只对 Component4.tsx 文件应用 babel-plugin-antd-style
        if (id.includes("Component4.tsx")) {
          plugins.push([
            "babel-plugin-antd-style",
            { libraryName: "antd-style" },
          ]);
        }

        return plugins.length > 0 ? { plugins } : {};
      },
    }),
  ],
  build: {
    sourcemap: true, // 生成 source map 用于调试
  },
  server: {
    port: 5018,
    host: true, // 允许外部访问
    open: true,
  },
});
