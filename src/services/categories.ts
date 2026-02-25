import { PRODUCT_TABS } from "@/data/products";

export interface Category {
  id: string;
  label: string;
}

export async function getCategories(_locale: string): Promise<Category[]> {
  // const res = await fetch("http://77.83.206.95/api/products", {
  //   headers: {
  //     "Accept-Language": "uz",
  //   },
  // });

  // const result = await res.json();

  // console.log(result);

  return PRODUCT_TABS.map((tab) => ({ id: tab.id, label: tab.label }));
}
