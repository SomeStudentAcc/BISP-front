import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(2),
  url: z.string().min(2),
  image: z.array(z.file()),
});

export type TypeCreateCategory = z.infer<typeof CreateCategorySchema>;
