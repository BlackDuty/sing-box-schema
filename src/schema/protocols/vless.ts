import { z } from "zod";
import {
  DialerOptions,
  InboundMultiplexOptions,
  InboundTLSOptions,
  ListenOptions,
  Network,
  OutboundMultiplexOptions,
  OutboundTLSOptions,
  ServerOptions,
  V2RayTransportOptions,
} from "@/schema/shared";

export const VLESSUser = z.object({
  name: z.string(),
  uuid: z.uuid(),
  flow: z.string().optional().meta({
    description: "VLESS Sub-protocol.",
    description_zh: "VLESS 子协议。",
  }),
});

export const VLESSInboundOptions = z
  .object({
    type: z.literal("vless"),
    tag: z.string().optional(),
    users: z.array(VLESSUser).optional().meta({
      description: "VLESS users.",
      description_zh: "VLESS 用户。",
    }),
    tls: InboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),
    multiplex: InboundMultiplexOptions.optional().meta({
      description: "Multiplex configuration.",
      description_zh: "多路复用配置。",
    }),
    transport: V2RayTransportOptions.optional().meta({
      description: "V2Ray Transport configuration.",
      description_zh: "V2Ray 传输配置。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "VLESSInboundOptions",
    title: "VLESS Inbound",
    title_zh: "VLESS 入站",
  });
export type VLESSInboundOptions = z.infer<typeof VLESSInboundOptions>;

export const VLESSOutboundOptions = z
  .object({
    type: z.literal("vless"),
    tag: z.string().optional(),
    uuid: z.uuid().meta({
      description: "VLESS user id.",
      description_zh: "VLESS 用户 ID。",
    }),
    flow: z.string().optional().meta({
      description: "VLESS Sub-protocol.",
      description_zh: "VLESS 子协议。",
    }),
    network: Network.optional().meta({
      description: "Enabled network.",
      description_zh: "启用的网络协议。",
    }),
    tls: OutboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),
    multiplex: OutboundMultiplexOptions.optional().meta({
      description: "Multiplex configuration.",
      description_zh: "多路复用配置。",
    }),
    transport: V2RayTransportOptions.optional().meta({
      description: "V2Ray Transport configuration.",
      description_zh: "V2Ray 传输配置。",
    }),
    packet_encoding: z.string().optional().meta({
      description: "UDP packet encoding, xudp is used by default.",
      description_zh: "UDP 包编码，默认使用 xudp。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "VLESSOutboundOptions",
    title: "VLESS Outbound",
    title_zh: "VLESS 出站",
  });
export type VLESSOutboundOptions = z.infer<typeof VLESSOutboundOptions>;
