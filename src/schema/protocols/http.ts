import { z } from "zod";
import {
  DialerOptions,
  DomainResolverOptions,
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
      description: "HTTP users. No authentication required if empty.",
      description_zh: "HTTP 用户。如果为空则不需要验证。",
    }),
    tls: InboundTLSOptions.optional().meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#inbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#inbound)。",
    }),
    domain_resolver: z
      .union([z.string(), DomainResolverOptions])
      .optional()
      .meta({
        description: "Set domain resolver to use for resolving domain names.",
        description_zh: "用于设置解析域名的域名解析器。",
      }),
    set_system_proxy: z.boolean().optional().meta({
      description:
        "Automatically set system proxy configuration when start and clean up when stop. Only supported on Linux, Android, Windows, and macOS. To work on Android and Apple platforms without privileges, use tun.platform.http_proxy instead.",
      description_zh:
        "启动时自动设置系统代理，停止时自动清理。仅支持 Linux、Android、Windows 和 macOS。要在无特权的 Android 和 iOS 上工作，请改用 tun.platform.http_proxy。",
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
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#outbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#outbound)。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "HTTPOutboundOptions",
    title: "HTTP Outbound",
    title_zh: "HTTP 出站",
    description: "`http` outbound is a HTTP CONNECT proxy client.",
    description_zh: "`http` 出站是一个 HTTP CONNECT 代理客户端。",
  });
export type HTTPOutboundOptions = z.infer<typeof HTTPOutboundOptions>;
