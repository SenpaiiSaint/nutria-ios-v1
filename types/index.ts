export type Macronutrients = {
  protein: number
  carbs: number
  fat: number
}

export type PantryItem = {
  id: string
  name: string
  category: string            // "protein" | "vegetable" | etc.
  macros: Macronutrients
  quantity: number
  unit: string
}
  
  export type Meal = {
    id: string
    name: string
    protein: number
    carbs: number
    fat: number
    date: string        // YYYY-MM-DD
  }
  
