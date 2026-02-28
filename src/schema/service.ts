import { z } from "zod";
import { CCMServiceOptions } from "./services/ccm";
import { DERPServiceOptions } from "./services/derp";
import { OCMServiceOptions } from "./services/ocm";
import { OOMKillerServiceOptions } from "./services/oom-killer";
import { ResolvedServiceOptions } from "./services/resolved";
import { SSMAPIServiceOptions } from "./services/ssm-api";

export const Service = z
  .discriminatedUnion("type", [
    CCMServiceOptions,
    DERPServiceOptions,
    OCMServiceOptions,
    OOMKillerServiceOptions,
    ResolvedServiceOptions,
    SSMAPIServiceOptions,
  ])
  .meta({
    id: "Service",
    title: "Service",
    title_zh: "服务",
    description:
      "Service entries configure supplemental services such as DERP, Resolved, and SSM API introduced in sing-box 1.12.0.",
    description_zh:
      "服务条目配置如 DERP、Resolved 与 SSM API 等补充服务，自 sing-box 1.12.0 起提供。",
  });

export type Service = z.infer<typeof Service>;
