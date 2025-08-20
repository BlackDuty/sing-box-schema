import { z } from "zod";
import {
  DialerOptions,
  HttpHeader,
  InboundTLSOptions,
  ListenOptions,
  Network,
  OutboundTLSOptions,
  ServerOptions,
} from "@/schema/shared";

export const Hysteria2Obfs = z.object({
  type: z.string().optional().meta({
    description: "QUIC traffic obfuscator type, only available with `salamander`.",
    description_zh: "QUIC 流量混淆器类型，仅可设为 `salamander`。",
  }),
  password: z.string().optional().meta({
    description: "QUIC traffic obfuscator password.",
    description_zh: "QUIC 流量混淆器密码。",
  }),
});

export const Hysteria2User = z.object({
  name: z.string().optional(),
  password: z.string().optional().meta({
    description: "Authentication password",
    description_zh: "认证密码。",
  }),
});

const Hysteria2MasqueradeFile = z.object({
  type: z.literal("file"),
  directory: z.string().meta({
    description: "File server root directory.",
    description_zh: "文件服务器根目录。",
  }),
});

const Hysteria2MasqueradeProxy = z.object({
  type: z.literal("proxy"),
  url: z.string().meta({
    description: "Reverse proxy target URL.",
    description_zh: "反向代理目标 URL。",
  }),
  rewrite_host: z.boolean().optional().meta({
    description: "Rewrite the `Host` header to the target URL.",
    description_zh: "重写请求头中的 Host 字段到目标 URL。",
  }),
});

const Hysteria2MasqueradeString = z.object({
  type: z.literal("string"),
  status_code: z.number().int().optional().meta({
    description: "Fixed response status code.",
    description_zh: "固定响应状态码。",
  }),
  headers: HttpHeader.optional().meta({
    description: "Fixed response headers.",
    description_zh: "固定响应头。",
  }),
  content: z.string().meta({
    description: "Fixed response content.",
    description_zh: "固定响应内容。",
  }),
});

export const Hysteria2Masquerade = z
  .discriminatedUnion("type", [
    Hysteria2MasqueradeFile,
    Hysteria2MasqueradeProxy,
    Hysteria2MasqueradeString,
  ])
  .meta({
    description:
      "HTTP3 server behavior (Object configuration) when authentication fails.",
    description_zh: "HTTP3 服务器认证失败时的行为 （对象配置）。",
  });

export const Hysteria2InboundOptions = z
  .object({
    type: z.literal("hysteria2"),
    tag: z.string().optional(),
    up_mbps: z.number().int().optional(),
    down_mbps: z.number().int().optional(),
    obfs: Hysteria2Obfs.optional(),
    users: z.array(Hysteria2User).optional(),
    ignore_client_bandwidth: z.boolean().optional().meta({
      description: "Commands clients to use the BBR CC instead of Hysteria CC.",
      description_zh: "命令客户端使用 BBR 拥塞控制算法而不是 Hysteria CC。",
    }),
    tls: InboundTLSOptions.optional(),
    masquerade: Hysteria2Masquerade.optional(),
    brutal_debug: z.boolean().optional().meta({
      description: "Enable debug information logging for Hysteria Brutal CC.",
      description_zh: "启用 Hysteria Brutal CC 的调试信息日志记录。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "Hysteria2InboundOptions",
    title: "Hysteria2 Inbound",
    title_zh: "Hysteria2 入站",
  });
export type Hysteria2InboundOptions = z.infer<typeof Hysteria2InboundOptions>;

export const Hysteria2OutboundOptions = z
  .object({
    type: z.literal("hysteria2"),
    tag: z.string().optional(),
    server_ports: z.union([z.string(), z.array(z.string())]).optional().meta({
      description: "Server port range list.",
      description_zh: "服务器端口范围列表。",
    }),
    hop_interval: z.string().optional().meta({
      description: "Port hopping interval.",
      description_zh: "端口跳跃间隔。",
    }),
    up_mbps: z.number().int().optional(),
    down_mbps: z.number().int().optional(),
    obfs: Hysteria2Obfs.optional(),
    password: z.string().optional(),
    network: Network.optional(),
    tls: OutboundTLSOptions.optional(),
    brutal_debug: z.boolean().optional().meta({
      description: "Enable debug information logging for Hysteria Brutal CC.",
      description_zh: "启用 Hysteria Brutal CC 的调试信息日志记录。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "Hysteria2OutboundOptions",
    title: "Hysteria2 Outbound",
    title_zh: "Hysteria2 出站",
  });
export type Hysteria2OutboundOptions = z.infer<
  typeof Hysteria2OutboundOptions
>;
