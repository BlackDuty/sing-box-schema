import { z } from "zod";
import { listable } from "@/utils";

const V2RayAPIStatsOptions = z.object({
  /**
   * Enable statistics service.
   */
  enabled: z.boolean().optional().describe("Enable statistics service."),
  /**
   * Inbound list to count traffic.
   */
  inbounds: listable(z.string())
    .optional()
    .describe("Inbound list to count traffic."),
  /**
   * Outbound list to count traffic.
   */
  outbounds: listable(z.string())
    .optional()
    .describe("Outbound list to count traffic."),
  /**
   * User list to count traffic.
   */
  users: listable(z.string())
    .optional()
    .describe("User list to count traffic."),
});

/**
 * V2Ray API settings.
 */
export const V2RayAPIOptions = z.object({
  /**
   * gRPC API listening address. V2Ray API will be disabled if empty.
   */
  listen: z
    .string()
    .optional()
    .describe(
      "gRPC API listening address. V2Ray API will be disabled if empty."
    ),
  /**
   * Traffic statistics service settings.
   */
  stats: V2RayAPIStatsOptions.optional().describe(
    "Traffic statistics service settings."
  ),
});

export type V2RayAPIOptions = z.infer<typeof V2RayAPIOptions>;
