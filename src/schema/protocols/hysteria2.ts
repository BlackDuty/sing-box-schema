import { z } from "zod";
import {
  DialerOptions,
  DomainResolverOptions,
  HttpHeader,
  InboundTLSOptions,
  ListenOptions,
  Network,
  OutboundTLSOptions,
  ServerOptions,
} from "@/schema/shared";
import { HTTPClientOptions, QUICOptions } from "../http-client";

export const Hysteria2Obfs = z.object({
  type: z.string().optional().meta({
    description:
      "QUIC traffic obfuscator type, only available with `salamander`. Disabled if empty.",
    description_zh: "QUIC 流量混淆器类型，仅可设为 `salamander`。为空则禁用。",
  }),
  password: z.string().optional().meta({
    description: "QUIC traffic obfuscator password.",
    description_zh: "QUIC 流量混淆器密码。",
  }),
  min_packet_size: z.number().int().optional().meta({
    description: "Minimum packet size for the gecko obfuscator.",
    description_zh: "gecko 混淆器的最小数据包大小。",
  }),
  max_packet_size: z.number().int().optional().meta({
    description: "Maximum packet size for the gecko obfuscator.",
    description_zh: "gecko 混淆器的最大数据包大小。",
  }),
});

export const Hysteria2User = z.object({
  name: z.string().optional(),
  password: z.string().optional().meta({
    description: "Authentication password",
    description_zh: "认证密码。",
  }),
});

const Hysteria2MasqueradeFile = z.object({
  type: z.literal("file"),
  directory: z.string().meta({
    description: "File server root directory.",
    description_zh: "文件服务器根目录。",
  }),
});

const Hysteria2MasqueradeProxy = z.object({
  type: z.literal("proxy"),
  url: z.string().meta({
    description: "Reverse proxy target URL.",
    description_zh: "反向代理目标 URL。",
  }),
  rewrite_host: z.boolean().optional().meta({
    description: "Rewrite the `Host` header to the target URL.",
    description_zh: "重写请求头中的 Host 字段到目标 URL。",
  }),
});

const Hysteria2MasqueradeString = z.object({
  type: z.literal("string"),
  status_code: z.number().int().optional().meta({
    description: "Fixed response status code.",
    description_zh: "固定响应状态码。",
  }),
  headers: HttpHeader.optional().meta({
    description: "Fixed response headers.",
    description_zh: "固定响应头。",
  }),
  content: z.string().meta({
    description: "Fixed response content.",
    description_zh: "固定响应内容。",
  }),
});

export const Hysteria2Masquerade = z
  .discriminatedUnion("type", [
    Hysteria2MasqueradeFile,
    Hysteria2MasqueradeProxy,
    Hysteria2MasqueradeString,
  ])
  .meta({
    description:
      "HTTP3 server behavior (Object configuration) when authentication fails. Types: `file` (directory), `proxy` (url, rewrite_host), `string` (status_code, headers, content). Conflicts with `masquerade`. A 404 page will be returned if not configured.",
    description_zh:
      "HTTP3 服务器认证失败时的行为（对象配置）。类型：`file`（directory）、`proxy`（url, rewrite_host）、`string`（status_code, headers, content）。与 `masquerade` 冲突，若未配置则返回 404 页。",
  });

const Hysteria2Realm = z.object({
  server_url: z.string().meta({
    description: "Realm server URL.",
    description_zh: "Realm 服务器 URL。",
  }),
  token: z.string().optional().meta({
    description: "Realm token.",
    description_zh: "Realm 令牌。",
  }),
  realm_id: z.string().meta({
    description: "Realm ID.",
    description_zh: "Realm ID。",
  }),
  stun_servers: z.union([z.string(), z.array(z.string())]).meta({
    description: "STUN servers.",
    description_zh: "STUN 服务器。",
  }),
  http_client: HTTPClientOptions.optional().meta({
    description: "HTTP client options for realm requests.",
    description_zh: "Realm 请求使用的 HTTP 客户端选项。",
  }),
});

const Hysteria2InboundRealm = z.object({
  ...Hysteria2Realm.shape,
  stun_domain_resolver: DomainResolverOptions.optional().meta({
    description: "Domain resolver options for STUN servers.",
    description_zh: "STUN 服务器的域名解析选项。",
  }),
});

