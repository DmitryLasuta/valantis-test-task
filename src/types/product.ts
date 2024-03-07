export interface Product {
  id: number;
  brand?: string;
  price?: number;
  product?: string;
}

export type ProductFieldNames = keyof Product;
export type ProductExcludingId = Omit<Product, 'id'>;
