import { z } from "zod";
import {
  DialerOptions,
  InboundTLSOptions,
  ListenOptions,
  Network,
  OutboundTLSOptions,
  ServerOptions,
} from "@/schema/shared";

export const TUICUser = z.object({
  name: z.string().optional(),
  uuid: z.uuid().optional(),
  password: z.string().optional(),
});

export const TUICInboundOptions = z
  .object({
    type: z.literal("tuic"),
    tag: z.string().optional(),
    users: z.array(TUICUser).optional(),
    congestion_control: z.string().optional(),
    auth_timeout: z.string().optional(),
    zero_rtt_handshake: z.boolean().optional(),
    heartbeat: z.string().optional(),
    tls: InboundTLSOptions.optional(),
  })
  .extend(ListenOptions);

export const TUICOutboundOptions = z
  .object({
    type: z.literal("tuic"),
    tag: z.string().optional(),
    uuid: z.uuid().optional(),
    password: z.string().optional(),
    congestion_control: z.string().optional(),
    udp_relay_mode: z.string().optional(),
    udp_over_stream: z.boolean().optional(),
    zero_rtt_handshake: z.boolean().optional(),
    heartbeat: z.string().optional(),
    network: Network.optional(),
    tls: OutboundTLSOptions.optional(),
  })
  .extend(DialerOptions)
  .extend(ServerOptions);
