import { z } from "zod";
import { listable } from "../../utils";

// #region Route Actions
const RuleActionRouteOptions = z.object({
  override_address: z
    .string()
    .optional()
    .describe("Override the connection destination address."),
  override_port: z
    .number()
    .int()
    .min(0)
    .max(65535)
    .optional()
    .describe("Override the connection destination port."),
  network_strategy: z
    .enum(["prefer_ipv4", "prefer_ipv6", "ipv4_only", "ipv6_only"])
    .optional()
    .describe("See Dial Fields for details."),
  fallback_delay: z
    .string()
    .optional()
    .describe("See Dial Fields for details."),
  udp_disable_domain_unmapping: z
    .boolean()
    .optional()
    .describe(
      "If enabled, for UDP proxy requests addressed to a domain, the original packet address will be sent in the response instead of the mapped domain."
    ),
  udp_connect: z
    .boolean()
    .optional()
    .describe(
      "If enabled, attempts to connect UDP connection to the destination instead of listen."
    ),
  udp_timeout: z.string().optional().describe("Timeout for UDP connections."),
  tls_fragment: z
    .boolean()
    .optional()
    .describe("Fragment TLS handshakes to bypass firewalls."),
  tls_fragment_fallback_delay: z
    .string()
    .optional()
    .describe(
      "The fallback value used when TLS segmentation cannot automatically determine the wait time."
    ),
  tls_record_fragment: z
    .string()
    .optional()
    .describe(
      "Fragment TLS handshake into multiple TLS records to bypass firewalls."
    ),
});

const RuleActionSniff = z.object({
  action: z
    .literal("sniff")
    .describe("Performs protocol sniffing on connections."),
  sniffer: listable(z.string())
    .optional()
    .describe("Enabled sniffers. All sniffers enabled by default."),
  timeout: z
    .string()
    .optional()
    .describe("Timeout for sniffing. `300ms` is used by default."),
});

const RuleActionResolve = z.object({
  action: z
    .literal("resolve")
    .describe("Resolve request destination from domain to IP addresses."),
  server: z
    .string()
    .optional()
    .describe(
      "Specifies DNS server tag to use instead of selecting through DNS routing."
    ),
  strategy: z
    .enum(["prefer_ipv4", "prefer_ipv6", "ipv4_only", "ipv6_only"])
    .optional()
    .describe(
      "DNS resolution strategy. `dns.strategy` will be used by default."
    ),
  disable_cache: z
    .boolean()
    .optional()
    .describe("Disable cache and save cache in this query."),
  rewrite_ttl: z
    .number()
    .int()
    .optional()
    .nullable()
    .describe("Rewrite TTL in DNS responses."),
  client_subnet: z
    .string()
    .optional()
    .nullable()
    .describe(
      "Append a `edns0-subnet` OPT extra record with the specified IP prefix to every query by default."
    ),
});

const RuleActionRouteByDefault = z.object({
  outbound: z.string().describe("Tag of target outbound."),
  ...RuleActionRouteOptions.shape,
});

const RuleActionRoute = z.object({
  action: z.literal("route"),
  ...RuleActionRouteByDefault.shape,
});

const RuleActionReject = z.object({
  action: z.literal("reject"),
  method: z
    .enum(["default", "drop"])
    .optional()
    .describe(
      "`default`: Reply with TCP RST for TCP connections, and ICMP port unreachable for UDP packets. `drop`: Drop packets."
    ),
  no_drop: z
    .boolean()
    .optional()
    .describe(
      "If not enabled, `method` will be temporarily overwritten to `drop` after 50 triggers in 30s."
    ),
});

const RuleActionHijackDNS = z.object({
  action: z.literal("hijack-dns"),
});

const RuleActionRouteOptionsWithAction = z.object({
  action: z.literal("route-options"),
  ...RuleActionRouteOptions.shape,
});

// #endregion

