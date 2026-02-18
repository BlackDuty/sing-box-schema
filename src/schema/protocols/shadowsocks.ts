import { z } from "zod";
import {
  DialerOptions,
  InboundMultiplexOptions,
  ListenOptions,
  Network,
  OutboundMultiplexOptions,
  ServerOptions,
  UDPOverTCPOptions,
} from "@/schema/shared";

// #region Shared
export const ShadowsocksUser = z.object({
  name: z.string(),
  password: z.string(),
});
// #endregion

// #region Inbound
export const ShadowsocksDestination = z.object({
  name: z.string(),
  password: z.string(),

  ...ServerOptions.shape,
});

export const ShadowsocksInboundOptions = z
  .object({
    type: z.literal("shadowsocks"),
    tag: z.string().optional(),
    network: Network.optional().meta({
      description:
        "Listen network, one of `tcp` `udp`. Both are enabled when empty.",
      description_zh: "监听的网络协议，`tcp` `udp` 之一。默认同时启用。",
    }),
    method: z.string().meta({
      description:
        "Encryption method. Supported values include 2022 variants (`2022-blake3-*`), AES-GCM/ChaCha20, and legacy methods. See docs for the full list.",
      description_zh:
        "加密方法。支持 2022 系列（`2022-blake3-*`）、AES-GCM/ChaCha20 和旧方法。详见文档中的完整列表。",
    }),
    password: z.string().optional().meta({
      description:
        "Shadowsocks password. 2022 methods expect base64 data generated via `sing-box generate rand --base64 <Key Length>`.",
      description_zh:
        "Shadowsocks 密码。2022 系列方法需使用 `sing-box generate rand --base64 <密钥长度>` 生成的 base64 数据。",
    }),
    users: z.array(ShadowsocksUser).optional().meta({
      description: "Shadowsocks users. No authentication required if empty.",
      description_zh: "Shadowsocks 用户。如果为空则不需要验证。",
    }),
    destinations: z.array(ShadowsocksDestination).optional().meta({
      description:
        "Relay destinations. Each entry includes a name, server address, server_port, and password.",
      description_zh:
        "中转目标列表。每项包括名称、服务器地址、服务器端口和密码。",
    }),
    multiplex: InboundMultiplexOptions.optional().meta({
      description:
        "See [Multiplex](/configuration/shared/multiplex#inbound) for details.",
      description_zh:
        "参阅 [多路复用](/zh/configuration/shared/multiplex#inbound)。",
    }),
    managed: z.boolean().optional().meta({
      description:
        "Defaults to `false`. Enable when the inbound is managed by the SSM API for dynamic users.",
      description_zh:
        "默认为 `false`。当通过 [SSM API](/zh/configuration/service/ssm-api) 动态管理用户时必须启用。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "ShadowsocksInboundOptions",
    title: "Shadowsocks Inbound",
    title_zh: "Shadowsocks 入站",
  });
export type ShadowsocksInboundOptions = z.infer<
  typeof ShadowsocksInboundOptions
>;
// #endregion

// #region Outbound
export const ShadowsocksOutboundOptions = z
  .object({
    type: z.literal("shadowsocks"),
    tag: z.string().optional(),
    method: z.string().meta({
      description:
        "Encryption method. Supported values include 2022 variants (`2022-blake3-*`), AES-GCM/ChaCha20, and legacy methods like AES-CTR/CFB, RC4-MD5, ChaCha20, and XChacha20.",
      description_zh:
        "加密方法。支持 2022 系列（`2022-blake3-*`）、AES-GCM/ChaCha20 以及旧方法（AES-CTR/CFB、RC4-MD5、ChaCha20 和 XChacha20）。",
    }),
    password: z.string().meta({
      description: "The Shadowsocks password.",
      description_zh: "Shadowsocks 密码。",
    }),
    plugin: z.string().optional().meta({
      description:
        "Shadowsocks SIP003 plugin, implemented in internal. Only `obfs-local` and `v2ray-plugin` are supported.",
      description_zh:
        "Shadowsocks SIP003 插件，由内部实现。仅支持 `obfs-local` 和 `v2ray-plugin`。",
    }),
    plugin_opts: z.string().optional().meta({
      description: "Shadowsocks SIP003 plugin options.",
      description_zh: "Shadowsocks SIP003 插件参数。",
    }),
    network: Network.optional().meta({
      description:
        "Enabled network. One of `tcp` `udp`. Both are enabled by default.",
      description_zh: "启用的网络协议，可为 `tcp` 或 `udp`。默认同时启用。",
    }),
    udp_over_tcp: UDPOverTCPOptions.optional().meta({
      description:
        "UDP over TCP protocol settings. See [UDP Over TCP](/configuration/shared/udp-over-tcp/). Conflicts with `multiplex`.",
      description_zh:
        "UDP over TCP 协议设置。参阅 [UDP Over TCP](/zh/configuration/shared/udp-over-tcp/)。与 `multiplex` 冲突。",
    }),
    multiplex: OutboundMultiplexOptions.optional().meta({
      description:
        "See [Multiplex](/configuration/shared/multiplex#outbound) for details.",
      description_zh:
        "参阅 [多路复用](/zh/configuration/shared/multiplex#outbound)。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "ShadowsocksOutboundOptions",
    title: "Shadowsocks Outbound",
    title_zh: "Shadowsocks 出站",
  });
export type ShadowsocksOutboundOptions = z.infer<
  typeof ShadowsocksOutboundOptions
>;
// #endregion
