import { z } from "zod";
import {
  DialerOptions,
  InboundTLSOptions,
  ListenOptions,
  Network,
  OutboundTLSOptions,
  ServerOptions,
} from "@/schema/shared";

export const Hysteria2Obfs = z.object({
  type: z.string().optional(),
  password: z.string().optional(),
});

export const Hysteria2User = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
});

const Hysteria2MasqueradeFile = z.object({
  directory: z.string(),
});

const Hysteria2MasqueradeProxy = z.object({
  url: z.string(),
  rewrite_host: z.boolean().optional(),
});

const Hysteria2MasqueradeString = z.object({
  status_code: z.number().int().optional(),
  headers: z.record(z.string(), z.string()).optional(),
  content: z.string(),
});

export const Hysteria2Masquerade = z.union([
  z.string(),
  z
    .object({
      type: z.literal("file"),
    })
    .extend(Hysteria2MasqueradeFile),
  z
    .object({
      type: z.literal("proxy"),
    })
    .extend(Hysteria2MasqueradeProxy),
  z
    .object({
      type: z.literal("string"),
    })
    .extend(Hysteria2MasqueradeString),
]);

export const Hysteria2InboundOptions = z
  .object({
    type: z.literal("hysteria2"),
    tag: z.string().optional(),
    up_mbps: z.number().int().optional(),
    down_mbps: z.number().int().optional(),
    obfs: Hysteria2Obfs.optional(),
    users: z.array(Hysteria2User).optional(),
    ignore_client_bandwidth: z.boolean().optional(),
    tls: InboundTLSOptions.optional(),
    masquerade: Hysteria2Masquerade.optional(),
    brutal_debug: z.boolean().optional(),
  })
  .extend(ListenOptions);

export const Hysteria2OutboundOptions = z
  .object({
    type: z.literal("hysteria2"),
    tag: z.string().optional(),
    server_ports: z.union([z.string(), z.array(z.string())]).optional(),
    hop_interval: z.string().optional(),
    up_mbps: z.number().int().optional(),
    down_mbps: z.number().int().optional(),
    obfs: Hysteria2Obfs.optional(),
    password: z.string().optional(),
    network: Network.optional(),
    tls: OutboundTLSOptions.optional(),
    brutal_debug: z.boolean().optional(),
  })
  .extend(DialerOptions)
  .extend(ServerOptions);
