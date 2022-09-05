// @ts-ignore
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import commonjs from "rollup-plugin-commonjs"; // commonjs模块转换插件
import react from "react";

import pkg from "./package.json";

export default [
  {
    input: "src/index.ts", // 入口文件
    output: [
      {
        file: pkg.main, // 输出文件名称
        format: "cjs", // 输出模块格式
        sourcemap: false, // 是否输出sourcemap
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            module: "ESNext",
          },
        },
        useTsconfigDeclarationDir: true, // 使用tsconfig中的声明文件目录配置
      }),
      commonjs({
        include: "node_modules/**",
        namedExports: {
          react: Object.keys(react),
        },
      }),
    ],
  },
  {
    input: "src/index.ts", // 入口文件
    output: [
      {
        file: "lib/index.d.ts", // 输出文件名称
        format: "es", // 输出模块格式
        sourcemap: false, // 是否输出sourcemap
      },
      {
        file: "es/index.d.ts", // 输出文件名称
        format: "es", // 输出模块格式
        sourcemap: false, // 是否输出sourcemap
      },
    ],
    plugins: [dts()],
  },
];
