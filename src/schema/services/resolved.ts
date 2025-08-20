import { z } from "zod";
import { ListenOptions } from "@/schema/shared";

/**
 * Resolved service is a fake systemd-resolved DBUS service.
 */
export const ResolvedServiceOptions = z
  .object({
    type: z.literal("resolved"),
    tag: z.string().optional(),

    ...ListenOptions.shape,
  })
  .meta({
    id: "ResolvedServiceOptions",
    title: "Resolved",
    title_zh: "Resolved",
    description:
      "Resolved service is a fake systemd-resolved DBUS service to receive DNS settings from other programs (e.g. NetworkManager) and provide DNS resolution.",
    description_zh:
      "Resolved 服务是一个伪造的 systemd-resolved DBUS 服务，用于从其他程序（例如 NetworkManager）接收 DNS 设置并提供 DNS 解析。",
  });

export type ResolvedServiceOptions = z.infer<typeof ResolvedServiceOptions>;
