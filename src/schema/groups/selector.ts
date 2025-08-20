import { z } from "zod";

// #region Outbound
export const SelectorOutbound = z
  .object({
    type: z.literal("selector"),
    tag: z.string(),
    outbounds: z.array(z.string()).meta({
      description: "List of outbound tags to select.",
      description_zh: "用于选择的出站标签列表。",
    }),
    default: z.string().optional().meta({
      description: "The default outbound tag. The first outbound will be used if empty.",
      description_zh: "默认的出站标签。默认使用第一个出站。",
    }),
    interrupt_exist_connections: z.boolean().optional().meta({
      description: "Interrupt existing connections when the selected outbound has changed.",
      description_zh: "当选定的出站发生更改时，中断现有连接。",
    }),
  })
  .meta({
    id: "SelectorOutbound",
    title: "Selector Outbound",
    title_zh: "选择器出站",
  });
export type SelectorOutbound = z.infer<typeof SelectorOutbound>;
// #endregion
