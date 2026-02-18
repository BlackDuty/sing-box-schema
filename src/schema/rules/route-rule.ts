import { z } from "zod";
import { DialerOptions, NetworkType } from "@/schema/shared";
import { listable, listableInts, listableString } from "../../utils";

// #region Route Actions
const RuleActionRouteOptions = z
  .object({
    override_address: z.string().optional().meta({
      description: "Override the connection destination address.",
      description_zh: "覆盖连接目标地址。",
    }),
    override_port: z.number().int().min(0).max(65535).optional().meta({
      description: "Override the connection destination port.",
      description_zh: "覆盖连接目标端口。",
    }),
    network_strategy: z
      .enum(["prefer_ipv4", "prefer_ipv6", "ipv4_only", "ipv6_only"])
      .optional()
      .meta({
        description:
          "See Dial Fields (/configuration/shared/dial/#network_strategy) for details. Only take effect if outbound is direct without `outbound.bind_interface`, `outbound.inet4_bind_address` and `outbound.inet6_bind_address` set.",
        description_zh:
          "详情参阅 [拨号字段](/configuration/shared/dial/#network_strategy)。仅当出站为 direct 且 `outbound.bind_interface`、`outbound.inet4_bind_address` 与 `outbound.inet6_bind_address` 均未设置时生效。",
      }),
    network_type: listable(NetworkType).optional().meta({
      description:
        "See Dial Fields (/configuration/shared/dial/#network_type) for details.",
      description_zh:
        "详情参阅 [拨号字段](/configuration/shared/dial/#network_type)。",
    }),
    fallback_network_type: listable(NetworkType).optional().meta({
      description:
        "See Dial Fields (/configuration/shared/dial/#fallback_network_type) for details.",
      description_zh:
        "详情参阅 [拨号字段](/configuration/shared/dial/#fallback_network_type)。",
    }),
    fallback_delay: z.string().optional().meta({
      description:
        "See Dial Fields (/configuration/shared/dial/#fallback_delay) for details.",
      description_zh:
        "详情参阅 [拨号字段](/configuration/shared/dial/#fallback_delay)。",
    }),
    udp_disable_domain_unmapping: z.boolean().optional().meta({
      description:
        "If enabled, for UDP proxy requests addressed to a domain, the original packet address will be sent in the response instead of the mapped domain.",
      description_zh:
        "如果启用，对于地址为域的 UDP 代理请求，将在响应中发送原始包地址而不是映射的域。",
    }),
    udp_connect: z.boolean().optional().meta({
      description:
        "If enabled, attempts to connect UDP connection to the destination instead of listen.",
      description_zh:
        "如果启用，将尝试将 UDP 连接 connect 到目标而不是 listen。",
    }),
    udp_timeout: z.string().optional().meta({
      description:
        "Timeout for UDP connections. Setting a larger value than the UDP timeout in inbounds will have no effect. Default values for sniffed connections: `10s` for `dns`, `ntp`, `stun`; `30s` for `quic`, `dtls`. If no protocol is sniffed, ports `53`, `123`, `443`, and `3478` will be recognized as `dns`, `ntp`, `quic`, and `stun`, respectively.",
      description_zh:
        "UDP 连接超时时间。设置比入站 UDP 超时更大的值将无效。已探测协议连接的默认值：`dns`、`ntp`、`stun` 为 `10s`，`quic`、`dtls` 为 `30s`。如果没有探测到协议，端口 `53`、`123`、`443` 与 `3478` 将分别被识别为 `dns`、`ntp`、`quic` 与 `stun`。",
    }),
    tls_fragment: z.boolean().optional().meta({
      description:
        "Fragment TLS handshakes to bypass firewalls. This feature is intended to circumvent simple firewalls based on plaintext packet matching, and should not be used to circumvent real censorship. Due to poor performance, try `tls_record_fragment` first, and only apply to server names known to be blocked. On Linux, Apple platforms, (administrator privileges required) Windows, the wait time can be automatically detected. Otherwise, it will fall back to waiting for a fixed time specified by `tls_fragment_fallback_delay`. In addition, if the actual wait time is less than 20ms, it will also fall back to waiting for a fixed time because the target is considered to be local or behind a transparent proxy.",
      description_zh:
        "通过分段 TLS 握手数据包来绕过防火墙检测。此功能旨在规避基于明文数据包匹配的简单防火墙，不应被用于规避真正的审查。由于性能不佳，请优先尝试 `tls_record_fragment`，且仅应用于已知被阻止的服务器名称。在 Linux、Apple 平台和需要管理员权限的 Windows 上可自动检测等待时间，否则将回退到 `tls_fragment_fallback_delay` 指定的固定等待时间。此外，若实际等待时间小于 20 毫秒，也会回退至固定等待时间模式，因为目标被判定为本地或透明代理。",
    }),
    tls_fragment_fallback_delay: z.string().optional().meta({
      description:
        "The fallback value used when TLS segmentation cannot automatically determine the wait time. `500ms` is used by default.",
      description_zh:
        "当 TLS 分片功能无法自动判定等待时间时使用的回退值。默认使用 `500ms`。",
    }),
    tls_record_fragment: z.boolean().optional().meta({
      description:
        "Fragment TLS handshake into multiple TLS records to bypass firewalls.",
      description_zh:
        "通过分段 TLS 握手数据包到多个 TLS 记录来绕过防火墙检测。",
    }),
  })
  .meta({
    id: "RuleActionRouteOptions",
    title: "Rule Action Route Options",
    title_zh: "规则动作路由选项",
  });

