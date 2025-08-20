import { z } from "zod";
import { DialerOptions } from "@/schema/shared";

// #region Outbound
export const TorOutboundOptions = z
  .object({
    type: z.literal("tor"),
    tag: z.string().optional(),
    executable_path: z.string().optional().meta({
      description: "The path to the Tor executable.",
      description_zh: "Tor 可执行文件路径。",
    }),
    extra_args: z.array(z.string()).optional().meta({
      description: "List of extra arguments passed to the Tor instance when started.",
      description_zh: "启动 Tor 时传递的附加参数列表。",
    }),
    data_directory: z.string().optional().meta({
      description: "The data directory of Tor.",
      description_zh: "Tor 的数据目录。",
    }),
    torrc: z.record(z.string(), z.any()).optional().meta({
      description: "Map of torrc options.",
      description_zh: "torrc 参数表。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "TorOutboundOptions",
    title: "Tor Outbound",
    title_zh: "Tor 出站",
  });
export type TorOutboundOptions = z.infer<typeof TorOutboundOptions>;
// #endregion
