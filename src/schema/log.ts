import z from "zod";

/**
 * Log settings for sing-box.
 */
export const LogOptions = z
  .object({
    /**
     * Disable logging, no output after start.
     */
    disabled: z.boolean().optional().meta({
      description: "Disable logging, no output after start.",
      description_zh: "禁用日志，启动后不输出日志。",
    }),
    /**
     * Log level.
     */
    level: z
      .enum(["trace", "debug", "info", "warn", "error", "fatal", "panic"])
      .optional()
      .meta({
        description:
          "Log level. One of: `trace` `debug` `info` `warn` `error` `fatal` `panic`.",
        description_zh:
          "日志等级，可选值：`trace` `debug` `info` `warn` `error` `fatal` `panic`。",
      }),
    /**
     * Output file path.
     */
    output: z.string().optional().meta({
      description:
        "Output file path. Will not write log to console after enable.",
      description_zh: "输出文件路径，启动后将不输出到控制台。",
    }),
    /**
     * Add time to each line.
     */
    timestamp: z.boolean().optional().meta({
      description: "Add time to each line.",
      description_zh: "添加时间到每行。",
    }),
  })
  .meta({
    id: "LogOptions",
    title: "Log",
    title_zh: "日志",
    description:
      "Log settings covering disabled, level, output, and timestamp controls for sing-box.",
    description_zh:
      "日志设置，涵盖 disabled、level、output 与 timestamp 控制字段。",
  });

export type LogOptions = z.infer<typeof LogOptions>;
