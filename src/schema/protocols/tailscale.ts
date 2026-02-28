import { z } from "zod";
import { DialerOptions } from "@/schema/shared";
import { listableString } from "@/utils";

export const TailscaleEndpointOptions = z
  .object({
    type: z.literal("tailscale"),
    tag: z.string().optional(),
    state_directory: z.string().optional().meta({
      description:
        "The directory where the Tailscale state is stored. `tailscale` is used by default. Example: $HOME/.tailscale.",
      description_zh:
        "存储 Tailscale 状态的目录。默认使用 `tailscale`。示例：`$HOME/.tailscale`。",
    }),
    auth_key: z.string().optional().meta({
      description:
        "Auth key is not required. By default, sing-box will log the login URL (or popup a notification on graphical clients). The auth key to create the node. If the node is already created (from state previously stored), then this field is not used.",
      description_zh:
        "认证密钥不是必需的。默认情况下，sing-box 将记录登录 URL（或在图形客户端上弹出通知）。用于创建节点的验证密钥。如果节点已经创建（从之前存储的状态），则不使用此字段。",
    }),
    control_url: z.string().optional().meta({
      description:
        "The coordination server URL. `https://controlplane.tailscale.com` is used by default.",
      description_zh:
        "协调服务器 URL。默认使用 `https://controlplane.tailscale.com`。",
    }),
    ephemeral: z.boolean().optional().meta({
      description:
        "Indicates whether the instance should register as an Ephemeral node (https://tailscale.com/s/ephemeral-nodes).",
      description_zh: "指示实例是否应注册为临时节点。",
    }),
    hostname: z.string().optional().meta({
      description:
        "The hostname of the node. System hostname is used by default. Example: `localhost`.",
      description_zh: "节点的主机名。默认使用系统主机名。示例：`localhost`。",
    }),
    accept_routes: z.boolean().optional().meta({
      description:
        "Indicates whether the node should accept routes advertised by other nodes.",
      description_zh: "指示节点是否应接受其他节点通告的路由。",
    }),
    exit_node: z.string().optional().meta({
      description: "The exit node name or IP address to use.",
      description_zh: "要使用的出口节点的名称或 IP 地址。",
    }),
    exit_node_allow_lan_access: z.boolean().optional().meta({
      description:
        "When the exit node does not have a corresponding advertised route, private traffics cannot be routed to the exit node even if `exit_node_allow_lan_access` is set. Indicates whether locally accessible subnets should be routed directly or via the exit node.",
      description_zh:
        "当出口节点没有相应的通告路由时，即使设置了 `exit_node_allow_lan_access`，私有流量也无法路由到出口节点。指示本地可访问的子网应该直接路由还是通过出口节点路由。",
    }),
    advertise_routes: z.array(z.string()).optional().meta({
      description:
        'CIDR prefixes to advertise into the Tailscale network as reachable through the current node. Example: ["192.168.1.1/24"].',
      description_zh:
        '要通告到 Tailscale 网络中的 CIDR 前缀，作为可通过当前节点访问。示例：`["192.168.1.1/24"]`。',
    }),
    advertise_exit_node: z.boolean().optional().meta({
      description:
        "Indicates whether the node should advertise itself as an exit node.",
      description_zh: "指示节点是否应将自己通告为出口节点。",
    }),
    advertise_tags: listableString.optional().meta({
      description:
        'ACL tags to request when registering the node. Tags must be pre-authorized in the Tailscale ACL policy. Example: `["tag:server", "tag:prod"]`.',
      description_zh:
        '注册节点时请求的 ACL 标签。标签必须在 Tailscale ACL 策略中预先授权。示例：`["tag:server", "tag:prod"]`。',
    }),
    relay_server_port: z.number().int().optional().meta({
      description:
        "The port to listen on for incoming relay connections from other Tailscale nodes.",
      description_zh: "监听来自其他 Tailscale 节点的中继连接的端口。",
    }),
    relay_server_static_endpoints: z.array(z.string()).optional().meta({
      description: "Static endpoints to advertise for the relay server.",
      description_zh: "为中继服务器通告的静态端点。",
    }),
    system_interface: z.boolean().optional().meta({
      description: "Create a system TUN interface for Tailscale.",
      description_zh: "为 Tailscale 创建系统 TUN 接口。",
    }),
    system_interface_name: z.string().optional().meta({
      description:
        "Custom TUN interface name. By default, `tailscale` (or `utun` on macOS) will be used.",
      description_zh:
        "自定义 TUN 接口名。默认使用 `tailscale`（macOS 上为 `utun`）。",
    }),
    system_interface_mtu: z.number().int().optional().meta({
      description:
        "Override the TUN MTU. By default, Tailscale's own MTU is used.",
      description_zh: "覆盖 TUN 的 MTU。默认使用 Tailscale 自己的 MTU。",
    }),
    udp_timeout: z.union([z.string(), z.number()]).optional().meta({
      description: "UDP NAT expiration time. `5m` will be used by default.",
      description_zh: "UDP NAT 过期时间。默认使用 `5m`。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "TailscaleEndpointOptions",
    title: "Tailscale Endpoint",
    title_zh: "Tailscale 端点",
  });

export type TailscaleEndpointOptions = z.infer<typeof TailscaleEndpointOptions>;
