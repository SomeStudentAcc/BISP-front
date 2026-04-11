import { z } from "zod";

export const CreateWarehouseSchema = z.object({
  name: z.string().min(2),
  manager: z.string().min(2),
  phone: z.string().min(2),
  address: z.string().min(2),
});

export type TypeCreateWarehouse = z.infer<typeof CreateWarehouseSchema>;
