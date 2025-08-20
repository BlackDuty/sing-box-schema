import { z } from "zod";
import { ListenOptions } from "../shared";

export const RedirectInboundOptions = z.object({
  type: z.literal("redirect"),
  tag: z.string().optional(),

  ...ListenOptions.shape,
});

export type RedirectInboundOptions = z.infer<typeof RedirectInboundOptions>;
