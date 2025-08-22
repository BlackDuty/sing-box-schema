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

// #region Shared
export const VMessUser = z.object({
  name: z.string(),
  uuid: z.uuid(),
  alterId: z.number().int().optional().meta({
    description: "Alter ID.",
    description_zh: "Alter ID。",
  }),
});
// #endregion

// #region Inbound
export const VMessInboundOptions = z
  .object({
    type: z.literal("vmess"),
    tag: z.string().optional(),
    users: z.array(VMessUser).optional().meta({
      description: "VMess users.",
      description_zh: "VMess 用户。",
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
    id: "VMessInboundOptions",
    title: "VMess Inbound",
    title_zh: "VMess 入站",
  });
export type VMessInboundOptions = z.infer<typeof VMessInboundOptions>;
// #endregion

// #region Outbound
export const VMessOutboundOptions = z
  .object({
    type: z.literal("vmess"),
    tag: z.string().optional(),
    uuid: z.uuid().meta({
      description: "The VMess user id.",
      description_zh: "VMess 用户 ID。",
    }),
    security: z.string().meta({
      description: "Encryption methods.",
      description_zh: "加密方法。",
    }),
    alter_id: z.number().int().optional().meta({
      description: "Alter ID.",
      description_zh: "Alter ID。",
    }),
    global_padding: z.boolean().optional().meta({
      description:
        "Protocol parameter. Will waste traffic randomly if enabled.",
      description_zh: "协议参数。如果启用会随机浪费流量。",
    }),
    authenticated_length: z.boolean().optional().meta({
      description: "Protocol parameter. Enable length block encryption.",
      description_zh: "协议参数。启用长度块加密。",
    }),
    network: Network.optional().meta({
      description: "Enabled network.",
      description_zh: "启用的网络协议。",
    }),
    tls: OutboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),
    packet_encoding: z.string().optional().meta({
      description: "UDP packet encoding.",
      description_zh: "UDP 包编码。",
    }),
    multiplex: OutboundMultiplexOptions.optional().meta({
      description: "Multiplex configuration.",
      description_zh: "多路复用配置。",
    }),
    transport: V2RayTransportOptions.optional().meta({
      description: "V2Ray Transport configuration.",
      description_zh: "V2Ray 传输配置。",
    }),

    ...DialerOptions.shape,
    ...ServerOptions.shape,
  })
  .meta({
    id: "VMessOutboundOptions",
    title: "VMess Outbound",
    title_zh: "VMess 出站",
  });
export type VMessOutboundOptions = z.infer<typeof VMessOutboundOptions>;
// #endregion
