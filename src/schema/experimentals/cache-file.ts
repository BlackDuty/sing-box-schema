import { z } from "zod";

/**
 * Cache file settings.
 */
export const CacheFileOptions = z
  .object({
    /**
     * Enable cache file.
     */
    enabled: z.boolean().optional().meta({
      description: "Enable cache file.",
      description_zh: "启用缓存文件。",
    }),
    /**
     * Path to the cache file.
     * @default 'cache.db'
     */
    path: z.string().optional().meta({
      description: "Path to the cache file.",
      description_zh: "缓存文件路径。",
    }),
    /**
     * Identifier in the cache file.
     */
    cache_id: z.string().optional().meta({
      description: "Identifier in the cache file.",
      description_zh: "缓存文件中的标识符。",
    }),
    /**
     * Store fakeip in the cache file.
     */
    store_fakeip: z.boolean().optional().meta({
      description: "Store fakeip in the cache file.",
      description_zh: "将 fakeip 存储在缓存文件中。",
    }),
    /**
     * Store rejected DNS response cache in the cache file.
     */
    store_rdrc: z.boolean().optional().meta({
      description: "Store rejected DNS response cache in the cache file.",
      description_zh: "将拒绝的 DNS 响应缓存存储在缓存文件中。",
    }),
    /**
     * Timeout of rejected DNS response cache.
     * @default '7d'
     */
    rdrc_timeout: z.string().optional().meta({
      description: "Timeout of rejected DNS response cache.",
      description_zh: "拒绝的 DNS 响应缓存超时。",
    }),
  })
  .meta({
    id: "CacheFileOptions",
    title: "Cache File",
    title_zh: "缓存文件",
  });

export type CacheFileOptions = z.infer<typeof CacheFileOptions>;
