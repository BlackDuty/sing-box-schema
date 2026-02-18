import { z } from "zod";
import { listableString } from "@/utils";
import { DNSRule } from "./rules/dns-rule";
import {
  DialerOptions,
  DomainStrategy,
  HttpHeader,
  OutboundTLSOptions,
} from "./shared";

// #region Legacy DNS Servers
const LegacyDNSServerAddress = z.union([
  z.literal("local").meta({
    description: "System",
    description_zh: "系统默认",
  }),
  z.literal("fakeip").meta({
    description: "FakeIP",
    description_zh: "FakeIP",
  }),
  z.string().startsWith("tcp://").meta({
    description: "TCP",
    description_zh: "TCP",
  }),
  z.union([z.ipv4(), z.ipv6(), z.string().startsWith("udp://")]).meta({
    description: "UDP",
    description_zh: "UDP",
  }),
  z.string().startsWith("tls://").meta({
    description: "TLS",
    description_zh: "TLS",
  }),
  z.string().startsWith("http://").meta({
    description: "HTTP",
    description_zh: "HTTP",
  }),
  z.string().startsWith("quic://").meta({
    description: "QUIC",
    description_zh: "QUIC",
  }),
  z.string().startsWith("h3://").meta({
    description: "HTTP3",
    description_zh: "HTTP3",
  }),
  z
    .union([
      z.literal("rcode://success").meta({
        description: "No error",
        description_zh: "无错误",
      }),
      z.literal("rcode://format_error").meta({
        description: "Format error",
        description_zh: "请求格式错误",
      }),
      z.literal("rcode://server_failure").meta({
        description: "Server failure",
        description_zh: "服务器出错",
      }),
      z.literal("rcode://name_error").meta({
        description: "Non-existent domain",
        description_zh: "域名不存在",
      }),
      z.literal("rcode://not_implemented").meta({
        description: "Not implemented",
        description_zh: "功能未实现",
      }),
      z.literal("rcode://refused").meta({
        description: "Query refused",
        description_zh: "请求被拒绝",
      }),
    ])
    .meta({
      description: "RCode",
      description_zh: "RCode",
    }),
  z.string().startsWith("dhcp://").meta({
    description: "DHCP",
    description_zh: "DHCP",
  }),
]);

export const LegacyDNSServerOptions = z
  .object({
    tag: z.string().meta({
      description: "The tag of the dns server.",
      description_zh: "DNS 服务器的标签。",
    }),
    address: LegacyDNSServerAddress.meta({
      description: "The address of the dns server.",
      description_zh: "DNS 服务器的地址。",
    }),
    address_resolver: z.string().optional().meta({
      description:
        "Tag of another server to resolve the domain name in the address. Required if the address contains a domain.",
      description_zh:
        "用于解析本 DNS 服务器的域名的另一个 DNS 服务器的标签。如果地址包含域名，则为必填项。",
    }),
    address_strategy: DomainStrategy.optional().meta({
      description:
        "The domain strategy for resolving the domain name in the address. One of `prefer_ipv4` `prefer_ipv6` `ipv4_only` `ipv6_only`. `dns.strategy` will be used if empty.",
      description_zh:
        "用于解析本 DNS 服务器的域名的策略。可选项：`prefer_ipv4` `prefer_ipv6` `ipv4_only` `ipv6_only`。为空时将使用 `dns.strategy`。",
    }),
    strategy: DomainStrategy.optional().meta({
      description:
        "Default domain strategy for resolving the domain names. One of `prefer_ipv4` `prefer_ipv6` `ipv4_only` `ipv6_only`. Takes no effect if overridden by other settings.",
      description_zh:
        "默认解析策略。可选项：`prefer_ipv4` `prefer_ipv6` `ipv4_only` `ipv6_only`。如果被其他设置覆盖则不生效。",
    }),
    detour: z.string().optional().meta({
      description:
        "Tag of an outbound for connecting to the dns server. Default outbound will be used if empty.",
      description_zh:
        "用于连接到 DNS 服务器的出站的标签。如果为空，将使用默认出站。",
    }),
    address_fallback_delay: z.string().optional().meta({
      description:
        "The time to wait for a response from the primary upstream DNS server before trying a fallback resolver.",
      description_zh: "在尝试回退解析器之前等待主上游 DNS 服务器响应的时间。",
      deprecated: true,
    }),
    client_subnet: z.string().optional().meta({
      description:
        "Append a `edns0-subnet` OPT extra record with the specified IP prefix to every query by default. If the value is an IP address instead of a prefix, `/32` or `/128` will be appended automatically. Can be overridden by `rules.[].client_subnet`. Will override `dns.client_subnet`.",
      description_zh:
        "默认情况下，将带有指定 IP 前缀的 `edns0-subnet` OPT 附加记录附加到每个查询。如果值是 IP 地址而不是前缀，则会自动附加 `/32` 或 `/128`。可以被 `rules.[].client_subnet` 覆盖。将覆盖 `dns.client_subnet`。",
    }),
  })
  .meta({
    id: "LegacyDNSServer",
    title: "Legacy DNS Server",
    title_zh: "旧式 DNS 服务器",
    description:
      "Legacy DNS servers is deprecated and will be removed in sing-box 1.14.0, check Migration.",
    description_zh:
      "旧的 DNS 服务器配置已废弃且将在 sing-box 1.14.0 中被移除，参阅 迁移指南。",
    deprecated: true,
  });
