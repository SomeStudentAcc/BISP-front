import { z } from "zod";

export const UpdateWarehouseSchema = z.object({
  name: z.string().min(2).optional(),
  manager: z.string().min(2).optional(),
  phone: z.string().min(2).optional(),
  address: z.string().min(2).optional(),
});

export type TypeUpdateWarehouse = z.infer<typeof UpdateWarehouseSchema>;
