import { z } from "zod";
import {
  DialerOptions,
  InboundMultiplexOptions,
  ListenOptions,
  Network,
  OutboundMultiplexOptions,
  ServerOptions,
  UDPOverTCPOptions,
} from "@/schema/shared";

// #region Shared
export const ShadowsocksUser = z.object({
  name: z.string(),
  password: z.string(),
});
// #endregion

// #region Inbound
export const ShadowsocksDestination = z.object({
  name: z.string(),
  password: z.string(),

  ...ServerOptions.shape,
});

export const ShadowsocksInboundOptions = z.object({
  type: z.literal("shadowsocks"),
  tag: z.string().optional(),
  network: Network.optional(),
  method: z.string(),
  password: z.string().optional(),
  users: z.array(ShadowsocksUser).optional(),
  destinations: z.array(ShadowsocksDestination).optional(),
  multiplex: InboundMultiplexOptions.optional(),
  managed: z.boolean().optional(),

  ...ListenOptions.shape,
});
// #endregion

// #region Outbound
export const ShadowsocksOutboundOptions = z.object({
  type: z.literal("shadowsocks"),
  tag: z.string().optional(),
  method: z.string(),
  password: z.string(),
  plugin: z.string().optional(),
  plugin_opts: z.string().optional(),
  network: Network.optional(),
  udp_over_tcp: UDPOverTCPOptions.optional(),
  multiplex: OutboundMultiplexOptions.optional(),

  ...ServerOptions.shape,
  ...DialerOptions.shape,
});
// #endregion
