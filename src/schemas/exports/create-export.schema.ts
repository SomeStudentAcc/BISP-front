import { z } from "zod";

export const CreateExportSchema = z.object({
  dillerUserId: z.string(),
  products: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        quantity: z.number().int(),
      }),
    )
    .min(1, "At least one product is required"),
});

export type TypeCreateExport = z.infer<typeof CreateExportSchema>;
