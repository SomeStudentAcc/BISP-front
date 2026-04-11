import { IProduct } from "../product/product.types";

export interface IDiller {
  id: string;
  name: string;
  phone: string;
  password: string;
  companyId: string;
  userId: string;
  user: IUser
}

export interface IDillerProduct {
  product: IProduct;
  quantity: number;
}

export interface IUser {
  email: string;
}

// types/diller/diller.types.ts

export interface IDillerExportProduct {
  id: string;
  name: string;
  images: string[];
}

export interface IDillerExportItem {
  id: string;
  exportId: string;
  productId: string;
  product: IDillerExportProduct;
  quantity: number;
}

export interface IDillerExportWarehouse {
  id: string;
  name: string;
  address: string;
}

export interface IDillerExport {
  id: string;
  warehouseId: string;
  dillerUserId: string;
  companyId: string;
  createdAt: string;
  warehouse: IDillerExportWarehouse;
  items: IDillerExportItem[];
}

enum IStatus {
  PENDING,
  ACCEPTED,
  CANCELED,
}
