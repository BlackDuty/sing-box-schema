import { z } from "zod";
import { listableString } from "@/utils";
import { DNSRule } from "./rules/dns-rule";
import {
  DialerOptions,
  DomainStrategy,
  HttpHeader,
  OutboundTLSOptions,
} from "./shared";

// #region DNS Servers
export const LocalDNSServerOptions = z
  .object({
    type: z.literal("local"),
    tag: z.string(),

    prefer_go: z.boolean().optional().meta({
      description:
        "When enabled, `local` DNS server will resolve DNS by dialing itself whenever possible.",
      description_zh:
        "启用后，`local` DNS 服务器将尽可能通过拨号自身来解析 DNS。",
    }),

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
    method: z.string().optional().meta({
      description: "The HTTP method for DNS-over-HTTP/3 requests.",
      description_zh: "DNS-over-HTTP/3 请求使用的 HTTP 方法。",
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
    accept_search_domain: z.boolean().optional().meta({
      description:
        "Indicates whether the Tailscale search domain should be accepted.",
      description_zh: "是否接受 Tailscale 搜索域。",
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
  .union([
    z.lazy(() =>
      z.discriminatedUnion("type", [
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
      ]),
    ),
  ])
  .meta({
    id: "DNSServer",
    title: "DNS Server",
    title_zh: "DNS 服务器",
  });
export type DNSServer = z.infer<typeof DNSServer>;
// #endregion

// #region DNS
export const OptimisticDNSOptions = z
  .union([
    z.boolean(),
    z.object({
      enabled: z.boolean().optional().meta({
        description: "Enable optimistic DNS cache.",
        description_zh: "启用乐观 DNS 缓存。",
      }),
      timeout: z.string().optional().meta({
        description:
          "Maximum time to wait for the upstream response before using the optimistic cache response.",
        description_zh: "在使用乐观缓存响应之前等待上游响应的最长时间。",
      }),
    }),
  ])
  .meta({
    id: "OptimisticDNSOptions",
    title: "Optimistic DNS",
    title_zh: "乐观 DNS",
  });

export const DNSClientOptions = z.object({
  strategy: DomainStrategy.optional().meta({
    description:
      "Default domain strategy for resolving the domain names. One of `prefer_ipv4` `prefer_ipv6` `ipv4_only` `ipv6_only`.",
    description_zh:
      "默认解析域名策略。可选值：`prefer_ipv4` `prefer_ipv6` `ipv4_only` `ipv6_only`。",
  }),
  timeout: z.string().optional().meta({
    description: "Timeout for DNS queries.",
    description_zh: "DNS 查询超时时间。",
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
  optimistic: OptimisticDNSOptions.optional().meta({
    description: "Optimistic DNS cache options.",
    description_zh: "乐观 DNS 缓存选项。",
  }),
  client_subnet: z.string().optional().meta({
    description:
      "Append a `edns0-subnet` OPT extra record with the specified IP prefix to every query by default. If the value is an IP address instead of a prefix, `/32` or `/128` will be appended automatically. Can be overridden by `servers.[].client_subnet` or `rules.[].client_subnet`.",
    description_zh:
      "默认情况下，将带有指定 IP 前缀的 `edns0-subnet` OPT 附加记录附加到每个查询。如果值是 IP 地址而不是前缀，则会自动附加 `/32` 或 `/128`。可以被 `servers.[].client_subnet` 或 `rules.[].client_subnet` 覆盖。",
  }), // prefixable
});

export const DNSOptions = z
  .object({
    servers: z.array(DNSServer).optional().meta({
      description: "List of [DNS Server](./server/)",
      description_zh: "一组 [DNS 服务器](./server/)",
    }),
    rules: z.array(DNSRule).optional().meta({
      description: "List of [DNS Rule](./rule/)",
      description_zh: "一组 [DNS 规则](./rule/)",
    }),
    final: z.string().optional().meta({
      description:
        "Default DNS server tag. The first server will be used if empty.",
      description_zh: "默认 DNS 服务器的标签。默认使用第一个服务器。",
    }),
    reverse_mapping: z.boolean().optional().meta({
      description:
        "Stores a reverse mapping of IP addresses after responding to a DNS query in order to provide domain names when routing. Since this process relies on the act of resolving domain names by an application before making a request, it can be problematic in environments such as macOS, where DNS is proxied and cached by the system.",
      description_zh:
        "在响应 DNS 查询后存储 IP 地址的反向映射以为路由目的提供域名。由于此过程依赖于应用程序在发出请求之前解析域名的行为，因此在 macOS 等 DNS 由系统代理和缓存的环境中可能会出现问题。",
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
