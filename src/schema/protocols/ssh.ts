import { z } from "zod";
import { DialerOptions, ServerOptions } from "@/schema/shared";
import { listableString } from "@/utils";

// #region Outbound
export const SSHOutboundOptions = z.object({
  type: z.literal("ssh"),
  tag: z.string().optional(),
  user: z.string().optional(),
  password: z.string().optional(),
  private_key: listableString.optional(),
  private_key_path: z.string().optional(),
  private_key_passphrase: z.string().optional(),
  host_key: listableString.optional(),
  host_key_algorithms: listableString.optional(),
  client_version: z.string().optional(),

  ...ServerOptions.shape,
  ...DialerOptions.shape,
});
export type SSHOutboundOptions = z.infer<typeof SSHOutboundOptions>;
// endregion
