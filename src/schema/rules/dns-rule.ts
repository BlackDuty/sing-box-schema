import { z } from "zod";
import {
  DomainStrategy,
  IpVersion,
  Network,
  NetworkType,
} from "@/schema/shared";
import { listable, listableInts, listableString } from "@/utils";

// #region DNS Rule Action

const DNSRouteAction = z
  .object({
    action: z.literal("route").optional().meta({
      description: "Action type.",
      description_zh: "动作类型。",
    }),
    server: z.string().meta({
      description: "Tag of target server. Required.",
      description_zh: "目标服务器的标签。必填。",
    }),
    strategy: DomainStrategy.optional().meta({
      description:
        "Set domain strategy for this query. One of `prefer_ipv4` `prefer_ipv6` `ipv4_only` `ipv6_only`.",
      description_zh:
        "为此查询设置域名策略。可选项：`prefer_ipv4` `prefer_ipv6` `ipv4_only` `ipv6_only`。",
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
        "Append a `edns0-subnet` OPT extra record with the specified IP prefix to every query by default. If the value is an IP address instead of a prefix, `/32` or `/128` will be appended automatically. Will override `dns.client_subnet`.",
      description_zh:
        "默认情况下，将带有指定 IP 前缀的 `edns0-subnet` OPT 附加记录附加到每个查询。如果值是 IP 地址而不是前缀，则会自动附加 `/32` 或 `/128`。将覆盖 `dns.client_subnet`。",
    }),
  })
  .meta({
    id: "DNSRouteAction",
    title: "DNS Route Action",
    title_zh: "DNS 路由动作",
  });

const DNSRejectAction = z
  .object({
    action: z.literal("reject").meta({
      description: "Action type.",
      description_zh: "动作类型。",
    }),
    method: z.enum(["default", "drop"]).optional().meta({
      description:
        "`default`: Reply with REFUSED. `drop`: Drop the request. `default` will be used by default.",
      description_zh:
        "`default`: 返回 REFUSED。`drop`: 丢弃请求。默认使用 `default`。",
    }),
    no_drop: z.boolean().optional().meta({
      description:
        "If not enabled, `method` will be temporarily overwritten to `drop` after 50 triggers in 30s.",
      description_zh:
        "如果未启用，则 30 秒内触发 50 次后，`method` 将被暂时覆盖为 `drop`。",
    }),
  })
  .meta({
    id: "DNSRejectAction",
    title: "DNS Reject Action",
    title_zh: "DNS 拒绝动作",
  });

const DNSRouteOptionsAction = z
  .object({
    action: z.literal("route-options").meta({
      description: "Action type.",
      description_zh: "动作类型。",
    }),
    strategy: DomainStrategy.optional().meta({
      description:
        "Set domain strategy for this query. One of `prefer_ipv4` `prefer_ipv6` `ipv4_only` `ipv6_only`.",
      description_zh:
        "为此查询设置域名策略。可选项：`prefer_ipv4` `prefer_ipv6` `ipv4_only` `ipv6_only`。",
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
        "Append a `edns0-subnet` OPT extra record with the specified IP prefix to every query by default. If the value is an IP address instead of a prefix, `/32` or `/128` will be appended automatically. Will override `dns.client_subnet`.",
      description_zh:
        "默认情况下，将带有指定 IP 前缀的 `edns0-subnet` OPT 附加记录附加到每个查询。如果值是 IP 地址而不是前缀，则会自动附加 `/32` 或 `/128`。将覆盖 `dns.client_subnet`。",
    }),
  })
  .meta({
    id: "DNSRouteOptionsAction",
    title: "DNS Route Options Action",
    title_zh: "DNS 路由选项动作",
  });

const DNSRecord = z.string().meta({
  description: "Text DNS record.",
  description_zh: "文本 DNS 记录。",
});

