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
// #endregion

// #region Outbound
export const DirectOutboundOptions = z.object({
  type: z.literal("direct"),
  tag: z.string().optional(),
  override_address: z.string().optional(),
  override_port: z.number().int().optional(),

  ...DialerOptions.shape,
});
// #endregion
