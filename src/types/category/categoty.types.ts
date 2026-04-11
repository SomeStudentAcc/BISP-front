export interface ICharacteristic {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  url: string;
  image: string;
  companyId: string;
  characteristics: ICharacteristic[];
  createdAt: string;
  updatedAt: string;
}
