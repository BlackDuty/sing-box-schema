import { z } from "zod";
import { ListenOptions, Network } from "../shared";

export const TProxyInboundOptions = z
  .object({
    type: z.literal("tproxy"),
    tag: z.string().optional(),
    network: Network.optional().meta({
      description: "Listen network, one of `tcp` `udp`. Both if empty.",
      description_zh: "监听的网络协议，`tcp` `udp` 之一。默认所有。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "TProxyInboundOptions",
    title: "TProxy Inbound",
    title_zh: "TProxy 入站",
  });

export type TProxyInboundOptions = z.infer<typeof TProxyInboundOptions>;
