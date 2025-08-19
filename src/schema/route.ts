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

export const GeoIPOptions = z.object({
  path: z.string().optional(),
  download_url: z.string().optional(),
  download_detour: z.string().optional(),
});

export const GeositeOptions = z.object({
  path: z.string().optional(),
  download_url: z.string().optional(),
  download_detour: z.string().optional(),
});

export const RouteOptions = z.object({
  rules: listable(RouteRule).optional(),
  rule_set: listable(RuleSet).optional(),
  final: z.string().optional(),
  find_process: z.boolean().optional(),
  auto_detect_interface: z.boolean().optional(),
  override_android_vpn: z.boolean().optional(),
  default_interface: z.string().optional(),
  default_mark: FwMark.optional(),
  default_domain_resolver: z
    .union([z.string(), DomainResolverOptions])
    .optional(),
  default_network_strategy: z.union([z.string(), NetworkStrategy]).optional(),
  default_network_type: listable(NetworkType).optional(),
  default_fallback_network_type: listable(NetworkType).optional(),
  default_fallback_delay: z.string().optional(),

  // Removed
  geoip: GeoIPOptions.optional(),
  geosite: GeositeOptions.optional(),
});

export type RouteOptions = z.infer<typeof RouteOptions>;
