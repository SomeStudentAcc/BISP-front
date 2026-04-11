import { z } from "zod";

export const UpdateDillerSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

export type TypeUpdateDiller = z.infer<typeof UpdateDillerSchema>;
