import { z } from "zod";
import { DialerOptions, ServerOptions } from "@/schema/shared";
import { listableString } from "@/utils";

// #region Outbound
export const SSHOutboundOptions = z
  .object({
    type: z.literal("ssh"),
    tag: z.string().optional(),
    user: z.string().optional().meta({
      description: "SSH user, root will be used if empty.",
      description_zh: "SSH 用户, 默认使用 root。",
    }),
    password: z.string().optional().meta({
      description: "Password.",
      description_zh: "密码。",
    }),
    private_key: listableString.optional().meta({
      description: "Private key.",
      description_zh: "密钥。",
    }),
    private_key_path: z.string().optional().meta({
      description: "Private key path.",
      description_zh: "密钥路径。",
    }),
    private_key_passphrase: z.string().optional().meta({
      description: "Private key passphrase.",
      description_zh: "密钥密码。",
    }),
    host_key: listableString.optional().meta({
      description: "Host key. Accept any if empty.",
      description_zh: "主机密钥，留空接受所有。",
    }),
    host_key_algorithms: listableString.optional().meta({
      description: "Host key algorithms.",
      description_zh: "主机密钥算法。",
    }),
    client_version: z.string().optional().meta({
      description: "Client version. Random version will be used if empty.",
      description_zh: "客户端版本，默认使用随机值。",
    }),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "SSHOutboundOptions",
    title: "SSH Outbound",
    title_zh: "SSH 出站",
  });
export type SSHOutboundOptions = z.infer<typeof SSHOutboundOptions>;
// endregion