const RuleActionSniff = z
  .object({
    action: z.literal("sniff").meta({
      description: "Performs protocol sniffing on connections.",
      description_zh: "对连接执行协议嗅探。",
    }),
    sniffer: listableString.optional().meta({
      description:
        "Enabled sniffers. All sniffers enabled by default. Available protocol values can be found in Protocol Sniff (/configuration/route/sniff/).",
      description_zh:
        "启用的探测器。默认启用所有探测器。可用的协议值可在 [协议嗅探](/configuration/route/sniff/) 中找到。",
    }),
    timeout: z.string().optional().meta({
      description: "Timeout for sniffing. `300ms` is used by default.",
      description_zh: "探测超时时间。默认使用 300ms。",
    }),
  })
  .meta({
    id: "RuleActionSniff",
    title: "Rule Action Sniff",
    title_zh: "规则动作嗅探",
  });

const RuleActionResolve = z
  .object({
    action: z.literal("resolve").meta({
      description: "Resolve request destination from domain to IP addresses.",
      description_zh: "将请求的目标从域名解析为 IP 地址。",
    }),
    server: z.string().optional().meta({
      description:
        "Specifies DNS server tag to use instead of selecting through DNS routing.",
      description_zh:
        "指定要使用的 DNS 服务器的标签，而不是通过 DNS 路由进行选择。",
    }),
    strategy: z
      .enum(["prefer_ipv4", "prefer_ipv6", "ipv4_only", "ipv6_only"])
      .optional()
      .meta({
        description:
          "DNS resolution strategy, available values are: `prefer_ipv4`, `prefer_ipv6`, `ipv4_only`, `ipv6_only`. `dns.strategy` will be used by default.",
        description_zh:
          "DNS 解析策略，可选值为 `prefer_ipv4`、`prefer_ipv6`、`ipv4_only`、`ipv6_only`。默认使用 `dns.strategy`。",
      }),
    disable_cache: z.boolean().optional().meta({
      description: "Disable cache and save cache in this query.",
      description_zh: "在此查询中禁用缓存。",
    }),
    rewrite_ttl: z.number().int().optional().nullable().meta({
      description: "Rewrite TTL in DNS responses.",
      description_zh: "重写 DNS 回应中的 TTL。",
    }),
    client_subnet: z.string().optional().nullable().meta({
      description:
        "Append a `edns0-subnet` OPT extra record with the specified IP prefix to every query by default. If the value is an IP address instead of a prefix, `/32` or `/128` will be appended automatically. Will override `dns.client_subnet`.",
      description_zh:
        "默认情况下，将带有指定 IP 前缀的 `edns0-subnet` OPT 附加记录附加到每个查询。如果值是 IP 地址而不是前缀，则会自动附加 `/32` 或 `/128`。将覆盖 `dns.client_subnet`。",
    }),
  })
  .meta({
    id: "RuleActionResolve",
    title: "Rule Action Resolve",
    title_zh: "规则动作解析",
  });

const RuleActionRouteByDefault = z.object({
  outbound: z.string().meta({
    description: "Tag of target outbound.",
    description_zh: "目标出站的标签。",
  }),
  ...RuleActionRouteOptions.shape,
});

const RuleActionRoute = z
  .object({
    action: z.literal("route").meta({
      description: "Action type.",
      description_zh: "动作类型。",
    }),
    ...RuleActionRouteByDefault.shape,
  })
  .meta({
    id: "RuleActionRoute",
    title: "Rule Action Route",
    title_zh: "规则动作路由",
  });

