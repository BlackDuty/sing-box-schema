import { z } from "zod";

/**
 * OOM Killer service options for sing-box.
 */
export const OOMKillerServiceOptions = z
  .object({
    type: z.literal("oom-killer"),
    tag: z.string().optional(),
    memory_limit: z.string().optional().meta({
      description:
        "The memory limit that triggers OOM killing. Accepts human-readable byte sizes such as `128MiB` or `1GiB`. When memory usage exceeds this threshold, the OOM killer becomes active.",
      description_zh:
        "触发 OOM 强杀的内存限制，支持可读的字节大小格式，如 `128MiB`、`1GiB`。当内存使用量超过该阈值时，OOM killer 将被激活。",
    }),
    safety_margin: z.string().optional().meta({
      description:
        "An additional memory buffer subtracted from the limit before enforcement. Accepts human-readable byte sizes such as `32MiB`. Provides headroom to avoid aggressive killing.",
      description_zh:
        "在执行限制前额外减去的内存缓冲量，支持可读的字节大小格式，如 `32MiB`。提供一定余量以避免过于激进的强杀行为。",
    }),
    min_interval: z.union([z.string(), z.number()]).optional().meta({
      description:
        "The minimum interval between consecutive OOM kill checks. Accepts a duration string such as `1s`. Prevents excessive kill frequency.",
      description_zh:
        "两次 OOM 检测之间的最小间隔，支持时间字符串格式如 `1s`。防止过于频繁的强杀操作。",
    }),
    max_interval: z.union([z.string(), z.number()]).optional().meta({
      description:
        "The maximum interval between consecutive OOM kill checks. Accepts a duration string such as `30s`. The interval is dynamically adjusted between `min_interval` and `max_interval`.",
      description_zh:
        "两次 OOM 检测之间的最大间隔，支持时间字符串格式如 `30s`。检测间隔会在 `min_interval` 与 `max_interval` 之间动态调整。",
    }),
    checks_before_limit: z.number().int().optional().meta({
      description:
        "The number of consecutive checks that must exceed the memory limit before the OOM killer takes action. Reduces false positives from transient memory spikes.",
      description_zh:
        "在 OOM killer 采取行动之前，内存需要连续超过限制的检测次数。用于减少因瞬时内存峰值引发的误杀。",
    }),
  })
  .meta({
    id: "OOMKillerServiceOptions",
    title: "OOM Killer Service",
    title_zh: "OOM Killer 服务",
    description:
      "The OOM Killer service monitors memory usage and terminates the process when it exceeds the configured limit, preventing system-level out-of-memory conditions.",
    description_zh:
      "OOM Killer 服务监控内存使用情况，并在超过配置限制时终止进程，从而防止系统级内存耗尽情况的发生。",
  });

export type OOMKillerServiceOptions = z.infer<typeof OOMKillerServiceOptions>;
