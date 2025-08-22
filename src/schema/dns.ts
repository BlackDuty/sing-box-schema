import { z } from "zod";
import { DNSRule } from "./rules/dns-rule";
import { DomainStrategy } from "./shared";

// #region DNS Servers
const DNSServerAddress = z.union([
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

export const DNSServer = z.object({
  tag: z.string().meta({
    description: "The tag of the dns server.",
    description_zh: "DNS 服务器的标签。",
  }),
  address: DNSServerAddress.meta({
    description: "The address of the dns server.",
    description_zh: "DNS 服务器的地址。",
  }),
  address_resolver: z.string().optional().meta({
    description:
      "Tag of a another server to resolve the domain name in the address.",
    description_zh: "用于解析本 DNS 服务器的域名的另一个 DNS 服务器的标签。",
  }),
  address_strategy: DomainStrategy.optional().meta({
    description:
      "The domain strategy for resolving the domain name in the address.",
    description_zh: "用于解析本 DNS 服务器的域名的策略。",
  }),
  strategy: DomainStrategy.optional().meta({
    description: "Default domain strategy for resolving the domain names.",
    description_zh: "默认解析策略。",
  }),
  detour: z.string().optional().meta({
    description: "Tag of an outbound for connecting to the dns server.",
    description_zh: "用于连接到 DNS 服务器的出站的标签。",
  }),
  client_subnet: z.string().optional().meta({
    description:
      "Append a `edns0-subnet` OPT extra record with the specified IP prefix to every query by default.",
    description_zh:
      "默认情况下，将带有指定 IP 前缀的 `edns0-subnet` OPT 附加记录附加到每个查询。",
  }),
});
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
    description: "LRU cache capacity.",
    description_zh: "LRU 缓存容量。",
  }),
  client_subnet: z.string().optional().meta({
    description:
      "Append a `edns0-subnet` OPT extra record with the specified IP prefix to every query by default.",
    description_zh:
      "默认情况下，将带有指定 IP 前缀的 `edns0-subnet` OPT 附加记录附加到每个查询。",
  }), // prefixable
});

export const DNSFakeIPOptions = z
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
    id: "DNSFakeIPOptions",
    title: "DNS FakeIP",
    title_zh: "DNS FakeIP",
    description: "FakeIP options",
    description_zh: "FakeIP 设置",
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
      description: "Default dns server tag.",
      description_zh: "默认 DNS 服务器的标签。",
    }),
    reverse_mapping: z.boolean().optional().meta({
      description:
        "Stores a reverse mapping of IP addresses after responding to a DNS query in order to provide domain names when routing.",
      description_zh:
        "在响应 DNS 查询后存储 IP 地址的反向映射以为路由目的提供域名。",
    }),
    fakeip: DNSFakeIPOptions.optional().meta({
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
