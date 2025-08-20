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
      description: "The URL to test.",
      description_zh: "用于测试的链接。",
    }),
    interval: z.string().optional().meta({
      description: "The test interval.",
      description_zh: "测试间隔。",
    }),
    tolerance: z.number().int().optional().meta({
      description: "The test tolerance in milliseconds.",
      description_zh: "以毫秒为单位的测试容差。",
    }),
    idle_timeout: z.string().optional().meta({
      description: "The idle timeout.",
      description_zh: "空闲超时。",
    }),
    interrupt_exist_connections: z.boolean().optional().meta({
      description: "Interrupt existing connections when the selected outbound has changed.",
      description_zh: "当选定的出站发生更改时，中断现有连接。",
    }),
  })
  .meta({
    id: "URLTestOutbound",
    title: "URLTest Outbound",
    title_zh: "URLTest 出站",
  });
export type URLTestOutbound = z.infer<typeof URLTestOutbound>;
// #endregion
