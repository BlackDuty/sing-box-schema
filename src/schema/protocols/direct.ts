import { z } from "zod";
import { DialerOptions, ListenOptions, Network } from "@/schema/shared";

// #region Inbound
export const DirectInboundOptions = z.object({
  type: z.literal("direct"),
  tag: z.string().optional(),
  network: Network.optional(),
  override_address: z.string().optional(),
  override_port: z.number().int().optional(),

  ...ListenOptions.shape,
});
export type DirectInboundOptions = z.infer<typeof DirectInboundOptions>;
// #endregion

// #region Outbound
export const DirectOutboundOptions = z.object({
  type: z.literal("direct"),
  tag: z.string().optional(),
  override_address: z.string().optional(),
  override_port: z.number().int().optional(),

  ...DialerOptions.shape,
});
export type DirectOutboundOptions = z.infer<typeof DirectOutboundOptions>;
// #endregion