// #region Route Rule
const BaseRouteRule = z.object({
  inbound: listable(z.string()).optional().describe("Tags of Inbound."),
  ip_version: z
    .union([z.literal(4), z.literal(6)])
    .optional()
    .describe("4 or 6. Not limited if empty."),
  network: listable(z.enum(["tcp", "udp"]))
    .optional()
    .describe("`tcp` or `udp`."),
  auth_user: listable(z.string())
    .optional()
    .describe("Username, see each inbound for details."),
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
    ])
  )
    .optional()
    .describe("Sniffed protocol."),
  client: listable(z.enum(["chromium", "safari", "firefox", "quic-go"]))
    .optional()
    .describe("Sniffed client type."),
  domain: listable(z.string()).optional().describe("Match full domain."),
  domain_suffix: listable(z.string())
    .optional()
    .describe("Match domain suffix."),
  domain_keyword: listable(z.string())
    .optional()
    .describe("Match domain using keyword."),
  domain_regex: listable(z.string())
    .optional()
    .describe("Match domain using regular expression."),
  geosite: listable(z.string())
    .optional()
    .describe("Match geosite. Deprecated in sing-box 1.8.0."),
  source_geoip: listable(z.string())
    .optional()
    .describe("Match source geoip. Deprecated in sing-box 1.8.0."),
  geoip: listable(z.string())
    .optional()
    .describe("Match geoip. Deprecated in sing-box 1.8.0."),
  source_ip_cidr: listable(z.string())
    .optional()
    .describe("Match source IP CIDR."),
  source_ip_is_private: z
    .boolean()
    .optional()
    .describe("Match non-public source IP."),
  ip_cidr: listable(z.string()).optional().describe("Match IP CIDR."),
  ip_is_private: z.boolean().optional().describe("Match non-public IP."),
  source_port: listable(z.number().int().min(0).max(65535))
    .optional()
    .describe("Match source port."),
  source_port_range: listable(z.string())
    .optional()
    .describe("Match source port range."),
  port: listable(z.number().int().min(0).max(65535))
    .optional()
    .describe("Match port."),
  port_range: listable(z.string()).optional().describe("Match port range."),
  process_name: listable(z.string())
    .optional()
    .describe(
      "Match process name. Only supported on Linux, Windows, and macOS."
    ),
  process_path: listable(z.string())
    .optional()
    .describe(
      "Match process path. Only supported on Linux, Windows, and macOS."
    ),
  process_path_regex: listable(z.string())
    .optional()
    .describe(
      "Match process path using regular expression. Only supported on Linux, Windows, and macOS."
    ),
  package_name: listable(z.string())
    .optional()
    .describe("Match android package name."),
  user: listable(z.string())
    .optional()
    .describe("Match user name. Only supported on Linux."),
  user_id: listable(z.number().int())
    .optional()
    .describe("Match user id. Only supported on Linux."),
  clash_mode: z.string().optional().describe("Match Clash mode."),
  network_type: listable(z.enum(["wifi", "cellular", "ethernet", "other"]))
    .optional()
    .describe(
      "Match network type. Only supported in graphical clients on Android and Apple platforms."
    ),
  network_is_expensive: z
    .boolean()
    .optional()
    .describe(
      "Match if network is considered Metered (on Android) or considered expensive. Only supported in graphical clients on Android and Apple platforms."
    ),
  network_is_constrained: z
    .boolean()
    .optional()
    .describe(
      "Match if network is in Low Data Mode. Only supported in graphical clients on Apple platforms."
    ),
  wifi_ssid: listable(z.string())
    .optional()
    .describe(
      "Match WiFi SSID. Only supported in graphical clients on Android and Apple platforms."
    ),
  wifi_bssid: listable(z.string())
    .optional()
    .describe(
      "Match WiFi BSSID. Only supported in graphical clients on Android and Apple platforms."
    ),
  rule_set: listable(z.string()).optional().describe("Match rule-set."),
  rule_set_ip_cidr_match_source: z
    .boolean()
    .optional()
    .describe("Make `ip_cidr` in rule-sets match the source IP."),
  rule_set_ipcidr_match_source: z
    .boolean()
    .optional()
    .describe(
      "Deprecated in sing-box 1.10.0. Renamed to `rule_set_ip_cidr_match_source`."
    ),
  invert: z.boolean().optional().describe("Invert match result."),
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

const LogicalRouteRule = z.object({
  type: z.literal("logical"),
  mode: z.enum(["and", "or"]).describe("`and` or `or`."),
  get rules() {
    return z.array(RouteRule).optional().describe("Included rules.");
  },
  invert: z.boolean().optional().describe("Invert match result."),
});

export const RouteRule = z.union([DefaultRouteRule, LogicalRouteRule]);
export type RouteRule = z.infer<typeof RouteRule>;
// #endregion
