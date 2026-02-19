import { z } from "zod";
import { listable, listableString } from "@/utils";

// #region Base
export const DomainStrategy = z
  .enum(["", "prefer_ipv4", "prefer_ipv6", "ipv4_only", "ipv6_only"])
  .meta({
    description: "Default domain strategy for resolving the domain names.",
    description_zh: "默认解析域名策略。",
  });
export type DomainStrategy = z.infer<typeof DomainStrategy>;

export const FwMark = z.union([z.number().int(), z.string()]).meta({
  description: "Set netfilter routing mark.",
  description_zh: "设置 netfilter 路由标记。",
});
export type FwMark = z.infer<typeof FwMark>;

export const Network = listable(z.enum(["", "tcp", "udp"])).meta({
  description: "Network protocol, `tcp` or `udp`.",
  description_zh: "网络协议，`tcp` 或 `udp`。",
});
export type Network = z.infer<typeof Network>;

export const Tag = z.string().optional().meta({
  description: "Tag of the inbound/outbound/service/endpoint.",
  description_zh: "入站/出站/服务/端点的标签。",
});
export type Tag = z.infer<typeof Tag>;

export const IpVersion = z.union([z.literal(4), z.literal(6)]).meta({
  description: "IP version, 4 or 6.",
  description_zh: "IP 版本，4 或 6。",
});
export type IpVersion = z.infer<typeof IpVersion>;

export const HttpHeader = z.record(z.string(), z.string()).meta({
  description: "HTTP headers.",
  description_zh: "HTTP 标头。",
});
export type HttpHeader = z.infer<typeof HttpHeader>;
// #endregion

// #region Listen
export const InboundOptions = z.object({
  sniff: z.boolean().optional().meta({
    description:
      "Enable sniffing. Deprecated in sing-box 1.11.0 and removed in 1.13.0.",
    description_zh:
      "启用协议探测。已在 sing-box 1.11.0 弃用，并将在 1.13.0 移除。",
    deprecated: true,
  }),
  sniff_override_destination: z.boolean().optional().meta({
    description:
      "Override the connection destination address with the sniffed domain. Deprecated in sing-box 1.11.0 and removed in 1.13.0.",
    description_zh:
      "用探测出的域名覆盖连接目标地址。已在 sing-box 1.11.0 弃用，并将在 1.13.0 移除。",
    deprecated: true,
  }),
  sniff_timeout: z.string().optional().meta({
    description:
      "Timeout for sniffing (default `300ms`). Deprecated in sing-box 1.11.0 and removed in 1.13.0.",
    description_zh:
      "探测超时时间（默认 `300ms`）。已在 sing-box 1.11.0 弃用，并将在 1.13.0 移除。",
    deprecated: true,
  }),
  domain_strategy: DomainStrategy.optional().meta({
    description:
      "If set, the requested domain name will be resolved to IP before routing. Deprecated in sing-box 1.11.0 and removed in 1.13.0.",
    description_zh:
      "如果设置，请求的域名将在路由之前解析为 IP。已在 sing-box 1.11.0 弃用，并将在 1.13.0 移除。",
    deprecated: true,
  }),
  udp_disable_domain_unmapping: z.boolean().optional().meta({
    description:
      "If enabled, for UDP proxy requests addressed to a domain, the original packet address will be sent in the response instead of the mapped domain. Deprecated in sing-box 1.11.0 and removed in 1.13.0.",
    description_zh:
      "如果启用，对于地址为域的 UDP 代理请求，将在响应中发送原始包地址而不是映射的域。已在 sing-box 1.11.0 弃用，并将在 1.13.0 移除。",
    deprecated: true,
  }),
  detour: z.string().optional().meta({
    description:
      "If set, connections will be forwarded to the specified inbound. Requires target inbound support.",
    description_zh: "如果设置，连接将被转发到指定的入站。需要目标入站支持。",
  }),
});
export type InboundOptions = z.infer<typeof InboundOptions>;

export const ListenOptions = z
  .object({
    listen: z.string().optional().meta({
      description: "Listen address.",
      description_zh: "监听地址。",
    }),
    listen_port: z.number().int().optional().meta({
      description: "Listen port.",
      description_zh: "监听端口。",
    }),
    bind_interface: z.string().optional().meta({
      description: "The network interface to bind to.",
      description_zh: "要绑定到的网络接口。",
    }),
    routing_mark: FwMark.optional().meta({
      description:
        'Set netfilter routing mark. Only supported on Linux; accepts integers (e.g. `1234`) or hexadecimal strings (e.g. `"0x1234").',
      description_zh:
        '设置 netfilter 路由标记，仅在 Linux 上支持；可接受整数（例如 `1234`）或十六进制字符串（例如 `"0x1234"`）。',
    }),
    reuse_addr: z.boolean().optional().meta({
      description: "Reuse listener address.",
      description_zh: "重用监听地址。",
    }),
    netns: z.string().optional().meta({
      description:
        "Set network namespace, name or path. Only supported on Linux.",
      description_zh: "设置网络命名空间、名称或路径，仅在 Linux 上支持。",
    }),
    disable_tcp_keep_alive: z.boolean().optional().meta({
      description: "Disable TCP keep alive.",
      description_zh: "禁用 TCP keep alive。",
    }),
    tcp_keep_alive: z.string().optional().meta({
      description:
        "TCP keep alive initial period. `5m` will be used by default.",
      description_zh: "TCP keep alive 初始周期。默认使用 `5m`。",
    }),
    tcp_keep_alive_interval: z.string().optional().meta({
      description: "TCP keep alive interval. `75s` will be used by default.",
      description_zh: "TCP keep alive 间隔。默认使用 `75s`。",
    }),
    tcp_fast_open: z.boolean().optional().meta({
      description: "Enable TCP Fast Open.",
      description_zh: "启用 TCP Fast Open。",
    }),
    tcp_multi_path: z.boolean().optional().meta({
      description: "Enable TCP Multi Path (requires Go 1.21+).",
      description_zh: "启用 TCP Multi Path（需要 Go 1.21+）。",
    }),
    udp_fragment: z.boolean().optional().meta({
      description: "Enable UDP fragmentation.",
      description_zh: "启用 UDP 分段。",
    }),
    udp_timeout: z.union([z.string(), z.number()]).optional().meta({
      description: "UDP NAT expiration time. `5m` will be used by default.",
      description_zh: "UDP NAT 过期时间。默认使用 `5m`。",
    }),

    proxy_protocol: z.boolean().optional().meta({
      description: "Accept proxy protocol.",
      description_zh: "接受代理协议。",
      deprecated: true,
    }),
    proxy_protocol_accept_no_header: z.boolean().optional().meta({
      description: "Accept connections without proxy protocol header.",
      description_zh: "接受没有代理协议头的连接。",
      deprecated: true,
    }),

    ...InboundOptions.shape,
  })
  .meta({
    id: "ListenOptions",
    title: "Listen Options",
    title_zh: "监听选项",
  });
