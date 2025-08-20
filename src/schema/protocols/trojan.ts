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
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),
    fallback: ServerOptions.optional().meta({
      description: "Fallback server configuration.",
      description_zh: "回退服务器配置。",
    }),
    fallback_for_alpn: z.record(z.string(), ServerOptions).optional().meta({
      description: "Fallback server configuration for specified ALPN.",
      description_zh: "为 ALPN 指定回退服务器配置。",
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
      description: "The Trojan password.",
      description_zh: "Trojan 密码。",
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
