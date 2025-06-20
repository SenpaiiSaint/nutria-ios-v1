// grams of CO₂ per gram of food (VERY coarse demo values)
export const CO2_FACTORS: Record<string, number> = {
    beef: 27,
    lamb: 39,
    pork: 12,
    chicken: 7,
    cheese: 13,
    vegetables: 2,
    fruit: 2,
    grains: 3,
    legumes: 1,
    default: 5,
  }
  
  /** Estimate grams CO₂ for a category * grams of food */
  export function estimateCO2(category: string, grams: number) {
    const f = CO2_FACTORS[category.toLowerCase()] ?? CO2_FACTORS.default
    return f * grams
  }
  