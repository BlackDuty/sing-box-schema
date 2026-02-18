import { z } from "zod";
import { DebugOptions } from "./debug";
import { CacheFileOptions } from "./experimentals/cache-file";
import { ClashAPIOptions } from "./experimentals/clash-api";
import { V2RayAPIOptions } from "./experimentals/v2ray-api";

/**
 * Experimental features settings.
 */
export const ExperimentalOptions = z
  .object({
    /**
     * Cache file settings.
     */
    cache_file: CacheFileOptions.optional().meta({
      description: "Cache file settings.",
      description_zh: "缓存文件设置。",
    }),
    /**
     * Clash API settings.
     */
    clash_api: ClashAPIOptions.optional().meta({
      description: "Clash API settings.",
      description_zh: "Clash API 设置。",
    }),
    /**
     * V2Ray API settings.
     */
    v2ray_api: V2RayAPIOptions.optional().meta({
      description: "V2Ray API settings.",
      description_zh: "V2Ray API 设置。",
    }),
    debug: DebugOptions.optional().meta({
      description: "Debug settings.",
      description_zh: "调试设置。",
    }),
  })
  .meta({
    id: "ExperimentalOptions",
    title: "Experimental",
    title_zh: "实验性选项",
    description:
      "Experimental features such as cache_file, Clash API, V2Ray API, and debug options.",
    description_zh:
      "实验性功能设置，如 cache_file、Clash API、V2Ray API 与 debug 选项。",
  });

export type ExperimentalOptions = z.infer<typeof ExperimentalOptions>;
