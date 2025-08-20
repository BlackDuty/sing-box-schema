import { z } from "zod";
import { listable } from "../../utils";
import { Network, NetworkType } from "@/schema/shared";

// #region Headless Rule
const DNSQueryType = z.union([z.string(), z.number().int()]);

const DefaultHeadlessRule = z.object({
  query_type: listable(DNSQueryType)
    .optional()
    .describe("DNS query type. Values can be integers or type name strings."),
  network: listable(Network).optional().describe("`tcp` or `udp`."),
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
  ip_cidr: listable(z.string()).optional().describe("Match IP CIDR."),
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
  invert: z.boolean().optional().describe("Invert match result."),
});

const LogicalHeadlessRule = z.object({
  type: z.literal("logical"),
  mode: z.enum(["and", "or"]).describe("`and` or `or`."),
  get rules() {
    return z.array(HeadlessRule).optional().describe("Included rules.");
  },
  invert: z.boolean().optional().describe("Invert match result."),
});

export const HeadlessRule = z.union([DefaultHeadlessRule, LogicalHeadlessRule]);
// #endregion

// #region Rule Set
const InlineRuleSetOptions = z.object({
  type: z.literal("inline"),
  tag: z.string().describe("Tag of rule-set."),
  rules: z.array(HeadlessRule).describe("List of Headless Rules."),
});

const LocalRuleSetOptions = z.object({
  type: z.literal("local"),
  tag: z.string().describe("Tag of rule-set."),
  format: z
    .enum(["source", "binary"])
    .optional()
    .describe("Format of rule-set file, `source` or `binary`."),
  path: z.string().describe("File path of rule-set."),
});

const RemoteRuleSetOptions = z.object({
  type: z.literal("remote"),
  tag: z.string().describe("Tag of rule-set."),
  format: z
    .enum(["source", "binary"])
    .optional()
    .describe("Format of rule-set file, `source` or `binary`."),
  url: z.string().describe("Download URL of rule-set."),
  download_detour: z
    .string()
    .optional()
    .describe("Tag of the outbound to download rule-set."),
  update_interval: z
    .string()
    .optional()
    .describe("Update interval of rule-set."),
});

export const RuleSet = z.discriminatedUnion("type", [
  InlineRuleSetOptions,
  LocalRuleSetOptions,
  RemoteRuleSetOptions,
]);
export type RuleSet = z.infer<typeof RuleSet>;
// #endregion
