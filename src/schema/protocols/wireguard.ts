import z from "zod";
import { DialerOptions, Network, ServerOptions } from "@/schema/shared";

const Reserved = z.union([
  z.string().max(4),
  z.array(z.number().int().min(0).max(255)).length(3),
]);

// #region Endpoint
export const WireGuardPeer = z.object({
  address: z.string().optional().meta({
    description: "WireGuard peer address.",
    description_zh: "对等方的 IP 地址。",
  }),
  port: z.number().int().optional().meta({
    description: "WireGuard peer port.",
    description_zh: "对等方的 WireGuard 端口。",
  }),
  public_key: z.string().optional().meta({
    description:
      "WireGuard peer public key. Required if the peer is configured without server multi-peer support.",
    description_zh: "对等方的 WireGuard 公钥（未启用多对等支持时必填）。",
  }),
  pre_shared_key: z.string().optional().meta({
    description: "WireGuard peer pre-shared key.",
    description_zh: "对等方的预共享密钥。",
  }),
  allowed_ips: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .meta({
      description: "WireGuard allowed IPs. Required.",
      description_zh: "对等方的允许 IP 地址（必填）。",
    }),
  persistent_keepalive_interval: z.number().int().optional().meta({
    description:
      "WireGuard persistent keepalive interval, in seconds. Disabled by default.",
    description_zh: "对等方的持久性保持活动间隔，以秒为单位。默认禁用。",
  }),
  reserved: Reserved.optional().meta({
    description: "WireGuard reserved field bytes.",
    description_zh: "对等方的保留字段字节。",
  }),
});

