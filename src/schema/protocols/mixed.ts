import { z } from "zod";
import { ListenOptions } from "@/schema/shared";

const MixedUser = z.object({
  username: z.string(),
  password: z.string(),
});

export const MixedInboundOptions = z
  .object({
    type: z.literal("mixed"),
    tag: z.string().optional(),
    users: z.array(MixedUser).optional().meta({
      description: "SOCKS and HTTP users.",
      description_zh: "SOCKS 和 HTTP 用户。",
    }),
    set_system_proxy: z.boolean().optional().meta({
      description: "Automatically set system proxy configuration.",
      description_zh: "启动时自动设置系统代理，停止时自动清理。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "MixedInboundOptions",
    title: "Mixed Inbound",
    title_zh: "Mixed 入站",
    description: "Mixed inbound is a socks4, socks4a, socks5 and http server.",
    description_zh: "Mixed 入站是一个 socks4, socks4a, socks5 和 http 服务器。",
  });
export type MixedInboundOptions = z.infer<typeof MixedInboundOptions>;
