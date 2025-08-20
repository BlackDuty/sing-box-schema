import { z } from "zod";
import { InboundTLSOptions, ListenOptions, Network } from "../shared";

const NaiveUser = z.object({
  username: z.string(),
  password: z.string(),
});

// #region Inbound
export const NaiveInboundOptions = z
  .object({
    type: z.literal("naive"),
    tag: z.string().optional(),
    /**
     * Listen network.
     */
    network: Network.optional().meta({
      description: "Listen network.",
      description_zh: "监听的网络协议。",
    }),
    /**
     * Naive users.
     */
    users: z.array(NaiveUser).meta({
      description: "Naive users.",
      description_zh: "Naive 用户。",
    }),
    /**
     * TLS configuration.
     */
    tls: InboundTLSOptions.optional().meta({
      description: "TLS configuration.",
      description_zh: "TLS 配置。",
    }),

    /**
     * Listen options fields.
     */
    ...ListenOptions.shape,
  })
  .meta({
    id: "NaiveInboundOptions",
    title: "Naive Inbound",
    title_zh: "Naive 入站",
  });
// #endregion

export type NaiveInboundOptions = z.infer<typeof NaiveInboundOptions>;
