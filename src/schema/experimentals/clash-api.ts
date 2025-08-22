import { z } from "zod";
import { listableString } from "@/utils";

/**
 * Clash API settings.
 */
export const ClashAPIOptions = z
  .object({
    /**
     * RESTful web API listening address. Clash API will be disabled if empty.
     */
    external_controller: z.string().optional().meta({
      description:
        "RESTful web API listening address. Clash API will be disabled if empty.",
      description_zh: "RESTful web API 监听地址。如果为空，则禁用 Clash API。",
    }),
    /**
     * A relative path to the configuration directory or an absolute path to a directory in which you put some static web resource.
     */
    external_ui: z.string().optional().meta({
      description:
        "A relative path to the configuration directory or an absolute path to a directory in which you put some static web resource.",
      description_zh: "到静态网页资源目录的相对路径或绝对路径。",
    }),
    /**
     * ZIP download URL for the external UI, will be used if the specified `external_ui` directory is empty.
     */
    external_ui_download_url: z.string().optional().meta({
      description:
        "ZIP download URL for the external UI, will be used if the specified `external_ui` directory is empty.",
      description_zh:
        "静态网页资源的 ZIP 下载 URL，如果指定的 `external_ui` 目录为空，将使用。",
    }),
    /**
     * The tag of the outbound to download the external UI.
     */
    external_ui_download_detour: z.string().optional().meta({
      description: "The tag of the outbound to download the external UI.",
      description_zh: "用于下载静态网页资源的出站的标签。",
    }),
    /**
     * Secret for the RESTful API (optional).
     */
    secret: z.string().optional().meta({
      description: "Secret for the RESTful API (optional).",
      description_zh: "RESTful API 的密钥（可选）。",
    }),
    /**
     * Default mode in clash, `Rule` will be used if empty.
     */
    default_mode: z.string().optional().meta({
      description: "Default mode in clash, `Rule` will be used if empty.",
      description_zh: "Clash 中的默认模式，默认使用 `Rule`。",
    }),
    /**
     * CORS allowed origins, `*` will be used if empty.
     */
    access_control_allow_origin: listableString.optional().meta({
      description: "CORS allowed origins, `*` will be used if empty.",
      description_zh: "允许的 CORS 来源，默认使用 `*`。",
    }),
    /**
     * Allow access from private network.
     */
    access_control_allow_private_network: z.boolean().optional().meta({
      description: "Allow access from private network.",
      description_zh: "允许从私有网络访问。",
    }),
  })
  .meta({
    id: "ClashAPIOptions",
    title: "Clash API",
    title_zh: "Clash API",
  });

export type ClashAPIOptions = z.infer<typeof ClashAPIOptions>;
