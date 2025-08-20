import { z } from "zod";
import { ListenOptions } from "../shared";

export const RedirectInboundOptions = z
  .object({
    type: z.literal("redirect"),
    tag: z.string().optional(),

    ...ListenOptions.shape,
  })
  .meta({
    id: "RedirectInboundOptions",
    title: "Redirect Inbound",
    title_zh: "Redirect 入站",
  });

export type RedirectInboundOptions = z.infer<typeof RedirectInboundOptions>;
