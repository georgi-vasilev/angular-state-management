export interface IApiResponse {
  status: string;
  message: string;
  products: IProduct[];
}

export interface IProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
}

export interface ICart {
  products: IProduct[]
}