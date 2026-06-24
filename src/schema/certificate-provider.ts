import { z } from "zod";
import { listableString } from "@/utils";
import { HTTPClientOptions } from "./http-client";

const ACMEExternalAccountOptions = z
  .object({
    key_id: z.string().optional().meta({
      description: "External account key ID.",
      description_zh: "外部账户密钥 ID。",
    }),
    mac_key: z.string().optional().meta({
      description: "External account MAC key.",
      description_zh: "外部账户 MAC 密钥。",
    }),
  })
  .meta({
    id: "ACMEExternalAccountOptions",
    title: "ACME External Account",
    title_zh: "ACME 外部账户",
  });

const ACMEDNS01AliDNSOptions = z.object({
  access_key_id: z.string().optional(),
  access_key_secret: z.string().optional(),
  region_id: z.string().optional(),
  security_token: z.string().optional(),
});

const ACMEDNS01CloudflareOptions = z.object({
  api_token: z.string().optional(),
  zone_token: z.string().optional(),
});

const ACMEDNS01ACMEDNSOptions = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  subdomain: z.string().optional(),
  server_url: z.string().optional(),
});

const ACMEProviderDNS01ChallengeBaseOptions = z.object({
  ttl: z.string().optional().meta({
    description: "DNS01 challenge DNS record TTL.",
    description_zh: "DNS01 挑战 DNS 记录 TTL。",
  }),
  propagation_delay: z.string().optional().meta({
    description: "Delay before checking DNS01 challenge propagation.",
    description_zh: "检查 DNS01 挑战传播前的延迟。",
  }),
  propagation_timeout: z.string().optional().meta({
    description: "Timeout for DNS01 challenge propagation.",
    description_zh: "DNS01 挑战传播超时时间。",
  }),
  resolvers: listableString.optional().meta({
    description: "Resolvers used to check DNS01 challenge propagation.",
    description_zh: "用于检查 DNS01 挑战传播的解析器。",
  }),
  override_domain: z.string().optional().meta({
    description: "Override domain for DNS01 challenge validation.",
    description_zh: "DNS01 挑战验证的覆盖域名。",
  }),
});

export const ACMEProviderDNS01ChallengeOptions = z
  .discriminatedUnion("provider", [
    ACMEProviderDNS01ChallengeBaseOptions.extend({
      provider: z.literal("alidns"),
      ...ACMEDNS01AliDNSOptions.shape,
    }),
    ACMEProviderDNS01ChallengeBaseOptions.extend({
      provider: z.literal("cloudflare"),
      ...ACMEDNS01CloudflareOptions.shape,
    }),
    ACMEProviderDNS01ChallengeBaseOptions.extend({
      provider: z.literal("acme-dns"),
      ...ACMEDNS01ACMEDNSOptions.shape,
    }),
  ])
  .meta({
    id: "ACMEProviderDNS01ChallengeOptions",
    title: "ACME DNS01 Challenge",
    title_zh: "ACME DNS01 挑战",
  });
export type ACMEProviderDNS01ChallengeOptions = z.infer<
  typeof ACMEProviderDNS01ChallengeOptions
>;

export const ACMECertificateProviderOptions = z
  .object({
    type: z.literal("acme"),
    tag: z.string().optional().meta({
      description: "The tag of the certificate provider.",
      description_zh: "证书提供者的标签。",
    }),
    domain: listableString.optional().meta({
      description: "Domain names to request certificates for.",
      description_zh: "申请证书的域名。",
    }),
    data_directory: z.string().optional().meta({
      description: "Directory used to store ACME data.",
      description_zh: "用于存储 ACME 数据的目录。",
    }),
    default_server_name: z.string().optional().meta({
      description: "Default server name for the certificate.",
      description_zh: "证书的默认服务器名称。",
    }),
    email: z.string().optional().meta({
      description: "ACME account email.",
      description_zh: "ACME 账户邮箱。",
    }),
    provider: z.string().optional().meta({
      description: "ACME CA provider.",
      description_zh: "ACME CA 提供者。",
    }),
    account_key: z.string().optional().meta({
      description: "ACME account key.",
      description_zh: "ACME 账户密钥。",
    }),
    disable_http_challenge: z.boolean().optional().meta({
      description: "Disable ACME HTTP challenge.",
      description_zh: "禁用 ACME HTTP 挑战。",
    }),
    disable_tls_alpn_challenge: z.boolean().optional().meta({
      description: "Disable ACME TLS-ALPN challenge.",
      description_zh: "禁用 ACME TLS-ALPN 挑战。",
    }),
    alternative_http_port: z.number().int().min(0).max(65535).optional().meta({
      description: "Alternative port for ACME HTTP challenge.",
      description_zh: "ACME HTTP 挑战的替代端口。",
    }),
    alternative_tls_port: z.number().int().min(0).max(65535).optional().meta({
      description: "Alternative port for ACME TLS-ALPN challenge.",
      description_zh: "ACME TLS-ALPN 挑战的替代端口。",
    }),
    external_account: ACMEExternalAccountOptions.optional().meta({
      description: "ACME external account binding options.",
      description_zh: "ACME 外部账户绑定选项。",
    }),
    dns01_challenge: ACMEProviderDNS01ChallengeOptions.optional().meta({
      description: "ACME DNS01 challenge options.",
      description_zh: "ACME DNS01 挑战选项。",
    }),
    key_type: z
      .enum(["", "ed25519", "p256", "p384", "rsa2048", "rsa4096"])
      .optional()
      .meta({
        description: "ACME account key type.",
        description_zh: "ACME 账户密钥类型。",
      }),
    profile: z.string().optional().meta({
      description: "ACME certificate profile.",
      description_zh: "ACME 证书配置文件。",
    }),
    http_client: z
      .lazy(() => HTTPClientOptions)
      .optional()
      .meta({
        description: "HTTP client options used by ACME.",
        description_zh: "ACME 使用的 HTTP 客户端选项。",
      }),
  })
  .meta({
    id: "ACMECertificateProviderOptions",
    title: "ACME Certificate Provider",
    title_zh: "ACME 证书提供者",
  });
