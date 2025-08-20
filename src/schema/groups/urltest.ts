import { z } from "zod";

// #region Outbound
export const URLTestOutboundSchema = z.object({
  type: z.literal("urltest"),
  tag: z.string(),
  outbounds: z.array(z.string()),
  url: z.string().url().optional(),
  interval: z.string().optional(),
  tolerance: z.number().int().optional(),
  idle_timeout: z.string().optional(),
  interrupt_exist_connections: z.boolean().optional(),
});
// #endregion