const DNSRouteActionPredefined = z
  .object({
    action: z.literal("predefined").meta({
      description: "Action type.",
      description_zh: "动作类型。",
    }),
    rcode: z
      .enum(["NOERROR", "FORMERR", "SERVFAIL", "NXDOMAIN", "NOTIMP", "REFUSED"])
      .optional()
      .meta({
        description: "The response code.",
        description_zh: "响应码。",
      }),
    answer: listable(DNSRecord).optional().meta({
      description: "List of text DNS record to respond as answers.",
      description_zh: "用于作为回答响应的文本 DNS 记录列表。",
    }),
    ns: listable(DNSRecord).optional().meta({
      description: "List of text DNS record to respond as name servers.",
      description_zh: "用于作为名称服务器响应的文本 DNS 记录列表。",
    }),
    extra: listable(DNSRecord).optional().meta({
      description: "List of text DNS record to respond as extra records.",
      description_zh: "用于作为额外记录响应的文本 DNS 记录列表。",
    }),
  })
  .meta({
    id: "DNSRouteActionPredefined",
    title: "DNS Route Action Predefined",
    title_zh: "DNS 路由动作预定义",
  });

// #endregion

// #region DNS Rule
const DNSQueryType = z.union([z.string(), z.number().int()]).meta({
  description: "DNS query type. Values can be integers or type name strings.",
  description_zh: "DNS 查询类型。值可以为整数或者类型名称字符串。",
});

