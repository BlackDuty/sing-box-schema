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
      description: "QUIC congestion control algorithm",
      description_zh: "QUIC 拥塞控制算法",
    }),
    auth_timeout: z.string().optional().meta({
      description:
        "How long the server should wait for the client to send the authentication command",
      description_zh: "服务器等待客户端发送认证命令的时间",
    }),
    zero_rtt_handshake: z.boolean().optional().meta({
      description: "Enable 0-RTT QUIC connection handshake on the client side",
      description_zh: "在客户端启用 0-RTT QUIC 连接握手",
    }),
    heartbeat: z.string().optional().meta({
      description:
        "Interval for sending heartbeat packets for keeping the connection alive",
      description_zh: "发送心跳包以保持连接存活的时间间隔",
    }),
    tls: InboundTLSOptions.optional(),

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
      description: "TUIC user uuid",
      description_zh: "TUIC 用户 UUID",
    }),
    password: z.string().optional().meta({
      description: "TUIC user password",
      description_zh: "TUIC 用户密码",
    }),
    congestion_control: z.string().optional().meta({
      description: "QUIC congestion control algorithm",
      description_zh: "QUIC 拥塞控制算法",
    }),
    udp_relay_mode: z.string().optional().meta({
      description: "UDP packet relay mode",
      description_zh: "UDP 包中继模式",
    }),
    udp_over_stream: z.boolean().optional().meta({
      description:
        "This is the TUIC port of the UDP over TCP protocol, designed to provide a QUIC stream based UDP relay mode that TUIC does not provide.",
      description_zh:
        "这是 TUIC 的 UDP over TCP 协议移植， 旨在提供 TUIC 不提供的 基于 QUIC 流的 UDP 中继模式。",
    }),
    zero_rtt_handshake: z.boolean().optional().meta({
      description: "Enable 0-RTT QUIC connection handshake on the client side",
      description_zh: "在客户端启用 0-RTT QUIC 连接握手",
    }),
    heartbeat: z.string().optional().meta({
      description:
        "Interval for sending heartbeat packets for keeping the connection alive",
      description_zh: "发送心跳包以保持连接存活的时间间隔",
    }),
    network: Network.optional(),
    tls: OutboundTLSOptions.optional(),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "TUICOutboundOptions",
    title: "TUIC Outbound",
    title_zh: "TUIC 出站",
  });
export type TUICOutboundOptions = z.infer<typeof TUICOutboundOptions>;
