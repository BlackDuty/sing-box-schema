import { z } from "zod";
import { CertificateOptions } from "./certificate";
import { CertificateProvider } from "./certificate-provider";
import { DNSOptions } from "./dns";
import { Endpoint } from "./endpoint";
import { ExperimentalOptions } from "./experimental";
import { HTTPClient } from "./http-client";
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
    certificate_providers: z.array(CertificateProvider).optional(),
    http_clients: z.array(HTTPClient).optional(),
    endpoints: z.array(Endpoint).optional(),
    inbounds: z.array(Inbound).optional(),
    outbounds: z.array(Outbound).optional(),
    route: RouteOptions.optional(),
    services: z.array(Service).optional(),
    experimental: ExperimentalOptions.optional(),
  })
  .meta({
    id: "Configuration",
    title: "Sing-box v1.14.0-alpha.34 Configuration",
    title_zh: "Sing-box v1.14.0-alpha.34 配置文件",
    description:
      "Sing-box v1.14.0-alpha.34 configuration file schema. Sing-box uses JSON for configuration files with log, dns, ntp, certificate, endpoints, inbounds, outbounds, route, services, and experimental sections.",
    description_zh:
      "Sing-box v1.14.0-alpha.34 配置文件定义。sing-box 使用 JSON 作为配置文件格式，包含 log、dns、ntp、certificate、endpoints、inbounds、outbounds、route、services 与 experimental 字段。",
    version: "1.14.0-alpha.34",
  });

export type Configuration = z.infer<typeof Configuration>;
