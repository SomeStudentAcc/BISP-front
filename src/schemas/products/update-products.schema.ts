import { z } from "zod";

export const UpdateProductSchema = z.object({
  name: z.string().min(2),
  url: z.string().min(2),
  image: z.array(z.file()),
  quantity: z.string(),
  categoryId: z.string(),
});

export type TypeUpdateProduct = z.infer<typeof UpdateProductSchema>;
