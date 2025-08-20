import { z } from "zod";
import {
  ListenOptions,
  DialerOptions,
  ServerOptions,
  InboundTLSOptions,
  OutboundTLSOptions,
  HttpHeader,
} from "@/schema/shared";

const HTTPUser = z.object({
  username: z.string(),
  password: z.string(),
});

export const HTTPInboundOptions = z.object({
  type: z.literal("http"),
  tag: z.string().optional(),
  users: z.array(HTTPUser).optional().describe("HTTP users."),
  tls: InboundTLSOptions.optional().describe("TLS configuration."),
  set_system_proxy: z
    .boolean()
    .optional()
    .describe("Automatically set system proxy configuration."),

  ...ListenOptions.shape,
});

export const HTTPOutboundOptions = z.object({
  type: z.literal("http"),
  tag: z.string().optional(),
  username: z.string().optional().describe("Basic authorization username."),
  password: z.string().optional().describe("Basic authorization password."),
  path: z.string().optional().describe("Path of HTTP request."),
  headers: HttpHeader.optional().describe("Extra headers of HTTP request."),
  tls: OutboundTLSOptions.optional().describe("TLS configuration."),

  ...ServerOptions.shape,
  ...DialerOptions.shape,
});
