import { z } from "zod";
import {
  DialerOptions,
  ListenOptions,
  OutboundTLSOptions,
  ServerOptions,
} from "../shared";

const ShadowTLSUser = z.object({
  name: z.string(),
  password: z.string(),
});

const ShadowTLSHandshakeOptions = z.object({
  ...ServerOptions.shape,
  ...DialerOptions.shape,
});

export const ShadowTLSInboundOptions = z.object({
  type: z.literal("shadowtls"),
  tag: z.string().optional(),
  version: z
    .number()
    .int()
    .min(1)
    .max(3)
    .optional()
    .describe("ShadowTLS protocol version."),
  password: z.string().optional().describe("ShadowTLS password."),
  users: z.array(ShadowTLSUser).optional().describe("ShadowTLS users."),
  handshake: ShadowTLSHandshakeOptions,
  handshake_for_server_name: z
    .record(z.string(), ShadowTLSHandshakeOptions)
    .optional()
    .describe("Handshake server address for specific server name."),
  strict_mode: z.boolean().optional().describe("ShadowTLS strict mode."),
  wildcard_sni: z
    .enum(["off", "authed", "all"])
    .optional()
    .describe("ShadowTLS wildcard SNI mode."),

  ...ListenOptions.shape,
});
export type ShadowTLSInboundOptions = z.infer<typeof ShadowTLSInboundOptions>;

export const ShadowTLSOutboundOptions = z.object({
  type: z.literal("shadowtls"),
  tag: z.string().optional(),
  version: z
    .number()
    .int()
    .min(1)
    .max(3)
    .optional()
    .describe("ShadowTLS protocol version."),
  password: z.string().optional().describe("Set password."),
  tls: OutboundTLSOptions.describe("TLS configuration."),

  ...ServerOptions.shape,
  ...DialerOptions.shape,
});
export type ShadowTLSOutboundOptions = z.infer<typeof ShadowTLSOutboundOptions>;
