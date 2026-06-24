import { z } from "zod";
import {
  DialerOptions,
  HttpHeader,
  InboundTLSOptions,
  ListenOptions,
  Network,
  OutboundTLSOptions,
  ServerOptions,
  UDPOverTCPOptions,
} from "../shared";

const NaiveUser = z.object({
  username: z.string(),
  password: z.string(),
});

// #region Inbound
export const NaiveInboundOptions = z
  .object({
    type: z.literal("naive"),
    tag: z.string().optional(),
    /**
     * Listen network.
     */
    network: Network.optional().meta({
      description:
        "Listen network, one of `tcp` `udp`. Both networks are enabled when empty.",
      description_zh: "监听的网络协议，`tcp` `udp` 之一。默认所有。",
    }),
    /**
     * Naive users.
     */
    users: z.array(NaiveUser).optional().meta({
      description: "Naive users. Required.",
      description_zh: "Naive 用户。必填。",
    }),
    quic_congestion_control: z.string().optional().meta({
      description: "QUIC congestion control algorithm.",
      description_zh: "QUIC 拥塞控制算法。",
    }),
    /**
     * TLS configuration.
     */
    tls: InboundTLSOptions.optional().meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#inbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#inbound)。",
    }),

    /**
     * Listen options fields.
     */
    ...ListenOptions.shape,
  })
  .meta({
    id: "NaiveInboundOptions",
    title: "Naive Inbound",
    title_zh: "Naive 入站",
  });
// #endregion

export const NaiveOutboundOptions = z
  .object({
    type: z.literal("naive"),
    tag: z.string().optional(),
    username: z.string().optional().meta({
      description: "Authentication username.",
      description_zh: "认证用户名。",
    }),
    password: z.string().optional().meta({
      description: "Authentication password.",
      description_zh: "认证密码。",
    }),
    insecure_concurrency: z.number().int().optional().meta({
      description:
        "Number of concurrent tunnel connections. Multiple connections make the tunneling easier to detect through traffic analysis.",
      description_zh:
        "并发隧道连接数。多个连接会使隧道更容易通过流量分析被检测到。",
    }),
    extra_headers: HttpHeader.optional().meta({
      description: "Extra headers to send in HTTP requests.",
      description_zh: "HTTP 请求中发送的额外标头。",
    }),
    stream_receive_window: z.string().optional().meta({
      description: "Stream receive window size.",
      description_zh: "流接收窗口大小。",
    }),
    udp_over_tcp: z.union([z.boolean(), UDPOverTCPOptions]).optional().meta({
      description:
        "UDP over TCP protocol settings. See [UDP Over TCP](/configuration/shared/udp-over-tcp/) for details.",
      description_zh:
        "UDP over TCP 协议设置。参阅 [UDP Over TCP](/zh/configuration/shared/udp-over-tcp/) 以获取详细信息。",
    }),
    quic: z.boolean().optional().meta({
      description: "Use QUIC instead of HTTP/2.",
      description_zh: "使用 QUIC 而非 HTTP/2。",
    }),
    quic_congestion_control: z.string().optional().meta({
      description: "QUIC congestion control algorithm.",
      description_zh: "QUIC 拥塞控制算法。",
    }),
    quic_session_receive_window: z.string().optional().meta({
      description: "QUIC session receive window size.",
      description_zh: "QUIC 会话接收窗口大小。",
    }),
    tls: OutboundTLSOptions.meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#outbound). Required.",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#outbound)。必填。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "NaiveOutboundOptions",
    title: "Naive Outbound",
    title_zh: "Naive 出站",
  });

export type NaiveOutboundOptions = z.infer<typeof NaiveOutboundOptions>;

export type NaiveInboundOptions = z.infer<typeof NaiveInboundOptions>;
