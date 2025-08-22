import { z } from "zod";
import { listable } from "@/utils";
import { RouteRule } from "./rules/route-rule";
import { RuleSet } from "./rules/rule-set";
import { FwMark, NetworkStrategy, NetworkType } from "./shared";

export const GeoIPOptions = z
  .object({
    path: z.string().optional().meta({
      description: "The path to the sing-geoip database.",
      description_zh: "指定 GeoIP 资源的路径。",
    }),
    download_url: z.string().optional().meta({
      description: "The download URL of the sing-geoip database.",
      description_zh: "指定 GeoIP 资源的下载链接。",
    }),
    download_detour: z.string().optional().meta({
      description: "The tag of the outbound to download the database.",
      description_zh: "用于下载 GeoIP 资源的出站的标签。",
    }),
  })
  .meta({
    id: "GeoIPOptions",
    title: "GeoIP",
    deprecated: true,
  });

export const GeositeOptions = z
  .object({
    path: z.string().optional().meta({
      description: "The path to the sing-geosite database.",
      description_zh: "指定 GeoSite 资源的路径。",
    }),
    download_url: z.string().optional().meta({
      description: "The download URL of the sing-geoip database.",
      description_zh: "指定 GeoSite 资源的下载链接。",
    }),
    download_detour: z.string().optional().meta({
      description: "The tag of the outbound to download the database.",
      description_zh: "用于下载 GeoSite 资源的出站的标签。",
    }),
  })
  .meta({
    id: "GeositeOptions",
    title: "Geosite",
    deprecated: true,
  });

export const RouteOptions = z
  .object({
    rules: listable(RouteRule).optional().meta({
      description: "List of Route Rule",
      description_zh: "一组路由规则",
    }),
    rule_set: listable(RuleSet).optional().meta({
      description: "List of rule-set",
      description_zh: "一组规则集",
    }),
    final: z.string().optional().meta({
      description:
        "Default outbound tag. the first outbound will be used if empty.",
      description_zh:
        "默认出站标签。如果为空，将使用第一个可用于对应协议的出站。",
    }),
    auto_detect_interface: z.boolean().optional().meta({
      description:
        "Bind outbound connections to the default NIC by default to prevent routing loops under tun.",
      description_zh:
        "默认将出站连接绑定到默认网卡，以防止在 tun 下出现路由环路。",
    }),
    override_android_vpn: z.boolean().optional().meta({
      description:
        "Accept Android VPN as upstream NIC when `auto_detect_interface` enabled.",
      description_zh:
        "启用 `auto_detect_interface` 时接受 Android VPN 作为上游网卡。",
    }),
    default_interface: z.string().optional().meta({
      description:
        "Bind outbound connections to the specified NIC by default to prevent routing loops under tun.",
      description_zh:
        "默认将出站连接绑定到指定网卡，以防止在 tun 下出现路由环路。",
    }),
    default_mark: FwMark.optional().meta({
      description: "Set routing mark by default.",
      description_zh: "默认为出站连接设置路由标记。",
    }),
    default_network_strategy: z
      .union([z.string(), NetworkStrategy])
      .optional()
      .meta({
        description: "Strategy for selecting network interfaces.",
        description_zh: "用于选择网络接口的策略。",
      }),
    default_network_type: listable(NetworkType).optional().meta({
      description: "Network types to use.",
      description_zh: "要使用的网络类型。",
    }),
    default_fallback_network_type: listable(NetworkType).optional().meta({
      description: "Fallback network types.",
      description_zh: "备用网络类型。",
    }),
    default_fallback_delay: z.string().optional().meta({
      description:
        "The length of time to wait before spawning a RFC 6555 Fast Fallback connection.",
      description_zh: "在生成 RFC 6555 快速回退连接之前等待的时间长度。",
    }),

    // Removed
    geoip: GeoIPOptions.optional(),
    geosite: GeositeOptions.optional(),
  })
  .meta({
    id: "RouteOptions",
    title: "Route",
    title_zh: "路由",
  });

export type RouteOptions = z.infer<typeof RouteOptions>;
