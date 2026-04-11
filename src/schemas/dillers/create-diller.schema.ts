import { z } from "zod";

export const CreateDillerSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  password: z.string(),
});


export type TypeCreateDiller = z.infer<typeof CreateDillerSchema>;
