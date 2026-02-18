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
    description:
      "Alter ID. 0 disables the legacy protocol, >0 enables it, and >1 is unused (same as 1).",
    description_zh:
      "Alter ID。0 禁用旧协议，>0 启用旧协议，>1 未使用（行为同 1）。",
  }),
});
// #endregion

// #region Inbound
export const VMessInboundOptions = z
  .object({
    type: z.literal("vmess"),
    tag: z.string().optional(),
    users: z.array(VMessUser).optional().meta({
      description:
        "VMess users. Alter ID 0 disables legacy protocol, >0 enables legacy protocol, and legacy protocol support is for compatibility only (alterId > 1 is not recommended).",
      description_zh:
        "VMess 用户。Alter ID 0 禁用旧协议，>0 启用旧协议。旧协议支持仅用于兼容性，alterId > 1 不建议使用。",
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
      description: "The VMess user id (required).",
      description_zh: "VMess 用户 ID（必填）。",
    }),
    security: z.string().meta({
      description:
        "Encryption methods: auto, none, zero, aes-128-gcm, chacha20-poly1305. Legacy encryption methods: aes-128-ctr.",
      description_zh:
        "加密方法：auto、none、zero、aes-128-gcm、chacha20-poly1305。旧加密方法：aes-128-ctr。",
    }),
    alter_id: z.number().int().optional().meta({
      description:
        "Alter ID. 0 uses AEAD protocol, 1 enables legacy protocol, and >1 is unused (same as 1).",
      description_zh:
        "Alter ID。0 使用 AEAD 协议，1 启用旧协议，>1 未使用（行为同 1）。",
    }),
    global_padding: z.boolean().optional().meta({
      description:
        "Protocol parameter. Will waste traffic randomly if enabled (enabled by default in v2ray and cannot be disabled).",
      description_zh:
        "协议参数。如果启用会随机浪费流量（在 v2ray 中默认启用且无法禁用）。",
    }),
    authenticated_length: z.boolean().optional().meta({
      description: "Protocol parameter. Enable length block encryption.",
      description_zh: "协议参数。启用长度块加密。",
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
    packet_encoding: z.string().optional().meta({
      description:
        "UDP packet encoding. Supported values: (none) disabled, packetaddr supported by v2ray 5+, xudp supported by xray.",
      description_zh:
        "UDP 包编码。可选值：(空) 禁用，packetaddr 由 v2ray 5+ 支持，xudp 由 xray 支持。",
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