export type ListenOptions = z.infer<typeof ListenOptions>;
// #endregion

// #region Dial
export const NetworkType = z
  .enum(["wifi", "cellular", "ethernet", "other"])
  .meta({
    description: "Network type.",
    description_zh: "网络类型。",
  });
export type NetworkType = z.infer<typeof NetworkType>;

export const NetworkStrategy = z
  .object({
    network_type: listable(NetworkType).optional().meta({
      description:
        "Network types to use when `default` or `hybrid` strategies are selected, or preferred types when `fallback` is used. Only supported in graphical clients on Android and Apple platforms with `auto_detect_interface` enabled.",
      description_zh:
        "在使用 `default` 或 `hybrid` 策略时指定要使用的网络，在 `fallback` 策略下指定优选网络类型；仅在启用 `auto_detect_interface` 的 Android/Apple 图形客户端支持。",
    }),
    fallback_network_type: listable(NetworkType).optional().meta({
      description:
        "Fallback network types used when preferred networks fail or timeout in the `fallback` strategy. Only supported in graphical clients on Android and Apple platforms with `auto_detect_interface` enabled.",
      description_zh:
        "在 `fallback` 策略中优选网络不可用或超时时使用的备用网络类型；仅在启用 `auto_detect_interface` 的 Android/Apple 图形客户端支持。",
    }),
    fallback_delay: z.string().optional().meta({
      description:
        "The length of time to wait before spawning a RFC 6555 Fast Fallback connection or falling back to another interface when `domain_strategy` or `network_strategy` is in use. Defaults to `300ms`.",
      description_zh:
        "在使用 `domain_strategy` 或 `network_strategy` 时，在生成 RFC 6555 快速回退连接或切换到其他接口之前等待的时间长度。默认 `300ms`。",
    }),
  })
  .meta({
    id: "NetworkStrategy",
    title: "Network Strategy",
    title_zh: "网络策略",
    description:
      "Strategy for selecting network interfaces. Only supported in graphical clients on Android and Apple platforms with `auto_detect_interface` enabled. `default` connects to default or `network_type` sequentially, `hybrid` connects concurrently, and `fallback` probes preferred/fallback networks (entering a 15s fast fallback). Conflicts with `bind_interface`, `inet4_bind_address` and `inet6_bind_address`.",
    description_zh:
      "选择网络接口的策略，仅在启用 `auto_detect_interface` 的 Android/Apple 图形客户端支持。`default` 按顺序连接默认或 `network_type` 指定的网络，`hybrid` 并发连接，`fallback` 在 15s 快速回退期间同时连接优选和备用网络。与 `bind_interface`、`inet4_bind_address`、`inet6_bind_address` 冲突。",
  });
export type NetworkStrategy = z.infer<typeof NetworkStrategy>;

export const DomainResolverOptions = z
  .object({
    server: z.string().meta({
      description:
        "Tag of a another server to resolve the domain name in the address.",
      description_zh: "用于解析本 DNS 服务器的域名的另一个 DNS 服务器的标签。",
    }),
    strategy: DomainStrategy.optional().meta({
      description:
        "The domain strategy for resolving the domain name in the address.",
      description_zh: "用于解析本 DNS 服务器的域名的策略。",
    }),
    disable_cache: z.boolean().optional().meta({
      description: "Disable cache and save cache in this query.",
      description_zh: "在此查询中禁用缓存。",
    }),
    rewrite_ttl: z.number().int().optional().meta({
      description: "Rewrite TTL in DNS responses.",
      description_zh: "重写 DNS 回应中的 TTL。",
    }),
    client_subnet: z.string().optional().meta({
      description:
        "Append a `edns0-subnet` OPT extra record with the specified IP prefix to every query by default.",
      description_zh:
        "默认情况下，将带有指定 IP 前缀的 `edns0-subnet` OPT 附加记录附加到每个查询。",
    }),
  })
  .meta({
    id: "DomainResolverOptions",
    title: "Domain Resolver Options",
    title_zh: "域名解析器选项",
    description:
      "Domain resolver configuration used by dialers; follows the same format as the route DNS rule action without the `action` field, and setting a string is equivalent to specifying `server`.",
    description_zh:
      "拨号器使用的域名解析器配置，与路由 DNS 规则动作（不含 `action`）保持相同格式；直接写字符串等价于配置 `server`。",
  });
export type DomainResolverOptions = z.infer<typeof DomainResolverOptions>;

