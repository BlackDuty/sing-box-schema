import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    minify: false,
    platform: "neutral",
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: false,
    clean: true,
  },
]);
