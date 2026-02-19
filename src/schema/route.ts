import { z } from "zod";
import { listable } from "@/utils";
import { RouteRule } from "./rules/route-rule";
import { RuleSet } from "./rules/rule-set";
import {
  DomainResolverOptions,
  FwMark,
  NetworkStrategy,
  NetworkType,
} from "./shared";

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
    title_zh: "GeoIP 资源",
    description:
      "GeoIP is deprecated and will be removed in sing-box 1.12.0, check Migration.",
    description_zh:
      "GeoIP 已废弃且将在 sing-box 1.12.0 中被移除，参阅 迁移指南。",
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
    title_zh: "GeoSite 资源",
    description:
      "Geosite is deprecated and will be removed in sing-box 1.12.0, check Migration.",
    description_zh:
      "Geosite 已废弃且将在 sing-box 1.12.0 中被移除，参阅 迁移指南。",
    deprecated: true,
  });

export const RouteOptions = z
  .object({
    rules: listable(RouteRule).optional().meta({
      description: "List of [Route Rule](./rule/)",
      description_zh: "一组 [路由规则](./rule/)。",
    }),
    rule_set: listable(RuleSet).optional().meta({
      description: "List of [rule-set](/configuration/rule-set/)",
      description_zh: "一组 [规则集](/zh/configuration/rule-set/)。",
    }),
    final: z.string().optional().meta({
      description:
        "Default outbound tag. The first outbound will be used if empty.",
      description_zh:
        "默认出站标签。如果为空，将使用第一个可用于对应协议的出站。",
    }),
    find_process: z.boolean().optional().meta({
      description: "Find process info for each connection.",
      description_zh: "为每个连接查找进程信息。",
    }),
    auto_detect_interface: z.boolean().optional().meta({
      description:
        "Only supported on Linux, Windows and macOS. Bind outbound connections to the default NIC by default to prevent routing loops under tun. Takes no effect if `outbound.bind_interface` is set.",
      description_zh:
        "仅支持 Linux、Windows 和 macOS。默认将出站连接绑定到默认网卡，以防止在 tun 下出现路由环路。如果设置了 `outbound.bind_interface`，则不生效。",
    }),
    override_android_vpn: z.boolean().optional().meta({
      description:
        "Only supported on Android. Accept Android VPN as upstream NIC when `auto_detect_interface` enabled.",
      description_zh:
        "仅支持 Android。启用 `auto_detect_interface` 时接受 Android VPN 作为上游网卡。",
    }),
    default_interface: z.string().optional().meta({
      description:
        "Only supported on Linux, Windows and macOS. Bind outbound connections to the specified NIC by default to prevent routing loops under tun. Takes no effect if `auto_detect_interface` is set.",
      description_zh:
        "仅支持 Linux、Windows 和 macOS。默认将出站连接绑定到指定网卡，以防止在 tun 下出现路由环路。如果设置了 `auto_detect_interface`，则不生效。",
    }),
    default_mark: FwMark.optional().meta({
      description:
        "Only supported on Linux. Set routing mark by default. Takes no effect if `outbound.routing_mark` is set.",
      description_zh:
        "仅支持 Linux。默认为出站连接设置路由标记。如果设置了 `outbound.routing_mark`，则不生效。",
    }),
    default_domain_resolver: z
      .union([z.string(), DomainResolverOptions])
      .optional()
      .meta({
        description:
          "See [Dial Fields](/configuration/shared/dial/#domain_resolver) for details. Can be overrides by `outbound.domain_resolver`.",
        description_zh:
          "详情参阅 [拨号字段](/configuration/shared/dial/#domain_resolver)。可以被 `outbound.domain_resolver` 覆盖。",
      }),
    default_network_strategy: z
      .union([z.string(), NetworkStrategy])
      .optional()
      .meta({
        description:
          "See [Dial Fields](/configuration/shared/dial/#network_strategy) for details. Takes no effect if `outbound.bind_interface`, `outbound.inet4_bind_address` or `outbound.inet6_bind_address` is set. Can be overrides by `outbound.network_strategy`. Conflicts with `default_interface`.",
        description_zh:
          "详情参阅 [拨号字段](/configuration/shared/dial/#network_strategy)。当 `outbound.bind_interface`、`outbound.inet4_bind_address` 或 `outbound.inet6_bind_address` 已设置时不生效。可以被 `outbound.network_strategy` 覆盖。与 `default_interface` 冲突。",
      }),
    default_network_type: listable(NetworkType).optional().meta({
      description:
        "See [Dial Fields](/configuration/shared/dial/#network_type) for details.",
      description_zh:
        "详情参阅 [拨号字段](/configuration/shared/dial/#network_type)。",
    }),
    default_fallback_network_type: listable(NetworkType).optional().meta({
      description:
        "See [Dial Fields](/configuration/shared/dial/#fallback_network_type) for details.",
      description_zh:
        "详情参阅 [拨号字段](/configuration/shared/dial/#fallback_network_type)。",
    }),
    default_fallback_delay: z.string().optional().meta({
      description:
        "See [Dial Fields](/configuration/shared/dial/#fallback_delay) for details.",
      description_zh:
        "详情参阅 [拨号字段](/configuration/shared/dial/#fallback_delay)。",
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
