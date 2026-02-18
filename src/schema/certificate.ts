import { z } from "zod";
import { listableString } from "@/utils";
/**
 * Certificate settings for sing-box.
 */
export const CertificateOptions = z
  .object({
    /**
     * The default X509 trusted CA certificate list.
     */
    store: z.enum(["system", "mozilla", "none"]).optional().meta({
      description: "The default X509 trusted CA certificate list.",
      description_zh: "默认的 X509 受信任 CA 证书列表。",
    }),

    /**
     * The certificate line array to trust, in PEM format.
     */
    certificate: listableString.optional().meta({
      description: "The certificate line array to trust, in PEM format.",
      description_zh: "以 PEM 格式提供的受信任证书行数组。",
    }),

    /**
     * The paths to certificates to trust, in PEM format.
     */
    certificate_path: listableString.optional().meta({
      description: "The paths to certificates to trust, in PEM format.",
      description_zh: "以 PEM 格式提供的受信任证书路径。",
    }),

    /**
     * The directory path to search for certificates to trust,in PEM format.
     */
    certificate_directory_path: listableString.optional().meta({
      description:
        "The directory path to search for certificates to trust,in PEM format.",
      description_zh: "以 PEM 格式提供的受信任证书目录路径，用于批量搜索。",
    }),
  })
  .meta({
    id: "CertificateOptions",
    title: "Certificate",
    title_zh: "证书",
    description:
      "Certificate settings for customizing trusted CA lists and PEM data, introduced in sing-box 1.12.0.",
    description_zh:
      "用于自定义受信任 CA 列表与 PEM 数据的证书设置，自 sing-box 1.12.0 起提供。",
  });

export type CertificateOptions = z.infer<typeof CertificateOptions>;
