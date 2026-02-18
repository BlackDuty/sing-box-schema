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
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
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
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),
    /**
     * Derper configuration file path.
     */
    config_path: z.string().meta({
      description: "Derper configuration file path.",
      description_zh: "Derper 配置文件路径。",
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
        description: "URL to verify clients.",
        description_zh: "用于验证客户端的 URL。",
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
      description: "Mesh with other DERP servers.",
      description_zh: "与其他 DERP 服务器网格。",
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
      description: "STUN server listen options.",
      description_zh: "STUN 服务器监听选项。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "DERPServiceOptions",
    title: "DERP",
    title_zh: "DERP",
    description:
      "DERP service is a Tailscale DERP server, similar to derper, for Tailscale mesh functionality.",
    description_zh: "DERP 服务是 Tailscale DERP 服务器。",
  });

export type DERPServiceOptions = z.infer<typeof DERPServiceOptions>;
