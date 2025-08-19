import { z } from "zod";
import { DialerOptions, ListenOptions } from "@/schema/shared";

// #region Inbound
export const DirectInboundOptions = z
  .object({
    type: z.literal("direct"),
    tag: z.string().optional(),
    network: z.array(z.string()).optional(),
    override_address: z.string().optional(),
    override_port: z.number().int().optional(),
  })
  .extend(ListenOptions);
// #endregion

// #region Outbound
export const DirectOutboundOptions = z
  .object({
    type: z.literal("direct"),
    tag: z.string().optional(),
    override_address: z.string().optional(),
    override_port: z.number().int().optional(),
  })
  .extend(DialerOptions);
// #endregion
