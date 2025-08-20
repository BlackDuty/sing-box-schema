import { z } from "zod";
import { ListenOptions } from "@/schema/shared";

const MixedUser = z.object({
  username: z.string(),
  password: z.string(),
});

export const MixedInboundOptions = z.object({
  type: z.literal("mixed"),
  tag: z.string().optional(),
  users: z.array(MixedUser).optional().describe("SOCKS and HTTP users."),
  set_system_proxy: z
    .boolean()
    .optional()
    .describe("Automatically set system proxy configuration."),

  ...ListenOptions.shape,
});