export const DialerOptions = z
  .object({
    detour: z.string().optional().meta({
      description:
        "The tag of the upstream outbound. If enabled, all other dialer fields will be ignored.",
      description_zh: "上游出站的标签。启用时，其他拨号字段将被忽略。",
    }),
    bind_interface: z.string().optional().meta({
      description: "The network interface to bind to.",
      description_zh: "要绑定到的网络接口。",
    }),
    inet4_bind_address: z.string().optional().meta({
      description: "The IPv4 address to bind to.",
      description_zh: "要绑定的 IPv4 地址。",
    }),
    inet6_bind_address: z.string().optional().meta({
      description: "The IPv6 address to bind to.",
      description_zh: "要绑定的 IPv6 地址。",
    }),
    routing_mark: FwMark.optional().meta({
      description:
        'Set netfilter routing mark. Only supported on Linux; accepts integers (e.g. `1234`) or hexadecimal strings (e.g. `"0x1234").',
      description_zh:
        '设置 netfilter 路由标记，仅在 Linux 上支持；可接受整数（例如 `1234`）或十六进制字符串（例如 `"0x1234"`）。',
    }),
    reuse_addr: z.boolean().optional().meta({
      description: "Reuse listener address.",
      description_zh: "重用监听地址。",
    }),
    bind_address_no_port: z.boolean().optional().meta({
      description:
        "Do not reserve a port when binding to a source address. This allows reusing the same source port for multiple connections if the full 4-tuple (source IP, source port, destination IP, destination port) remains unique.",
      description_zh:
        "绑定到源地址时不保留端口。如果源 IP、源端口、目标 IP、目标端口构成的四元组保持唯一，这允许多个连接复用同一源端口。",
    }),
    protect_path: z.string().optional().meta({
      description: "Path to send protect file descriptor to on Android.",
      description_zh: "在 Android 上发送保护文件描述符的路径。",
    }),
    netns: z.string().optional().meta({
      description:
        "Set network namespace, name or path. Only supported on Linux.",
      description_zh: "设置网络命名空间、名称或路径，仅在 Linux 上支持。",
    }),
    connect_timeout: z.string().optional().meta({
      description:
        "Connect timeout, in golang's Duration format (e.g. `300ms`, `-1.5h`, `2h45m`).",
      description_zh:
        "连接超时，采用 golang 的 Duration 格式（例如 `300ms`、`-1.5h`、`2h45m`）。",
    }),
    tcp_fast_open: z.boolean().optional().meta({
      description: "Enable TCP Fast Open.",
      description_zh: "启用 TCP Fast Open。",
    }),
    tcp_multi_path: z.boolean().optional().meta({
      description: "Enable TCP Multi Path (requires Go 1.21+).",
      description_zh: "启用 TCP Multi Path（需要 Go 1.21+）。",
    }),
    udp_fragment: z.boolean().optional().meta({
      description: "Enable UDP fragmentation.",
      description_zh: "启用 UDP 分段。",
    }),
    disable_tcp_keep_alive: z.boolean().optional().meta({
      description: "Disable TCP keep alive.",
      description_zh: "禁用 TCP keep alive。",
    }),
    tcp_keep_alive: z.string().optional().meta({
      description:
        "TCP keep alive initial period. `5m` will be used by default.",
      description_zh: "TCP keep alive 初始周期。默认使用 `5m`。",
    }),
    tcp_keep_alive_interval: z.string().optional().meta({
      description: "TCP keep alive interval. `75s` will be used by default.",
      description_zh: "TCP keep alive 间隔。默认使用 `75s`。",
    }),
    domain_resolver: z
      .union([z.string(), DomainResolverOptions])
      .optional()
      .meta({
        description:
          "Set domain resolver to use for resolving domain names. This option uses the same format as the route DNS rule action without the `action` field, and specifying a string is equivalent to filling its `server`. Optional when only one DNS server is configured. For `direct`, it resolves domains in the request; other outbound types resolve domains in the server address.",
        description_zh:
          "用于设置解析域名的域名解析器。此选项格式与路由 DNS 规则动作（不含 `action`）一致；直接写字符串等价于配置其 `server`。当只有一个 DNS 服务器配置时可选。`direct` 作用于请求中的域名，其他类型作用于服务器地址中的域名。",
      }),
    network_strategy: z.union([z.string(), NetworkStrategy]).optional().meta({
      description:
        "Strategy for selecting network interfaces. Only supported in graphical clients on Android and Apple platforms with `auto_detect_interface` enabled. Available values: `default` (default) connects to the default network or the networks specified in `network_type` sequentially, `hybrid` connects to all networks or the networks specified in `network_type` concurrently, and `fallback` connects to the default network or preferred networks specified in `network_type` concurrently and tries fallback networks when they are unavailable or timeout, entering a 15s fast fallback state that exits immediately if preferred networks recover. Conflicts with `bind_interface`, `inet4_bind_address`, and `inet6_bind_address`.",
      description_zh:
        "用于选择网络接口的策略。仅在启用 `auto_detect_interface` 的 Android/Apple 图形客户端支持。可用值：`default`（默认值）按顺序连接默认网络或 `network_type` 中指定的网络，`hybrid` 同时连接所有网络或 `network_type` 中指定的网络，`fallback` 同时连接默认网络或 `network_type` 中指定的优选网络，并在不可用或超时时尝试回退网络。当首选接口故障或超时时，会进入 15 秒快速回退状态（同时连接所有优选和回退网络），首选网络恢复后立即退出。与 `bind_interface`、`inet4_bind_address` 和 `inet6_bind_address` 冲突。",
    }),
    network_type: listable(NetworkType).optional().meta({
      description:
        "Network types to use when `default` or `hybrid` strategies are selected, or preferred types when `fallback` is enabled. Only supported in graphical clients on Android and Apple platforms with `auto_detect_interface` enabled. Available values: `wifi`, `cellular`, `ethernet`, `other`. Device's default network is used by default.",
      description_zh:
        "在 `default` 或 `hybrid` 策略下指定要使用的网络，在启用 `fallback` 时指定首选网络类型；仅在启用 `auto_detect_interface` 的 Android/Apple 图形客户端支持。可用值：`wifi`、`cellular`、`ethernet`、`other`。默认使用设备默认网络。",
    }),
    fallback_network_type: listable(NetworkType).optional().meta({
      description:
        "Fallback network types when preferred networks are unavailable or timeout while using the `fallback` strategy. Only supported in graphical clients on Android and Apple platforms with `auto_detect_interface` enabled. All other networks except preferred are used by default.",
      description_zh:
        "当使用 `fallback` 策略时，在首选网络不可用或超时时要使用的回退网络类型。仅在启用 `auto_detect_interface` 的 Android/Apple 图形客户端支持。默认使用除首选网络外的所有其他网络。",
    }),
    fallback_delay: z.string().optional().meta({
      description:
        "The length of time to wait before spawning a RFC 6555 Fast Fallback connection. For `domain_strategy`, it is the amount of time to wait for a connection to succeed before assuming the preferred address is misconfigured and falling back. For `network_strategy`, it is the amount of time to wait before falling back to other interfaces. Only takes effect when `domain_strategy` or `network_strategy` is set. `300ms` is used by default.",
      description_zh:
        "在生成 RFC 6555 快速回退连接之前等待的时间长度。对于 `domain_strategy`，是在假设首选地址配置错误并回退到其他类型地址之前等待连接成功的时间。对于 `network_strategy`，是在回退到其他接口之前等待连接成功的时间。仅当 `domain_strategy` 或 `network_strategy` 已设置时生效。默认使用 `300ms`。",
    }),
    domain_strategy: DomainStrategy.optional().meta({
      description:
        "Default domain strategy for resolving the domain names. Deprecated in sing-box 1.12.0 and removed in 1.14.0. Available values: `prefer_ipv4`, `prefer_ipv6`, `ipv4_only`, `ipv6_only`. `direct` falls back to `inbound.domain_strategy` when unset while other types only affect server addresses.",
      description_zh:
        "默认解析域名策略。已在 sing-box 1.12.0 弃用，并将在 1.14.0 移除。可用值：`prefer_ipv4`、`prefer_ipv6`、`ipv4_only`、`ipv6_only`。`direct` 未设置时回退到 `inbound.domain_strategy`，其他类型仅影响服务器地址。",
      deprecated: true,
    }),
  })
  .meta({
    id: "DialerOptions",
    title: "Dialer Options",
    title_zh: "拨号选项",
  });
