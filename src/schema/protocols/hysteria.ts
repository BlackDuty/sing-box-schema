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
  auth: z.string().optional().meta({
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
    up: z.string().optional().meta({
      description:
        "Upstream bandwidth limit, format `[Integer] [Unit]` (e.g. `100 Mbps`). Supported units: bps, Bps, Kbps, KBps, Mbps, MBps, Gbps, GBps, Tbps, TBps.",
      description_zh:
        "上行带宽限制，格式 `[Integer] [Unit]`（例如 `100 Mbps`）。支持的单位：bps, Bps, Kbps, KBps, Mbps, MBps, Gbps, GBps, Tbps, TBps。",
    }),
    up_mbps: z.number().int().optional().meta({
      description: "Max upstream bandwidth, in Mbps. Required.",
      description_zh: "以 Mbps 为单位的上行带宽最大值。必填。",
    }),
    down: z.string().optional().meta({
      description:
        "Downstream bandwidth limit, format `[Integer] [Unit]` (e.g. `100 Mbps`). Supported units: bps, Bps, Kbps, KBps, Mbps, MBps, Gbps, GBps, Tbps, TBps.",
      description_zh:
        "下行带宽限制，格式 `[Integer] [Unit]`（例如 `100 Mbps`）。支持的单位：bps, Bps, Kbps, KBps, Mbps, MBps, Gbps, GBps, Tbps, TBps。",
    }),
    down_mbps: z.number().int().optional().meta({
      description: "Max downstream bandwidth, in Mbps. Required.",
      description_zh: "以 Mbps 为单位的下行带宽最大值。必填。",
    }),
    obfs: z.string().optional().meta({
      description: "Obfuscated password.",
      description_zh: "混淆密码。",
    }),
    users: z.array(HysteriaUser).optional().meta({
      description: "Hysteria users. Required.",
      description_zh: "Hysteria 用户。必填。",
    }),
    recv_window_conn: z.number().int().optional().meta({
      description:
        "The QUIC stream-level flow control window for receiving data. `15728640 (15 MB/s)` will be used if empty.",
      description_zh:
        "用于接收数据的 QUIC 流级流控制窗口。为空时默认 `15728640 (15 MB/s)`。",
    }),
    recv_window_client: z.number().int().optional().meta({
      description:
        "The QUIC connection-level flow control window for receiving data. `67108864 (64 MB/s)` will be used if empty.",
      description_zh:
        "用于接收数据的 QUIC 连接级流控制窗口。为空时默认 `67108864 (64 MB/s)`。",
    }),
    max_conn_client: z.number().int().optional().meta({
      description:
        "The maximum number of QUIC concurrent bidirectional streams that a peer is allowed to open. `1024` will be used if empty.",
      description_zh:
        "允许对等点打开的 QUIC 并发双向流的最大数量。为空时默认 `1024`。",
    }),
    disable_mtu_discovery: z.boolean().optional().meta({
      description:
        "Disables Path MTU Discovery (RFC 8899). Packets will then be at most 1252 (IPv4) / 1232 (IPv6) bytes in size. Force enabled on for systems other than Linux and Windows.",
      description_zh:
        "禁用路径 MTU 发现 (RFC 8899)。数据包大小将限制在 1252 (IPv4) / 1232 (IPv6) 字节。Linux 和 Windows 以外的系统上会强制启用。",
    }),
    tls: InboundTLSOptions.optional().meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#inbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#inbound)。",
    }),

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
    server_ports: z
      .union([z.string(), z.array(z.string())])
      .optional()
      .meta({
        description:
          "Server port range list. Conflicts with `server_port`. Since sing-box 1.12.0.",
        description_zh:
          "服务器端口范围列表。与 `server_port` 冲突。自 sing-box 1.12.0 起可用。",
      }),
    hop_interval: z.string().optional().meta({
      description:
        "Port hopping interval. `30s` is used by default. Since sing-box 1.12.0.",
      description_zh: "端口跳跃间隔。默认值 `30s`。自 sing-box 1.12.0 起可用。",
    }),
    up: z.string().optional().meta({
      description:
        "Upstream bandwidth limit, format `[Integer] [Unit]` (e.g. `100 Mbps`). Supported units: bps, Bps, Kbps, KBps, Mbps, MBps, Gbps, GBps, Tbps, TBps. Required.",
      description_zh:
        "上行带宽限制，格式 `[Integer] [Unit]`（例如 `100 Mbps`）。支持的单位：bps, Bps, Kbps, KBps, Mbps, MBps, Gbps, GBps, Tbps, TBps。必填。",
    }),
    up_mbps: z.number().int().optional().meta({
      description: "Max upstream bandwidth, in Mbps. Required.",
      description_zh: "以 Mbps 为单位的上行带宽最大值。必填。",
    }),
    down: z.string().optional().meta({
      description:
        "Downstream bandwidth limit, format `[Integer] [Unit]` (e.g. `100 Mbps`). Supported units: bps, Bps, Kbps, KBps, Mbps, MBps, Gbps, GBps, Tbps, TBps. Required.",
      description_zh:
        "下行带宽限制，格式 `[Integer] [Unit]`（例如 `100 Mbps`）。支持的单位：bps, Bps, Kbps, KBps, Mbps, MBps, Gbps, GBps, Tbps, TBps。必填。",
    }),
    down_mbps: z.number().int().optional().meta({
      description: "Max downstream bandwidth, in Mbps. Required.",
      description_zh: "以 Mbps 为单位的下行带宽最大值。必填。",
    }),
    obfs: z.string().optional().meta({
      description: "Obfuscated password.",
      description_zh: "混淆密码。",
    }),
    auth: z.string().optional().meta({
      description: "Authentication password, in base64.",
      description_zh: "base64 编码的认证密码。",
    }),
    auth_str: z.string().optional().meta({
      description: "Authentication password.",
      description_zh: "认证密码。",
    }),
    recv_window_conn: z.number().int().optional().meta({
      description:
        "The QUIC stream-level flow control window for receiving data. `15728640 (15 MB/s)` will be used if empty.",
      description_zh:
        "用于接收数据的 QUIC 流级流控制窗口。为空时默认 `15728640 (15 MB/s)`。",
    }),
    recv_window: z.number().int().optional().meta({
      description:
        "The QUIC connection-level flow control window for receiving data. `67108864 (64 MB/s)` will be used if empty.",
      description_zh:
        "用于接收数据的 QUIC 连接级流控制窗口。为空时默认 `67108864 (64 MB/s)`。",
    }),
    disable_mtu_discovery: z.boolean().optional().meta({
      description:
        "Disables Path MTU Discovery (RFC 8899). Packets will then be at most 1252 (IPv4) / 1232 (IPv6) bytes in size. Force enabled on for systems other than Linux and Windows.",
      description_zh:
        "禁用路径 MTU 发现 (RFC 8899)。数据包大小将限制在 1252 (IPv4) / 1232 (IPv6) 字节。Linux 和 Windows 以外的系统上会强制启用。",
    }),
    network: Network.optional().meta({
      description:
        "Enabled network. One of `tcp` `udp`. Both are enabled by default.",
      description_zh: "启用的网络协议，可为 `tcp` 或 `udp`。默认同时启用。",
    }),
    tls: OutboundTLSOptions.optional().meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#outbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#outbound)。",
    }),

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
