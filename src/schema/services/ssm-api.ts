import { z } from "zod";
import { InboundTLSOptions, ListenOptions } from "@/schema/shared";

/**
 * SSM API service is a RESTful API server for managing Shadowsocks servers.
 */
export const SSMAPIServiceOptions = z
  .object({
    type: z.literal("ssm-api"),
    /**
     * A mapping Object from HTTP endpoints to Shadowsocks Inbound tags.
     */
    servers: z.record(z.string(), z.string()).meta({
      description:
        "A mapping Object from HTTP endpoints to Shadowsocks Inbound tags.",
      description_zh: "从 HTTP 端点到 Shadowsocks 入站标签的映射对象。",
    }),
    /**
     * If set, when the server is about to stop, traffic and user state will be saved to the specified JSON file.
     */
    cache_path: z.string().optional().meta({
      description:
        "If set, when the server is about to stop, traffic and user state will be saved to the specified JSON file to be restored on the next startup.",
      description_zh:
        "如果设置，当服务器即将停止时，流量和用户状态将保存到指定的 JSON 文件中，以便在下次启动时恢复。",
    }),
    /**
     * TLS configuration.
     */
    tls: InboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "SSMAPIServiceOptions",
    title: "SSM API",
    title_zh: "SSM API",
    description:
      "SSM API service is a RESTful API server for managing Shadowsocks servers.",
    description_zh:
      "SSM API 服务是用于管理 Shadowsocks 服务器的 RESTful API 服务器。",
  });

export type SSMAPIServiceOptions = z.infer<typeof SSMAPIServiceOptions>;