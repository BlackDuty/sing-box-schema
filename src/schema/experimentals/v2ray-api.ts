import { z } from "zod";
import { listableString } from "@/utils";

const V2RayAPIStatsOptions = z.object({
  /**
   * Enable statistics service.
   */
  enabled: z.boolean().optional().meta({
    description: "Enable statistics service.",
    description_zh: "启用统计服务。",
  }),
  /**
   * Inbound list to count traffic.
   */
  inbounds: listableString.optional().meta({
    description: "Inbound list to count traffic.",
    description_zh: "统计流量的入站列表。",
  }),
  /**
   * Outbound list to count traffic.
   */
  outbounds: listableString.optional().meta({
    description: "Outbound list to count traffic.",
    description_zh: "统计流量的出站列表。",
  }),
  /**
   * User list to count traffic.
   */
  users: listableString.optional().meta({
    description: "User list to count traffic.",
    description_zh: "统计流量的用户列表。",
  }),
});

/**
 * V2Ray API settings.
 */
export const V2RayAPIOptions = z
  .object({
    /**
     * gRPC API listening address. V2Ray API will be disabled if empty.
     */
    listen: z.string().optional().meta({
      description:
        "gRPC API listening address. V2Ray API will be disabled if empty.",
      description_zh: "gRPC API 监听地址。如果为空，则禁用 V2Ray API。",
    }),
    /**
     * Traffic statistics service settings.
     */
    stats: V2RayAPIStatsOptions.optional().meta({
      description: "Traffic statistics service settings.",
      description_zh: "流量统计服务设置。",
    }),
  })
  .meta({
    id: "V2RayAPIOptions",
    title: "V2Ray API",
    title_zh: "V2Ray API",
  });

export type V2RayAPIOptions = z.infer<typeof V2RayAPIOptions>;
