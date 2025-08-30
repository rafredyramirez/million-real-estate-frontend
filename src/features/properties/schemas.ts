import { z } from "zod";

export const propertySchema = z.object({
  id: z.string(),
  idOwner: z.string(),
  name: z.string(),
  address: z.string(),
  price: z.union([z.number(), z.string().transform(Number)]),
  imageUrl: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
}).transform((x) => ({
  ...x,
  imageUrl: x.imageUrl ?? x.image ?? null,
}));

export const pagedSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    page: z.number(),
    pageSize: z.number(),
    total: z.number(),
    totalPages: z.number(),
  });