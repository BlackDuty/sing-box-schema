import z from "zod";

/**
 * Log settings for sing-box.
 */
export const LogOptions = z.object({
  /**
   * Disable logging, no output after start.
   */
  disabled: z
    .boolean()
    .optional()
    .describe("Disable logging, no output after start."),
  /**
   * Log level. One of: `trace` `debug` `info` `warn` `error` `fatal` `panic`.
   */
  level: z
    .enum(["trace", "debug", "info", "warn", "error", "fatal", "panic"])
    .optional()
    .describe("Log level."),
  /**
   * Output file path. Will not write log to console after enable.
   */
  output: z.string().optional().describe("Output file path."),
  /**
   * Add time to each line.
   */
  timestamp: z.boolean().optional().describe("Add time to each line."),
});

export type LogOptions = z.infer<typeof LogOptions>;