// #endregion

// #region DNS Servers
export const LocalDNSServerOptions = z
  .object({
    type: z.literal("local"),
    tag: z.string(),

    ...DialerOptions.shape,
  })
  .meta({
    id: "LocalDNSServerOptions",
    title: "Local DNS Server",
    title_zh: "本地 DNS 服务器",
  });

export const HostsDNSServerOptions = z
  .object({
    type: z.literal("hosts"),
    tag: z.string(),
    path: listableString.optional().meta({
      description:
        "List of paths to hosts files. `/etc/hosts` is used by default on Unix and `C:\\Windows\\System32\\Drivers\\etc\\hosts` is used by default on Windows.",
      description_zh:
        "主机文件路径列表。Unix 上默认使用 `/etc/hosts`，Windows 上默认使用 `C:\\Windows\\System32\\Drivers\\etc\\hosts`。",
    }),
    predefined: z.record(z.string(), listableString).optional().meta({
      description: "Predefined hosts.",
      description_zh: "预定义的 hosts 条目。",
    }),
  })
  .meta({
    id: "HostsDNSServerOptions",
    title: "Hosts DNS Server",
    title_zh: "Hosts DNS 服务器",
  });

export const TCPDNSServerOptions = z
  .object({
    type: z.literal("tcp"),
    tag: z.string(),
    server: z.string().meta({
      description:
        "The address of the TCP DNS server. If a domain name is used, `domain_resolver` must also be set to resolve the IP address.",
      description_zh:
        "TCP DNS 服务器的地址。如果使用域名，还必须设置 `domain_resolver` 来解析 IP 地址。",
    }),
    server_port: z.number().int().optional().meta({
      description:
        "The port of the TCP DNS server. `53` will be used by default.",
      description_zh: "TCP DNS 服务器的端口。默认使用 `53`。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "TCPDNSServerOptions",
    title: "TCP DNS Server",
    title_zh: "TCP DNS 服务器",
  });

export const UDPDNSServerOptions = z
  .object({
    type: z.literal("udp"),
    tag: z.string(),
    server: z.string().meta({
      description:
        "The address of the UDP DNS server. If a domain name is used, `domain_resolver` must also be set to resolve the IP address.",
      description_zh:
        "UDP DNS 服务器的地址。如果使用域名，还必须设置 `domain_resolver` 来解析 IP 地址。",
    }),
    server_port: z.number().int().optional().meta({
      description:
        "The port of the UDP DNS server. `53` will be used by default.",
      description_zh: "UDP DNS 服务器的端口。默认使用 `53`。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "UDPDNSServerOptions",
    title: "UDP DNS Server",
    title_zh: "UDP DNS 服务器",
  });

export const TLSDNSServerOptions = z
  .object({
    type: z.literal("tls"),
    tag: z.string(),
    server: z.string().meta({
      description:
        "The address of the TLS DNS server. If a domain name is used, `domain_resolver` must also be set to resolve the IP address.",
      description_zh:
        "TLS DNS 服务器的地址。如果使用域名，还必须设置 `domain_resolver` 来解析 IP 地址。",
    }),
    server_port: z.number().int().optional().meta({
      description:
        "The port of the TLS DNS server. `853` will be used by default.",
      description_zh: "TLS DNS 服务器的端口。默认使用 `853`。",
    }),
    tls: OutboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh:
        "TLS 配置，参见 [TLS](/configuration/shared/tls/#outbound)。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "TLSDNSServerOptions",
    title: "TLS DNS Server",
    title_zh: "TLS DNS 服务器",
  });

export const QUICDNSServerOptions = z
  .object({
    type: z.literal("quic"),
    tag: z.string(),
    server: z.string().meta({
      description:
        "The address of the QUIC DNS server. If a domain name is used, `domain_resolver` must also be set to resolve the IP address.",
      description_zh:
        "QUIC DNS 服务器的地址。如果使用域名，还必须设置 `domain_resolver` 来解析 IP 地址。",
    }),
    server_port: z.number().int().optional().meta({
      description:
        "The port of the QUIC DNS server. `853` will be used by default.",
      description_zh: "QUIC DNS 服务器的端口。默认使用 `853`。",
    }),
    tls: OutboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh:
        "TLS 配置，参见 [TLS](/configuration/shared/tls/#outbound)。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "QUICDNSServerOptions",
    title: "QUIC DNS Server",
    title_zh: "QUIC DNS 服务器",
  });

export const HTTPSDNSServerOptions = z
  .object({
    type: z.literal("https"),
    tag: z.string(),
    server: z.string().meta({
      description:
        "The address of the HTTPS DNS server. If a domain name is used, `domain_resolver` must also be set to resolve the IP address.",
      description_zh:
        "HTTPS DNS 服务器的地址。如果使用域名，还必须设置 `domain_resolver` 来解析 IP 地址。",
    }),
    server_port: z.number().int().optional().meta({
      description:
        "The port of the HTTPS DNS server. `443` will be used by default.",
      description_zh: "HTTPS DNS 服务器的端口。默认使用 `443`。",
    }),
    path: z.string().optional().meta({
      description:
        "The path of the HTTPS DNS server. `/dns-query` will be used by default.",
      description_zh: "HTTPS DNS 服务器的路径。默认使用 `/dns-query`。",
    }),
    method: z.string().optional().meta({
      description: "The HTTP method for DNS-over-HTTPS requests.",
      description_zh: "DNS-over-HTTPS 请求使用的 HTTP 方法。",
    }),
    headers: HttpHeader.optional().meta({
      description: "Additional headers to be sent to the DNS server.",
      description_zh: "要发送到 DNS 服务器的额外请求头。",
    }),
    tls: OutboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh:
        "TLS 配置，参见 [TLS](/configuration/shared/tls/#outbound)。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "HTTPSDNSServerOptions",
    title: "HTTPS DNS Server",
    title_zh: "HTTPS DNS 服务器",
  });

export const HTTP3DNSServerOptions = z
  .object({
    type: z.literal("h3"),
    tag: z.string(),
    server: z.string().meta({
      description:
        "The address of the HTTP3 DNS server. If a domain name is used, `domain_resolver` must also be set to resolve the IP address.",
      description_zh:
        "HTTP3 DNS 服务器的地址。如果使用域名，还必须设置 `domain_resolver` 来解析 IP 地址。",
    }),
    server_port: z.number().int().optional().meta({
      description:
        "The port of the HTTP3 DNS server. `443` will be used by default.",
      description_zh: "HTTP3 DNS 服务器的端口。默认使用 `443`。",
    }),
    path: z.string().optional().meta({
      description:
        "The path of the HTTP3 DNS server. `/dns-query` will be used by default.",
      description_zh: "HTTP3 DNS 服务器的路径。默认使用 `/dns-query`。",
    }),
    headers: HttpHeader.optional().meta({
      description: "Additional headers to be sent to the DNS server.",
      description_zh: "要发送到 DNS 服务器的额外请求头。",
    }),
    tls: OutboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh:
        "TLS 配置，参见 [TLS](/configuration/shared/tls/#outbound)。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "HTTP3DNSServerOptions",
    title: "HTTP3 DNS Server",
    title_zh: "HTTP3 DNS 服务器",
  });

export const DHCPDNSServerOptions = z
  .object({
    type: z.literal("dhcp"),
    tag: z.string(),
    interface: z.string().optional().meta({
      description:
        "Interface name to listen on. The default interface will be used when empty.",
      description_zh: "用于监听的接口名称。为空时将使用默认接口。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "DHCPDNSServerOptions",
    title: "DHCP DNS Server",
    title_zh: "DHCP DNS 服务器",
  });

export const FakeIPDNSServerOptions = z
  .object({
    type: z.literal("fakeip"),
    tag: z.string(),
    inet4_range: z.string().optional().meta({
      description: "IPv4 address range for FakeIP.",
      description_zh: "用于 FakeIP 的 IPv4 地址范围。",
    }),
    inet6_range: z.string().optional().meta({
      description: "IPv6 address range for FakeIP.",
      description_zh: "用于 FakeIP 的 IPv6 地址范围。",
    }),
  })
  .meta({
    id: "FakeIPDNSServerOptions",
    title: "FakeIP DNS Server",
    title_zh: "FakeIP DNS 服务器",
  });

export const TailscaleDNSServerOptions = z
  .object({
    type: z.literal("tailscale"),
    tag: z.string(),
    endpoint: z.string().meta({
      description: "The tag of the Tailscale Endpoint.",
      description_zh: "Tailscale 端点的标签。",
    }),
    accept_default_resolvers: z.boolean().optional().meta({
      description:
        "Indicates whether default DNS resolvers should be accepted for fallback queries in addition to MagicDNS. If not enabled, `NXDOMAIN` will be returned for non-Tailscale domain queries.",
      description_zh:
        "是否在 MagicDNS 之外还接受默认 DNS 解析器作为回退查询。若未启用，对非 Tailscale 域名查询将返回 `NXDOMAIN`。",
    }),
  })
  .meta({
    id: "TailscaleDNSServerOptions",
    title: "Tailscale DNS Server",
    title_zh: "Tailscale DNS 服务器",
  });

export const ResolvedDNSServerOptions = z
  .object({
    type: z.literal("resolved"),
    tag: z.string(),
    service: z.string().meta({
      description: "The tag of the Resolved Service.",
      description_zh: "Resolved 服务的标签。",
    }),
    accept_default_resolvers: z.boolean().optional().meta({
      description:
        "Indicates whether the default DNS resolvers should be accepted for fallback queries in addition to matching domains. Specifically, default DNS resolvers are DNS servers that have `SetLinkDefaultRoute` or `SetLinkDomains ~.` set. If not enabled, `NXDOMAIN` will be returned for requests that do not match search or match domains.",
      description_zh:
        "是否在匹配域之外还接受默认 DNS 解析器作为回退查询。默认 DNS 解析器是设置了 `SetLinkDefaultRoute` 或 `SetLinkDomains ~.` 的 DNS 服务器。若未启用，对不匹配搜索或匹配域的请求将返回 `NXDOMAIN`。",
    }),
  })
  .meta({
    id: "ResolvedDNSServerOptions",
    title: "Resolved DNS Server",
    title_zh: "Resolved DNS 服务器",
  });

export const DNSServer = z
  .discriminatedUnion("type", [
    LocalDNSServerOptions,
    HostsDNSServerOptions,
    TCPDNSServerOptions,
    UDPDNSServerOptions,
    TLSDNSServerOptions,
    QUICDNSServerOptions,
    HTTPSDNSServerOptions,
    HTTP3DNSServerOptions,
    DHCPDNSServerOptions,
    FakeIPDNSServerOptions,
    TailscaleDNSServerOptions,
    ResolvedDNSServerOptions,
    LegacyDNSServerOptions,
  ])
  .meta({
    id: "DNSServer",
    title: "DNS Server",
    title_zh: "DNS 服务器",
  });
export type DNSServer = z.infer<typeof DNSServer>;
// #endregion

// #region DNS
export const DNSClientOptions = z.object({
  strategy: DomainStrategy.optional().meta({
    description: "Default domain strategy for resolving the domain names.",
    description_zh: "默认解析域名策略。",
  }),
  disable_cache: z.boolean().optional().meta({
    description: "Disable dns cache.",
    description_zh: "禁用 DNS 缓存。",
  }),
  disable_expire: z.boolean().optional().meta({
    description: "Disable dns cache expire.",
    description_zh: "禁用 DNS 缓存过期。",
  }),
  independent_cache: z.boolean().optional().meta({
    description:
      "Make each DNS server's cache independent for special purposes. If enabled, will slightly degrade performance.",
    description_zh:
      "使每个 DNS 服务器的缓存独立，以满足特殊目的。如果启用，将轻微降低性能。",
  }),
  cache_capacity: z.number().int().optional().meta({
    description: "LRU cache capacity. Value less than 1024 will be ignored.",
    description_zh: "LRU 缓存容量。小于 1024 的值将被忽略。",
  }),
  client_subnet: z.string().optional().meta({
    description:
      "Append a `edns0-subnet` OPT extra record with the specified IP prefix to every query by default. If the value is an IP address instead of a prefix, `/32` or `/128` will be appended automatically. Can be overridden by `servers.[].client_subnet` or `rules.[].client_subnet`.",
    description_zh:
      "默认情况下，将带有指定 IP 前缀的 `edns0-subnet` OPT 附加记录附加到每个查询。如果值是 IP 地址而不是前缀，则会自动附加 `/32` 或 `/128`。可以被 `servers.[].client_subnet` 或 `rules.[].client_subnet` 覆盖。",
  }), // prefixable
});

export const LegacyDNSFakeIPOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description: "Enable FakeIP service.",
      description_zh: "启用 FakeIP 服务。",
    }),
    inet4_range: z.string().optional().meta({
      description: "IPv4 address range for FakeIP.",
      description_zh: "用于 FakeIP 的 IPv4 地址范围。",
    }), // prefix
    inet6_range: z.string().optional().meta({
      description: "IPv6 address range for FakeIP.",
      description_zh: "用于 FakeIP 的 IPv6 地址范围。",
    }), // prefix
  })
  .meta({
    id: "LegacyDNSFakeIPOptions",
    title: "Legacy DNS FakeIP",
    title_zh: "旧版 DNS FakeIP",
    description: "Legacy fake-ip configuration is deprecated",
    description_zh: "旧的 fake-ip 配置已废弃",
    deprecated: true,
  });

export const DNSOptions = z
  .object({
    servers: z.array(DNSServer).optional().meta({
      description: "List of DNS Servers",
      description_zh: "一组 DNS 服务器",
    }),
    rules: z.array(DNSRule).optional().meta({
      description: "List of DNS Rules",
      description_zh: "一组 DNS 规则",
    }),
    final: z.string().optional().meta({
      description:
        "Default DNS server tag. The first server will be used if empty.",
      description_zh: "默认 DNS 服务器的标签。默认使用第一个服务器。",
    }),
    reverse_mapping: z.boolean().optional().meta({
      description:
        "Stores a reverse mapping of IP addresses after responding to a DNS query in order to provide domain names when routing.",
      description_zh:
        "在响应 DNS 查询后存储 IP 地址的反向映射以为路由目的提供域名。",
    }),
    fakeip: LegacyDNSFakeIPOptions.optional().meta({
      description: "FakeIP settings.",
      description_zh: "FakeIP 设置。",
    }),

    ...DNSClientOptions.shape,
  })
  .meta({
    id: "DNSOptions",
    title: "DNS",
    title_zh: "DNS",
  });

export type DNSOptions = z.infer<typeof DNSOptions>;
// #endregion
