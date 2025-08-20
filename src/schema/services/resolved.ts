import { z } from "zod";
import { ListenOptions } from "@/schema/shared";

/**
 * Resolved service is a fake systemd-resolved DBUS service.
 */
export const ResolvedServiceOptions = z.object({
  type: z.literal("resolved"),
  tag: z.string().optional(),

  ...ListenOptions.shape,
});

export type ResolvedServiceOptions = z.infer<typeof ResolvedServiceOptions>;