export type DialerOptions = z.infer<typeof DialerOptions>;

export const ServerOptions = z
  .object({
    server: z.string().meta({
      description: "The server address.",
      description_zh: "服务器地址。",
    }),
    server_port: z.number().int().optional().meta({
      description: "The server port.",
      description_zh: "服务器端口。",
    }),
  })
  .meta({
    id: "ServerOptions",
    title: "Server Options",
    title_zh: "服务器选项",
  });
export type ServerOptions = z.infer<typeof ServerOptions>;
// #endregion

// #region TLS
const TLSVersion = z.enum(["1.0", "1.1", "1.2", "1.3"]).meta({
  description: "TLS version.",
  description_zh: "TLS 版本。",
});
const TLSCipherSuite = z
  .enum([
    "TLS_RSA_WITH_AES_128_CBC_SHA",
    "TLS_RSA_WITH_AES_256_CBC_SHA",
    "TLS_RSA_WITH_AES_128_GCM_SHA256",
    "TLS_RSA_WITH_AES_256_GCM_SHA384",
    "TLS_AES_128_GCM_SHA256",
    "TLS_AES_256_GCM_SHA384",
    "TLS_CHACHA20_POLY1305_SHA256",
    "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA",
    "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA",
    "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA",
    "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA",
    "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
    "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384",
    "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
    "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
    "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
    "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256",
  ])
  .meta({
    description: "TLS cipher suite.",
    description_zh: "TLS 密码套件。",
  });

const TLSCurvePreference = z
  .enum(["P256", "P384", "P521", "X25519", "X25519MLKEM768"])
  .meta({
    description: "TLS curve preference.",
    description_zh: "TLS 曲线偏好。",
  });

const DNS01Challenge = z
  .object({
    provider: z.string().meta({
      description: "ACME CA provider.",
      description_zh: "ACME CA 供应商。",
    }),
    access_key_id: z.string().optional().meta({
      description: "The access key ID.",
      description_zh: "访问密钥 ID。",
    }),
    access_key_secret: z.string().optional().meta({
      description: "The access key secret.",
      description_zh: "访问密钥 secret。",
    }),
    region_id: z.string().optional().meta({
      description: "The region ID.",
      description_zh: "区域 ID。",
    }),
    api_token: z.string().optional().meta({
      description: "The API token.",
      description_zh: "API 令牌。",
    }),
  })
  .meta({
    id: "DNS01Challenge",
    title: "DNS01 Challenge",
    title_zh: "DNS01 质询",
  });

const InboundACMEOptions = z
  .object({
    domain: listableString.optional().meta({
      description: "List of domain.",
      description_zh: "域名列表。",
    }),
    data_directory: z.string().optional().meta({
      description: "The directory to store ACME data.",
      description_zh: "存储 ACME 数据的目录。",
    }),
    default_server_name: z.string().optional().meta({
      description:
        "Server name to use when choosing a certificate if the ClientHello's ServerName field is empty.",
      description_zh:
        "如果 ClientHello 的 ServerName 字段为空，则选择证书时要使用的服务器名称。",
    }),
    email: z.string().optional().meta({
      description:
        "The email address to use when creating or selecting an existing ACME server account.",
      description_zh: "创建或选择现有 ACME 服务器帐户时使用的电子邮件地址。",
    }),
    provider: z.string().optional().meta({
      description: "The ACME CA provider to use.",
      description_zh: "要使用的 ACME CA 供应商。",
    }),
    disable_http_challenge: z.boolean().optional().meta({
      description: "Disable all HTTP challenges.",
      description_zh: "禁用所有 HTTP 质询。",
    }),
    disable_tls_alpn_challenge: z.boolean().optional().meta({
      description: "Disable all TLS-ALPN challenges.",
      description_zh: "禁用所有 TLS-ALPN 质询。",
    }),
    alternative_http_port: z.number().int().optional().meta({
      description: "The alternate port to use for the ACME HTTP challenge.",
      description_zh: "用于 ACME HTTP 质询的备用端口。",
    }),
    alternative_tls_port: z.number().int().optional().meta({
      description: "The alternate port to use for the ACME TLS-ALPN challenge.",
      description_zh: "用于 ACME TLS-ALPN 质询的备用端口。",
    }),
    external_account: z
      .object({
        key_id: z.string().meta({
          description: "The key identifier.",
          description_zh: "密钥标识符。",
        }),
        mac_key: z.string().meta({
          description: "The MAC key.",
          description_zh: "MAC 密钥。",
        }),
      })
      .optional()
      .meta({
        description:
          "EAB (External Account Binding) contains information necessary to bind or map an ACME account to some other account known by the CA.",
        description_zh:
          "EAB（外部帐户绑定）包含将 ACME 帐户绑定或映射到其他已知帐户所需的信息。",
      }),
    dns01_challenge: DNS01Challenge.optional().meta({
      description: "ACME DNS01 challenge field.",
      description_zh: "ACME DNS01 验证字段。",
    }),
  })
  .meta({
    id: "InboundACMEOptions",
    title: "Inbound ACME Options",
    title_zh: "入站 ACME 选项",
  });

const InboundECHOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description: "Enable ECH.",
      description_zh: "启用 ECH。",
    }),
    key: listableString.optional().meta({
      description: "ECH key line array, in PEM format.",
      description_zh: "ECH PEM 密钥行数组。",
    }),
    key_path: z.string().optional().meta({
      description: "The path to ECH key, in PEM format.",
      description_zh: "ECH PEM 密钥路径。",
    }),
    pq_signature_schemes_enabled: z.boolean().optional().meta({
      description: "Enable post-quantum signature schemes.",
      description_zh: "启用后量子签名方案。",
      deprecated: true,
    }),
    dynamic_record_sizing_disabled: z.boolean().optional().meta({
      description: "Disable dynamic record sizing.",
      description_zh: "禁用动态记录大小。",
      deprecated: true,
    }),
  })
  .meta({
    id: "InboundECHOptions",
    title: "Inbound ECH Options",
    title_zh: "入站 ECH 选项",
  });

const InboundRealityOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description: "Enable Reality.",
      description_zh: "启用 Reality。",
    }),
    handshake: z
      .object({
        ...ServerOptions.shape,
        ...DialerOptions.shape,
      })
      .optional()
      .meta({
        description: "Handshake server address and Dial Fields.",
        description_zh: "握手服务器地址和拨号参数。",
      }),
    private_key: z.string().optional().meta({
      description:
        "Private key, generated by `sing-box generate reality-keypair`.",
      description_zh: "私钥，由 `sing-box generate reality-keypair` 生成。",
    }),
    short_id: listableString.optional().meta({
      description: "A hexadecimal string with zero to eight digits.",
      description_zh: "一个零到八位的十六进制字符串。",
    }),
    max_time_difference: z.string().optional().meta({
      description:
        "The maximum time difference between the server and the client.",
      description_zh: "服务器与和客户端之间允许的最大时间差。",
    }),
  })
  .meta({
    id: "InboundRealityOptions",
    title: "Inbound Reality Options",
    title_zh: "入站 Reality 选项",
  });

export const InboundTLSOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description: "Enable TLS.",
      description_zh: "启用 TLS。",
    }),
    server_name: z.string().optional().meta({
      description:
        "Used to verify the hostname on the returned certificates unless `insecure` is given. Also included in the client's handshake to support virtual hosting unless it is an IP address.",
      description_zh:
        "用于验证返回证书上的主机名，除非设置了 `insecure`。还会作为客户端握手的一部分发送，以支持虚拟主机，除非该值是 IP 地址。",
    }),
    insecure: z.boolean().optional().meta({
      description: "Accepts any server certificate (client only).",
      description_zh: "接受任何服务器证书（仅客户端）。",
    }),
    alpn: listableString.optional().meta({
      description:
        "List of supported application level protocols, in order of preference.",
      description_zh: "支持的应用层协议协商列表，按优先顺序排列。",
    }),
    min_version: TLSVersion.optional().meta({
      description: "The minimum TLS version that is acceptable.",
      description_zh: "可接受的最低 TLS 版本。",
    }),
    max_version: TLSVersion.optional().meta({
      description: "The maximum TLS version that is acceptable.",
      description_zh: "可接受的最大 TLS 版本。",
    }),
    cipher_suites: listable(TLSCipherSuite).optional().meta({
      description: "A list of enabled TLS 1.0–1.2 cipher suites.",
      description_zh: "启用的 TLS 1.0-1.2 密码套件的列表。",
    }),
    curve_preferences: listable(TLSCurvePreference).optional().meta({
      description: "Set of supported key exchange mechanisms.",
      description_zh: "支持的密钥交换机制集合。",
    }),
    certificate: listableString.optional().meta({
      description: "The server certificate line array, in PEM format.",
      description_zh: "服务器 PEM 证书行数组。",
    }),
    certificate_path: z.string().optional().meta({
      description:
        "The path to the server certificate, in PEM format. Will be automatically reloaded if the file is modified.",
      description_zh: "服务器 PEM 证书路径。文件修改后会自动重新加载。",
    }),
    client_authentication: z
      .enum([
        "no",
        "request",
        "require-any",
        "verify-if-given",
        "require-and-verify",
      ])
      .optional()
      .meta({
        description: "The type of client authentication to use.",
        description_zh: "要使用的客户端身份验证类型。",
      }),
    client_certificate: listableString.optional().meta({
      description: "Client certificate line array to trust, in PEM format.",
      description_zh: "信任的客户端 PEM 证书行数组。",
    }),
    client_certificate_path: listableString.optional().meta({
      description: "Paths to client certificates to trust, in PEM format.",
      description_zh: "信任的客户端 PEM 证书路径列表。",
    }),
    client_certificate_public_key_sha256: listableString.optional().meta({
      description:
        "SHA-256 fingerprints of trusted client certificate public keys.",
      description_zh: "信任的客户端证书公钥的 SHA-256 指纹。",
    }),
    key: listableString.optional().meta({
      description: "The server private key line array, in PEM format.",
      description_zh: "服务器 PEM 私钥行数组。",
    }),
    key_path: z.string().optional().meta({
      description:
        "The path to the server private key, in PEM format. Will be automatically reloaded if the file is modified.",
      description_zh: "服务器 PEM 私钥路径。文件修改后会自动重新加载。",
    }),
    kernel_tx: z.boolean().optional().meta({
      description: "Enable kernel TLS transmit support.",
      description_zh: "启用内核 TLS 发送支持。",
    }),
    kernel_rx: z.boolean().optional().meta({
      description: "Enable kernel TLS receive support.",
      description_zh: "启用内核 TLS 接收支持。",
    }),
    acme: InboundACMEOptions.optional().meta({
      description:
        "ACME (Automatic Certificate Management Environment) options.",
      description_zh: "ACME（自动证书管理环境）选项。",
    }),
    ech: InboundECHOptions.optional().meta({
      description: "ECH (Encrypted Client Hello) options.",
      description_zh: "ECH（加密客户端 Hello）选项。",
    }),
    reality: InboundRealityOptions.optional().meta({
      description: "Reality options.",
      description_zh: "Reality 选项。",
    }),
  })
  .meta({
    id: "InboundTLSOptions",
    title: "Inbound TLS Options",
    title_zh: "入站 TLS 选项",
  });
