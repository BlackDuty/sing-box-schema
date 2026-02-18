import { z } from "zod";
import { TailscaleEndpointOptions } from "./protocols/tailscale";
import { WireGuardEndpointOptions } from "./protocols/wireguard";

export const Endpoint = z
  .discriminatedUnion("type", [
    WireGuardEndpointOptions,
    TailscaleEndpointOptions,
  ])
  .meta({
    id: "Endpoint",
    title: "Endpoint",
    title_zh: "端点",
    description:
      "An endpoint is a protocol that exposes both inbound and outbound behavior.",
    description_zh: "端点是具有入站和出站行为的协议。",
  });

export type Endpoint = z.infer<typeof Endpoint>;
