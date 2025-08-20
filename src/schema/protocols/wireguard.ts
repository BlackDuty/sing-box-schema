import z from "zod";
import { DialerOptions, Network, ServerOptions } from "@/schema/shared";

const Reserved = z.union([
  z.string().max(4),
  z.array(z.number().int().min(0).max(255)).length(3),
]);

// #region Endpoint
export const WireGuardPeer = z.object({
  address: z.string().optional(),
  port: z.number().int().optional(),
  public_key: z.string().optional(),
  pre_shared_key: z.string().optional(),
  allowed_ips: z.union([z.string(), z.array(z.string())]).optional(),
  persistent_keepalive_interval: z.number().int().optional(),
  reserved: Reserved.optional(),
});

export const WireGuardEndpointOptions = z.object({
  type: z.literal("wireguard"),
  tag: z.string().optional(),
  system: z.boolean().optional(),
  name: z.string().optional(),
  mtu: z.number().int().optional(),
  address: z.union([z.string(), z.array(z.string())]),
  private_key: z.string(),
  listen_port: z.number().int().optional(),
  peers: z.array(WireGuardPeer).optional(),
  udp_timeout: z.string().optional(),
  workers: z.number().int().optional(),

  ...DialerOptions.shape,
});
// #endregion

// #region Outbound
export const LegacyWireGuardPeer = z.object({
  public_key: z.string().optional(),
  pre_shared_key: z.string().optional(),
  allowed_ips: z.union([z.string(), z.array(z.string())]).optional(),
  reserved: Reserved.optional(),

  ...ServerOptions.shape,
});

export const LegacyWireGuardOutboundOptions = z.object({
  type: z.literal("wireguard"),
  tag: z.string().optional(),
  system_interface: z.boolean().optional(),
  gso: z.boolean().optional(),
  interface_name: z.string().optional(),
  local_address: z.union([z.string(), z.array(z.string())]),
  private_key: z.string(),
  peers: z.array(LegacyWireGuardPeer).optional(),
  peer_public_key: z.string(),
  pre_shared_key: z.string().optional(),
  reserved: Reserved.optional(),
  workers: z.number().int().optional(),
  mtu: z.number().int().optional(),
  network: Network.optional(),

  ...ServerOptions.shape,
  ...DialerOptions.shape,
});
export type LegacyWireGuardOutboundOptions = z.infer<
  typeof LegacyWireGuardOutboundOptions
>;
// #endregion
