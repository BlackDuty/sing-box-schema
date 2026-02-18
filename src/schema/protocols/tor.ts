import { z } from "zod";
import { DialerOptions } from "@/schema/shared";

// #region Outbound
export const TorOutboundOptions = z
  .object({
    type: z.literal("tor"),
    tag: z.string().optional(),
    executable_path: z.string().optional().meta({
      description:
        "The path to the Tor executable. Embedded Tor will be ignored if set.",
      description_zh: "Tor 可执行文件路径。如果设置，将覆盖嵌入式 Tor。",
    }),
    extra_args: z.array(z.string()).optional().meta({
      description:
        "List of extra arguments passed to the Tor instance when started.",
      description_zh: "启动 Tor 时传递的附加参数列表。",
    }),
    data_directory: z.string().optional().meta({
      description:
        "Recommended. The data directory of Tor. Each start will be very slow if not specified.",
      description_zh: "Tor 的数据目录。如未设置，每次启动都需要长时间。",
    }),
    torrc: z.record(z.string(), z.string()).optional().meta({
      description: "Map of torrc options. See tor(1) for details.",
      description_zh: "torrc 参数表，参阅 tor(1) 获取详情。",
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
