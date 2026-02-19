import { z } from "zod";
import {
  DialerOptions,
  InboundTLSOptions,
  ListenOptions,
  OutboundTLSOptions,
  ServerOptions,
} from "@/schema/shared";
import { listable, listableString } from "@/utils";

const DERPVerifyClientURLOptions = z
  .object({
    url: z.string().optional().meta({
      description: "URL to verify clients.",
      description_zh: "用于验证客户端的 URL。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "DERPVerifyClientURLOptions",
    title: "DERP Verify Client URL Options",
    title_zh: "DERP 验证客户端 URL 选项",
  });

const DERPMeshOptions = z
  .object({
    host: z.string().optional().meta({
      description: "Custom DERP hostname.",
      description_zh: "自定义 DERP 主机名。",
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
    id: "DERPMeshOptions",
    title: "DERP Mesh Options",
    title_zh: "DERP 网格选项",
  });

const DERPSTUNListenOptions = z
  .object({
    enabled: z.boolean().meta({
      description: "Enable STUN server.",
      description_zh: "启用 STUN 服务器。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "DERPSTUNListenOptions",
    title: "DERP STUN Listen Options",
    title_zh: "DERP STUN 监听选项",
  });

/**
 * DERP service is a Tailscale DERP server.
 */
export const DERPServiceOptions = z
  .object({
    type: z.literal("derp"),
    tag: z.string().optional(),
    /**
     * TLS configuration.
     */
    tls: InboundTLSOptions.optional().meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#inbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#inbound)。",
    }),
    /**
     * Derper configuration file path.
     */
    config_path: z.string().meta({
      description: "Derper configuration file path. Example: `derper.key`.",
      description_zh: "Derper 配置文件路径。示例：`derper.key`。",
    }),
    /**
     * Tailscale endpoints tags to verify clients.
     */
    verify_client_endpoint: listableString.optional().meta({
      description: "Tailscale endpoints tags to verify clients.",
      description_zh: "Tailscale 端点标签以验证客户端。",
    }),
    /**
     * URL to verify clients.
     */
    verify_client_url: listable(
      z.union([z.string(), DERPVerifyClientURLOptions]),
    )
      .optional()
      .meta({
        description:
          'URL to verify clients. Object format:\n{\n  "url": "https://my-headscale.com/verify",\n  ... // Dial Fields\n}\nSetting Array value to a string `__URL__` is equivalent to configuring:\n{ "url": __URL__ }',
        description_zh:
          '用于验证客户端的 URL。\n对象格式：\n{\n  "url": "https://my-headscale.com/verify",\n  ... // 拨号字段\n}\n将数组值设置为字符串 `__URL__` 等同于配置：\n{ "url": __URL__ }',
      }),
    /**
     * What to serve at the root path.
     */
    home: z.string().optional().meta({
      description:
        "What to serve at the root path. It may be left empty (the default, for a default homepage), `blank` for a blank page, or a URL to redirect to.",
      description_zh:
        "根路径下提供什么。可以留空（默认，用于默认主页），`blank` 用于空白页，或重定向到的 URL。",
    }),
    /**
     * Mesh with other DERP servers.
     */
    mesh_with: listable(DERPMeshOptions).optional().meta({
      description:
        'Mesh with other DERP servers. Object format:\n{\n  "server": "",\n  "server_port": "",\n  "host": "",\n  "tls": {},\n  ... // Dial Fields\n}\nObject fields:\n- `server`: **Required** DERP server address.\n- `server_port`: **Required** DERP server port.\n- `host`: Custom DERP hostname.\n- `tls`: [TLS](/configuration/shared/tls/#outbound)\n- `Dial Fields`: [Dial Fields](/configuration/shared/dial/)',
      description_zh:
        '与其他 DERP 服务器组网。\n对象格式：\n{\n  "server": "",\n  "server_port": "",\n  "host": "",\n  "tls": {},\n  ... // 拨号字段\n}\n对象字段：\n- `server`：**必填** DERP 服务器地址。\n- `server_port`：**必填** DERP 服务器端口。\n- `host`：自定义 DERP 主机名。\n- `tls`：[TLS](/zh/configuration/shared/tls/#outbound)\n- `拨号字段`：[拨号字段](/zh/configuration/shared/dial/)',
    }),
    /**
     * Pre-shared key for DERP mesh.
     */
    mesh_psk: z.string().optional().meta({
      description: "Pre-shared key for DERP mesh.",
      description_zh: "DERP 网格的预共享密钥。",
    }),
    /**
     * Pre-shared key file for DERP mesh.
     */
    mesh_psk_file: z.string().optional().meta({
      description: "Pre-shared key file for DERP mesh.",
      description_zh: "DERP 网格的预共享密钥文件。",
    }),
    /**
     * STUN server listen options.
     */
    stun: z.union([z.number(), DERPSTUNListenOptions]).optional().meta({
      description:
        'STUN server listen options. Object format:\n{\n  "enabled": true,\n  ... // Listen Fields\n}\nObject fields:\n- `enabled`: **Required** Enable STUN server.\n- `listen`: **Required** STUN server listen address, default to `::`.\n- `listen_port`: **Required** STUN server listen port, default to `3478`.\n- `other Listen Fields`: [Listen Fields](/configuration/shared/listen/)\nSetting `stun` value to a number `__PORT__` is equivalent to configuring:\n{ "enabled": true, "listen_port": __PORT__ }',
      description_zh:
        'STUN 服务器监听选项。\n对象格式：\n{\n  "enabled": true,\n  ... // 监听字段\n}\n对象字段：\n- `enabled`：**必填** 启用 STUN 服务器。\n- `listen`：**必填** STUN 服务器监听地址，默认为 `::`。\n- `listen_port`：**必填** STUN 服务器监听端口，默认为 `3478`。\n- `其他监听字段`：[监听字段](/zh/configuration/shared/listen/)\n将 `stun` 值设置为数字 `__PORT__` 等同于配置：\n{ "enabled": true, "listen_port": __PORT__ }',
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "DERPServiceOptions",
    title: "DERP",
    title_zh: "DERP",
    description: "DERP service is a Tailscale DERP server, similar to derper.",
    description_zh: "DERP 服务是一个 Tailscale DERP 服务器，类似于 derper。",
  });

export type DERPServiceOptions = z.infer<typeof DERPServiceOptions>;
