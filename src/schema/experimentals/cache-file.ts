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
      description: "Path to the cache file. `cache.db` will be used if empty.",
      description_zh: "缓存文件路径，默认使用 `cache.db`。",
    }),
    /**
     * Identifier in the cache file.
     */
    cache_id: z.string().optional().meta({
      description:
        "Identifier in the cache file. If not empty, configuration specified data will use a separate store keyed by it.",
      description_zh:
        "缓存文件中的标识符。如果不为空，配置特定的数据将使用由其键控的单独存储。",
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
      description:
        "Store rejected DNS response cache in the cache file. The check results of [Address filter DNS rule items](/configuration/dns/rule/#address-filter-fields) will be cached until expiration.",
      description_zh:
        "将拒绝的 DNS 响应缓存存储在缓存文件中。[地址筛选 DNS 规则项](/zh/configuration/dns/rule/#_3) 的检查结果将被缓存至过期。",
    }),
    /**
     * Timeout of rejected DNS response cache.
     * @default '7d'
     */
    rdrc_timeout: z.string().optional().meta({
      description:
        "Timeout of rejected DNS response cache. `7d` is used by default.",
      description_zh: "拒绝的 DNS 响应缓存超时。默认使用 `7d`。",
    }),
  })
  .meta({
    id: "CacheFileOptions",
    title: "Cache File",
    title_zh: "缓存文件",
    description:
      "Cache file settings control enabling the cache, file path, cache id, fakeip storage, rejected DNS response cache, and rdrc timeout.",
    description_zh:
      "缓存文件设置控制启用、文件路径、缓存 ID、fakeip 存储、拒绝的 DNS 响应缓存以及 rdrc 超时。",
  });

export type CacheFileOptions = z.infer<typeof CacheFileOptions>;
