import { z } from "zod";
import { listable } from "@/utils";

// #region Base
export const DomainStrategy = z.enum([
  "",
  "prefer_ipv4",
  "prefer_ipv6",
  "ipv4_only",
  "ipv6_only",
]);
export type DomainStrategy = z.infer<typeof DomainStrategy>;

export const FwMark = z.union([z.number().int(), z.string()]);
export type FwMark = z.infer<typeof FwMark>;

export const Network = listable(z.enum(["", "tcp", "udp"]));
export type Network = z.infer<typeof Network>;

export const Tag = z.string().optional();
export type Tag = z.infer<typeof Tag>;

export const IpVersion = z.union([z.literal(4), z.literal(6)]);
export type IpVersion = z.infer<typeof IpVersion>;

export const HttpHeader = z.record(z.string(), z.string());
export type HttpHeader = z.infer<typeof HttpHeader>;
// #endregion

// #region Listen
export const InboundOptions = z.object({
  sniff: z.boolean().optional().describe("Enable sniffing."),
  sniff_override_destination: z
    .boolean()
    .optional()
    .describe(
      "Override the connection destination address with the sniffed domain."
    ),
  sniff_timeout: z.string().optional().describe("Timeout for sniffing."),
  domain_strategy: DomainStrategy.optional().describe(
    "If set, the requested domain name will be resolved to IP before routing."
  ),
  udp_disable_domain_unmapping: z.boolean().optional(),
  detour: z
    .string()
    .optional()
    .describe(
      "If set, connections will be forwarded to the specified inbound."
    ),
});
export type InboundOptions = z.infer<typeof InboundOptions>;

export const ListenOptions = z.object({
  listen: z.string().optional().describe("Listen address."),
  listen_port: z.number().int().optional().describe("Listen port."),
  bind_interface: z
    .string()
    .optional()
    .describe("The network interface to bind to."),
  routing_mark: FwMark.optional().describe("Set netfilter routing mark."),
  reuse_addr: z.boolean().optional().describe("Reuse listener address."),
  netns: z.string().optional().describe("Set network namespace, name or path."),
  tcp_keep_alive: z.string().optional().describe("TCP keep alive interval."),
  tcp_keep_alive_interval: z
    .string()
    .optional()
    .describe("TCP keep alive interval."),
  tcp_fast_open: z.boolean().optional().describe("Enable TCP Fast Open."),
  tcp_multi_path: z.boolean().optional().describe("Enable TCP Multi Path."),
  udp_fragment: z.boolean().optional().describe("Enable UDP fragmentation."),
  udp_timeout: z
    .union([z.string(), z.number()])
    .optional()
    .describe("UDP NAT expiration time."),

  ...InboundOptions.shape,
});
export type ListenOptions = z.infer<typeof ListenOptions>;
// #endregion

// #region Dial
export const NetworkType = z.enum(["wifi", "cellular", "ethernet", "other"]);
export type NetworkType = z.infer<typeof NetworkType>;

export const NetworkStrategy = z.object({
  network_type: listable(NetworkType)
    .optional()
    .describe("Network types to use."),
  fallback_network_type: listable(NetworkType)
    .optional()
    .describe("Fallback network types."),
  fallback_delay: z
    .string()
    .optional()
    .describe(
      "The length of time to wait before spawning a RFC 6555 Fast Fallback connection."
    ),
});
export type NetworkStrategy = z.infer<typeof NetworkStrategy>;

export const DomainResolverOptions = z.object({
  server: z.string(),
  strategy: DomainStrategy.optional(),
  disable_cache: z.boolean().optional(),
  rewrite_ttl: z.number().int().optional(),
  client_subnet: z.string().optional(),
});
export type DomainResolverOptions = z.infer<typeof DomainResolverOptions>;

