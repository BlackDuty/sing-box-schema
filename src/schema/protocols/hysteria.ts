import { z } from "zod";
import {
  DialerOptions,
  InboundTLSOptions,
  ListenOptions,
  Network,
  OutboundTLSOptions,
  ServerOptions,
} from "@/schema/shared";

// #region Shared
export const HysteriaUser = z.object({
  name: z.string().optional(),
  auth: z.array(z.number()).optional().meta({
    description: "Authentication password, in base64.",
    description_zh: "base64 编码的认证密码。",
  }),
  auth_str: z.string().optional().meta({
    description: "Authentication password.",
    description_zh: "认证密码。",
  }),
});
// #endregion

// #region Inbound
export const HysteriaInboundOptions = z
  .object({
    type: z.literal("hysteria"),
    tag: z.string().optional(),
    up: z.string().optional(),
    up_mbps: z.number().int().optional(),
    down: z.string().optional(),
    down_mbps: z.number().int().optional(),
    obfs: z.string().optional().meta({
      description: "Obfuscated password.",
      description_zh: "混淆密码。",
    }),
    users: z.array(HysteriaUser).optional().meta({
      description: "Hysteria users",
      description_zh: "Hysteria 用户",
    }),
    recv_window_conn: z.number().int().optional().meta({
      description:
        "The QUIC stream-level flow control window for receiving data.",
      description_zh: "用于接收数据的 QUIC 流级流控制窗口。",
    }),
    recv_window_client: z.number().int().optional().meta({
      description:
        "The QUIC connection-level flow control window for receiving data.",
      description_zh: "用于接收数据的 QUIC 连接级流控制窗口。",
    }),
    max_conn_client: z.number().int().optional().meta({
      description:
        "The maximum number of QUIC concurrent bidirectional streams that a peer is allowed to open.",
      description_zh: "允许对等点打开的 QUIC 并发双向流的最大数量。",
    }),
    disable_mtu_discovery: z.boolean().optional().meta({
      description: "Disables Path MTU Discovery (RFC 8899).",
      description_zh: "禁用路径 MTU 发现 (RFC 8899)。",
    }),
    tls: InboundTLSOptions.optional(),

    ...ListenOptions.shape,
  })
  .meta({
    id: "HysteriaInboundOptions",
    title: "Hysteria Inbound",
    title_zh: "Hysteria 入站",
  });
export type HysteriaInboundOptions = z.infer<typeof HysteriaInboundOptions>;
// #endregion

// #region Outbound
export const HysteriaOutboundOptions = z
  .object({
    type: z.literal("hysteria"),
    tag: z.string().optional(),
    hop_interval: z.string().optional().meta({
      description: "Port hopping interval.",
      description_zh: "端口跳跃间隔。",
    }),
    up: z.string().optional(),
    up_mbps: z.number().int().optional(),
    down: z.string().optional(),
    down_mbps: z.number().int().optional(),
    obfs: z.string().optional().meta({
      description: "Obfuscated password.",
      description_zh: "混淆密码。",
    }),
    auth: z.array(z.number()).optional().meta({
      description: "Authentication password, in base64.",
      description_zh: "base64 编码的认证密码。",
    }),
    auth_str: z.string().optional().meta({
      description: "Authentication password.",
      description_zh: "认证密码。",
    }),
    recv_window_conn: z.number().int().optional().meta({
      description:
        "The QUIC stream-level flow control window for receiving data.",
      description_zh: "用于接收数据的 QUIC 流级流控制窗口。",
    }),
    recv_window: z.number().int().optional().meta({
      description:
        "The QUIC connection-level flow control window for receiving data.",
      description_zh: "用于接收数据的 QUIC 连接级流控制窗口。",
    }),
    disable_mtu_discovery: z.boolean().optional().meta({
      description: "Disables Path MTU Discovery (RFC 8899).",
      description_zh: "禁用路径 MTU 发现 (RFC 8899)。",
    }),
    network: Network.optional().meta({
      description: "Enabled network",
      description_zh: "启用的网络协议。",
    }),
    tls: OutboundTLSOptions.optional(),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "HysteriaOutboundOptions",
    title: "Hysteria Outbound",
    title_zh: "Hysteria 出站",
  });
export type HysteriaOutboundOptions = z.infer<typeof HysteriaOutboundOptions>;
// #endregion
