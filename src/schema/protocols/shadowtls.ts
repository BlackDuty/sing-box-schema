import { z } from "zod";
import {
  DialerOptions,
  ListenOptions,
  OutboundTLSOptions,
  ServerOptions,
} from "../shared";

const ShadowTLSUser = z.object({
  name: z.string(),
  password: z.string(),
});

const ShadowTLSHandshakeOptions = z.object({
  ...ServerOptions.shape,
  ...DialerOptions.shape,
});

export const ShadowTLSInboundOptions = z
  .object({
    type: z.literal("shadowtls"),
    tag: z.string().optional(),
    version: z.number().int().min(1).max(3).optional().meta({
      description:
        "ShadowTLS protocol version.\n\n| Value         | Protocol Version                                                                        |\n|---------------|-----------------------------------------------------------------------------------------|\n| `1` (default) | [ShadowTLS v1](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-en.md#v1) |\n| `2`           | [ShadowTLS v2](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-en.md#v2) |\n| `3`           | [ShadowTLS v3](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-v3-en.md) |",
      description_zh:
        "ShadowTLS 协议版本。\n\n| 值             | 协议版本                                                                                    |\n|---------------|-----------------------------------------------------------------------------------------|\n| `1` (default) | [ShadowTLS v1](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-en.md#v1) |\n| `2`           | [ShadowTLS v2](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-en.md#v2) |\n| `3`           | [ShadowTLS v3](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-v3-en.md) |",
    }),
    password: z.string().optional().meta({
      description:
        "ShadowTLS password. Only available in the ShadowTLS protocol 2.",
      description_zh: "ShadowTLS 密码。仅在 ShadowTLS 协议版本 2 中可用。",
    }),
    users: z.array(ShadowTLSUser).optional().meta({
      description:
        "ShadowTLS users. Only available in the ShadowTLS protocol 3.",
      description_zh: "ShadowTLS 用户。仅在 ShadowTLS 协议版本 3 中可用。",
    }),
    handshake: ShadowTLSHandshakeOptions.meta({
      description:
        "When `wildcard_sni` is configured to `all`, the server address is optional. Handshake server address and [Dial Fields](/configuration/shared/dial/).",
      description_zh:
        "当 `wildcard_sni` 被配置为 `all` 时，服务器地址可选。握手服务器地址和 [拨号字段](/zh/configuration/shared/dial/)。",
    }),
    handshake_for_server_name: z
      .record(z.string(), ShadowTLSHandshakeOptions)
      .optional()
      .meta({
        description:
          "Handshake server address and [Dial Fields](/configuration/shared/dial/) for specific server name. Only available in the ShadowTLS protocol 2/3.",
        description_zh:
          "对于特定服务器名称的握手服务器地址和 [拨号字段](/zh/configuration/shared/dial/)。仅在 ShadowTLS 协议 2/3 中可用。",
      }),
    strict_mode: z.boolean().optional().meta({
      description:
        "ShadowTLS strict mode. Only available in the ShadowTLS protocol 3.",
      description_zh: "ShadowTLS 严格模式。仅在 ShadowTLS 协议版本 3 中可用。",
    }),
    wildcard_sni: z.enum(["off", "authed", "all"]).optional().meta({
      description:
        "ShadowTLS wildcard SNI mode (since sing-box 1.12.0). Values: `off` (default), `authed`, `all`. Authenticated connections will have their destination overwritten to `(servername):443` when enabled, except when `handshake_for_server_name` matches.",
      description_zh:
        "ShadowTLS 通配符 SNI 模式（自 sing-box 1.12.0 起）。可用值：`off`（默认）、`authed`、`all`。启用后已认证连接的目标会被改写为 `(servername):443`，但匹配 `handshake_for_server_name` 的连接不会受影响。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "ShadowTLSInboundOptions",
    title: "ShadowTLS Inbound",
    title_zh: "ShadowTLS 入站",
  });
export type ShadowTLSInboundOptions = z.infer<typeof ShadowTLSInboundOptions>;

export const ShadowTLSOutboundOptions = z
  .object({
    type: z.literal("shadowtls"),
    tag: z.string().optional(),
    version: z.number().int().min(1).max(3).optional().meta({
      description:
        "ShadowTLS protocol version.\n\n| Value         | Protocol Version                                                                        |\n|---------------|-----------------------------------------------------------------------------------------|\n| `1` (default) | [ShadowTLS v1](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-en.md#v1) |\n| `2`           | [ShadowTLS v2](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-en.md#v2) |\n| `3`           | [ShadowTLS v3](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-v3-en.md) |",
      description_zh:
        "ShadowTLS 协议版本。\n\n| 值             | 协议版本                                                                                    |\n|---------------|-----------------------------------------------------------------------------------------|\n| `1` (default) | [ShadowTLS v1](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-en.md#v1) |\n| `2`           | [ShadowTLS v2](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-en.md#v2) |\n| `3`           | [ShadowTLS v3](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-v3-en.md) |",
    }),
    password: z.string().optional().meta({
      description:
        "Set password. Only available in the ShadowTLS v2/v3 protocol.",
      description_zh: "设置密码。仅在 ShadowTLS 协议版本 2/3 中可用。",
    }),
    tls: OutboundTLSOptions.meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#outbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#outbound)。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "ShadowTLSOutboundOptions",
    title: "ShadowTLS Outbound",
    title_zh: "ShadowTLS 出站",
  });
export type ShadowTLSOutboundOptions = z.infer<typeof ShadowTLSOutboundOptions>;
