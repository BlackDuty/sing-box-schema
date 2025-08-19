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
export const VMessUser = z.object({
  name: z.string(),
  uuid: z.uuid(),
  alterId: z.number().int().optional(),
});
// #endregion

// #region Inbound
export const VMessInboundOptions = z
  .object({
    type: z.literal("vmess"),
    tag: z.string().optional(),
    users: z.array(VMessUser).optional(),
    tls: InboundTLSOptions.optional(),
    multiplex: InboundMultiplexOptions.optional(),
    transport: V2RayTransportOptions.optional(),
  })
  .extend(ListenOptions);
// #endregion

// #region Outbound
export const VMessOutboundOptions = z
  .object({
    type: z.literal("vmess"),
    tag: z.string().optional(),
    uuid: z.uuid(),
    security: z.string(),
    alter_id: z.number().int().optional(),
    global_padding: z.boolean().optional(),
    authenticated_length: z.boolean().optional(),
    network: Network.optional(),
    tls: OutboundTLSOptions.optional(),
    packet_encoding: z.string().optional(),
    multiplex: OutboundMultiplexOptions.optional(),
    transport: V2RayTransportOptions.optional(),
  })
  .extend(DialerOptions)
  .extend(ServerOptions);
// #endregion
