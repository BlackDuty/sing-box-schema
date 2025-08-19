import { z } from "zod";
import { DialerOptions, ServerOptions } from "./shared";

/**
 * NTP settings for sing-box.
 */
export const NTPOptions = z
  .object({
    /**
     * Enable NTP service.
     */
    enabled: z.boolean().optional().describe("Enable NTP service."),
    /**
     * Time synchronization interval.
     */
    interval: z.string().optional().describe("Time synchronization interval."),
    /**
     * Write the updated time to the system.
     */
    write_to_system: z
      .boolean()
      .optional()
      .describe("Write the updated time to the system."),
  })
  .extend(ServerOptions)
  .extend(DialerOptions);

export type NTPOptions = z.infer<typeof NTPOptions>;
