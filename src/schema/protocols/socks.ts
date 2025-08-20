import { z } from "zod";
import {
  DialerOptions,
  ListenOptions,
  Network,
  ServerOptions,
  UDPOverTCPOptions,
} from "@/schema/shared";

const SocksUser = z.object({
  username: z.string(),
  password: z.string(),
});

export const SocksInboundOptions = z.object({
  type: z.literal("socks"),
  tag: z.string().optional(),
  users: z.array(SocksUser).optional().describe("SOCKS users."),

  ...ListenOptions.shape,
});
export type SocksInboundOptions = z.infer<typeof SocksInboundOptions>;

export const SocksOutboundOptions = z.object({
  type: z.literal("socks"),
  tag: z.string().optional(),
  version: z.enum(["4", "4a", "5"]).optional().describe("The SOCKS version."),
  username: z.string().optional().describe("SOCKS username."),
  password: z.string().optional().describe("SOCKS5 password."),
  network: Network.optional().describe("Enabled network."),
  udp_over_tcp: z
    .union([z.boolean(), UDPOverTCPOptions])
    .optional()
    .describe("UDP over TCP protocol settings."),

  ...ServerOptions.shape,
  ...DialerOptions.shape,
});
export type SocksOutboundOptions = z.infer<typeof SocksOutboundOptions>;
