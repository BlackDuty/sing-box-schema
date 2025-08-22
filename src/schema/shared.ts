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
    description: "Enable sniffing.",
    description_zh: "启用协议探测。",
    deprecated: true,
  }),
  sniff_override_destination: z.boolean().optional().meta({
    description:
      "Override the connection destination address with the sniffed domain.",
    description_zh: "用探测出的域名覆盖连接目标地址。",
    deprecated: true,
  }),
  sniff_timeout: z.string().optional().meta({
    description: "Timeout for sniffing.",
    description_zh: "探测超时时间。",
    deprecated: true,
  }),
  domain_strategy: DomainStrategy.optional().meta({
    description:
      "If set, the requested domain name will be resolved to IP before routing.",
    description_zh: "如果设置，请求的域名将在路由之前解析为 IP。",
    deprecated: true,
  }),
  udp_disable_domain_unmapping: z.boolean().optional().meta({
    description:
      "If enabled, for UDP proxy requests addressed to a domain, the original packet address will be sent in the response instead of the mapped domain.",
    description_zh:
      "如果启用，对于地址为域的 UDP 代理请求，将在响应中发送原始包地址而不是映射的域。",
    deprecated: true,
  }),
  detour: z.string().optional().meta({
    description:
      "If set, connections will be forwarded to the specified inbound.",
    description_zh: "如果设置，连接将被转发到指定的入站。",
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
    tcp_keep_alive: z.string().optional().meta({
      description: "TCP keep alive interval.",
      description_zh: "TCP keep alive 间隔。",
    }),
    tcp_keep_alive_interval: z.string().optional().meta({
      description: "TCP keep alive interval.",
      description_zh: "TCP keep alive 间隔。",
    }),
    tcp_fast_open: z.boolean().optional().meta({
      description: "Enable TCP Fast Open.",
      description_zh: "启用 TCP Fast Open。",
    }),
    tcp_multi_path: z.boolean().optional().meta({
      description: "Enable TCP Multi Path.",
      description_zh: "启用 TCP Multi Path。",
    }),
    udp_fragment: z.boolean().optional().meta({
      description: "Enable UDP fragmentation.",
      description_zh: "启用 UDP 分段。",
    }),
    udp_timeout: z.union([z.string(), z.number()]).optional().meta({
      description: "UDP NAT expiration time.",
      description_zh: "UDP NAT 过期时间。",
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
      description: "Network types to use.",
      description_zh: "要使用的网络类型。",
    }),
    fallback_network_type: listable(NetworkType).optional().meta({
      description: "Fallback network types.",
      description_zh: "备用网络类型。",
    }),
    fallback_delay: z.string().optional().meta({
      description:
        "The length of time to wait before spawning a RFC 6555 Fast Fallback connection.",
      description_zh: "在生成 RFC 6555 快速回退连接之前等待的时间长度。",
    }),
  })
  .meta({
    id: "NetworkStrategy",
    title: "Network Strategy",
    title_zh: "网络策略",
  });
export type NetworkStrategy = z.infer<typeof NetworkStrategy>;

export const DialerOptions = z
  .object({
    detour: z.string().optional().meta({
      description: "The tag of the upstream outbound.",
      description_zh: "上游出站的标签。",
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
      description: "Set netfilter routing mark.",
      description_zh: "设置 netfilter 路由标记。",
    }),
    reuse_addr: z.boolean().optional().meta({
      description: "Reuse listener address.",
      description_zh: "重用监听地址。",
    }),
    connect_timeout: z.string().optional().meta({
      description: "Connect timeout, in golang's Duration format.",
      description_zh: "连接超时，采用 golang 的 Duration 格式。",
    }),
    tcp_fast_open: z.boolean().optional().meta({
      description: "Enable TCP Fast Open.",
      description_zh: "启用 TCP Fast Open。",
    }),
    tcp_multi_path: z.boolean().optional().meta({
      description: "Enable TCP Multi Path.",
      description_zh: "启用 TCP Multi Path。",
    }),
    udp_fragment: z.boolean().optional().meta({
      description: "Enable UDP fragmentation.",
      description_zh: "启用 UDP 分段。",
    }),
    network_strategy: z.union([z.string(), NetworkStrategy]).optional().meta({
      description: "Strategy for selecting network interfaces.",
      description_zh: "用于选择网络接口的策略。",
    }),
    network_type: listable(NetworkType).optional().meta({
      description: "Network types to use.",
      description_zh: "要使用的网络类型。",
    }),
    fallback_network_type: listable(NetworkType).optional().meta({
      description: "Fallback network types.",
      description_zh: "备用网络类型。",
    }),
    fallback_delay: z.string().optional().meta({
      description:
        "The length of time to wait before spawning a RFC 6555 Fast Fallback connection.",
      description_zh: "在生成 RFC 6555 快速回退连接之前等待的时间长度。",
    }),
    domain_strategy: DomainStrategy.optional().meta({
      description: "Default domain strategy for resolving the domain names.",
      description_zh: "默认解析域名策略。",
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
        "Used to verify the hostname on the returned certificates unless insecure is given.",
      description_zh: "用于验证返回证书上的主机名，除非设置不安全。",
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
    certificate: listableString.optional().meta({
      description: "The server certificate line array, in PEM format.",
      description_zh: "服务器 PEM 证书行数组。",
    }),
    certificate_path: z.string().optional().meta({
      description: "The path to the server certificate, in PEM format.",
      description_zh: "服务器 PEM 证书路径。",
    }),
    key: listableString.optional().meta({
      description: "The server private key line array, in PEM format.",
      description_zh: "服务器 PEM 私钥行数组。",
    }),
    key_path: z.string().optional().meta({
      description: "The path to the server private key, in PEM format.",
      description_zh: "服务器 PEM 私钥路径。",
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
      description: "ECH configuration line array, in PEM format.",
      description_zh: "ECH PEM 配置行数组。",
    }),
    config_path: z.string().optional().meta({
      description: "The path to ECH configuration, in PEM format.",
      description_zh: "ECH PEM 配置路径。",
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
      description: "Enable uTLS.",
      description_zh: "启用 uTLS。",
    }),
    fingerprint: z.string().optional().meta({
      description: "uTLS fingerprint.",
      description_zh: "uTLS 指纹。",
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
      description: "Do not send server name in ClientHello.",
      description_zh: "不在 ClientHello 中发送服务器名称。",
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
    certificate: listableString.optional().meta({
      description: "The server certificate line array, in PEM format.",
      description_zh: "服务器 PEM 证书行数组。",
    }),
    certificate_path: z.string().optional().meta({
      description: "The path to the server certificate, in PEM format.",
      description_zh: "服务器 PEM 证书路径。",
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
      description: "Enable TCP Brutal congestion control algorithm.",
      description_zh: "启用 TCP Brutal 拥塞控制算法。",
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
      description: "Enable the UDP over TCP protocol.",
      description_zh: "启用 UDP over TCP 协议。",
    }),
    version: z.number().int().optional().meta({
      description: "The protocol version, `1` or `2`.",
      description_zh: "协议版本，`1` 或 `2`。",
    }),
  })
  .meta({
    id: "UDPOverTCPOptions",
    title: "UDP Over TCP Options",
    title_zh: "UDP Over TCP 选项",
  });
export type UDPOverTCPOptions = z.infer<typeof UDPOverTCPOptions>;
// #endregion
