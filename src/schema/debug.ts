import { z } from "zod";

/**
 * Debug options for sing-box.
 */
export const DebugOptions = z
  .object({
    listen: z.string().optional().meta({
      description: "HTTP debug server listen address.",
      description_zh: "HTTP 调试服务器监听地址。",
    }),
    gc_percent: z.number().int().optional().meta({
      description:
        "The GC percent, see https://pkg.go.dev/runtime/debug#SetGCPercent.",
      description_zh:
        "GC 百分比，参见 https://pkg.go.dev/runtime/debug#SetGCPercent。",
    }),
    max_stack: z.number().int().optional().meta({
      description:
        "The max stack depth, see https://pkg.go.dev/runtime/debug#SetMaxStack.",
      description_zh:
        "最大堆栈深度，参见 https://pkg.go.dev/runtime/debug#SetMaxStack。",
    }),
    max_threads: z.number().int().optional().meta({
      description:
        "The max threads, see https://pkg.go.dev/runtime/debug#SetMaxThreads.",
      description_zh:
        "最大线程数，参见 https://pkg.go.dev/runtime/debug#SetMaxThreads。",
    }),
    panic_on_fault: z.boolean().optional().meta({
      description:
        "Panic on fault, see https://pkg.go.dev/runtime/debug#SetPanicOnFault.",
      description_zh:
        "出错时 panic，参见 https://pkg.go.dev/runtime/debug#SetPanicOnFault。",
    }),
    trace_back: z.string().optional().meta({
      description:
        "The traceback level, see https://pkg.go.dev/runtime/debug#SetTraceback.",
      description_zh:
        "回溯级别，参见 https://pkg.go.dev/runtime/debug#SetTraceback。",
    }),
    memory_limit: z.string().optional().meta({
      description:
        "Memory limit in bytes, e.g. `128MiB`, see https://pkg.go.dev/runtime/debug#SetMemoryLimit.",
      description_zh:
        "内存限制（字节），如 `128MiB`，参见 https://pkg.go.dev/runtime/debug#SetMemoryLimit。",
    }),
    oom_killer: z.boolean().optional().meta({
      description: "Enable OOM killer.",
      description_zh: "启用 OOM killer。",
    }),
  })
  .meta({
    id: "DebugOptions",
    title: "Debug Options",
    title_zh: "调试选项",
    description: "Debug options for sing-box.",
    description_zh: "sing-box 调试选项。",
  });

export type DebugOptions = z.infer<typeof DebugOptions>;
