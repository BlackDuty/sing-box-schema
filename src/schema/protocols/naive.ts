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
      description:
        "Listen network, one of `tcp` `udp`. Both networks are enabled when empty.",
      description_zh: "监听的网络协议，`tcp` `udp` 之一。默认所有。",
    }),
    /**
     * Naive users.
     */
    users: z.array(NaiveUser).optional().meta({
      description: "Naive users. Required.",
      description_zh: "Naive 用户。必填。",
    }),
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
