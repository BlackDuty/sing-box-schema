import { z } from "zod";
import { DialerOptions, ListenOptions, Network } from "@/schema/shared";

// #region Inbound
export const DirectInboundOptions = z
  .object({
    type: z.literal("direct"),
    tag: z.string().optional(),
    network: Network.optional().meta({
      description: "Listen network, one of `tcp` `udp`.",
      description_zh: "监听的网络协议，`tcp` `udp` 之一。",
    }),
    override_address: z.string().optional().meta({
      description: "Override the connection destination address.",
      description_zh: "覆盖连接目标地址。",
    }),
    override_port: z.number().int().optional().meta({
      description: "Override the connection destination port.",
      description_zh: "覆盖连接目标端口。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "DirectInboundOptions",
    title: "Direct Inbound",
    title_zh: "Direct 入站",
    description: "Direct inbound is a tunnel server.",
    description_zh: "Direct 入站是一个隧道服务器。",
  });
export type DirectInboundOptions = z.infer<typeof DirectInboundOptions>;
// #endregion

// #region Outbound
export const DirectOutboundOptions = z
  .object({
    type: z.literal("direct"),
    tag: z.string().optional(),
    override_address: z.string().optional().meta({
      description: "Override the connection destination address.",
      description_zh: "覆盖连接目标地址。",
      deprecated: true,
    }),
    override_port: z.number().int().optional().meta({
      description: "Override the connection destination port.",
      description_zh: "覆盖连接目标端口。",
      deprecated: true,
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "DirectOutboundOptions",
    title: "Direct Outbound",
    title_zh: "Direct 出站",
    description: "Direct outbound send requests directly.",
    description_zh: "Direct 出站直接发送请求。",
  });
export type DirectOutboundOptions = z.infer<typeof DirectOutboundOptions>;
// #endregion