export const DialerOptions = z.object({
  detour: z.string().optional().describe("The tag of the upstream outbound."),
  bind_interface: z
    .string()
    .optional()
    .describe("The network interface to bind to."),
  inet4_bind_address: z
    .string()
    .optional()
    .describe("The IPv4 address to bind to."),
  inet6_bind_address: z
    .string()
    .optional()
    .describe("The IPv6 address to bind to."),
  routing_mark: FwMark.optional().describe("Set netfilter routing mark."),
  reuse_addr: z.boolean().optional().describe("Reuse listener address."),
  netns: z.string().optional().describe("Set network namespace, name or path."),
  connect_timeout: z
    .string()
    .optional()
    .describe("Connect timeout, in golang's Duration format."),
  tcp_fast_open: z.boolean().optional().describe("Enable TCP Fast Open."),
  tcp_multi_path: z.boolean().optional().describe("Enable TCP Multi Path."),
  udp_fragment: z.boolean().optional().describe("Enable UDP fragmentation."),
  domain_resolver: z
    .union([z.string(), DomainResolverOptions])
    .optional()
    .describe("Set domain resolver to use for resolving domain names."),
  network_strategy: z
    .union([z.string(), NetworkStrategy])
    .optional()
    .describe("Strategy for selecting network interfaces."),
  network_type: listable(NetworkType).optional(),
  fallback_network_type: listable(NetworkType).optional(),
  fallback_delay: z.string().optional(),
  domain_strategy: DomainStrategy.optional().describe(
    "Deprecated in sing-box 1.12.0"
  ),
});
export type DialerOptions = z.infer<typeof DialerOptions>;

export const ServerOptions = z.object({
  server: z.string(),
  server_port: z.number().int().optional(),
});
export type ServerOptions = z.infer<typeof ServerOptions>;
// #endregion

// #region TLS
const TLSVersion = z.enum(["1.0", "1.1", "1.2", "1.3"]);
const TLSCipherSuite = z.enum([
  "TLS_RSA_WITH_AES_128_CBC_SHA",
  "TLS_RSA_WITH_AES_256_CBC_SHA",
  "TLS_RSA_WITH_AES_128_GCM_SHA256",
  "TLS_RSA_WITH_AES_256_GCM_SHA384",
  "TLS_AES_128_GCM_SHA256",
  "TLS_AES_256_GCM_SHA384",
  "TLS_CHACHA20_POLY1305_SHA256",
  "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA",
  "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA",
  "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA",
  "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA",
  "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
  "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384",
  "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
  "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
  "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
  "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256",
]);

const DNS01Challenge = z.object({
  provider: z.string(),
  access_key_id: z.string().optional(),
  access_key_secret: z.string().optional(),
  region_id: z.string().optional(),
  api_token: z.string().optional(),
});

const InboundACMEOptions = z.object({
  domain: listable(z.string()).optional(),
  data_directory: z.string().optional(),
  default_server_name: z.string().optional(),
  email: z.string().optional(),
  provider: z.string().optional(),
  disable_http_challenge: z.boolean().optional(),
  disable_tls_alpn_challenge: z.boolean().optional(),
  alternative_http_port: z.number().int().optional(),
  alternative_tls_port: z.number().int().optional(),
  external_account: z
    .object({
      key_id: z.string(),
      mac_key: z.string(),
    })
    .optional(),
  dns01_challenge: DNS01Challenge.optional(),
});

const InboundECHOptions = z.object({
  enabled: z.boolean().optional(),
  key: listable(z.string()).optional(),
  key_path: z.string().optional(),
});

const InboundRealityOptions = z.object({
  enabled: z.boolean().optional(),
  handshake: z
    .object({
      ...ServerOptions.shape,
      ...DialerOptions.shape,
    })
    .optional(),
  private_key: z.string().optional(),
  short_id: listable(z.string()).optional(),
  max_time_difference: z.string().optional(),
});

export const InboundTLSOptions = z.object({
  enabled: z.boolean().optional(),
  server_name: z.string().optional(),
  alpn: listable(z.string()).optional(),
  min_version: TLSVersion.optional(),
  max_version: TLSVersion.optional(),
  cipher_suites: listable(TLSCipherSuite).optional(),
  certificate: listable(z.string()).optional(),
  certificate_path: z.string().optional(),
  key: listable(z.string()).optional(),
  key_path: z.string().optional(),
  acme: InboundACMEOptions.optional(),
  ech: InboundECHOptions.optional(),
  reality: InboundRealityOptions.optional(),
});
export type InboundTLSOptions = z.infer<typeof InboundTLSOptions>;

