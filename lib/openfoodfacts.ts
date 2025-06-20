import { PantryItem } from '../types'

export async function fetchProductByBarcode(
  code: string
): Promise<Partial<PantryItem> | null> {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${code}.json`
    )
    const json = await res.json()
    if (json.status !== 1) return null

    const p = json.product
    const nutr = p.nutriments || {}

    return {
      name:
        p.product_name ||
        p.generic_name_en ||
        p.brands ||
        `Product ${code}`,
      category: (p.categories_en || '').split(',')[0]?.trim() || '',
      macros: {
        protein: Number(nutr.proteins_100g) || 0,
        carbs: Number(nutr.carbohydrates_100g) || 0,
        fat: Number(nutr.fat_100g) || 0,
      },
    }
  } catch (e) {
    console.warn('OFF fetch error', e)
    return null
  }
}
