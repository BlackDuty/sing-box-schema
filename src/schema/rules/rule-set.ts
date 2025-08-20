import { z } from "zod";
import { Network, NetworkType } from "@/schema/shared";
import { listable, listableInts, listableString } from "../../utils";

// #region Headless Rule
const DNSQueryType = z.union([z.string(), z.number().int()]).meta({
  description: "DNS query type. Values can be integers or type name strings.",
  description_zh: "DNS 查询类型。值可以为整数或者类型名称字符串。",
});

const DefaultHeadlessRule = z.object({
  query_type: listable(DNSQueryType).optional().meta({
    description: "DNS query type.",
    description_zh: "DNS 查询类型。",
  }),
  network: listable(Network).optional().meta({
    description: "`tcp` or `udp`.",
    description_zh: "`tcp` 或 `udp`。",
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
  ip_cidr: listableString.optional().meta({
    description: "Match IP CIDR.",
    description_zh: "匹配 IP CIDR。",
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
  network_type: listable(NetworkType).optional().meta({
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
  invert: z.boolean().optional().meta({
    description: "Invert match result.",
    description_zh: "反选匹配结果。",
  }),
});

const LogicalHeadlessRule = z
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
      return z.array(HeadlessRule).optional().meta({
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
    id: "LogicalHeadlessRule",
    title: "Logical Headless Rule",
    title_zh: "逻辑无头规则",
  });

export const HeadlessRule = z
  .union([DefaultHeadlessRule, LogicalHeadlessRule])
  .meta({
    id: "HeadlessRule",
    title: "Headless Rule",
    title_zh: "无头规则",
  });
// #endregion

// #region Rule Set
const InlineRuleSetOptions = z
  .object({
    type: z.literal("inline").meta({
      description: "Rule set type.",
      description_zh: "规则集类型。",
    }),
    tag: z.string().meta({
      description: "Tag of rule-set.",
      description_zh: "规则集的标签。",
    }),
    rules: z.array(HeadlessRule).meta({
      description: "List of Headless Rules.",
      description_zh: "无头规则列表。",
    }),
  })
  .meta({
    id: "InlineRuleSetOptions",
    title: "Inline Rule Set Options",
    title_zh: "内联规则集选项",
  });

const LocalRuleSetOptions = z
  .object({
    type: z.literal("local").meta({
      description: "Rule set type.",
      description_zh: "规则集类型。",
    }),
    tag: z.string().meta({
      description: "Tag of rule-set.",
      description_zh: "规则集的标签。",
    }),
    format: z.enum(["source", "binary"]).optional().meta({
      description: "Format of rule-set file, `source` or `binary`.",
      description_zh: "规则集文件格式，`source` 或 `binary`。",
    }),
    path: z.string().meta({
      description: "File path of rule-set.",
      description_zh: "规则集的文件路径。",
    }),
  })
  .meta({
    id: "LocalRuleSetOptions",
    title: "Local Rule Set Options",
    title_zh: "本地规则集选项",
  });

const RemoteRuleSetOptions = z
  .object({
    type: z.literal("remote").meta({
      description: "Rule set type.",
      description_zh: "规则集类型。",
    }),
    tag: z.string().meta({
      description: "Tag of rule-set.",
      description_zh: "规则集的标签。",
    }),
    format: z.enum(["source", "binary"]).optional().meta({
      description: "Format of rule-set file, `source` or `binary`.",
      description_zh: "规则集文件格式，`source` 或 `binary`。",
    }),
    url: z.string().meta({
      description: "Download URL of rule-set.",
      description_zh: "规则集的下载 URL。",
    }),
    download_detour: z.string().optional().meta({
      description: "Tag of the outbound to download rule-set.",
      description_zh: "用于下载规则集的出站的标签。",
    }),
    update_interval: z.string().optional().meta({
      description: "Update interval of rule-set.",
      description_zh: "规则集的更新间隔。",
    }),
  })
  .meta({
    id: "RemoteRuleSetOptions",
    title: "Remote Rule Set Options",
    title_zh: "远程规则集选项",
  });

export const RuleSet = z
  .discriminatedUnion("type", [
    InlineRuleSetOptions,
    LocalRuleSetOptions,
    RemoteRuleSetOptions,
  ])
  .meta({
    id: "RuleSet",
    title: "Rule Set",
    title_zh: "规则集",
  });
export type RuleSet = z.infer<typeof RuleSet>;
// #endregion
