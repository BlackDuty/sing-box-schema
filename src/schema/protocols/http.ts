import { z } from "zod";
import {
  DialerOptions,
  HttpHeader,
  InboundTLSOptions,
  ListenOptions,
  OutboundTLSOptions,
  ServerOptions,
} from "@/schema/shared";

const HTTPUser = z.object({
  username: z.string(),
  password: z.string(),
});

export const HTTPInboundOptions = z
  .object({
    type: z.literal("http"),
    tag: z.string().optional(),
    users: z.array(HTTPUser).optional().meta({
      description: "HTTP users.",
      description_zh: "HTTP 用户。",
    }),
    tls: InboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),
    set_system_proxy: z.boolean().optional().meta({
      description: "Automatically set system proxy configuration.",
      description_zh: "启动时自动设置系统代理，停止时自动清理。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "HTTPInboundOptions",
    title: "HTTP Inbound",
    title_zh: "HTTP 入站",
  });
export type HTTPInboundOptions = z.infer<typeof HTTPInboundOptions>;

export const HTTPOutboundOptions = z
  .object({
    type: z.literal("http"),
    tag: z.string().optional(),
    username: z.string().optional().meta({
      description: "Basic authorization username.",
      description_zh: "Basic 认证用户名。",
    }),
    password: z.string().optional().meta({
      description: "Basic authorization password.",
      description_zh: "Basic 认证密码。",
    }),
    path: z.string().optional().meta({
      description: "Path of HTTP request.",
      description_zh: "HTTP 请求路径。",
    }),
    headers: HttpHeader.optional().meta({
      description: "Extra headers of HTTP request.",
      description_zh: "HTTP 请求的额外标头。",
    }),
    tls: OutboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "HTTPOutboundOptions",
    title: "HTTP Outbound",
    title_zh: "HTTP 出站",
    description: "HTTP outbound is a HTTP CONNECT proxy client.",
    description_zh: "HTTP 出站是一个 HTTP CONNECT 代理客户端。",
  });
export type HTTPOutboundOptions = z.infer<typeof HTTPOutboundOptions>;
