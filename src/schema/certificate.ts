import { z } from "zod";
import { listable } from "@/utils";

/**
 * Certificate settings for sing-box.
 */
export const CertificateOptions = z.object({
  /**
   * The default X509 trusted CA certificate list.
   */
  store: z
    .enum(["system", "mozilla", "none"])
    .optional()
    .describe("The default X509 trusted CA certificate list."),
  /**
   * The certificate line array to trust, in PEM format.
   */
  certificate: listable(z.string())
    .optional()
    .describe("The certificate line array to trust, in PEM format."),
  /**
   * The paths to certificates to trust, in PEM format.
   */
  certificate_path: listable(z.string())
    .optional()
    .describe("The paths to certificates to trust, in PEM format."),
  /**
   * The directory path to search for certificates to trust,in PEM format.
   */
  certificate_directory_path: listable(z.string())
    .optional()
    .describe(
      "The directory path to search for certificates to trust,in PEM format."
    ),
});

export type CertificateOptions = z.infer<typeof CertificateOptions>;
