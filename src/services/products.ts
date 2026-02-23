import { PRODUCTS, Product } from "@/data/products";

export async function getProducts(_locale: string): Promise<Product[]> {
  
  return PRODUCTS;
}
