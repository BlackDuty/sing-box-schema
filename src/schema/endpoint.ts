import { z } from "zod";
import { WireGuardEndpointOptions } from "./protocols/wireguard";

export const Endpoint = z
  .discriminatedUnion("type", [WireGuardEndpointOptions])
  .meta({
    id: "Endpoint",
    title: "Endpoint",
    title_zh: "端点",
  });

export type Endpoint = z.infer<typeof Endpoint>;
