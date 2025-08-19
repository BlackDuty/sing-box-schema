import { z } from "zod";
import { DialerOptions, Network, ServerOptions } from "@/schema/shared";

export const ShadowsocksROutboundOptions = z
  .object({
    type: z.literal("shadowsocksr"),
    tag: z.string().optional(),
    method: z.string(),
    password: z.string(),
    obfs: z.string().optional(),
    obfs_param: z.string().optional(),
    protocol: z.string().optional(),
    protocol_param: z.string().optional(),
    network: Network.optional(),
  })
  .extend(DialerOptions)
  .extend(ServerOptions);
