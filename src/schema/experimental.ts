import { z } from "zod";
import { CacheFileOptions } from "./experimentals/cache-file";
import { ClashAPIOptions } from "./experimentals/clash-api";
import { V2RayAPIOptions } from "./experimentals/v2ray-api";

/**
 * Experimental features settings.
 */
export const ExperimentalOptions = z.object({
  /**
   * Cache file settings.
   */
  cache_file: CacheFileOptions.optional().describe("Cache file settings."),
  /**
   * Clash API settings.
   */
  clash_api: ClashAPIOptions.optional().describe("Clash API settings."),
  /**
   * V2Ray API settings.
   */
  v2ray_api: V2RayAPIOptions.optional().describe("V2Ray API settings."),
});

export type ExperimentalOptions = z.infer<typeof ExperimentalOptions>;
