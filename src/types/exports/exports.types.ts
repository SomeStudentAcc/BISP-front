import { IProduct } from "../product/product.types";

export interface IExportItem {
  id: string;
  exportId: string;
  productId: string;
  quantity: number;
  product: IProduct;
}

export interface IExportWarehouse {
  id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExportDiller {
  id: string;
  username: string;
  email: string;
  role: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExport {
  id: string;
  warehouseId: string;
  dillerUserId: string;
  companyId: string;
  createdAt: string;
  warehouse: IExportWarehouse;
  diller: IExportDiller;
  items: IExportItem[];
}
