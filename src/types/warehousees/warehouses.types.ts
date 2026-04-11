import { IProduct } from "../product/product.types";

export interface IWarehouse {
  id: string;
  name: string;
  manager: string;
  address: string;
  phone: string;
  warehouseProducts: IWarehouseProduct[];
}

export interface IWarehouseProduct {
  id: string;
  productId: string;
  product: IProduct
  warehouseId: string;
  quantity: number;
  createdAt: string; // or Date (see below)
  updatedAt: string; // or Date
}