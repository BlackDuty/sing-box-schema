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
        "A relative path to the configuration directory or an absolute path to a directory in which you put some static web resource. sing-box will then serve it at `http://{{external-controller}}/ui`.",
      description_zh:
        "到静态网页资源目录的相对路径或绝对路径。sing-box 会在 `http://{{external-controller}}/ui` 下提供它。",
    }),
    /**
     * ZIP download URL for the external UI, will be used if the specified `external_ui` directory is empty.
     */
    external_ui_download_url: z.string().optional().meta({
      description:
        "ZIP download URL for the external UI, will be used if the specified `external_ui` directory is empty. `https://github.com/MetaCubeX/Yacd-meta/archive/gh-pages.zip` will be used if empty.",
      description_zh:
        "静态网页资源的 ZIP 下载 URL，如果指定的 `external_ui` 目录为空，将使用。默认使用 `https://github.com/MetaCubeX/Yacd-meta/archive/gh-pages.zip`。",
    }),
    /**
     * The tag of the outbound to download the external UI.
     */
    external_ui_download_detour: z.string().optional().meta({
      description:
        "The tag of the outbound to download the external UI. Default outbound will be used if empty.",
      description_zh:
        "用于下载静态网页资源的出站的标签。如果为空，将使用默认出站。",
    }),
    /**
     * Secret for the RESTful API (optional).
     */
    secret: z.string().optional().meta({
      description: `Secret for the RESTful API (optional). Authenticate by specifying HTTP header \`Authorization: Bearer \${secret}\`. ALWAYS set a secret if RESTful API is listening on 0.0.0.0.`,
      description_zh: `RESTful API 的密钥（可选）。通过指定 HTTP 标头 \`Authorization: Bearer \${secret}\` 进行身份验证。如果 RESTful API 正在监听 0.0.0.0，请始终设置一个密钥。`,
    }),
    /**
     * Default mode in clash, `Rule` will be used if empty.
     */
    default_mode: z.string().optional().meta({
      description:
        "Default mode in clash, `Rule` will be used if empty. This setting has no direct effect, but can be used in routing and DNS rules via the `clash_mode` rule item.",
      description_zh:
        "Clash 中的默认模式，默认使用 `Rule`。此设置没有直接影响，但可以通过 `clash_mode` 规则项在路由和 DNS 规则中使用。",
    }),
    /**
     * CORS allowed origins, `*` will be used if empty.
     */
    access_control_allow_origin: listableString.optional().meta({
      description:
        "CORS allowed origins, `*` will be used if empty. To access the Clash API on a private network from a public website, you must explicitly specify it in `access_control_allow_origin` instead of using `*`.",
      description_zh:
        "允许的 CORS 来源，默认使用 `*`。要从公共网站访问私有网络上的 Clash API，必须在 `access_control_allow_origin` 中明确指定它而不是使用 `*`。",
    }),
    /**
     * Allow access from private network.
     */
    access_control_allow_private_network: z.boolean().optional().meta({
      description:
        "Allow access from private network. To access the Clash API on a private network from a public website, `access_control_allow_private_network` must be enabled.",
      description_zh:
        "允许从私有网络访问。要从公共网站访问私有网络上的 Clash API，必须启用 `access_control_allow_private_network`。",
    }),
  })
  .meta({
    id: "ClashAPIOptions",
    title: "Clash API",
    title_zh: "Clash API",
    description:
      "Clash API settings configure the RESTful controller, optional external UI, secret, default mode, CORS origins, and private network access.",
    description_zh:
      "Clash API 设置用于配置 RESTful 控制器、可选外部 UI、密钥、默认模式、CORS 来源与私有网络访问。",
  });

export type ClashAPIOptions = z.infer<typeof ClashAPIOptions>;