export type InboundTLSOptions = z.infer<typeof InboundTLSOptions>;

const OutboundECHOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description: "Enable ECH.",
      description_zh: "启用 ECH。",
    }),
    config: listableString.optional().meta({
      description:
        "ECH configuration line array, in PEM format. If empty, sing-box will attempt to load the configuration from DNS.",
      description_zh: "ECH PEM 配置行数组。为空时将尝试从 DNS 加载配置。",
    }),
    config_path: z.string().optional().meta({
      description:
        "The path to ECH configuration, in PEM format. If empty, sing-box will attempt to load the configuration from DNS.",
      description_zh: "ECH PEM 配置路径。为空时将尝试从 DNS 加载配置。",
    }),
    query_server_name: z.string().optional().meta({
      description:
        "Overrides the domain name used for ECH HTTPS record queries.",
      description_zh: "覆盖用于 ECH HTTPS 记录查询的域名。",
    }),
    pq_signature_schemes_enabled: z.boolean().optional().meta({
      description: "Enable post-quantum signature schemes.",
      description_zh: "启用后量子签名方案。",
      deprecated: true,
    }),
    dynamic_record_sizing_disabled: z.boolean().optional().meta({
      description: "Disable dynamic record sizing.",
      description_zh: "禁用动态记录大小。",
      deprecated: true,
    }),
  })
  .meta({
    id: "OutboundECHOptions",
    title: "Outbound ECH Options",
    title_zh: "出站 ECH 选项",
  });

const OutboundUTLSOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description:
        "Enable uTLS (not recommended; uTLS has known fingerprinting vulnerabilities).",
      description_zh: "启用 uTLS（不推荐；uTLS 存在已知的指纹识别漏洞）。",
    }),
    fingerprint: z.string().optional().meta({
      description:
        "uTLS fingerprint used by the ClientHello (not recommended).",
      description_zh: "uTLS 指纹（不推荐）。",
    }),
  })
  .meta({
    id: "OutboundUTLSOptions",
    title: "Outbound uTLS Options",
    title_zh: "出站 uTLS 选项",
  });

const OutboundRealityOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description: "Enable Reality.",
      description_zh: "启用 Reality。",
    }),
    public_key: z.string().optional().meta({
      description:
        "Public key, generated by `sing-box generate reality-keypair`.",
      description_zh: "公钥，由 `sing-box generate reality-keypair` 生成。",
    }),
    short_id: z.string().optional().meta({
      description: "A hexadecimal string with zero to eight digits.",
      description_zh: "一个零到八位的十六进制字符串。",
    }),
  })
  .meta({
    id: "OutboundRealityOptions",
    title: "Outbound Reality Options",
    title_zh: "出站 Reality 选项",
  });

