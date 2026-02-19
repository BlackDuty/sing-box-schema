import { z } from "zod";
import { InboundTLSOptions, ListenOptions } from "@/schema/shared";

const CCMUser = z.object({
  name: z.string().optional().meta({
    description: "Username identifier for tracking purposes.",
    description_zh: "用于跟踪的用户名标识符。",
  }),
  token: z.string().optional().meta({
    description:
      "Bearer token for authentication. Clients authenticate by setting the `Authorization: Bearer <token>` header.",
    description_zh:
      "用于身份验证的 Bearer 令牌。客户端通过设置 `Authorization: Bearer <token>` 头进行身份验证。",
  }),
});

/**
 * CCM (Claude Code Multiplexer) service.
 */
export const CCMServiceOptions = z
  .object({
    type: z.literal("ccm"),
    tag: z.string().optional(),
    credential_path: z.string().optional().meta({
      description:
        "Path to the Claude Code OAuth credentials file. If not specified, defaults to:\n- `$CLAUDE_CONFIG_DIR/.credentials.json` if `CLAUDE_CONFIG_DIR` environment variable is set\n- `~/.claude/.credentials.json` otherwise\nOn macOS, credentials are read from the system keychain first, then fall back to the file if unavailable. Refreshed tokens are automatically written back to the same location.",
      description_zh:
        "Claude Code OAuth 凭据文件的路径。如果未指定，默认值为：\n- 如果设置了 `CLAUDE_CONFIG_DIR` 环境变量，则使用 `$CLAUDE_CONFIG_DIR/.credentials.json`\n- 否则使用 `~/.claude/.credentials.json`\n在 macOS 上，首先从系统钥匙串读取凭据，如果不可用则回退到文件。刷新的令牌会自动写回相同位置。",
    }),
    users: z.array(CCMUser).optional().meta({
      description:
        "List of authorized users for token authentication. If empty, no authentication is required. Claude Code authenticates by setting the `ANTHROPIC_AUTH_TOKEN` environment variable to their token value.",
      description_zh:
        "用于令牌身份验证的授权用户列表。如果为空，则不需要身份验证。Claude Code 通过设置 `ANTHROPIC_AUTH_TOKEN` 环境变量为其令牌值进行身份验证。",
    }),
    headers: z.record(z.string(), z.string()).optional().meta({
      description:
        "Custom HTTP headers to send to the Claude API. These headers will override any existing headers with the same name.",
      description_zh:
        "发送到 Claude API 的自定义 HTTP 标头。这些标头会覆盖同名的现有标头。",
    }),
    usages_path: z.string().optional().meta({
      description:
        "Path to the file for storing aggregated API usage statistics. Usage tracking is disabled if not specified. When enabled, the service tracks and saves comprehensive statistics including:\n- Request counts\n- Token usage (input, output, cache read, cache creation)\n- Calculated costs in USD based on Claude API pricing\nStatistics are organized by model, context window (200k standard vs 1M premium), and optionally by user when authentication is enabled. The statistics file is automatically saved every minute and upon service shutdown.",
      description_zh:
        "用于存储聚合 API 使用统计信息的文件路径。如果未指定，使用跟踪将被禁用。启用后，服务会跟踪并保存全面的统计信息，包括：\n- 请求计数\n- 令牌使用量（输入、输出、缓存读取、缓存创建）\n- 基于 Claude API 定价计算的美元成本\n统计信息按模型、上下文窗口（200k 标准版 vs 1M 高级版）以及可选的用户（启用身份验证时）组织。统计文件每分钟自动保存一次，并在服务关闭时保存。",
    }),
    tls: InboundTLSOptions.optional().meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#inbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#inbound)。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "CCMServiceOptions",
    title: "CCM",
    title_zh: "CCM",
    description:
      "CCM (Claude Code Multiplexer) service is a multiplexing service that allows you to access your local Claude Code subscription remotely through custom tokens.",
    description_zh:
      "CCM（Claude Code 多路复用器）服务是一个多路复用服务，允许您通过自定义令牌远程访问本地的 Claude Code 订阅。",
  });

export type CCMServiceOptions = z.infer<typeof CCMServiceOptions>;
