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

export const VLESSUser = z.object({
  name: z.string(),
  uuid: z.uuid(),
  flow: z.string().optional(),
});

export const VLESSInboundOptions = z
  .object({
    type: z.literal("vless"),
    tag: z.string().optional(),
    users: z.array(VLESSUser).optional(),
    tls: InboundTLSOptions.optional(),
    multiplex: InboundMultiplexOptions.optional(),
    transport: V2RayTransportOptions.optional(),
  })
  .extend(ListenOptions);

export const VLESSOutboundOptions = z
  .object({
    type: z.literal("vless"),
    tag: z.string().optional(),
    uuid: z.uuid(),
    flow: z.string().optional(),
    network: Network.optional(),
    tls: OutboundTLSOptions.optional(),
    multiplex: OutboundMultiplexOptions.optional(),
    transport: V2RayTransportOptions.optional(),
    packet_encoding: z.string().optional(),
  })
  .extend(DialerOptions)
  .extend(ServerOptions);
