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

export const Configuration = z.object({
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
});

export type Configuration = z.infer<typeof Configuration>;
