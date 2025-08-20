import { z } from "zod";

// #region Outbound
export const SelectorOutboundSchema = z.object({
  type: z.literal("selector"),
  tag: z.string(),
  outbounds: z.array(z.string()),
  default: z.string().optional(),
  interrupt_exist_connections: z.boolean().optional(),
});
// #endregion