export const Hysteria2InboundOptions = z
  .object({
    type: z.literal("hysteria2"),
    tag: z.string().optional(),
    up_mbps: z.number().int().optional().meta({
      description:
        "Max bandwidth, in Mbps. Not limited if empty. Conflicts with `ignore_client_bandwidth`.",
      description_zh:
        "最大带宽，单位 Mbps。为空则不限制。与 `ignore_client_bandwidth` 冲突。",
    }),
    down_mbps: z.number().int().optional().meta({
      description:
        "Max bandwidth, in Mbps. Not limited if empty. Conflicts with `ignore_client_bandwidth`.",
      description_zh:
        "最大带宽，单位 Mbps。为空则不限制。与 `ignore_client_bandwidth` 冲突。",
    }),
    obfs: Hysteria2Obfs.optional(),
    users: z.array(Hysteria2User).optional().meta({
      description: "Hysteria2 users.",
      description_zh: "Hysteria2 用户。",
    }),
    ignore_client_bandwidth: z.boolean().optional().meta({
      description:
        "*When `up_mbps` and `down_mbps` are not set*: Commands clients to use the BBR CC instead of Hysteria CC.\n*When `up_mbps` and `down_mbps` are set*: Deny clients to use the BBR CC.",
      description_zh:
        "*当 `up_mbps` 和 `down_mbps` 未设定时*: 命令客户端使用 BBR 拥塞控制算法而不是 Hysteria CC。\n*当 `up_mbps` 和 `down_mbps` 已设定时*: 禁止客户端使用 BBR 拥塞控制算法。",
    }),
    tls: InboundTLSOptions.optional().meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#inbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#inbound)。",
    }),
    ...QUICOptions.shape,
    masquerade: z.union([z.string(), Hysteria2Masquerade]).optional().meta({
      description:
        "HTTP3 server behavior when authentication fails. Accepts a URL string shorthand (file:// or http(s)://) or a full masquerade object. Conflicts with `masquerade.type`. A 404 page will be returned if masquerade is not configured.",
      description_zh:
        "HTTP3 服务器认证失败时的行为。接受 URL 字符串简写（file:// 或 http(s)://）或完整的伪装对象。与 `masquerade.type` 冲突，若未配置则返回 404 页。",
    }),
    brutal_debug: z.boolean().optional().meta({
      description: "Enable debug information logging for Hysteria Brutal CC.",
      description_zh: "启用 Hysteria Brutal CC 的调试信息日志记录。",
    }),
    bbr_profile: z.string().optional().meta({
      description: "Hysteria BBR profile.",
      description_zh: "Hysteria BBR 配置。",
    }),
    realm: Hysteria2InboundRealm.optional().meta({
      description: "Hysteria2 realm options.",
      description_zh: "Hysteria2 Realm 选项。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "Hysteria2InboundOptions",
    title: "Hysteria2 Inbound",
    title_zh: "Hysteria2 入站",
  });
export type Hysteria2InboundOptions = z.infer<typeof Hysteria2InboundOptions>;

export const Hysteria2OutboundOptions = z
  .object({
    type: z.literal("hysteria2"),
    tag: z.string().optional(),
    server_ports: z
      .union([z.string(), z.array(z.string())])
      .optional()
      .meta({
        description:
          "Server port range list. Conflicts with `server_port`. Since sing-box 1.11.0.",
        description_zh:
          "服务器端口范围列表。与 `server_port` 冲突。自 sing-box 1.11.0 起可用。",
      }),
    hop_interval: z.string().optional().meta({
      description:
        "Port hopping interval. `30s` is used by default. Since sing-box 1.11.0.",
      description_zh: "端口跳跃间隔。默认值 `30s`。自 sing-box 1.11.0 起可用。",
    }),
    hop_interval_max: z.string().optional().meta({
      description: "Maximum port hopping interval.",
      description_zh: "最大端口跳跃间隔。",
    }),
    up_mbps: z.number().int().optional().meta({
      description:
        "Max bandwidth, in Mbps. If empty, the BBR congestion control algorithm is used instead of Hysteria CC.",
      description_zh:
        "最大带宽，单位 Mbps。为空时将使用 BBR 拥塞控制算法而不是 Hysteria CC。",
    }),
    down_mbps: z.number().int().optional().meta({
      description:
        "Max bandwidth, in Mbps. If empty, the BBR congestion control algorithm is used instead of Hysteria CC.",
      description_zh:
        "最大带宽，单位 Mbps。为空时将使用 BBR 拥塞控制算法而不是 Hysteria CC。",
    }),
    obfs: Hysteria2Obfs.optional(),
    password: z.string().optional().meta({
      description: "Authentication password.",
      description_zh: "认证密码。",
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
    ...QUICOptions.shape,
    brutal_debug: z.boolean().optional().meta({
      description: "Enable debug information logging for Hysteria Brutal CC.",
      description_zh: "启用 Hysteria Brutal CC 的调试信息日志记录。",
    }),
    bbr_profile: z.string().optional().meta({
      description: "Hysteria BBR profile.",
      description_zh: "Hysteria BBR 配置。",
    }),
    realm: Hysteria2Realm.optional().meta({
      description: "Hysteria2 realm options.",
      description_zh: "Hysteria2 Realm 选项。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "Hysteria2OutboundOptions",
    title: "Hysteria2 Outbound",
    title_zh: "Hysteria2 出站",
  });
export type Hysteria2OutboundOptions = z.infer<typeof Hysteria2OutboundOptions>;
