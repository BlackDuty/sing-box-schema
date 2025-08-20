import { z } from "zod";
import { listableString } from "../../utils";
import {
  DialerOptions,
  InboundTLSOptions,
  ListenOptions,
  OutboundTLSOptions,
  ServerOptions,
} from "../shared";

export const AnyTLSUser = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
});

// #region Inbound
export const AnyTLSInboundOptions = z.object({
  type: z.literal("anytls"),
  tag: z.string(),
  users: z.array(AnyTLSUser).optional().describe("AnyTLS users."),
  padding_scheme: listableString
    .optional()
    .describe("AnyTLS padding scheme line array."),
  tls: InboundTLSOptions.optional().describe("TLS configuration."),

  ...ListenOptions.shape,
});
export type AnyTLSInboundOptions = z.infer<typeof AnyTLSInboundOptions>;
// #endregion

// #region Outbound
export const AnyTLSOutboundOptions = z.object({
  type: z.literal("anytls"),
  tag: z.string(),
  password: z.string().describe("The AnyTLS password."),
  idle_session_check_interval: z
    .string()
    .optional()
    .describe("Interval checking for idle sessions."),
  idle_session_timeout: z
    .string()
    .optional()
    .describe(
      "In the check, close sessions that have been idle for longer than this."
    ),
  min_idle_session: z
    .number()
    .int()
    .optional()
    .describe(
      "In the check, at least the first `n` idle sessions are kept open."
    ),
  tls: OutboundTLSOptions.optional().describe("TLS configuration."),

  ...ServerOptions.shape,
  ...DialerOptions.shape,
});
export type AnyTLSOutboundOptions = z.infer<typeof AnyTLSOutboundOptions>;
// #endregion