const RuleActionReject = z
  .object({
    action: z.literal("reject").meta({
      description: "Action type.",
      description_zh: "动作类型。",
    }),
    method: z.enum(["default", "drop"]).optional().meta({
      description:
        "`default`: Reply with TCP RST for TCP connections, and ICMP port unreachable for UDP packets. `drop`: Drop packets.",
      description_zh:
        "`default`: 对于 TCP 连接回复 RST，对于 UDP 包回复 ICMP 端口不可达。`drop`: 丢弃数据包。",
    }),
    no_drop: z.boolean().optional().meta({
      description:
        "If not enabled, `method` will be temporarily overwritten to `drop` after 50 triggers in 30s.",
      description_zh:
        "如果未启用，则 30 秒内触发 50 次后，`method` 将被暂时覆盖为 `drop`。",
    }),
  })
  .meta({
    id: "RuleActionReject",
    title: "Rule Action Reject",
    title_zh: "规则动作拒绝",
  });

const RuleActionDirect = z
  .object({
    action: z.literal("direct").meta({
      description: "Action type.",
      description_zh: "动作类型。",
    }),
    ...DialerOptions.shape,
  })
  .meta({
    id: "RuleActionDirect",
    title: "Rule Action Direct",
    title_zh: "规则动作直连",
  });

const RuleActionHijackDNS = z
  .object({
    action: z.literal("hijack-dns").meta({
      description: "Action type.",
      description_zh: "动作类型。",
    }),
  })
  .meta({
    id: "RuleActionHijackDNS",
    title: "Rule Action Hijack DNS",
    title_zh: "规则动作劫持 DNS",
  });

const RuleActionRouteOptionsWithAction = z
  .object({
    action: z.literal("route-options").meta({
      description: "Action type.",
      description_zh: "动作类型。",
    }),
    ...RuleActionRouteOptions.shape,
  })
  .meta({
    id: "RuleActionRouteOptionsWithAction",
    title: "Rule Action Route Options With Action",
    title_zh: "规则动作路由选项带动作",
  });

// #endregion

