import { z } from "zod";
import {
  DialerOptions,
  InboundTLSOptions,
  ListenOptions,
  Network,
  OutboundTLSOptions,
  ServerOptions,
} from "@/schema/shared";

// #region Shared
export const HysteriaUser = z.object({
  name: z.string().optional(),
  auth: z.array(z.number()).optional(),
  auth_str: z.string().optional(),
});
// #endregion

// #region Inbound
export const HysteriaInboundOptions = z
  .object({
    type: z.literal("hysteria"),
    tag: z.string().optional(),
    up: z.string().optional(),
    up_mbps: z.number().int().optional(),
    down: z.string().optional(),
    down_mbps: z.number().int().optional(),
    obfs: z.string().optional(),
    users: z.array(HysteriaUser).optional(),
    recv_window_conn: z.number().int().optional(),
    recv_window_client: z.number().int().optional(),
    max_conn_client: z.number().int().optional(),
    disable_mtu_discovery: z.boolean().optional(),
    tls: InboundTLSOptions.optional(),
  })
  .extend(ListenOptions);
// #endregion

// #region Outbound
export const HysteriaOutboundOptions = z
  .object({
    type: z.literal("hysteria"),
    tag: z.string().optional(),
    server_ports: z.union([z.string(), z.array(z.string())]).optional(),
    hop_interval: z.string().optional(),
    up: z.string().optional(),
    up_mbps: z.number().int().optional(),
    down: z.string().optional(),
    down_mbps: z.number().int().optional(),
    obfs: z.string().optional(),
    auth: z.array(z.number()).optional(),
    auth_str: z.string().optional(),
    recv_window_conn: z.number().int().optional(),
    recv_window: z.number().int().optional(),
    disable_mtu_discovery: z.boolean().optional(),
    network: Network.optional(),
    tls: OutboundTLSOptions.optional(),
  })
  .extend(DialerOptions)
  .extend(ServerOptions);
// #endregion
