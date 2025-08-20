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
    description: "WireGuard peer public key.",
    description_zh: "对等方的 WireGuard 公钥。",
  }),
  pre_shared_key: z.string().optional().meta({
    description: "WireGuard peer pre-shared key.",
    description_zh: "对等方的预共享密钥。",
  }),
  allowed_ips: z.union([z.string(), z.array(z.string())]).optional().meta({
    description: "WireGuard allowed IPs.",
    description_zh: "对等方的允许 IP 地址。",
  }),
  persistent_keepalive_interval: z.number().int().optional().meta({
    description: "WireGuard persistent keepalive interval, in seconds.",
    description_zh: "对等方的持久性保持活动间隔，以秒为单位。",
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
      description: "Use system interface.",
      description_zh: "使用系统设备。",
    }),
    name: z.string().optional().meta({
      description: "Custom interface name for system interface.",
      description_zh: "为系统接口自定义设备名称。",
    }),
    mtu: z.number().int().optional().meta({
      description: "WireGuard MTU.",
      description_zh: "WireGuard MTU。",
    }),
    address: z.union([z.string(), z.array(z.string())]).meta({
      description: "List of IP (v4 or v6) address prefixes to be assigned to the interface.",
      description_zh: "接口的 IPv4/IPv6 地址或地址段的列表。",
    }),
    private_key: z.string().meta({
      description: "WireGuard requires base64-encoded public and private keys.",
      description_zh: "WireGuard 需要 base64 编码的公钥和私钥。",
    }),
    listen_port: z.number().int().optional().meta({
      description: "Listen port.",
      description_zh: "监听端口。",
    }),
    peers: z.array(WireGuardPeer).optional().meta({
      description: "List of WireGuard peers.",
      description_zh: "WireGuard 对等方的列表。",
    }),
    udp_timeout: z.string().optional().meta({
      description: "UDP NAT expiration time.",
      description_zh: "UDP NAT 过期时间。",
    }),
    workers: z.number().int().optional().meta({
      description: "WireGuard worker count.",
      description_zh: "WireGuard worker 数量。",
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
  allowed_ips: z.union([z.string(), z.array(z.string())]).optional().meta({
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
      description: "Use system interface.",
      description_zh: "使用系统设备。",
    }),
    gso: z.boolean().optional().meta({
      description: "Enable generic segmentation offload.",
      description_zh: "启用通用分段卸载。",
      deprecated: true,
    }),
    interface_name: z.string().optional().meta({
      description: "Custom interface name for system interface.",
      description_zh: "为系统接口自定义设备名称。",
    }),
    local_address: z.union([z.string(), z.array(z.string())]).meta({
      description: "List of IP (v4 or v6) address prefixes to be assigned to the interface.",
      description_zh: "接口的 IPv4/IPv6 地址或地址段的列表。",
    }),
    private_key: z.string().meta({
      description: "WireGuard requires base64-encoded public and private keys.",
      description_zh: "WireGuard 需要 base64 编码的公钥和私钥。",
    }),
    peers: z.array(LegacyWireGuardPeer).optional().meta({
      description: "Multi-peer support.",
      description_zh: "多对等支持。",
    }),
    peer_public_key: z.string().meta({
      description: "WireGuard peer public key.",
      description_zh: "WireGuard 对等公钥。",
    }),
    pre_shared_key: z.string().optional().meta({
      description: "WireGuard pre-shared key.",
      description_zh: "WireGuard 预共享密钥。",
    }),
    reserved: Reserved.optional().meta({
      description: "WireGuard reserved field bytes.",
      description_zh: "WireGuard 保留字段字节。",
    }),
    workers: z.number().int().optional().meta({
      description: "WireGuard worker count.",
      description_zh: "WireGuard worker 数量。",
    }),
    mtu: z.number().int().optional().meta({
      description: "WireGuard MTU.",
      description_zh: "WireGuard MTU。",
    }),
    network: Network.optional().meta({
      description: "Enabled network.",
      description_zh: "启用的网络协议。",
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