export type ACMECertificateProviderOptions = z.infer<
  typeof ACMECertificateProviderOptions
>;

export const TailscaleCertificateProviderOptions = z
  .object({
    type: z.literal("tailscale"),
    tag: z.string().optional().meta({
      description: "The tag of the certificate provider.",
      description_zh: "证书提供者的标签。",
    }),
    endpoint: z.string().optional().meta({
      description: "The tag of the Tailscale endpoint.",
      description_zh: "Tailscale 端点的标签。",
    }),
  })
  .meta({
    id: "TailscaleCertificateProviderOptions",
    title: "Tailscale Certificate Provider",
    title_zh: "Tailscale 证书提供者",
  });
export type TailscaleCertificateProviderOptions = z.infer<
  typeof TailscaleCertificateProviderOptions
>;

export const CloudflareOriginCACertificateProviderOptions = z
  .object({
    type: z.literal("cloudflare-origin-ca"),
    tag: z.string().optional().meta({
      description: "The tag of the certificate provider.",
      description_zh: "证书提供者的标签。",
    }),
    domain: listableString.optional().meta({
      description: "Domain names to request certificates for.",
      description_zh: "申请证书的域名。",
    }),
    data_directory: z.string().optional().meta({
      description: "Directory used to store certificate data.",
      description_zh: "用于存储证书数据的目录。",
    }),
    api_token: z.string().optional().meta({
      description: "Cloudflare API token.",
      description_zh: "Cloudflare API 令牌。",
    }),
    origin_ca_key: z.string().optional().meta({
      description: "Cloudflare Origin CA key.",
      description_zh: "Cloudflare Origin CA 密钥。",
    }),
    request_type: z.enum(["", "origin-rsa", "origin-ecc"]).optional().meta({
      description: "Cloudflare Origin CA request type.",
      description_zh: "Cloudflare Origin CA 请求类型。",
    }),
    requested_validity: z
      .union([
        z.literal(7),
        z.literal(30),
        z.literal(90),
        z.literal(365),
        z.literal(730),
        z.literal(1095),
        z.literal(5475),
      ])
      .optional()
      .meta({
        description: "Requested certificate validity in days.",
        description_zh: "请求的证书有效天数。",
      }),
    http_client: z
      .lazy(() => HTTPClientOptions)
      .optional()
      .meta({
        description: "HTTP client options used by Cloudflare Origin CA.",
        description_zh: "Cloudflare Origin CA 使用的 HTTP 客户端选项。",
      }),
  })
  .meta({
    id: "CloudflareOriginCACertificateProviderOptions",
    title: "Cloudflare Origin CA Certificate Provider",
    title_zh: "Cloudflare Origin CA 证书提供者",
  });
export type CloudflareOriginCACertificateProviderOptions = z.infer<
  typeof CloudflareOriginCACertificateProviderOptions
>;

export const CertificateProvider = z
  .discriminatedUnion("type", [
    ACMECertificateProviderOptions,
    TailscaleCertificateProviderOptions,
    CloudflareOriginCACertificateProviderOptions,
  ])
  .meta({
    id: "CertificateProvider",
    title: "Certificate Provider",
    title_zh: "证书提供者",
  });
export type CertificateProvider = z.infer<typeof CertificateProvider>;

export const CertificateProviderOptions = z
  .union([z.string(), CertificateProvider])
  .meta({
    id: "CertificateProviderOptions",
    title: "Certificate Provider Options",
    title_zh: "证书提供者选项",
  });
export type CertificateProviderOptions = z.infer<
  typeof CertificateProviderOptions
>;
