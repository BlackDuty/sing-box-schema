import * as z from "zod";
import { Configuration } from "@";

const jsonSchema = z.toJSONSchema(Configuration, {
  cycles: "ref",
  reused: "ref",
  override(ctx) {
    // Delete zh properties
    delete ctx.jsonSchema.title_zh;
    delete ctx.jsonSchema.description_zh;
  },
});
Bun.file("./dist/schema.json").write(JSON.stringify(jsonSchema, null, 2));

const jsonSchemaZh = z.toJSONSchema(Configuration, {
  cycles: "ref",
  reused: "ref",
  override(ctx) {
    // Override Title
    ctx.jsonSchema.title =
      (ctx.jsonSchema.title_zh as string) || ctx.jsonSchema.title;
    // Override description
    ctx.jsonSchema.description =
      (ctx.jsonSchema.description_zh as string) || ctx.jsonSchema.description;

    // Delete zh properties
    delete ctx.jsonSchema.title_zh;
    delete ctx.jsonSchema.description_zh;
  },
});
Bun.file("./dist/schema.zh.json").write(JSON.stringify(jsonSchemaZh, null, 2));

console.log("Done.");
