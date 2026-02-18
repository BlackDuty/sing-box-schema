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
    description: "VLESS Sub-protocol. Available values: `xtls-rprx-vision`.",
    description_zh: "VLESS 子协议。可用值：`xtls-rprx-vision`。",
  }),
});

export const VLESSInboundOptions = z
  .object({
    type: z.literal("vless"),
    tag: z.string().optional(),
    users: z.array(VLESSUser).optional().meta({
      description: "VLESS users (required).",
      description_zh: "VLESS 用户（必填）。",
    }),
    tls: InboundTLSOptions.optional().meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#inbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#inbound)。",
    }),
    multiplex: InboundMultiplexOptions.optional().meta({
      description:
        "See [Multiplex](/configuration/shared/multiplex#inbound) for details.",
      description_zh:
        "参阅 [多路复用](/zh/configuration/shared/multiplex#inbound)。",
    }),
    transport: V2RayTransportOptions.optional().meta({
      description:
        "V2Ray Transport configuration, see [V2Ray Transport](/configuration/shared/v2ray-transport/).",
      description_zh:
        "V2Ray 传输配置，参阅 [V2Ray 传输层](/zh/configuration/shared/v2ray-transport/)。",
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
      description: "VLESS user id (required).",
      description_zh: "VLESS 用户 ID（必填）。",
    }),
    flow: z.string().optional().meta({
      description: "VLESS Sub-protocol. Available values: `xtls-rprx-vision`.",
      description_zh: "VLESS 子协议。可用值：`xtls-rprx-vision`。",
    }),
    network: Network.optional().meta({
      description:
        "Enabled network. One of `tcp` `udp`. Both is enabled by default.",
      description_zh: "启用的网络协议。`tcp` 或 `udp`。默认所有。",
    }),
    tls: OutboundTLSOptions.optional().meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#outbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#outbound)。",
    }),
    multiplex: OutboundMultiplexOptions.optional().meta({
      description:
        "See [Multiplex](/configuration/shared/multiplex#outbound) for details.",
      description_zh:
        "参阅 [多路复用](/zh/configuration/shared/multiplex#outbound)。",
    }),
    transport: V2RayTransportOptions.optional().meta({
      description:
        "V2Ray Transport configuration, see [V2Ray Transport](/configuration/shared/v2ray-transport/).",
      description_zh:
        "V2Ray 传输配置，参阅 [V2Ray 传输层](/zh/configuration/shared/v2ray-transport/)。",
    }),
    packet_encoding: z.string().optional().meta({
      description:
        "UDP packet encoding, xudp is used by default. Supported values: (none) disables it, packetaddr is supported by v2ray 5+, and xudp is supported by xray.",
      description_zh:
        "UDP 包编码，默认使用 xudp。可选值：(空) 禁用，packetaddr 由 v2ray 5+ 支持，xudp 由 xray 支持。",
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
