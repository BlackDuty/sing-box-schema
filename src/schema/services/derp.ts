import { z } from "zod";
import {
  DialerOptions,
  InboundTLSOptions,
  ListenOptions,
  OutboundTLSOptions,
  ServerOptions,
} from "@/schema/shared";
import { listable } from "@/utils";

const DERPVerifyClientURLOptions = z
  .object({
    url: z.string().optional(),
  })
  .merge(DialerOptions);

const DERPMeshOptions = z
  .object({
    host: z.string().optional(),
    tls: OutboundTLSOptions.optional(),
  })
  .merge(ServerOptions)
  .merge(DialerOptions);

const DERPSTUNListenOptions = z
  .object({
    enabled: z.boolean(),
  })
  .merge(ListenOptions);

/**
 * DERP service is a Tailscale DERP server.
 */
export const DERPServiceOptions = z
  .object({
    type: z.literal("derp"),
    tag: z.string().optional(),
    /**
     * TLS configuration.
     */
    tls: InboundTLSOptions.optional().describe("TLS configuration."),
    /**
     * Derper configuration file path.
     */
    config_path: z.string().describe("Derper configuration file path."),
    /**
     * Tailscale endpoints tags to verify clients.
     */
    verify_client_endpoint: listable(z.string())
      .optional()
      .describe("Tailscale endpoints tags to verify clients."),
    /**
     * URL to verify clients.
     */
    verify_client_url: listable(
      z.union([z.string(), DERPVerifyClientURLOptions])
    )
      .optional()
      .describe("URL to verify clients."),
    /**
     * What to serve at the root path.
     */
    home: z.string().optional().describe("What to serve at the root path."),
    /**
     * Mesh with other DERP servers.
     */
    mesh_with: listable(DERPMeshOptions)
      .optional()
      .describe("Mesh with other DERP servers."),
    /**
     * Pre-shared key for DERP mesh.
     */
    mesh_psk: z.string().optional().describe("Pre-shared key for DERP mesh."),
    /**
     * Pre-shared key file for DERP mesh.
     */
    mesh_psk_file: z
      .string()
      .optional()
      .describe("Pre-shared key file for DERP mesh."),
    /**
     * STUN server listen options.
     */
    stun: z
      .union([z.number(), DERPSTUNListenOptions])
      .optional()
      .describe("STUN server listen options."),
  })
  .merge(ListenOptions);

export type DERPServiceOptions = z.infer<typeof DERPServiceOptions>;
