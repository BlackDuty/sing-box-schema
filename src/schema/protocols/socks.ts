import { z } from "zod";
import {
  DialerOptions,
  ListenOptions,
  Network,
  ServerOptions,
  UDPOverTCPOptions,
} from "@/schema/shared";

const SocksUser = z.object({
  username: z.string(),
  password: z.string(),
});

export const SocksInboundOptions = z
  .object({
    type: z.literal("socks"),
    tag: z.string().optional(),
    users: z.array(SocksUser).optional().meta({
      description: "SOCKS users.",
      description_zh: "SOCKS 用户。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "SocksInboundOptions",
    title: "SOCKS Inbound",
    title_zh: "SOCKS 入站",
    description: "SOCKS inbound is a socks4, socks4a, socks5 server.",
    description_zh: "SOCKS 入站是一个 socks4, socks4a 和 socks5 服务器。",
  });
export type SocksInboundOptions = z.infer<typeof SocksInboundOptions>;

export const SocksOutboundOptions = z
  .object({
    type: z.literal("socks"),
    tag: z.string().optional(),
    version: z.enum(["4", "4a", "5"]).optional().meta({
      description: "The SOCKS version.",
      description_zh: "SOCKS 版本。",
    }),
    username: z.string().optional().meta({
      description: "SOCKS username.",
      description_zh: "SOCKS 用户名。",
    }),
    password: z.string().optional().meta({
      description: "SOCKS5 password.",
      description_zh: "SOCKS5 密码。",
    }),
    network: Network.optional().meta({
      description: "Enabled network.",
      description_zh: "启用的网络协议。",
    }),
    udp_over_tcp: z.union([z.boolean(), UDPOverTCPOptions]).optional().meta({
      description: "UDP over TCP protocol settings.",
      description_zh: "UDP over TCP 协议设置。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "SocksOutboundOptions",
    title: "SOCKS Outbound",
    title_zh: "SOCKS 出站",
    description: "SOCKS outbound is a socks4/socks4a/socks5 client.",
    description_zh: "SOCKS 出站是 socks4/socks4a/socks5 客户端。",
  });
export type SocksOutboundOptions = z.infer<typeof SocksOutboundOptions>;
