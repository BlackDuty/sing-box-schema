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
      description: "AnyTLS users. Required.",
      description_zh: "AnyTLS 用户。必填。",
    }),
    padding_scheme: listableString.optional().meta({
      description: "AnyTLS padding scheme line array.",
      description_zh: "AnyTLS 填充方案行数组。",
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
      description: "The AnyTLS password. Required.",
      description_zh: "AnyTLS 密码。必填。",
    }),
    idle_session_check_interval: z.string().optional().meta({
      description: "Interval checking for idle sessions. Default: 30s.",
      description_zh: "检查空闲会话的时间间隔。默认值：30秒。",
    }),
    idle_session_timeout: z.string().optional().meta({
      description:
        "In the check, close sessions that have been idle for longer than this. Default: 30s.",
      description_zh: "在检查中，关闭闲置时间超过此值的会话。默认值：30秒。",
    }),
    min_idle_session: z.number().int().optional().meta({
      description:
        "In the check, at least the first `n` idle sessions are kept open. Default value: `n`=0.",
      description_zh:
        "在检查中，至少前 `n` 个空闲会话保持打开状态。默认值：`n`=0。",
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
    id: "AnyTLSOutboundOptions",
    title: "AnyTLS Outbound",
    title_zh: "AnyTLS 出站",
  });
export type AnyTLSOutboundOptions = z.infer<typeof AnyTLSOutboundOptions>;
// #endregion