// #region Route Rule
const BaseRouteRule = z.object({
  inbound: listableString.optional().meta({
    description: "Tags of Inbound.",
    description_zh: "入站标签。",
  }),
  ip_version: z
    .union([z.literal(4), z.literal(6)])
    .optional()
    .meta({
      description: "4 or 6. Not limited if empty.",
      description_zh: "4 或 6。默认不限制。",
    }),
  network: listable(z.enum(["tcp", "udp"]))
    .optional()
    .meta({
      description: "`tcp` or `udp`.",
      description_zh: "`tcp` 或 `udp`。",
    }),
  auth_user: listableString.optional().meta({
    description: "Username, see each inbound for details.",
    description_zh: "认证用户名，参阅入站设置。",
  }),
  protocol: listable(
    z.enum([
      "http",
      "tls",
      "quic",
      "stun",
      "dns",
      "bittorrent",
      "dtls",
      "ssh",
      "rdp",
      "ntp",
    ]),
  )
    .optional()
    .meta({
      description: "Sniffed protocol.",
      description_zh: "探测到的协议。",
    }),
  client: listable(z.enum(["chromium", "safari", "firefox", "quic-go"]))
    .optional()
    .meta({
      description: "Sniffed client type.",
      description_zh: "探测到的客户端类型。",
    }),
  domain: listableString.optional().meta({
    description: "Match full domain.",
    description_zh: "匹配完整域名。",
  }),
  domain_suffix: listableString.optional().meta({
    description: "Match domain suffix.",
    description_zh: "匹配域名后缀。",
  }),
  domain_keyword: listableString.optional().meta({
    description: "Match domain using keyword.",
    description_zh: "匹配域名关键字。",
  }),
  domain_regex: listableString.optional().meta({
    description: "Match domain using regular expression.",
    description_zh: "匹配域名正则表达式。",
  }),
  geosite: listableString.optional().meta({
    description: "Match geosite.",
    description_zh: "匹配 Geosite。",
    deprecated: true,
  }),
  source_geoip: listableString.optional().meta({
    description: "Match source geoip.",
    description_zh: "匹配源 GeoIP。",
    deprecated: true,
  }),
  geoip: listableString.optional().meta({
    description: "Match geoip.",
    description_zh: "匹配 GeoIP。",
    deprecated: true,
  }),
  source_ip_cidr: listableString.optional().meta({
    description: "Match source IP CIDR.",
    description_zh: "匹配源 IP CIDR。",
  }),
  source_ip_is_private: z.boolean().optional().meta({
    description: "Match non-public source IP.",
    description_zh: "匹配非公开源 IP。",
  }),
  ip_cidr: listableString.optional().meta({
    description: "Match IP CIDR.",
    description_zh: "匹配 IP CIDR。",
  }),
  ip_is_private: z.boolean().optional().meta({
    description: "Match non-public IP.",
    description_zh: "匹配非公开 IP。",
  }),
  source_port: listable(z.number().int().min(0).max(65535)).optional().meta({
    description: "Match source port.",
    description_zh: "匹配源端口。",
  }),
  source_port_range: listableString.optional().meta({
    description: "Match source port range.",
    description_zh: "匹配源端口范围。",
  }),
  port: listable(z.number().int().min(0).max(65535)).optional().meta({
    description: "Match port.",
    description_zh: "匹配端口。",
  }),
  port_range: listableString.optional().meta({
    description: "Match port range.",
    description_zh: "匹配端口范围。",
  }),
  process_name: listableString.optional().meta({
    description: "Match process name.",
    description_zh: "匹配进程名称。",
  }),
  process_path: listableString.optional().meta({
    description: "Match process path.",
    description_zh: "匹配进程路径。",
  }),
  process_path_regex: listableString.optional().meta({
    description: "Match process path using regular expression.",
    description_zh: "使用正则表达式匹配进程路径。",
  }),
  package_name: listableString.optional().meta({
    description: "Match android package name.",
    description_zh: "匹配 Android 应用包名。",
  }),
  user: listableString.optional().meta({
    description: "Match user name.",
    description_zh: "匹配用户名。",
  }),
  user_id: listableInts.optional().meta({
    description: "Match user id.",
    description_zh: "匹配用户 ID。",
  }),
  clash_mode: z.string().optional().meta({
    description: "Match Clash mode.",
    description_zh: "匹配 Clash 模式。",
  }),
  network_type: listable(z.enum(["wifi", "cellular", "ethernet", "other"]))
    .optional()
    .meta({
      description: "Match network type.",
      description_zh: "匹配网络类型。",
    }),
  network_is_expensive: z.boolean().optional().meta({
    description: "Match if network is considered Metered.",
    description_zh: "匹配如果网络被视为计费。",
  }),
  network_is_constrained: z.boolean().optional().meta({
    description: "Match if network is in Low Data Mode.",
    description_zh: "匹配如果网络在低数据模式下。",
  }),
  wifi_ssid: listableString.optional().meta({
    description: "Match WiFi SSID.",
    description_zh: "匹配 WiFi SSID。",
  }),
  wifi_bssid: listableString.optional().meta({
    description: "Match WiFi BSSID.",
    description_zh: "匹配 WiFi BSSID。",
  }),
  rule_set: listableString.optional().meta({
    description: "Match rule-set.",
    description_zh: "匹配规则集。",
  }),
  rule_set_ip_cidr_match_source: z.boolean().optional().meta({
    description: "Make `ip_cidr` in rule-sets match the source IP.",
    description_zh: "使规则集中的 `ip_cidr` 规则匹配源 IP。",
  }),
  rule_set_ipcidr_match_source: z.boolean().optional().meta({
    description:
      "Deprecated in sing-box 1.10.0. Renamed to `rule_set_ip_cidr_match_source`.",
    description_zh:
      "已在 sing-box 1.10.0 废弃。已重命名为 `rule_set_ip_cidr_match_source`。",
    deprecated: true,
  }),
  invert: z.boolean().optional().meta({
    description: "Invert match result.",
    description_zh: "反选匹配结果。",
  }),
});

const DefaultRouteRule = z.union([
  BaseRouteRule.extend(RuleActionRouteByDefault.shape),
  BaseRouteRule.extend(RuleActionRoute.shape),
  BaseRouteRule.extend(RuleActionReject.shape),
  BaseRouteRule.extend(RuleActionHijackDNS.shape),
  BaseRouteRule.extend(RuleActionRouteOptionsWithAction.shape),
  BaseRouteRule.extend(RuleActionSniff.shape),
  BaseRouteRule.extend(RuleActionResolve.shape),
  BaseRouteRule.extend(RuleActionDirect.shape),
]);

const LogicalRouteRule = z
  .object({
    type: z.literal("logical").meta({
      description: "Rule type.",
      description_zh: "规则类型。",
    }),
    mode: z.enum(["and", "or"]).meta({
      description: "`and` or `or`.",
      description_zh: "`and` 或 `or`。",
    }),
    get rules() {
      return z.array(RouteRule).optional().meta({
        description: "Included rules.",
        description_zh: "包括的规则。",
      });
    },
    invert: z.boolean().optional().meta({
      description: "Invert match result.",
      description_zh: "反选匹配结果。",
    }),
  })
  .meta({
    id: "LogicalRouteRule",
    title: "Logical Route Rule",
    title_zh: "逻辑路由规则",
  });

export const RouteRule = z.union([DefaultRouteRule, LogicalRouteRule]).meta({
  id: "RouteRule",
  title: "Route Rule",
  title_zh: "路由规则",
});
export type RouteRule = z.infer<typeof RouteRule>;
// #endregion
