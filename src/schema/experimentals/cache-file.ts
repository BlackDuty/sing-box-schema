import { z } from "zod";

/**
 * Cache file settings.
 */
export const CacheFileOptions = z.object({
  /**
   * Enable cache file.
   */
  enabled: z.boolean().optional().describe("Enable cache file."),
  /**
   * Path to the cache file.
   * @default 'cache.db'
   */
  path: z.string().optional().describe("Path to the cache file."),
  /**
   * Identifier in the cache file.
   */
  cache_id: z.string().optional().describe("Identifier in the cache file."),
  /**
   * Store fakeip in the cache file.
   */
  store_fakeip: z
    .boolean()
    .optional()
    .describe("Store fakeip in the cache file."),
  /**
   * Store rejected DNS response cache in the cache file.
   */
  store_rdrc: z
    .boolean()
    .optional()
    .describe("Store rejected DNS response cache in the cache file."),
  /**
   * Timeout of rejected DNS response cache.
   * @default '7d'
   */
  rdrc_timeout: z
    .string()
    .optional()
    .describe("Timeout of rejected DNS response cache."),
});

export type CacheFileOptions = z.infer<typeof CacheFileOptions>;
