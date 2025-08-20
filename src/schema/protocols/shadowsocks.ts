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

export const ShadowsocksInboundOptions = z
  .object({
    type: z.literal("shadowsocks"),
    tag: z.string().optional(),
    network: Network.optional().meta({
      description: "Listen network, one of `tcp` `udp`.",
      description_zh: "监听的网络协议，`tcp` `udp` 之一。",
    }),
    method: z.string(),
    password: z.string().optional(),
    users: z.array(ShadowsocksUser).optional(),
    destinations: z.array(ShadowsocksDestination).optional(),
    multiplex: InboundMultiplexOptions.optional(),
    managed: z.boolean().optional(),

    ...ListenOptions.shape,
  })
  .meta({
    id: "ShadowsocksInboundOptions",
    title: "Shadowsocks Inbound",
    title_zh: "Shadowsocks 入站",
  });
export type ShadowsocksInboundOptions = z.infer<
  typeof ShadowsocksInboundOptions
>;
// #endregion

// #region Outbound
export const ShadowsocksOutboundOptions = z
  .object({
    type: z.literal("shadowsocks"),
    tag: z.string().optional(),
    method: z.string(),
    password: z.string(),
    plugin: z.string().optional().meta({
      description: "Shadowsocks SIP003 plugin, implemented in internal.",
      description_zh: "Shadowsocks SIP003 插件，由内部实现。",
    }),
    plugin_opts: z.string().optional().meta({
      description: "Shadowsocks SIP003 plugin options.",
      description_zh: "Shadowsocks SIP003 插件参数。",
    }),
    network: Network.optional().meta({
      description: "Enabled network",
      description_zh: "启用的网络协议。",
    }),
    udp_over_tcp: UDPOverTCPOptions.optional(),
    multiplex: OutboundMultiplexOptions.optional(),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "ShadowsocksOutboundOptions",
    title: "Shadowsocks Outbound",
    title_zh: "Shadowsocks 出站",
  });
export type ShadowsocksOutboundOptions = z.infer<
  typeof ShadowsocksOutboundOptions
>;
// #endregion
