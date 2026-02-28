import { PRODUCT_TABS } from "@/data/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.rokacell.com/app/api/";

export interface Category {
  id: string;
  label: string;
}

export interface ApiCategory {
  id: number;
  title: string;
  slug: string;
}

/**
 * Привести данные из API к формату Category
 */
function mapApiToCategory(apiItem: ApiCategory): Category {
  return {
    id: apiItem.slug,
    label: apiItem.title,
  };
}

/**
 * Получить список категорий продуктов
 */
export async function getCategories(locale: string): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}categories/`, {
      headers: {
        "Accept-Language": locale,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: ApiCategory[] = await res.json();
    const categories = data.map(mapApiToCategory);

    // Добавить вкладку "Все" (если нет из API)
    categories.push({ id: "all", label: locale === "ru" ? "Все" : locale === "uz" ? "Hammasi" : "All" });

    return categories;
  } catch (error) {
    console.error("Ошибка загрузки категорий из API:", error);
    // Фоллбэк на локальные данные
    return PRODUCT_TABS.map((tab) => ({ id: tab.id, label: tab.label }));
  }
}
