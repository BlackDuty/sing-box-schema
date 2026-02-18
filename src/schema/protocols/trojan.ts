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
export const TrojanUser = z.object({
  name: z.string(),
  password: z.string(),
});
// #endregion

// #region Inbound
export const TrojanInboundOptions = z
  .object({
    type: z.literal("trojan"),
    tag: z.string().optional(),
    users: z.array(TrojanUser).optional().meta({
      description: "Trojan users.",
      description_zh: "Trojan 用户。",
    }),
    tls: InboundTLSOptions.optional().meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#inbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#inbound)。",
    }),
    fallback: ServerOptions.optional().meta({
      description:
        "Fallback server configuration. Disabled if `fallback` and `fallback_for_alpn` are empty.",
      description_zh:
        "回退服务器配置。如果 `fallback` 和 `fallback_for_alpn` 为空，则禁用回退。",
    }),
    fallback_for_alpn: z.record(z.string(), ServerOptions).optional().meta({
      description:
        "Fallback server configuration for specified ALPN. If not empty, TLS fallback requests with ALPN not in this table will be rejected.",
      description_zh:
        "为 ALPN 指定回退服务器配置。如果不为空，ALPN 不在此列表中的 TLS 回退请求将被拒绝。",
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
    id: "TrojanInboundOptions",
    title: "Trojan Inbound",
    title_zh: "Trojan 入站",
  });
export type TrojanInboundOptions = z.infer<typeof TrojanInboundOptions>;
// #endregion

// #region Outbound
export const TrojanOutboundOptions = z
  .object({
    type: z.literal("trojan"),
    tag: z.string().optional(),
    password: z.string().meta({
      description: "The Trojan password (required).",
      description_zh: "Trojan 密码（必填）。",
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

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "TrojanOutboundOptions",
    title: "Trojan Outbound",
    title_zh: "Trojan 出站",
  });
export type TrojanOutboundOptions = z.infer<typeof TrojanOutboundOptions>;
// #endregion
