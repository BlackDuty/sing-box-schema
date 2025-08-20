import { z } from "zod";
import { ListenOptions, Network } from "../shared";

export const TProxyInboundOptions = z.object({
  type: z.literal("tproxy"),
  tag: z.string().optional(),
  network: Network.optional().describe(
    "Listen network, one of `tcp` `udp`. Both if empty."
  ),

  ...ListenOptions.shape,
});

export type TProxyInboundOptions = z.infer<typeof TProxyInboundOptions>;
