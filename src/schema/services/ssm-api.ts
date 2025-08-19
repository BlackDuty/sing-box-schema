import { z } from "zod";
import { InboundTLSOptions, ListenOptions } from "@/schema/shared";

/**
 * SSM API service is a RESTful API server for managing Shadowsocks servers.
 */
export const SSMAPIServiceOptions = z
  .object({
    type: z.literal("ssm-api"),
    /**
     * A mapping Object from HTTP endpoints to Shadowsocks Inbound tags.
     */
    servers: z
      .record(z.string(), z.string())
      .describe(
        "A mapping Object from HTTP endpoints to Shadowsocks Inbound tags."
      ),
    /**
     * If set, when the server is about to stop, traffic and user state will be saved to the specified JSON file.
     */
    cache_path: z
      .string()
      .optional()
      .describe(
        "If set, when the server is about to stop, traffic and user state will be saved to the specified JSON file."
      ),
    /**
     * TLS configuration.
     */
    tls: InboundTLSOptions.optional().describe("TLS configuration."),
  })
  .merge(ListenOptions);

export type SSMAPIServiceOptions = z.infer<typeof SSMAPIServiceOptions>;
