import { z } from "zod";
import {
  ListenOptions,
  DialerOptions,
  ServerOptions,
  Network,
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
