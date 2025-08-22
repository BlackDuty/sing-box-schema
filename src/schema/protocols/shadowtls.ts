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
      description: "ShadowTLS protocol version.",
      description_zh: "ShadowTLS 协议版本。",
    }),
    password: z.string().optional().meta({
      description: "ShadowTLS password.",
      description_zh: "ShadowTLS 密码。",
    }),
    users: z.array(ShadowTLSUser).optional().meta({
      description: "ShadowTLS users.",
      description_zh: "ShadowTLS 用户。",
    }),
    handshake: ShadowTLSHandshakeOptions,
    handshake_for_server_name: z
      .record(z.string(), ShadowTLSHandshakeOptions)
      .optional()
      .meta({
        description: "Handshake server address for specific server name.",
        description_zh: "对于特定服务器名称的握手服务器地址。",
      }),
    strict_mode: z.boolean().optional().meta({
      description: "ShadowTLS strict mode.",
      description_zh: "ShadowTLS 严格模式。",
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
      description: "ShadowTLS protocol version.",
      description_zh: "ShadowTLS 协议版本。",
    }),
    password: z.string().optional().meta({
      description: "Set password.",
      description_zh: "设置密码。",
    }),
    tls: OutboundTLSOptions.meta({
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
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
