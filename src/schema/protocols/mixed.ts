import { z } from "zod";
import {
  DomainResolverOptions,
  InboundTLSOptions,
  ListenOptions,
} from "@/schema/shared";

const MixedUser = z.object({
  username: z.string(),
  password: z.string(),
});

export const MixedInboundOptions = z
  .object({
    type: z.literal("mixed"),
    tag: z.string().optional(),
    users: z.array(MixedUser).optional().meta({
      description: "SOCKS and HTTP users. No authentication required if empty.",
      description_zh: "SOCKS 和 HTTP 用户。如果为空则不需要验证。",
    }),
    set_system_proxy: z.boolean().optional().meta({
      description:
        "Automatically set system proxy configuration when start and clean up when stop. Only supported on Linux, Android, Windows, and macOS. To work on Android and Apple platforms without privileges, use tun.platform.http_proxy instead.",
      description_zh:
        "启动时自动设置系统代理，停止时自动清理。仅支持 Linux、Android、Windows 和 macOS。要在无特权的 Android 和 iOS 上工作，请改用 tun.platform.http_proxy。",
    }),
    domain_resolver: z
      .union([z.string(), DomainResolverOptions])
      .optional()
      .meta({
        description: "Set domain resolver to use for resolving domain names.",
        description_zh: "用于设置解析域名的域名解析器。",
      }),
    tls: InboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "MixedInboundOptions",
    title: "Mixed Inbound",
    title_zh: "Mixed 入站",
    description:
      "`mixed` inbound is a socks4, socks4a, socks5 and http server.",
    description_zh:
      "`mixed` 入站是一个 socks4, socks4a, socks5 和 http 服务器。",
  });
export type MixedInboundOptions = z.infer<typeof MixedInboundOptions>;
