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
    }),

    /**
     * The certificate line array to trust, in PEM format.
     */
    certificate: listableString.optional().meta({
      description: "The certificate line array to trust, in PEM format.",
    }),

    /**
     * The paths to certificates to trust, in PEM format.
     */
    certificate_path: listableString.optional().meta({
      description: "The paths to certificates to trust, in PEM format.",
    }),

    /**
     * The directory path to search for certificates to trust,in PEM format.
     */
    certificate_directory_path: listableString.optional().meta({
      description:
        "The directory path to search for certificates to trust,in PEM format.",
    }),
  })
  .meta({
    id: "CertificateOptions",
    title: "Certificate",
    description: "Certificate settings for sing-box.",
  });

export type CertificateOptions = z.infer<typeof CertificateOptions>;
