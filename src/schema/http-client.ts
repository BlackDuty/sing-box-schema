import { z } from "zod";
import { DialerOptions, HttpHeader, OutboundTLSOptions } from "./shared";

export const HTTP2Options = z
  .object({
    idle_timeout: z.string().optional().meta({
      description: "HTTP/2 idle timeout.",
      description_zh: "HTTP/2 空闲超时时间。",
    }),
    keep_alive_period: z.string().optional().meta({
      description: "HTTP/2 keep-alive period.",
      description_zh: "HTTP/2 keep-alive 周期。",
    }),
    stream_receive_window: z
      .union([z.number().int(), z.string()])
      .optional()
      .meta({
        description: "HTTP/2 stream receive window.",
        description_zh: "HTTP/2 流接收窗口。",
      }),
    connection_receive_window: z
      .union([z.number().int(), z.string()])
      .optional()
      .meta({
        description: "HTTP/2 connection receive window.",
        description_zh: "HTTP/2 连接接收窗口。",
      }),
    max_concurrent_streams: z.number().int().optional().meta({
      description: "Maximum concurrent HTTP/2 streams.",
      description_zh: "最大并发 HTTP/2 流数量。",
    }),
  })
  .meta({
    id: "HTTP2Options",
    title: "HTTP/2 Options",
    title_zh: "HTTP/2 选项",
  });
export type HTTP2Options = z.infer<typeof HTTP2Options>;

export const QUICOptions = z
  .object({
    ...HTTP2Options.shape,
    initial_packet_size: z.number().int().optional().meta({
      description: "Initial QUIC packet size.",
      description_zh: "初始 QUIC 数据包大小。",
    }),
    disable_path_mtu_discovery: z.boolean().optional().meta({
      description: "Disable QUIC path MTU discovery.",
      description_zh: "禁用 QUIC 路径 MTU 发现。",
    }),
  })
  .meta({
    id: "QUICOptions",
    title: "QUIC Options",
    title_zh: "QUIC 选项",
  });
export type QUICOptions = z.infer<typeof QUICOptions>;

const HTTPClientBaseOptions = z.object({
  tag: z.string().optional().meta({
    description: "The tag of the HTTP client.",
    description_zh: "HTTP 客户端的标签。",
  }),
  engine: z.string().optional().meta({
    description: "HTTP client engine.",
    description_zh: "HTTP 客户端引擎。",
  }),
  version: z
    .union([z.literal(1), z.literal(2), z.literal(3)])
    .optional()
    .meta({
      description: "HTTP protocol version.",
      description_zh: "HTTP 协议版本。",
    }),
  disable_version_fallback: z.boolean().optional().meta({
    description: "Disable HTTP version fallback.",
    description_zh: "禁用 HTTP 版本回退。",
  }),
  headers: HttpHeader.optional().meta({
    description: "HTTP request headers.",
    description_zh: "HTTP 请求头。",
  }),
  tls: OutboundTLSOptions.optional().meta({
    description: "TLS options for the HTTP client.",
    description_zh: "HTTP 客户端的 TLS 选项。",
  }),
  ...DialerOptions.shape,
});

export const HTTPClientInlineOptions = z
  .object({
    ...HTTPClientBaseOptions.shape,
    ...HTTP2Options.shape,
    ...QUICOptions.shape,
  })
  .meta({
    id: "HTTPClientInlineOptions",
    title: "HTTP Client Inline Options",
    title_zh: "HTTP 客户端内联选项",
  });
export type HTTPClientInlineOptions = z.infer<typeof HTTPClientInlineOptions>;

export const HTTPClientOptions = z
  .union([z.string(), HTTPClientInlineOptions])
  .meta({
    id: "HTTPClientOptions",
    title: "HTTP Client Options",
    title_zh: "HTTP 客户端选项",
  });
export type HTTPClientOptions = z.infer<typeof HTTPClientOptions>;

export const HTTPClient = HTTPClientInlineOptions.meta({
  id: "HTTPClient",
  title: "HTTP Client",
  title_zh: "HTTP 客户端",
});
export type HTTPClient = z.infer<typeof HTTPClient>;
