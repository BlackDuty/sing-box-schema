import { z } from "zod";
import { listableString } from "../../utils";
import {
  DialerOptions,
  InboundTLSOptions,
  ListenOptions,
  OutboundTLSOptions,
  ServerOptions,
} from "../shared";

export const AnyTLSUser = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
});

// #region Inbound
export const AnyTLSInboundOptions = z
  .object({
    type: z.literal("anytls"),
    tag: z.string(),
    users: z.array(AnyTLSUser).optional().meta({
      description: "AnyTLS users.",
      description_zh: "AnyTLS 用户。",
    }),
    padding_scheme: listableString.optional().meta({
      description: "AnyTLS padding scheme line array.",
      description_zh: "AnyTLS 填充方案行数组。",
    }),
    tls: InboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "AnyTLSInboundOptions",
    title: "AnyTLS Inbound",
    title_zh: "AnyTLS 入站",
  });
export type AnyTLSInboundOptions = z.infer<typeof AnyTLSInboundOptions>;
// #endregion

// #region Outbound
export const AnyTLSOutboundOptions = z
  .object({
    type: z.literal("anytls"),
    tag: z.string(),
    password: z.string().meta({
      description: "The AnyTLS password.",
      description_zh: "AnyTLS 密码。",
    }),
    idle_session_check_interval: z.string().optional().meta({
      description: "Interval checking for idle sessions.",
      description_zh: "检查空闲会话的时间间隔。",
    }),
    idle_session_timeout: z.string().optional().meta({
      description:
        "In the check, close sessions that have been idle for longer than this.",
      description_zh: "在检查中，关闭闲置时间超过此值的会话。",
    }),
    min_idle_session: z.number().int().optional().meta({
      description:
        "In the check, at least the first `n` idle sessions are kept open.",
      description_zh: "在检查中，至少前 `n` 个空闲会话保持打开状态。",
    }),
    tls: OutboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "AnyTLSOutboundOptions",
    title: "AnyTLS Outbound",
    title_zh: "AnyTLS 出站",
  });
export type AnyTLSOutboundOptions = z.infer<typeof AnyTLSOutboundOptions>;
// #endregion
