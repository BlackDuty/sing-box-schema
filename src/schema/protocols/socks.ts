import { z } from "zod";
import {
  DialerOptions,
  DomainResolverOptions,
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
      description: "SOCKS users. No authentication required if empty.",
      description_zh: "SOCKS 用户。如果为空则不需要验证。",
    }),
    domain_resolver: z
      .union([z.string(), DomainResolverOptions])
      .optional()
      .meta({
        description: "Set domain resolver to use for resolving domain names.",
        description_zh: "用于设置解析域名的域名解析器。",
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
      description:
        "The SOCKS version, one of `4` `4a` `5`. SOCKS5 used by default.",
      description_zh: "SOCKS 版本，可为 `4` `4a` `5`。默认使用 SOCKS5。",
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
      description:
        "Enabled network. One of `tcp` `udp`. Both are enabled by default.",
      description_zh: "启用的网络协议，可为 `tcp` 或 `udp`。默认同时启用。",
    }),
    udp_over_tcp: z.union([z.boolean(), UDPOverTCPOptions]).optional().meta({
      description:
        "UDP over TCP protocol settings. See [UDP Over TCP](/configuration/shared/udp-over-tcp/) for details.",
      description_zh:
        "UDP over TCP 协议设置。参阅 [UDP Over TCP](/zh/configuration/shared/udp-over-tcp/)。",
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
