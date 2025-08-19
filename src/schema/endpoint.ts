import { z } from "zod";
import { TailscaleEndpointOptions } from "./protocols/tailscale";
import { WireGuardEndpointOptions } from "./protocols/wireguard";

export const Endpoint = z.discriminatedUnion("type", [
  WireGuardEndpointOptions,
  TailscaleEndpointOptions,
]);

export type Endpoint = z.infer<typeof Endpoint>;
