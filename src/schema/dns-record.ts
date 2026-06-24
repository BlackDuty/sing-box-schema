import { z } from "zod";

export const DNSRCode = z
  .union([
    z.number().int(),
    z.enum([
      "NOERROR",
      "FORMERR",
      "SERVFAIL",
      "NXDOMAIN",
      "NOTIMP",
      "REFUSED",
      "YXDOMAIN",
      "YXRRSET",
      "NXRRSET",
      "NOTAUTH",
      "NOTZONE",
      "BADSIG",
      "BADVERS",
      "BADKEY",
      "BADTIME",
      "BADMODE",
      "BADNAME",
      "BADALG",
      "BADTRUNC",
      "BADCOOKIE",
    ]),
  ])
  .meta({
    id: "DNSRCode",
    title: "DNS RCode",
    title_zh: "DNS 响应码",
    description: "DNS response code as an integer or DNS RCODE name.",
    description_zh: "以整数或 DNS RCODE 名称表示的 DNS 响应码。",
  });
export type DNSRCode = z.infer<typeof DNSRCode>;

export const DNSRecordOptions = z.string().meta({
  id: "DNSRecordOptions",
  title: "DNS Record",
  title_zh: "DNS 记录",
  description:
    "DNS resource record serialized as a DNS text record or base64 encoded wire-format record.",
  description_zh:
    "以 DNS 文本记录或 base64 编码 wire-format 记录序列化的 DNS 资源记录。",
});
export type DNSRecordOptions = z.infer<typeof DNSRecordOptions>;
