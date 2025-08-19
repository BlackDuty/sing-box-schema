import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    minify: true,
    platform: "neutral",
    format: ["cjs", "esm"],
    dts: false,
    sourcemap: false,
    clean: true,
  },
]);
