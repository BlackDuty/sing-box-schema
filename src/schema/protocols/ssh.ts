import { z } from "zod";
import { DialerOptions, ServerOptions } from "@/schema/shared";
import { listable } from "@/utils";

// #region Outbound
export const SSHOutboundOptions = z
  .object({
    type: z.literal("ssh"),
    tag: z.string().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    private_key: listable(z.string()).optional(),
    private_key_path: z.string().optional(),
    private_key_passphrase: z.string().optional(),
    host_key: listable(z.string()).optional(),
    host_key_algorithms: listable(z.string()).optional(),
    client_version: z.string().optional(),
  })
  .extend(DialerOptions)
  .extend(ServerOptions);
// endregion
