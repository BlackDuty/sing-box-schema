import { z } from "zod";
import {
  DomainStrategy,
  IpVersion,
  Network,
  NetworkType,
} from "@/schema/shared";
import { listable } from "@/utils";

// #region DNS Rule Action

const DNSRouteAction = z.object({
  action: z.literal("route").optional(),
  server: z.string().describe("Tag of target server."),
  strategy: DomainStrategy.optional().describe(
    "Set domain strategy for this query."
  ),
  disable_cache: z
    .boolean()
    .optional()
    .describe("Disable cache and save cache in this query."),
  rewrite_ttl: z
    .number()
    .int()
    .optional()
    .describe("Rewrite TTL in DNS responses."),
  client_subnet: z
    .string()
    .optional()
    .describe("Append a `edns0-subnet` OPT extra record."),
});

const DNSRejectAction = z.object({
  action: z.literal("reject"),
  method: z
    .enum(["default", "drop"])
    .optional()
    .describe("Reply with REFUSED or drop the request."),
  no_drop: z
    .boolean()
    .optional()
    .describe(
      "If not enabled, `method` will be temporarily overwritten to `drop` after 50 triggers in 30s."
    ),
});

const DNSRouteOptionsAction = z.object({
  action: z.literal("route-options"),
  disable_cache: z
    .boolean()
    .optional()
    .describe("Disable cache and save cache in this query."),
  rewrite_ttl: z
    .number()
    .int()
    .optional()
    .describe("Rewrite TTL in DNS responses."),
  client_subnet: z
    .string()
    .optional()
    .describe("Append a `edns0-subnet` OPT extra record."),
});

const DNSRecord = z.string().describe("Text DNS record.");

const DNSRouteActionPredefined = z.object({
  action: z.literal("predefined"),
  rcode: z
    .enum(["NOERROR", "FORMERR", "SERVFAIL", "NXDOMAIN", "NOTIMP", "REFUSED"])
    .optional()
    .describe("The response code."),
  answer: listable(DNSRecord)
    .optional()
    .describe("List of text DNS record to respond as answers."),
  ns: listable(DNSRecord)
    .optional()
    .describe("List of text DNS record to respond as name servers."),
  extra: listable(DNSRecord)
    .optional()
    .describe("List of text DNS record to respond as extra records."),
});

// #endregion

// #region DNS Rule
const DNSQueryType = z.union([z.string(), z.number().int()]);

const BaseDNSRule = z.object({
  inbound: listable(z.string()).optional().describe("Tags of Inbound."),
  ip_version: IpVersion.optional().describe(
    "4 (A DNS query) or 6 (AAAA DNS query)."
  ),
  query_type: listable(DNSQueryType).optional().describe("DNS query type."),
  network: Network.optional().describe("`tcp` or `udp`."),
  auth_user: listable(z.string()).optional().describe("Username."),
  protocol: listable(z.string()).optional().describe("Sniffed protocol."),
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
  source_ip_cidr: listable(z.string())
    .optional()
    .describe("Match source IP CIDR."),
  source_ip_is_private: z
    .boolean()
    .optional()
    .describe("Match non-public source IP."),
  ip_cidr: listable(z.string())
    .optional()
    .describe("Match IP CIDR with query response."),
  ip_is_private: z
    .boolean()
    .optional()
    .describe("Match private IP with query response."),
  ip_accept_any: z
    .boolean()
    .optional()
    .describe("Match any IP with query response."),
  source_port: listable(z.number().int())
    .optional()
    .describe("Match source port."),
  source_port_range: listable(z.string())
    .optional()
    .describe("Match source port range."),
  port: listable(z.number().int()).optional().describe("Match port."),
  port_range: listable(z.string()).optional().describe("Match port range."),
  process_name: listable(z.string()).optional().describe("Match process name."),
  process_path: listable(z.string()).optional().describe("Match process path."),
  process_path_regex: listable(z.string())
    .optional()
    .describe("Match process path using regular expression."),
  package_name: listable(z.string())
    .optional()
    .describe("Match android package name."),
  user: listable(z.string()).optional().describe("Match user name."),
  user_id: listable(z.number().int()).optional().describe("Match user id."),
  clash_mode: z.string().optional().describe("Match Clash mode."),
  network_type: listable(NetworkType)
    .optional()
    .describe("Match network type."),
  network_is_expensive: z
    .boolean()
    .optional()
    .describe("Match if network is considered Metered."),
  network_is_constrained: z
    .boolean()
    .optional()
    .describe("Match if network is in Low Data Mode."),
  wifi_ssid: listable(z.string()).optional().describe("Match WiFi SSID."),
  wifi_bssid: listable(z.string()).optional().describe("Match WiFi BSSID."),
  rule_set: listable(z.string()).optional().describe("Match rule-set."),
  rule_set_ip_cidr_match_source: z
    .boolean()
    .optional()
    .describe("Make `ip_cidr` rule items in rule-sets match the source IP."),
  rule_set_ip_cidr_accept_empty: z
    .boolean()
    .optional()
    .describe("Make `ip_cidr` rules in rule-sets accept empty query response."),
  invert: z.boolean().optional().describe("Invert match result."),
  outbound: listable(z.string()).optional().describe("Match outbound."),
});

const DefaultDNSRule = z.union([
  BaseDNSRule.extend(DNSRouteAction.shape),
  BaseDNSRule.extend(DNSRouteOptionsAction.shape),
  BaseDNSRule.extend(DNSRejectAction.shape),
  BaseDNSRule.extend(DNSRouteActionPredefined.shape),
]);

const LogicalDNSRule = z.object({
  type: z.literal("logical"),
  mode: z.enum(["and", "or"]).describe("`and` or `or`."),
  get rules() {
    return z.array(DNSRule).optional().describe("Included rules.");
  },
  invert: z.boolean().optional().describe("Invert match result."),
});

export const DNSRule = z.union([DefaultDNSRule, LogicalDNSRule]);
export type DNSRule = z.infer<typeof DNSRule>;
// #endregion
