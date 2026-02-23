import { PRODUCT_TABS } from "@/data/products";

export interface Category {
  id: string;
  label: string;
}

export async function getCategories(_locale: string): Promise<Category[]> {
  // Временно возвращаем только локальные (захардкоженные) данные для MVP
  return PRODUCT_TABS.map((tab) => ({ id: tab.id, label: tab.label }));
}
