import { z } from "zod";

export const BlockOutboundOptions = z
  .object({
    type: z.literal("block"),
    tag: z.string().optional(),
  })
  .meta({
    id: "BlockOutboundOptions",
    title: "Block Outbound",
    title_zh: "Block 出站",
    description: "Block outbound closes all incoming requests.",
    description_zh: "Block 出站关闭所有传入请求。",
  });

export type BlockOutboundOptions = z.infer<typeof BlockOutboundOptions>;
