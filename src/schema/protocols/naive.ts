import { z } from "zod";
import { ListenOptions, InboundTLSOptions, Network } from "../shared";

const NaiveUser = z.object({
  username: z.string(),
  password: z.string(),
});

// #region Inbound
export const NaiveInboundOptions = z.object({
  type: z.literal("naive"),
  tag: z.string().optional(),
  /**
   * Listen network.
   */
  network: Network.optional().describe("Listen network."),
  /**
   * Naive users.
   */
  users: z.array(NaiveUser).describe("Naive users."),
  /**
   * TLS configuration.
   */
  tls: InboundTLSOptions.optional().describe("TLS configuration."),

  /**
   * Listen options fields.
   */
  ...ListenOptions.shape,
});
// #endregion

export type NaiveInboundOptions = z.infer<typeof NaiveInboundOptions>;