export const OutboundTLSOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description: "Enable TLS.",
      description_zh: "启用 TLS。",
    }),
    disable_sni: z.boolean().optional().meta({
      description: "Do not send server name in ClientHello (client only).",
      description_zh: "不在 ClientHello 中发送服务器名称（仅客户端）。",
    }),
    server_name: z.string().optional().meta({
      description:
        "Used to verify the hostname on the returned certificates unless insecure is given.",
      description_zh: "用于验证返回证书上的主机名，除非设置不安全。",
    }),
    insecure: z.boolean().optional().meta({
      description: "Accepts any server certificate.",
      description_zh: "接受任何服务器证书。",
    }),
    alpn: listableString.optional().meta({
      description:
        "List of supported application level protocols, in order of preference.",
      description_zh: "支持的应用层协议协商列表，按优先顺序排列。",
    }),
    min_version: TLSVersion.optional().meta({
      description: "The minimum TLS version that is acceptable.",
      description_zh: "可接受的最低 TLS 版本。",
    }),
    max_version: TLSVersion.optional().meta({
      description: "The maximum TLS version that is acceptable.",
      description_zh: "可接受的最大 TLS 版本。",
    }),
    cipher_suites: listable(TLSCipherSuite).optional().meta({
      description: "A list of enabled TLS 1.0–1.2 cipher suites.",
      description_zh: "启用的 TLS 1.0-1.2 密码套件的列表。",
    }),
    curve_preferences: listable(TLSCurvePreference).optional().meta({
      description: "Set of supported key exchange mechanisms.",
      description_zh: "支持的密钥交换机制集合。",
    }),
    certificate: listableString.optional().meta({
      description: "The server certificate line array, in PEM format.",
      description_zh: "服务器 PEM 证书行数组。",
    }),
    certificate_path: z.string().optional().meta({
      description:
        "The path to the server certificate, in PEM format. Will be automatically reloaded if the file is modified.",
      description_zh: "服务器 PEM 证书路径。文件修改后会自动重新加载。",
    }),
    certificate_public_key_sha256: listableString.optional().meta({
      description:
        "SHA-256 fingerprints of trusted server certificate public keys.",
      description_zh: "信任的服务器证书公钥的 SHA-256 指纹。",
    }),
    client_certificate: listableString.optional().meta({
      description: "Client certificate line array, in PEM format.",
      description_zh: "客户端 PEM 证书行数组。",
    }),
    client_certificate_path: z.string().optional().meta({
      description: "Path to the client certificate, in PEM format.",
      description_zh: "客户端 PEM 证书路径。",
    }),
    client_key: listableString.optional().meta({
      description: "Client private key line array, in PEM format.",
      description_zh: "客户端 PEM 私钥行数组。",
    }),
    client_key_path: z.string().optional().meta({
      description: "Path to the client private key, in PEM format.",
      description_zh: "客户端 PEM 私钥路径。",
    }),
    fragment: z.boolean().optional().meta({
      description:
        "Fragment TLS handshakes to bypass plain-text based firewalls. Poor performance means `record_fragment` should be tried first. On Linux, Apple platforms, and Windows (with admin privileges) the wait time is auto detected; otherwise it falls back to `fragment_fallback_delay`, and values below 20ms also defer to the fallback delay.",
      description_zh:
        "通过分段 TLS 握手数据包来绕过基于明文匹配的防火墙。性能较差，应先尝试 `record_fragment`。在 Linux、Apple 平台和（需要管理员权限的）Windows 上会自动检测等待时间，其他平台或侦测时间低于 20ms 时会退回到 `fragment_fallback_delay`。",
    }),
    fragment_fallback_delay: z.string().optional().meta({
      description:
        "The fallback value used when TLS segmentation cannot automatically determine the wait time. Defaults to `500ms`.",
      description_zh:
        "当 TLS 分片功能无法自动判定等待时间时使用的回退值。默认 `500ms`。",
    }),
    record_fragment: z.boolean().optional().meta({
      description:
        "Fragment TLS handshake into multiple TLS records to bypass firewalls. Preferred over `fragment` when performance is a concern.",
      description_zh:
        "通过将 TLS 握手分割为多个 TLS 记录来绕过防火墙。在关注性能时优先使用 `record_fragment`。",
    }),
    kernel_tx: z.boolean().optional().meta({
      description: "Enable kernel TLS transmit support.",
      description_zh: "启用内核 TLS 发送支持。",
    }),
    kernel_rx: z.boolean().optional().meta({
      description: "Enable kernel TLS receive support.",
      description_zh: "启用内核 TLS 接收支持。",
    }),
    ech: OutboundECHOptions.optional().meta({
      description: "ECH (Encrypted Client Hello) options.",
      description_zh: "ECH（加密客户端 Hello）选项。",
    }),
    utls: OutboundUTLSOptions.optional().meta({
      description: "uTLS options.",
      description_zh: "uTLS 选项。",
    }),
    reality: OutboundRealityOptions.optional().meta({
      description: "Reality options.",
      description_zh: "Reality 选项。",
    }),
  })
  .meta({
    id: "OutboundTLSOptions",
    title: "Outbound TLS Options",
    title_zh: "出站 TLS 选项",
  });
export type OutboundTLSOptions = z.infer<typeof OutboundTLSOptions>;
// #endregion

// #region Multiplex
const BrutalOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description:
        "Enable TCP Brutal congestion control algorithm. Requires Linux with the brutal kernel module installed.",
      description_zh:
        "启用 TCP Brutal 拥塞控制算法。需要 Linux 并安装 brutal 内核模块。",
    }),
    up_mbps: z.number().int().optional().meta({
      description: "Upload bandwidth, in Mbps.",
      description_zh: "上传带宽，以 Mbps 为单位。",
    }),
    down_mbps: z.number().int().optional().meta({
      description: "Download bandwidth, in Mbps.",
      description_zh: "下载带宽，以 Mbps 为单位。",
    }),
  })
  .meta({
    id: "BrutalOptions",
    title: "Brutal Options",
    title_zh: "Brutal 选项",
    description:
      "Options for the TCP Brutal congestion control algorithm. Linux with the brutal kernel module is required.",
    description_zh:
      "TCP Brutal 拥塞控制算法的选项。需要 Linux 并安装 brutal 内核模块。",
  });

export const InboundMultiplexOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description: "Enable multiplex support.",
      description_zh: "启用多路复用支持。",
    }),
    padding: z.boolean().optional().meta({
      description: "If enabled, non-padded connections will be rejected.",
      description_zh: "如果启用，将拒绝非填充连接。",
    }),
    brutal: BrutalOptions.optional().meta({
      description: "TCP Brutal options.",
      description_zh: "TCP Brutal 选项。",
    }),
  })
  .meta({
    id: "InboundMultiplexOptions",
    title: "Inbound Multiplex Options",
    title_zh: "入站多路复用选项",
  });
export type InboundMultiplexOptions = z.infer<typeof InboundMultiplexOptions>;

export const OutboundMultiplexOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description: "Enable multiplex.",
      description_zh: "启用多路复用。",
    }),
    protocol: z.enum(["smux", "yamux", "h2mux"]).optional().meta({
      description: "Multiplex protocol.",
      description_zh: "多路复用协议。",
    }),
    max_connections: z.number().int().optional().meta({
      description: "Maximum connections.",
      description_zh: "最大连接数量。",
    }),
    min_streams: z.number().int().optional().meta({
      description:
        "Minimum multiplexed streams in a connection before opening a new connection.",
      description_zh: "在打开新连接之前，连接中的最小多路复用流数量。",
    }),
    max_streams: z.number().int().optional().meta({
      description:
        "Maximum multiplexed streams in a connection before opening a new connection.",
      description_zh: "在打开新连接之前，连接中的最大多路复用流数量。",
    }),
    padding: z.boolean().optional().meta({
      description: "Enable padding.",
      description_zh: "启用填充。",
    }),
    brutal: BrutalOptions.optional().meta({
      description: "TCP Brutal options.",
      description_zh: "TCP Brutal 选项。",
    }),
  })
  .meta({
    id: "OutboundMultiplexOptions",
    title: "Outbound Multiplex Options",
    title_zh: "出站多路复用选项",
  });
