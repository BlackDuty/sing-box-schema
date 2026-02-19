import { z } from "zod";
import { DialerOptions, ServerOptions } from "./shared";

export const NTPOptions = z
  .object({
    enabled: z.boolean().optional().meta({
      description: "Enable NTP service.",
      description_zh: "启用 NTP 服务。",
    }),
    interval: z.string().optional().meta({
      description:
        "Time synchronization interval. 30 minutes is used by default.",
      description_zh: "时间同步间隔。默认使用 30 分钟。",
    }),
    write_to_system: z.boolean().optional().meta({
      description: "Write the updated time to the system.",
      description_zh: "将更新后的时间写入系统。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "NTPOptions",
    title: "NTP",
    title_zh: "NTP",
    description:
      "Built-in NTP client service. If enabled, it will provide time for protocols like TLS/Shadowsocks/VMess, which is useful for environments where time synchronization is not possible.",
    description_zh:
      "内建的 NTP 客户端服务。如果启用，它将为像 TLS/Shadowsocks/VMess 这样的协议提供时间，这对于无法进行时间同步的环境很有用。",
  });

export type NTPOptions = z.infer<typeof NTPOptions>;
