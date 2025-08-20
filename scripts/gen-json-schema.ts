import * as z from "zod";
import { Configuration } from "@";

const jsonSchema = z.toJSONSchema(Configuration, {
  cycles: "ref",
  reused: "ref",
});
Bun.file("./dist/schema.json").write(JSON.stringify(jsonSchema, null, 2));

console.log("Done.");