export type OutboundMultiplexOptions = z.infer<typeof OutboundMultiplexOptions>;
// #endregion

// #region V2Ray Transport
const V2RayHTTPOptions = z
  .object({
    type: z.literal("http"),
    host: listableString.optional().meta({
      description: "List of host domain.",
      description_zh: "主机域名列表。",
    }),
    path: z.string().optional().meta({
      description: "Path of HTTP request.",
      description_zh: "HTTP 请求路径。",
    }),
    method: z.string().optional().meta({
      description: "Method of HTTP request.",
      description_zh: "HTTP 请求方法。",
    }),
    headers: HttpHeader.optional().meta({
      description: "Extra headers of HTTP request.",
      description_zh: "HTTP 请求的额外标头。",
    }),
    idle_timeout: z.string().optional().meta({
      description:
        "Specifies the time until idle clients should be closed with a GOAWAY frame.",
      description_zh: "指定闲置客户端应在多长时间内使用 GOAWAY 帧关闭。",
    }),
    ping_timeout: z.string().optional().meta({
      description:
        "Specifies the timeout duration after sending a PING frame, within which a response must be received.",
      description_zh: "指定发送 PING 帧后，在指定的超时时间内必须接收到响应。",
    }),
  })
  .meta({
    id: "V2RayHTTPOptions",
    title: "V2Ray HTTP Options",
    title_zh: "V2Ray HTTP 选项",
  });

const V2RayWebsocketOptions = z
  .object({
    type: z.literal("ws"),
    path: z.string().optional().meta({
      description: "Path of HTTP request.",
      description_zh: "HTTP 请求路径。",
    }),
    headers: HttpHeader.optional().meta({
      description: "Extra headers of HTTP request.",
      description_zh: "HTTP 请求的额外标头。",
    }),
    max_early_data: z.number().int().optional().meta({
      description: "Allowed payload size is in the request.",
      description_zh: "请求中允许的最大有效负载大小。",
    }),
    early_data_header_name: z.string().optional().meta({
      description: "Early data is sent in path instead of header by default.",
      description_zh: "默认情况下，早期数据在路径而不是标头中发送。",
    }),
  })
  .meta({
    id: "V2RayWebsocketOptions",
    title: "V2Ray WebSocket Options",
    title_zh: "V2Ray WebSocket 选项",
  });

const V2RayQUICOptions = z
  .object({
    type: z.literal("quic"),
  })
  .meta({
    id: "V2RayQUICOptions",
    title: "V2Ray QUIC Options",
    title_zh: "V2Ray QUIC 选项",
  });

const V2RayGRPCOptions = z
  .object({
    type: z.literal("grpc"),
    service_name: z.string().optional().meta({
      description: "Service name of gRPC.",
      description_zh: "gRPC 服务名称。",
    }),
    idle_timeout: z.string().optional().meta({
      description:
        "If the transport doesn't see any activity after a duration of this time, it pings the client to check if the connection is still active.",
      description_zh:
        "如果传输在此时间段后没有看到任何活动，它会向客户端发送 ping 请求以检查连接是否仍然活动。",
    }),
    ping_timeout: z.string().optional().meta({
      description:
        "The timeout that after performing a keepalive check, the client will wait for activity.",
      description_zh:
        "经过一段时间之后，客户端将执行 keepalive 检查并等待活动。",
    }),
    permit_without_stream: z.boolean().optional().meta({
      description:
        "If enabled, the client transport sends keepalive pings even with no active connections.",
      description_zh:
        "如果启用，客户端传输即使没有活动连接也会发送 keepalive ping。",
    }),
  })
  .meta({
    id: "V2RayGRPCOptions",
    title: "V2Ray gRPC Options",
    title_zh: "V2Ray gRPC 选项",
  });

const V2RayHTTPUpgradeOptions = z
  .object({
    type: z.literal("httpupgrade"),
    host: z.string().optional().meta({
      description: "Host domain.",
      description_zh: "主机域名。",
    }),
    path: z.string().optional().meta({
      description: "Path of HTTP request.",
      description_zh: "HTTP 请求路径。",
    }),
    headers: HttpHeader.optional().meta({
      description: "Extra headers of HTTP request.",
      description_zh: "HTTP 请求的额外标头。",
    }),
  })
  .meta({
    id: "V2RayHTTPUpgradeOptions",
    title: "V2Ray HTTPUpgrade Options",
    title_zh: "V2Ray HTTPUpgrade 选项",
  });

export const V2RayTransportOptions = z
  .discriminatedUnion("type", [
    V2RayHTTPOptions,
    V2RayWebsocketOptions,
    V2RayQUICOptions,
    V2RayGRPCOptions,
    V2RayHTTPUpgradeOptions,
  ])
  .meta({
    id: "V2RayTransportOptions",
    title: "V2Ray Transport Options",
    title_zh: "V2Ray 传输选项",
  });
export type V2RayTransportOptions = z.infer<typeof V2RayTransportOptions>;
// #endregion

// #region Other Shared
export const UDPOverTCPOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description:
        "Enable the UDP over TCP protocol (proprietary SagerNet extension).",
      description_zh: "启用 UDP over TCP 协议（SagerNet 专有扩展）。",
    }),
    version: z.number().int().optional().meta({
      description: "The protocol version, `1` or `2` (defaults to `2`).",
      description_zh: "协议版本，`1` 或 `2`（默认 `2`）。",
    }),
  })
  .meta({
    id: "UDPOverTCPOptions",
    title: "UDP Over TCP Options",
    title_zh: "UDP Over TCP 选项",
  });
export type UDPOverTCPOptions = z.infer<typeof UDPOverTCPOptions>;
// #endregion
