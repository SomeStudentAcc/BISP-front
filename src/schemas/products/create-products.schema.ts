import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(2),
  url: z.string().min(2),
  image: z.array(z.file()),
  categoryId: z.string(),
  characteristics: z
    .array(
      z.object({
        title: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .optional(),
});

export type TypeCreateProduct = z.infer<typeof CreateProductSchema>;
