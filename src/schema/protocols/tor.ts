import { z } from "zod";
import { DialerOptions } from "@/schema/shared";

// #region Outbound
export const TorOutboundOptions = z.object({
  type: z.literal("tor"),
  tag: z.string().optional(),
  executable_path: z.string().optional(),
  extra_args: z.array(z.string()).optional(),
  data_directory: z.string().optional(),
  torrc: z.record(z.string(), z.any()).optional(),

  ...DialerOptions.shape,
});
export type TorOutboundOptions = z.infer<typeof TorOutboundOptions>;
// #endregion
