import { z } from "zod";
import { DialerOptions, ServerOptions } from "./shared";

export const NTPOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description: "Enable NTP service.",
      description_zh: "启用 NTP 服务。",
    }),
    interval: z.string().optional().meta({
      description: "Time synchronization interval.",
      description_zh: "时间同步间隔。",
    }),
    write_to_system: z.boolean().optional().meta({
      description: "Write the updated time to the system.",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "NTPOptions",
    title: "NTP",
    title_zh: "NTP",
    description: "Built-in NTP client service.",
    description_zh: "内建的 NTP 客户端服务。",
  });

export type NTPOptions = z.infer<typeof NTPOptions>;