export const WireGuardEndpointOptions = z
  .object({
    type: z.literal("wireguard"),
    tag: z.string().optional(),
    system: z.boolean().optional().meta({
      description:
        "Use system interface. Requires privilege and cannot conflict with existing system interfaces.",
      description_zh: "使用系统设备。需要特权且不能与已有系统接口冲突。",
    }),
    name: z.string().optional().meta({
      description: "Custom interface name for system interface.",
      description_zh: "为系统接口自定义设备名称。",
    }),
    mtu: z.number().int().optional().meta({
      description: "WireGuard MTU. `1408` will be used by default.",
      description_zh: "WireGuard MTU。默认使用 1408。",
    }),
    address: z.union([z.string(), z.array(z.string())]).meta({
      description:
        "List of IP (v4 or v6) address prefixes to be assigned to the interface. Required.",
      description_zh: "接口的 IPv4/IPv6 地址或地址段的列表（必填）。",
    }),
    private_key: z.string().meta({
      description:
        "WireGuard requires base64-encoded public and private keys. These can be generated using wg(8) or `sing-box generate wg-keypair`. Required.",
      description_zh:
        "WireGuard 需要 base64 编码的公钥和私钥。可以使用 wg(8) 或 `sing-box generate wg-keypair` 生成。必填。",
    }),
    listen_port: z.number().int().optional().meta({
      description: "Listen port.",
      description_zh: "监听端口。",
    }),
    peers: z.array(WireGuardPeer).optional().meta({
      description: "List of WireGuard peers. Required.",
      description_zh: "WireGuard 对等方的列表（必填）。",
    }),
    udp_timeout: z.string().optional().meta({
      description: "UDP NAT expiration time. `5m` will be used by default.",
      description_zh: "UDP NAT 过期时间。默认使用 `5m`。",
    }),
    workers: z.number().int().optional().meta({
      description: "WireGuard worker count. CPU count is used by default.",
      description_zh: "WireGuard worker 数量。默认使用 CPU 数量。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "WireGuardEndpointOptions",
    title: "WireGuard Endpoint",
    title_zh: "WireGuard 端点",
  });
export type WireGuardEndpointOptions = z.infer<typeof WireGuardEndpointOptions>;
// #endregion

// #region Outbound
export const LegacyWireGuardPeer = z.object({
  public_key: z.string().optional().meta({
    description: "WireGuard peer public key.",
    description_zh: "WireGuard 对等公钥。",
  }),
  pre_shared_key: z.string().optional().meta({
    description: "WireGuard pre-shared key.",
    description_zh: "WireGuard 预共享密钥。",
  }),
  allowed_ips: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .meta({
      description: "WireGuard allowed IPs.",
      description_zh: "WireGuard 允许 IP。",
    }),
  reserved: Reserved.optional().meta({
    description: "WireGuard reserved field bytes.",
    description_zh: "WireGuard 保留字段字节。",
  }),

  ...ServerOptions.shape,
});

export const LegacyWireGuardOutboundOptions = z
  .object({
    type: z.literal("wireguard"),
    tag: z.string().optional(),
    system_interface: z.boolean().optional().meta({
      description:
        "Use system interface. Requires privilege and cannot conflict with existing system interfaces. Forced if gVisor is not included in the build.",
      description_zh:
        "使用系统设备。需要特权且不能与已有系统接口冲突。如果未包含 gVisor 构建标签，则强制使用。",
    }),
    gso: z.boolean().optional().meta({
      description:
        "Try to enable generic segmentation offload. Deprecated in sing-box 1.11.0; GSO will be automatically enabled when available. Only supported on Linux.",
      description_zh:
        "尝试启用通用分段卸载。已在 sing-box 1.11.0 废弃；可用时将自动启用 GSO。仅在 Linux 上支持。",
      deprecated: true,
    }),
    interface_name: z.string().optional().meta({
      description: "Custom interface name for system interface.",
      description_zh: "为系统接口自定义设备名称。",
    }),
    local_address: z.union([z.string(), z.array(z.string())]).meta({
      description:
        "List of IP (v4 or v6) address prefixes to be assigned to the interface. Required.",
      description_zh: "接口的 IPv4/IPv6 地址或地址段的列表（必填）。",
    }),
    private_key: z.string().meta({
      description:
        "WireGuard requires base64-encoded public and private keys. These can be generated using wg(8) or `sing-box generate wg-keypair`. Required.",
      description_zh:
        "WireGuard 需要 base64 编码的公钥和私钥。可以使用 wg(8) 或 `sing-box generate wg-keypair` 生成。必填。",
    }),
    peers: z.array(LegacyWireGuardPeer).optional().meta({
      description:
        "Multi-peer support. If enabled, `server`, `server_port`, `peer_public_key`, and `pre_shared_key` will be ignored.",
      description_zh:
        "多对等支持。启用后将忽略 `server`、`server_port`、`peer_public_key` 和 `pre_shared_key`。",
    }),
    peer_public_key: z.string().meta({
      description:
        "WireGuard peer public key. Required if multi-peer is disabled.",
      description_zh: "WireGuard 对等公钥（未启用多对等支持时必填）。",
    }),
    pre_shared_key: z.string().optional().meta({
      description: "WireGuard pre-shared key.",
      description_zh: "WireGuard 预共享密钥。",
    }),
    reserved: Reserved.optional().meta({
      description:
        "WireGuard reserved field bytes. `$outbound.reserved` will be used if empty.",
      description_zh:
        "WireGuard 保留字段字节。置空时将使用 `$outbound.reserved`。",
    }),
    workers: z.number().int().optional().meta({
      description: "WireGuard worker count. CPU count is used by default.",
      description_zh: "WireGuard worker 数量。默认使用 CPU 数量。",
    }),
    mtu: z.number().int().optional().meta({
      description: "WireGuard MTU. `1408` will be used if empty.",
      description_zh: "WireGuard MTU。默认使用 1408。",
    }),
    network: Network.optional().meta({
      description:
        "Enabled network. One of `tcp` `udp`. Both is enabled by default.",
      description_zh: "启用的网络协议。`tcp` 或 `udp`。默认所有。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "LegacyWireGuardOutboundOptions",
    title: "Legacy WireGuard Outbound",
    title_zh: "旧版 WireGuard 出站",
  });
export type LegacyWireGuardOutboundOptions = z.infer<
  typeof LegacyWireGuardOutboundOptions
>;
// #endregion
