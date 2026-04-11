export interface IImport {
  id: string;
  userId: string;
  companyId: string;
  products: IImportProduct[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IImportProduct {
  id: string;
  importId: string;
  productId: string;
  warehouseId: string;
  quantity: string;
  createdAt: Date;
  updatedAt: Date;
}
