import { z } from "zod";
import { DNSOptions } from "./dns";
import { Endpoint } from "./endpoint";
import { ExperimentalOptions } from "./experimental";
import { Inbound } from "./inbound";
import { LogOptions } from "./log";
import { NTPOptions } from "./ntp";
import { Outbound } from "./outbound";
import { RouteOptions } from "./route";

export const Configuration = z
  .object({
    $schema: z.string().optional(),
    log: LogOptions.optional(),
    dns: DNSOptions.optional(),
    ntp: NTPOptions.optional(),
    endpoints: z.array(Endpoint).optional(),
    inbounds: z.array(Inbound).optional(),
    outbounds: z.array(Outbound).optional(),
    route: RouteOptions.optional(),
    experimental: ExperimentalOptions.optional(),
  })
  .meta({
    id: "Configuration",
    title: "Sing-box v1.11.1 Configuration",
    title_zh: "Sing-box v1.11.1 配置文件",
    description: "Sing-box v1.11.1 Configuration file schema.",
    description_zh: "Sing-box v1.11.1 配置文件定义。",
    version: "1.11.1",
  });

export type Configuration = z.infer<typeof Configuration>;
