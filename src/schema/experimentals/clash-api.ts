import { z } from "zod";
import { listableString } from "@/utils";

/**
 * Clash API settings.
 */
export const ClashAPIOptions = z.object({
  /**
   * RESTful web API listening address. Clash API will be disabled if empty.
   */
  external_controller: z
    .string()
    .optional()
    .describe(
      "RESTful web API listening address. Clash API will be disabled if empty.",
    ),
  /**
   * A relative path to the configuration directory or an absolute path to a directory in which you put some static web resource.
   */
  external_ui: z
    .string()
    .optional()
    .describe(
      "A relative path to the configuration directory or an absolute path to a directory in which you put some static web resource.",
    ),
  /**
   * ZIP download URL for the external UI, will be used if the specified `external_ui` directory is empty.
   */
  external_ui_download_url: z
    .string()
    .optional()
    .describe(
      "ZIP download URL for the external UI, will be used if the specified `external_ui` directory is empty.",
    ),
  /**
   * The tag of the outbound to download the external UI.
   */
  external_ui_download_detour: z
    .string()
    .optional()
    .describe("The tag of the outbound to download the external UI."),
  /**
   * Secret for the RESTful API (optional).
   */
  secret: z
    .string()
    .optional()
    .describe("Secret for the RESTful API (optional)."),
  /**
   * Default mode in clash, `Rule` will be used if empty.
   */
  default_mode: z
    .string()
    .optional()
    .describe("Default mode in clash, `Rule` will be used if empty."),
  /**
   * CORS allowed origins, `*` will be used if empty.
   */
  access_control_allow_origin: listableString
    .optional()
    .describe("CORS allowed origins, `*` will be used if empty."),
  /**
   * Allow access from private network.
   */
  access_control_allow_private_network: z
    .boolean()
    .optional()
    .describe("Allow access from private network."),
});

export type ClashAPIOptions = z.infer<typeof ClashAPIOptions>;
