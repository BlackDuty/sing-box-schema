import { z } from "zod";
import { DERPServiceOptions } from "./services/derp";
import { ResolvedServiceOptions } from "./services/resolved";
import { SSMAPIServiceOptions } from "./services/ssm-api";

export const Service = z.discriminatedUnion("type", [
  DERPServiceOptions,
  ResolvedServiceOptions,
  SSMAPIServiceOptions,
]);

export type Service = z.infer<typeof Service>;
