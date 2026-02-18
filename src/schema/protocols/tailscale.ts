import { z } from "zod";
import { DialerOptions } from "@/schema/shared";

export const TailscaleEndpointOptions = z
  .object({
    type: z.literal("tailscale"),
    tag: z.string().optional(),
    state_directory: z.string().optional().meta({
      description:
        "The directory where the Tailscale state is stored. `tailscale` is used by default. Example: $HOME/.tailscale.",
      description_zh: "存储 Tailscale 状态的目录。",
    }),
    auth_key: z.string().optional().meta({
      description:
        "Auth key is not required. By default, sing-box will log the login URL (or popup a notification on graphical clients). The auth key to create the node. If the node is already created (from state previously stored), then this field is not used.",
      description_zh: "用于创建节点的验证密钥。",
    }),
    control_url: z.string().optional().meta({
      description:
        "The coordination server URL. `https://controlplane.tailscale.com` is used by default.",
      description_zh: "协调服务器 URL。",
    }),
    ephemeral: z.boolean().optional().meta({
      description:
        "Indicates whether the instance should register as an Ephemeral node (https://tailscale.com/s/ephemeral-nodes).",
      description_zh: "指示实例是否应注册为临时节点。",
    }),
    hostname: z.string().optional().meta({
      description:
        "The hostname of the node. System hostname is used by default. Example: `localhost`.",
      description_zh: "节点的主机名。",
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
      description_zh: "指示本地可访问的子网应直接路由还是通过出口节点路由。",
    }),
    advertise_routes: z.array(z.string()).optional().meta({
      description:
        'CIDR prefixes to advertise into the Tailscale network as reachable through the current node. Example: ["192.168.1.1/24"].',
      description_zh:
        "要通告到 Tailscale 网络中的 CIDR 前缀，作为可通过当前节点访问。",
    }),
    advertise_exit_node: z.boolean().optional().meta({
      description:
        "Indicates whether the node should advertise itself as an exit node.",
      description_zh: "指示节点是否应将自己通告为出口节点。",
    }),
    udp_timeout: z.union([z.string(), z.number()]).optional().meta({
      description: "UDP NAT expiration time. `5m` will be used by default.",
      description_zh: "UDP NAT 过期时间。",
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "TailscaleEndpointOptions",
    title: "Tailscale Endpoint",
    title_zh: "Tailscale 端点",
  });

export type TailscaleEndpointOptions = z.infer<typeof TailscaleEndpointOptions>;
