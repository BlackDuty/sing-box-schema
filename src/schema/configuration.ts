import { z } from "zod";
import { CertificateOptions } from "./certificate";
import { DNSOptions } from "./dns";
import { Endpoint } from "./endpoint";
import { ExperimentalOptions } from "./experimental";
import { Inbound } from "./inbound";
import { LogOptions } from "./log";
import { NTPOptions } from "./ntp";
import { Outbound } from "./outbound";
import { RouteOptions } from "./route";
import { Service } from "./service";

export const Configuration = z
  .object({
    $schema: z.string().optional(),
    log: LogOptions.optional(),
    dns: DNSOptions.optional(),
    ntp: NTPOptions.optional(),
    certificate: CertificateOptions.optional(),
    endpoints: z.array(Endpoint).optional(),
    inbounds: z.array(Inbound).optional(),
    outbounds: z.array(Outbound).optional(),
    route: RouteOptions.optional(),
    services: z.array(Service).optional(),
    experimental: ExperimentalOptions.optional(),
  })
  .meta({
    id: "Configuration",
    title: "Sing-box v1.13.0 Configuration",
    title_zh: "Sing-box v1.13.0 配置文件",
    description:
      "Sing-box v1.13.0 configuration file schema. Sing-box uses JSON for configuration files with log, dns, ntp, certificate, endpoints, inbounds, outbounds, route, services, and experimental sections.",
    description_zh:
      "Sing-box v1.13.0 配置文件定义。sing-box 使用 JSON 作为配置文件格式，包含 log、dns、ntp、certificate、endpoints、inbounds、outbounds、route、services 与 experimental 字段。",
    version: "1.13.0",
  });

export type Configuration = z.infer<typeof Configuration>;
