import * as z from "zod/v4";
import { Configuration } from "@";

const jsonSchema = z.toJSONSchema(Configuration);
Bun.file("schema.json").write(JSON.stringify(jsonSchema, null, 2));

console.log("Done.");
