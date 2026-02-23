import { PRODUCTS, Product } from "@/data/products";

export async function getProducts(_locale: string): Promise<Product[]> {
  // Временно возвращаем только локальные (захардкоженные) данные для MVP
  return PRODUCTS;
}
