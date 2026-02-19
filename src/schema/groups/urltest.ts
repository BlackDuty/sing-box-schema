import { z } from "zod";

// #region Outbound
export const URLTestOutbound = z
  .object({
    type: z.literal("urltest"),
    tag: z.string(),
    outbounds: z.array(z.string()).meta({
      description: "List of outbound tags to test.",
      description_zh: "用于测试的出站标签列表。",
    }),
    url: z.string().url().optional().meta({
      description:
        "The URL to test. `https://www.gstatic.com/generate_204` will be used if empty.",
      description_zh:
        "用于测试的链接。默认使用 `https://www.gstatic.com/generate_204`。",
    }),
    interval: z.string().optional().meta({
      description: "The test interval. `3m` will be used if empty.",
      description_zh: "测试间隔。默认使用 `3m`。",
    }),
    tolerance: z.number().int().optional().meta({
      description:
        "The test tolerance in milliseconds. `50` will be used if empty.",
      description_zh: "以毫秒为单位的测试容差。默认使用 `50`。",
    }),
    idle_timeout: z.string().optional().meta({
      description: "The idle timeout. `30m` will be used if empty.",
      description_zh: "空闲超时。默认使用 `30m`。",
    }),
    interrupt_exist_connections: z.boolean().optional().meta({
      description:
        "Interrupt existing connections when the selected outbound has changed. Only inbound connections are affected by this setting, internal connections will always be interrupted.",
      description_zh:
        "当选定的出站发生更改时，中断现有连接。仅入站连接受此设置影响，内部连接将始终被中断。",
    }),
  })
  .meta({
    id: "URLTestOutbound",
    title: "URLTest Outbound",
    title_zh: "URLTest 出站",
  });
export type URLTestOutbound = z.infer<typeof URLTestOutbound>;
// #endregion
