import { create } from 'zustand'
import { estimateCO2 } from '../lib/co2'
import { useMealStore } from './useMealStore'

export const useStats = create(() => ({})) // placeholder if you want global

export function useMacroTotals() {
  const meals = useMealStore((s) => s.meals)
  return meals.reduce(
    (tot, m) => ({
      protein: tot.protein + m.protein,
      carbs: tot.carbs + m.carbs,
      fat: tot.fat + m.fat,
    }),
    { protein: 0, carbs: 0, fat: 0 }
  )
}

export function useCO2Total() {
  const meals = useMealStore((s) => s.meals)
  return meals.reduce((tot, m) => {
    const grams = m.protein + m.carbs + m.fat // ≈ serving grams
    return tot + estimateCO2('default', grams) // Use default category for meals
  }, 0)
}
