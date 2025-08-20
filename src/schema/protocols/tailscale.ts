import { z } from "zod";
import { DialerOptions } from "@/schema/shared";

export const TailscaleEndpointOptions = z.object({
  type: z.literal("tailscale"),
  tag: z.string().optional(),
  state_directory: z
    .string()
    .optional()
    .describe("The directory where the Tailscale state is stored."),
  auth_key: z.string().optional().describe("The auth key to create the node."),
  control_url: z.string().optional().describe("The coordination server URL."),
  ephemeral: z
    .boolean()
    .optional()
    .describe(
      "Indicates whether the instance should register as an Ephemeral node."
    ),
  hostname: z.string().optional().describe("The hostname of the node."),
  accept_routes: z
    .boolean()
    .optional()
    .describe(
      "Indicates whether the node should accept routes advertised by other nodes."
    ),
  exit_node: z
    .string()
    .optional()
    .describe("The exit node name or IP address to use."),
  exit_node_allow_lan_access: z
    .boolean()
    .optional()
    .describe(
      "Indicates whether locally accessible subnets should be routed directly or via the exit node."
    ),
  advertise_routes: z
    .array(z.string())
    .optional()
    .describe("CIDR prefixes to advertise into the Tailscale network."),
  advertise_exit_node: z
    .boolean()
    .optional()
    .describe(
      "Indicates whether the node should advertise itself as an exit node."
    ),
  udp_timeout: z
    .union([z.string(), z.number()])
    .optional()
    .describe("UDP NAT expiration time."),

  ...DialerOptions.shape,
});

export type TailscaleEndpointOptions = z.infer<typeof TailscaleEndpointOptions>;
