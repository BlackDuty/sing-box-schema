import { z } from "zod";
import { ListenOptions } from "@/schema/shared";

/**
 * Resolved service is a fake systemd-resolved DBUS service.
 */
export const ResolvedServiceOptions = z
  .object({
    type: z.literal("resolved"),
    tag: z.string().optional(),
    /**
     * Listen address.
     * @default '127.0.0.53'
     */
    listen: z.string().optional().describe("Listen address."),
    /**
     * Listen port.
     * @default 53
     */
    listen_port: z.number().int().optional().describe("Listen port."),
  })
  .merge(ListenOptions);

export type ResolvedServiceOptions = z.infer<typeof ResolvedServiceOptions>;
