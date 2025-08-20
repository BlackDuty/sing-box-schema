import { z } from "zod";
import { DERPServiceOptions } from "./services/derp";
import { ResolvedServiceOptions } from "./services/resolved";
import { SSMAPIServiceOptions } from "./services/ssm-api";

export const Service = z
  .discriminatedUnion("type", [
    DERPServiceOptions,
    ResolvedServiceOptions,
    SSMAPIServiceOptions,
  ])
  .meta({
    id: "Service",
    title: "Service",
    title_zh: "服务",
  });

export type Service = z.infer<typeof Service>;