const OutboundECHOptions = z.object({
  enabled: z.boolean().optional(),
  config: listable(z.string()).optional(),
  config_path: z.string().optional(),
});

const OutboundUTLSOptions = z.object({
  enabled: z.boolean().optional(),
  fingerprint: z.string().optional(),
});

const OutboundRealityOptions = z.object({
  enabled: z.boolean().optional(),
  public_key: z.string().optional(),
  short_id: z.string().optional(),
});

export const OutboundTLSOptions = z.object({
  enabled: z.boolean().optional(),
  disable_sni: z.boolean().optional(),
  server_name: z.string().optional(),
  insecure: z.boolean().optional(),
  alpn: listable(z.string()).optional(),
  min_version: TLSVersion.optional(),
  max_version: TLSVersion.optional(),
  cipher_suites: listable(TLSCipherSuite).optional(),
  certificate: listable(z.string()).optional(),
  certificate_path: z.string().optional(),
  fragment: z.boolean().optional(),
  fragment_fallback_delay: z.string().optional(),
  record_fragment: z.boolean().optional(),
  ech: OutboundECHOptions.optional(),
  utls: OutboundUTLSOptions.optional(),
  reality: OutboundRealityOptions.optional(),
});
export type OutboundTLSOptions = z.infer<typeof OutboundTLSOptions>;
// #endregion

// #region Multiplex
const BrutalOptions = z.object({
  enabled: z.boolean().optional(),
  up_mbps: z.number().int().optional(),
  down_mbps: z.number().int().optional(),
});

export const InboundMultiplexOptions = z.object({
  enabled: z.boolean().optional(),
  padding: z.boolean().optional(),
  brutal: BrutalOptions.optional(),
});
export type InboundMultiplexOptions = z.infer<typeof InboundMultiplexOptions>;

export const OutboundMultiplexOptions = z.object({
  enabled: z.boolean().optional(),
  protocol: z.enum(["smux", "yamux", "h2mux"]).optional(),
  max_connections: z.number().int().optional(),
  min_streams: z.number().int().optional(),
  max_streams: z.number().int().optional(),
  padding: z.boolean().optional(),
  brutal: BrutalOptions.optional(),
});
export type OutboundMultiplexOptions = z.infer<typeof OutboundMultiplexOptions>;
// #endregion

// #region V2Ray Transport
const V2RayHTTPOptions = z.object({
  type: z.literal("http"),
  host: listable(z.string()).optional(),
  path: z.string().optional(),
  method: z.string().optional(),
  headers: HttpHeader.optional(),
  idle_timeout: z.string().optional(),
  ping_timeout: z.string().optional(),
});

const V2RayWebsocketOptions = z.object({
  type: z.literal("ws"),
  path: z.string().optional(),
  headers: HttpHeader.optional(),
  max_early_data: z.number().int().optional(),
  early_data_header_name: z.string().optional(),
});

const V2RayQUICOptions = z.object({
  type: z.literal("quic"),
});

const V2RayGRPCOptions = z.object({
  type: z.literal("grpc"),
  service_name: z.string().optional(),
  idle_timeout: z.string().optional(),
  ping_timeout: z.string().optional(),
  permit_without_stream: z.boolean().optional(),
});

const V2RayHTTPUpgradeOptions = z.object({
  type: z.literal("httpupgrade"),
  host: z.string().optional(),
  path: z.string().optional(),
  headers: HttpHeader.optional(),
});

export const V2RayTransportOptions = z.discriminatedUnion("type", [
  V2RayHTTPOptions,
  V2RayWebsocketOptions,
  V2RayQUICOptions,
  V2RayGRPCOptions,
  V2RayHTTPUpgradeOptions,
]);
export type V2RayTransportOptions = z.infer<typeof V2RayTransportOptions>;
// #endregion

// #region Other Shared
export const UDPOverTCPOptions = z.object({
  enabled: z.boolean().optional(),
  version: z.number().int().optional(),
});
export type UDPOverTCPOptions = z.infer<typeof UDPOverTCPOptions>;
// #endregion
