import z from "zod";

/**
 * Create a new Zod schema that allows either a single value of type `T` or an
 * array of values of type `T`. This is useful for defining configuration
 * options that can be either a single value or a list of values.
 *
 * @example
 * const port = z.number().int().refine((v) => v > 0 && v < 65536);
 * const ports = listable(port);
 * ports.parse(42); // => 42
 * ports.parse([42, 8080]); // => [42, 8080]
 *
 * @param {z.ZodTypeAny} schema
 * @returns {z.ZodTypeAny}
 */
export const listable = <T extends z.ZodTypeAny>(schema: T) =>
  z.union([schema, z.array(schema)]);

/**
 * Create a new Zod schema that allows either a single string or an array of
 * strings. This is useful for defining configuration options that can be either
 * a single string or a list of strings.
 */
export const listableString = listable(z.string());

/**
 * Create a new Zod schema that allows either a single number or an array of
 * integers. This is useful for defining configuration options that can be either
 * a single number or a list of numbers.
 *
 */
export const listableInts = listable(z.number().int());
