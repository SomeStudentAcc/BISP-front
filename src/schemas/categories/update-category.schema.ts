import { z } from "zod";

export const UpdateCategorySchema = z.object({
  name: z.string().min(2).optional(),
  url: z.string().min(2).optional(),
  image: z.array(z.file()).optional(),
  companyId: z.string().optional(),
});

export type TypeUpdateCategory = z.infer<typeof UpdateCategorySchema>;
