import { z } from "zod";

// #region Outbound
export const SelectorOutbound = z.object({
  type: z.literal("selector"),
  tag: z.string(),
  outbounds: z.array(z.string()),
  default: z.string().optional(),
  interrupt_exist_connections: z.boolean().optional(),
});
export type SelectorOutbound = z.infer<typeof SelectorOutbound>;
// #endregion
