import { z } from "zod";
import {
  DialerOptions,
  InboundMultiplexOptions,
  InboundTLSOptions,
  ListenOptions,
  Network,
  OutboundMultiplexOptions,
  OutboundTLSOptions,
  ServerOptions,
  V2RayTransportOptions,
} from "@/schema/shared";

// #region Shared
export const TrojanUser = z.object({
  name: z.string(),
  password: z.string(),
});
// #endregion

// #region Inbound
export const TrojanInboundOptions = z.object({
  type: z.literal("trojan"),
  tag: z.string().optional(),
  users: z.array(TrojanUser).optional(),
  tls: InboundTLSOptions.optional(),
  fallback: ServerOptions.optional(),
  fallback_for_alpn: z.record(z.string(), ServerOptions).optional(),
  multiplex: InboundMultiplexOptions.optional(),
  transport: V2RayTransportOptions.optional(),

  ...ListenOptions.shape,
});
// #endregion

// #region Outbound
export const TrojanOutboundOptions = z.object({
  type: z.literal("trojan"),
  tag: z.string().optional(),
  password: z.string(),
  network: Network.optional(),
  tls: OutboundTLSOptions.optional(),
  multiplex: OutboundMultiplexOptions.optional(),
  transport: V2RayTransportOptions.optional(),

  ...ServerOptions.shape,
  ...DialerOptions.shape,
});
// #endregion
