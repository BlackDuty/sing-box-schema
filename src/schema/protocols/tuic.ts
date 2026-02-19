import { z } from "zod";
import {
  DialerOptions,
  InboundTLSOptions,
  ListenOptions,
  Network,
  OutboundTLSOptions,
  ServerOptions,
} from "@/schema/shared";

export const TUICUser = z.object({
  name: z.string().optional(),
  uuid: z.uuid().optional().meta({
    description: "TUIC user uuid",
    description_zh: "TUIC 用户 UUID",
  }),
  password: z.string().optional().meta({
    description: "TUIC user password",
    description_zh: "TUIC 用户密码",
  }),
});

export const TUICInboundOptions = z
  .object({
    type: z.literal("tuic"),
    tag: z.string().optional(),
    users: z.array(TUICUser).optional(),
    congestion_control: z.string().optional().meta({
      description:
        "QUIC congestion control algorithm. One of: `cubic`, `new_reno`, `bbr`. `cubic` is used by default.",
      description_zh:
        "QUIC 拥塞控制算法。可选值: `cubic`, `new_reno`, `bbr`。默认使用 `cubic`。",
    }),
    auth_timeout: z.string().optional().meta({
      description:
        "How long the server should wait for the client to send the authentication command. `3s` is used by default.",
      description_zh: "服务器等待客户端发送认证命令的时间。默认使用 `3s`。",
    }),
    zero_rtt_handshake: z.boolean().optional().meta({
      description:
        "Enable 0-RTT QUIC connection handshake on the client side. This is not impacting much on the performance, as the protocol is fully multiplexed. Disabling this is highly recommended, as it is vulnerable to replay attacks. See [Attack of the clones](https://blog.cloudflare.com/even-faster-connection-establishment-with-quic-0-rtt-resumption/#attack-of-the-clones).",
      description_zh:
        "在客户端启用 0-RTT QUIC 连接握手。 这对性能影响不大，因为协议是完全复用的。 强烈建议禁用此功能，因为它容易受到重放攻击。 请参阅 [Attack of the clones](https://blog.cloudflare.com/even-faster-connection-establishment-with-quic-0-rtt-resumption/#attack-of-the-clones)。",
    }),
    heartbeat: z.string().optional().meta({
      description:
        "Interval for sending heartbeat packets for keeping the connection alive. `10s` is used by default.",
      description_zh: "发送心跳包以保持连接存活的时间间隔。默认使用 `10s`。",
    }),
    tls: InboundTLSOptions.optional().meta({
      description:
        "TLS configuration (required), see [TLS](/configuration/shared/tls/#inbound).",
      description_zh:
        "TLS 配置（必填），参阅 [TLS](/zh/configuration/shared/tls/#inbound)。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "TUICInboundOptions",
    title: "TUIC Inbound",
    title_zh: "TUIC 入站",
  });
export type TUICInboundOptions = z.infer<typeof TUICInboundOptions>;

export const TUICOutboundOptions = z
  .object({
    type: z.literal("tuic"),
    tag: z.string().optional(),
    uuid: z.uuid().optional().meta({
      description: "TUIC user uuid (required).",
      description_zh: "TUIC 用户 UUID（必填）。",
    }),
    password: z.string().optional().meta({
      description: "TUIC user password",
      description_zh: "TUIC 用户密码",
    }),
    congestion_control: z.string().optional().meta({
      description:
        "QUIC congestion control algorithm. One of: `cubic`, `new_reno`, `bbr`. `cubic` is used by default.",
      description_zh:
        "QUIC 拥塞控制算法。可选值: `cubic`, `new_reno`, `bbr`。默认使用 `cubic`。",
    }),
    udp_relay_mode: z.string().optional().meta({
      description:
        "UDP packet relay mode. `native` is used by default. `native` provides native UDP characteristics, while `quic` provides lossless UDP relay using QUIC streams at the cost of additional overhead. Conflict with `udp_over_stream`.",
      description_zh:
        "UDP 包中继模式。默认使用 `native`。`native` 保持原生 UDP 特性，`quic` 使用 QUIC 流实现无损 UDP 中继，但会引入额外开销。与 `udp_over_stream` 冲突。",
    }),
    udp_over_stream: z.boolean().optional().meta({
      description:
        "This is the TUIC port of the [UDP over TCP protocol](/configuration/shared/udp-over-tcp/), designed to provide a QUIC stream based UDP relay mode that TUIC does not provide. Since it is an add-on protocol, you will need to use sing-box or another program compatible with the protocol as a server. This mode has no positive effect in a proper UDP proxy scenario and should only be applied to relay streaming UDP traffic (basically QUIC streams). Conflict with `udp_relay_mode`.",
      description_zh:
        "这是 TUIC 的 [UDP over TCP 协议](/zh/configuration/shared/udp-over-tcp/) 移植， 旨在提供 TUIC 不提供的 基于 QUIC 流的 UDP 中继模式。 由于它是一个附加协议，因此您需要使用 sing-box 或其他兼容的程序作为服务器。 此模式在正确的 UDP 代理场景中没有任何积极作用，仅适用于中继流式 UDP 流量（基本上是 QUIC 流）。 与 `udp_relay_mode` 冲突。",
    }),
    zero_rtt_handshake: z.boolean().optional().meta({
      description:
        "Enable 0-RTT QUIC connection handshake on the client side. This is not impacting much on the performance, as the protocol is fully multiplexed. Disabling this is highly recommended, as it is vulnerable to replay attacks. See [Attack of the clones](https://blog.cloudflare.com/even-faster-connection-establishment-with-quic-0-rtt-resumption/#attack-of-the-clones).",
      description_zh:
        "在客户端启用 0-RTT QUIC 连接握手。 这对性能影响不大，因为协议是完全复用的。 强烈建议禁用此功能，因为它容易受到重放攻击。 请参阅 [Attack of the clones](https://blog.cloudflare.com/even-faster-connection-establishment-with-quic-0-rtt-resumption/#attack-of-the-clones)。",
    }),
    heartbeat: z.string().optional().meta({
      description:
        "Interval for sending heartbeat packets for keeping the connection alive. `10s` is used by default.",
      description_zh: "发送心跳包以保持连接存活的时间间隔。默认使用 `10s`。",
    }),
    network: Network.optional().meta({
      description:
        "Enabled network. One of `tcp` `udp`. Both is enabled by default.",
      description_zh: "启用的网络协议。`tcp` 或 `udp`。默认所有。",
    }),
    tls: OutboundTLSOptions.optional().meta({
      description:
        "TLS configuration (required), see [TLS](/configuration/shared/tls/#outbound).",
      description_zh:
        "TLS 配置（必填），参阅 [TLS](/zh/configuration/shared/tls/#outbound)。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "TUICOutboundOptions",
    title: "TUIC Outbound",
    title_zh: "TUIC 出站",
  });
export type TUICOutboundOptions = z.infer<typeof TUICOutboundOptions>;
