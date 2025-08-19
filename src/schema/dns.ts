import { z } from "zod";
import { listable } from "@/utils";
import { DNSRule } from "./rules/dns-rule";
import { DialerOptions, DomainStrategy, OutboundTLSOptions } from "./shared";

// #region DNS Servers
export const LocalDNSServerOptions = z.object({
  type: z.literal("local"),
  tag: z.string(),
});

export const HostsDNSServerOptions = z.object({
  type: z.literal("hosts"),
  tag: z.string(),
  path: listable(z.string())
    .optional()
    .describe("List of paths to hosts files."),
  predefined: z
    .record(z.string(), listable(z.string()))
    .optional()
    .describe("Predefined hosts."),
});

export const TCPDNSServerOptions = z
  .object({
    type: z.literal("tcp"),
    tag: z.string(),
    server: z.string().describe("The address of the TCP DNS server."),
    server_port: z
      .number()
      .int()
      .optional()
      .describe("The port of the TCP DNS server."),
  })
  .extend(DialerOptions);

export const UDPDNSServerOptions = z
  .object({
    type: z.literal("udp"),
    tag: z.string(),
    server: z.string().describe("The address of the UDP DNS server."),
    server_port: z
      .number()
      .int()
      .optional()
      .describe("The port of the UDP DNS server."),
  })
  .extend(DialerOptions);

export const TLSDNSServerOptions = z
  .object({
    type: z.literal("tls"),
    tag: z.string(),
    server: z.string().describe("The address of the TLS DNS server."),
    server_port: z
      .number()
      .int()
      .optional()
      .describe("The port of the TLS DNS server."),
    tls: OutboundTLSOptions.optional().describe("TLS configuration."),
  })
  .extend(DialerOptions);

export const QUICDNSServerOptions = z
  .object({
    type: z.literal("quic"),
    tag: z.string(),
    server: z.string().describe("The address of the QUIC DNS server."),
    server_port: z
      .number()
      .int()
      .optional()
      .describe("The port of the QUIC DNS server."),
    tls: OutboundTLSOptions.optional().describe("TLS configuration."),
  })
  .extend(DialerOptions);

export const HTTPSDNSServerOptions = z
  .object({
    type: z.literal("https"),
    tag: z.string(),
    server: z.string().describe("The address of the HTTPS DNS server."),
    server_port: z
      .number()
      .int()
      .optional()
      .describe("The port of the HTTPS DNS server."),
    path: z
      .string()
      .optional()
      .describe(
        "The path of the HTTPS DNS server. `/dns-query` will be used by default."
      ),
    headers: z
      .record(z.string(), z.string())
      .optional()
      .describe("Additional headers to be sent to the DNS server."),
    tls: OutboundTLSOptions.optional().describe("TLS configuration."),
  })
  .extend(DialerOptions);

export const HTTP3DNSServerOptions = z
  .object({
    type: z.literal("h3"),
    tag: z.string(),
    server: z.string().describe("The address of the HTTP3 DNS server."),
    server_port: z
      .number()
      .int()
      .optional()
      .describe("The port of the HTTP3 DNS server."),
    path: z
      .string()
      .optional()
      .describe(
        "The path of the HTTP3 DNS server. `/dns-query` will be used by default."
      ),
    headers: z
      .record(z.string(), z.string())
      .optional()
      .describe("Additional headers to be sent to the DNS server."),
    tls: OutboundTLSOptions.optional().describe("TLS configuration."),
  })
  .extend(DialerOptions);

export const DHCPDNSServerOptions = z
  .object({
    type: z.literal("dhcp"),
    tag: z.string(),
    interface: z.string().optional().describe("Interface name to listen on."),
  })
  .extend(DialerOptions);

export const FakeIPDNSServerOptions = z.object({
  type: z.literal("fakeip"),
  tag: z.string(),
  inet4_range: z.string().optional().describe("IPv4 address range for FakeIP."),
  inet6_range: z.string().optional().describe("IPv6 address range for FakeIP."),
});

export const TailscaleDNSServerOptions = z.object({
  type: z.literal("tailscale"),
  tag: z.string(),
  endpoint: z.string().describe("The tag of the Tailscale Endpoint."),
  accept_default_resolvers: z
    .boolean()
    .optional()
    .describe("Indicates whether default DNS resolvers should be accepted."),
});

export const ResolvedDNSServerOptions = z.object({
  type: z.literal("resolved"),
  tag: z.string(),
  service: z.string().describe("The tag of the Resolved Service."),
  accept_default_resolvers: z
    .boolean()
    .optional()
    .describe(
      "Indicates whether the default DNS resolvers should be accepted."
    ),
});

export const DNSServer = z.discriminatedUnion("type", [
  LocalDNSServerOptions,
  HostsDNSServerOptions,
  TCPDNSServerOptions,
  UDPDNSServerOptions,
  TLSDNSServerOptions,
  QUICDNSServerOptions,
  HTTPSDNSServerOptions,
  HTTP3DNSServerOptions,
  DHCPDNSServerOptions,
  FakeIPDNSServerOptions,
  TailscaleDNSServerOptions,
  ResolvedDNSServerOptions,
]);
export type DNSServer = z.infer<typeof DNSServer>;
// #endregion

// #region DNS
export const DNSClientOptions = z.object({
  strategy: DomainStrategy.optional(),
  disable_cache: z.boolean().optional(),
  disable_expire: z.boolean().optional(),
  independent_cache: z.boolean().optional(),
  cache_capacity: z.number().int().optional(),
  client_subnet: z.string().optional(), // prefixable
});

export const LegacyDNSFakeIPOptions = z.object({
  enabled: z.boolean().optional(),
  inet4_range: z.string().optional(), // prefix
  inet6_range: z.string().optional(), // prefix
});

export const DNSOptions = z
  .object({
    servers: z.array(DNSServer).optional(),
    rules: z.array(DNSRule).optional(),
    final: z.string().optional(),
    reverse_mapping: z.boolean().optional(),
    fakeip: LegacyDNSFakeIPOptions.optional(),
  })
  .extend(DNSClientOptions);

export type DNSOptions = z.infer<typeof DNSOptions>;
// #endregion
