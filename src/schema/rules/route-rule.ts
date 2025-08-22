import { z } from "zod";
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
        description: "See Dial Fields for details.",
        description_zh: "详情参阅拨号字段。",
      }),
    network_type: listable(z.enum(["wifi", "cellular", "ethernet", "other"]))
      .optional()
      .meta({
        description: "See Dial Fields for details.",
        description_zh: "详情参阅拨号字段。",
      }),
    fallback_network_type: listable(
      z.enum(["wifi", "cellular", "ethernet", "other"]),
    )
      .optional()
      .meta({
        description: "See Dial Fields for details.",
        description_zh: "详情参阅拨号字段。",
      }),
    fallback_delay: z.string().optional().meta({
      description: "See Dial Fields for details.",
      description_zh: "详情参阅拨号字段。",
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
      description: "Timeout for UDP connections.",
      description_zh: "UDP 连接超时时间。",
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
      description: "Enabled sniffers. All sniffers enabled by default.",
      description_zh: "启用的探测器。默认启用所有探测器。",
    }),
    timeout: z.string().optional().meta({
      description: "Timeout for sniffing.",
      description_zh: "探测超时时间。",
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
        description: "DNS resolution strategy.",
        description_zh: "DNS 解析策略。",
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
