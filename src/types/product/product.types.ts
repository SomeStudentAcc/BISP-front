import { IWarehouse } from "../warehousees/warehouses.types";

export interface IProductCharacteristic {
  id: string;
  title: string;
  value: string;
  productId: string;
}

export interface IProduct {
  id: string;
  name: string;
  url: string;
  images: string[];
  totalQuantity: number;
  companyId: string;
  categoryId: string;
  warehouses: IWarehouse[];
  createdAt: string;
  updatedAt: string;
  characteristics: IProductCharacteristic[];
}