const BaseDNSRule = z.object({
  inbound: listableString.optional().meta({
    description: "Tags of [Inbound](/configuration/inbound/).",
    description_zh: "[入站](/zh/configuration/inbound/) 标签。",
  }),
  ip_version: IpVersion.optional().meta({
    description: "4 (A DNS query) or 6 (AAAA DNS query).",
    description_zh: "4 (A DNS 查询) 或 6 (AAAA DNS 查询)。",
  }),
  query_type: listable(DNSQueryType).optional().meta({
    description: "DNS query type.",
    description_zh: "DNS 查询类型。",
  }),
  network: Network.optional().meta({
    description: "`tcp` or `udp`.",
    description_zh: "`tcp` 或 `udp`。",
  }),
  auth_user: listableString.optional().meta({
    description: "Username.",
    description_zh: "用户名。",
  }),
  protocol: listableString.optional().meta({
    description:
      "Sniffed protocol, see Protocol Sniff (/configuration/route/sniff/) for details.",
    description_zh:
      "探测到的协议，参阅 [协议探测](/zh/configuration/route/sniff/) 以获取详细信息。",
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
    description:
      "Match geosite. Geosite is deprecated and will be removed in sing-box 1.12.0, check Migration (/migration/#migrate-geosite-to-rule-sets).",
    description_zh:
      "匹配 Geosite。Geosite 已在 sing-box 1.8.0 废弃并将在 sing-box 1.12.0 中移除，参阅 [迁移指南](/migration/#migrate-geosite-to-rule-sets)。",
    deprecated: true,
  }),
  source_geoip: listableString.optional().meta({
    description:
      "Match source geoip. GeoIP is deprecated and will be removed in sing-box 1.12.0, check Migration (/migration/#migrate-geoip-to-rule-sets).",
    description_zh:
      "匹配源 GeoIP。GeoIP 已在 sing-box 1.8.0 废弃并将在 sing-box 1.12.0 中移除，参阅 [迁移指南](/migration/#migrate-geoip-to-rule-sets)。",
    deprecated: true,
  }),
  geoip: listableString.optional().meta({
    description:
      "Match geoip. GeoIP is deprecated and will be removed in sing-box 1.12.0, check Migration (/migration/#migrate-geoip-to-rule-sets).",
    description_zh:
      "匹配 GeoIP。GeoIP 已在 sing-box 1.8.0 废弃并将在 sing-box 1.12.0 中移除，参阅 [迁移指南](/migration/#migrate-geoip-to-rule-sets)。",
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
    description:
      "Match IP CIDR with query response. Only takes effect for address requests (A/AAAA/HTTPS).",
    description_zh:
      "与查询响应匹配 IP CIDR。仅对地址请求（A/AAAA/HTTPS）生效。",
  }),
  ip_is_private: z.boolean().optional().meta({
    description:
      "Match private IP with query response. Only takes effect for address requests (A/AAAA/HTTPS).",
    description_zh:
      "与查询响应匹配非公开 IP。仅对地址请求（A/AAAA/HTTPS）生效。",
  }),
  ip_accept_any: z.boolean().optional().meta({
    description:
      "Match any IP with query response. Only takes effect for address requests (A/AAAA/HTTPS).",
    description_zh: "匹配任意 IP。仅对地址请求（A/AAAA/HTTPS）生效。",
  }),
  source_port: listableInts.optional().meta({
    description: "Match source port.",
    description_zh: "匹配源端口。",
  }),
  source_port_range: listableString.optional().meta({
    description: "Match source port range.",
    description_zh: "匹配源端口范围。",
  }),
  port: listableInts.optional().meta({
    description: "Match port.",
    description_zh: "匹配端口。",
  }),
  port_range: listableString.optional().meta({
    description: "Match port range.",
    description_zh: "匹配端口范围。",
  }),
  process_name: listableString.optional().meta({
    description:
      "Match process name. Only supported on Linux, Windows, and macOS.",
    description_zh: "匹配进程名称。仅支持 Linux、Windows 和 macOS。",
  }),
  process_path: listableString.optional().meta({
    description:
      "Match process path. Only supported on Linux, Windows, and macOS.",
    description_zh: "匹配进程路径。仅支持 Linux、Windows 和 macOS。",
  }),
  process_path_regex: listableString.optional().meta({
    description:
      "Match process path using regular expression. Only supported on Linux, Windows, and macOS.",
    description_zh:
      "使用正则表达式匹配进程路径。仅支持 Linux、Windows 和 macOS。",
  }),
  package_name: listableString.optional().meta({
    description: "Match android package name.",
    description_zh: "匹配 Android 应用包名。",
  }),
  user: listableString.optional().meta({
    description: "Match user name. Only supported on Linux.",
    description_zh: "匹配用户名。仅支持 Linux。",
  }),
  user_id: listableInts.optional().meta({
    description: "Match user id. Only supported on Linux.",
    description_zh: "匹配用户 ID。仅支持 Linux。",
  }),
  clash_mode: z.string().optional().meta({
    description: "Match Clash mode.",
    description_zh: "匹配 Clash 模式。",
  }),
  network_type: listable(NetworkType).optional().meta({
    description:
      "Match network type. Only supported in graphical clients on Android and Apple platforms. Available values: `wifi`, `cellular`, `ethernet` and `other`.",
    description_zh:
      "匹配网络类型。仅在 Android 与 Apple 平台图形客户端中支持。可用值：`wifi`、`cellular`、`ethernet` 与 `other`。",
  }),
  network_is_expensive: z.boolean().optional().meta({
    description:
      "Match if network is considered Metered (on Android) or considered expensive, such as Cellular or a Personal Hotspot (on Apple platforms). Only supported in graphical clients on Android and Apple platforms.",
    description_zh:
      "匹配如果网络被视为计费（在 Android）或视为昂贵，例如蜂窝或个人热点（在 Apple 平台）。仅在 Android 与 Apple 平台图形客户端中支持。",
  }),
  network_is_constrained: z.boolean().optional().meta({
    description:
      "Match if network is in Low Data Mode. Only supported in graphical clients on Apple platforms.",
    description_zh:
      "匹配如果网络在低数据模式下。仅在 Apple 平台图形客户端中支持。",
  }),
  wifi_ssid: listableString.optional().meta({
    description:
      "Only supported in graphical clients on Android and Apple platforms, or on Linux. Match WiFi SSID. See [Wi-Fi State](/configuration/shared/wifi-state/) for details.",
    description_zh:
      "仅在 Android 与 Apple 平台图形客户端中支持，也支持 Linux。匹配 WiFi SSID。参阅 [Wi-Fi 状态](/zh/configuration/shared/wifi-state/)。",
  }),
  wifi_bssid: listableString.optional().meta({
    description:
      "Only supported in graphical clients on Android and Apple platforms, or on Linux. Match WiFi BSSID. See [Wi-Fi State](/configuration/shared/wifi-state/) for details.",
    description_zh:
      "仅在 Android 与 Apple 平台图形客户端中支持，也支持 Linux。匹配 WiFi BSSID。参阅 [Wi-Fi 状态](/zh/configuration/shared/wifi-state/)。",
  }),
  interface_address: z.record(z.string(), listableString).optional().meta({
    description:
      "Only supported on Linux, Windows, and macOS. Match interface address.",
    description_zh: "仅支持 Linux、Windows 和 macOS。匹配接口地址。",
  }),
  network_interface_address: z
    .record(z.enum(["wifi", "cellular", "ethernet", "other"]), listableString)
    .optional()
    .meta({
      description:
        "Only supported in graphical clients on Android and Apple platforms. Matches network interface (same values as `network_type`) address.",
      description_zh:
        "仅在 Android 与 Apple 平台图形客户端中支持。匹配网络接口（可用值同 `network_type`）地址。",
    }),
  default_interface_address: listableString.optional().meta({
    description:
      "Only supported on Linux, Windows, and macOS. Match default interface address.",
    description_zh: "仅支持 Linux、Windows 和 macOS。匹配默认接口地址。",
  }),
  rule_set: listableString.optional().meta({
    description: "Match [rule-set](/configuration/route/#rule_set).",
    description_zh: "匹配 [规则集](/zh/configuration/route/#rule_set)。",
  }),
  rule_set_ip_cidr_match_source: z.boolean().optional().meta({
    description: "Make `ip_cidr` rule items in rule-sets match the source IP.",
    description_zh: "使规则集中的 `ip_cidr` 规则匹配源 IP。",
  }),
  rule_set_ip_cidr_accept_empty: z.boolean().optional().meta({
    description:
      "Make `ip_cidr` rules in rule-sets accept empty query response. Only takes effect for address requests (A/AAAA/HTTPS).",
    description_zh:
      "使规则集中的 `ip_cidr` 规则接受空查询响应。仅对地址请求（A/AAAA/HTTPS）生效。",
  }),
  invert: z.boolean().optional().meta({
    description: "Invert match result.",
    description_zh: "反选匹配结果。",
  }),
  outbound: listableString.optional().meta({
    description:
      "Match outbound. Deprecated in sing-box 1.12.0; moved to DNS Rule Action (/configuration/dns/rule_action#route). `any` can be used as a value to match any outbound.",
    description_zh:
      "匹配出站。已在 sing-box 1.12.0 废弃，已移动到 [DNS 规则动作](/configuration/dns/rule_action#route)。`any` 可用于匹配任意出站。",
    deprecated: true,
  }),
});

const DefaultDNSRule = z.union([
  BaseDNSRule.extend(DNSRouteAction.shape),
  BaseDNSRule.extend(DNSRouteOptionsAction.shape),
  BaseDNSRule.extend(DNSRejectAction.shape),
  BaseDNSRule.extend(DNSRouteActionPredefined.shape),
]);

const LogicalDNSRule = z
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
      return z.array(DNSRule).optional().meta({
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
    id: "LogicalDNSRule",
    title: "Logical DNS Rule",
    title_zh: "逻辑 DNS 规则",
  });

export const DNSRule = z.union([DefaultDNSRule, LogicalDNSRule]).meta({
  id: "DNSRule",
  title: "DNS Rule",
  title_zh: "DNS 规则",
});
export type DNSRule = z.infer<typeof DNSRule>;
// #endregion
