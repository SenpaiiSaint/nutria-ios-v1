import uuid from 'react-native-uuid'
import { create } from 'zustand'
import { Meal } from '../types'

// Mock database functions for now
const getMeals = async (): Promise<Meal[]> => {
  return []
}

const upsertMeals = async (meals: Meal[]): Promise<void> => {
  console.log('Upserting meals:', meals)
}

const deleteMeal = async (id: string): Promise<void> => {
  console.log('Deleting meal:', id)
}

type MealState = {
  meals: Meal[]
  loading: boolean
  init: () => void
  add: (meal: Omit<Meal, 'id'>) => void
  move: (id: string, newDate: string) => void
  remove: (id: string) => void
}

export const useMealStore = create<MealState>((set, get) => ({
  meals: [],
  loading: true,

  init: () => {
    const loadMeals = async () => {
      try {
        const rows = await getMeals()
        set({ meals: rows, loading: false })
      } catch (e) {
        console.error(e)
        set({ loading: false })
      }
    }
    loadMeals()
  },

  add: async (meal: Omit<Meal, 'id'>) => {
    const newMeal = { ...meal, id: uuid.v4().toString() }
    set((s: MealState) => ({ meals: [...s.meals, newMeal] }))
    upsertMeals([newMeal]).catch(console.error)
  },

  move: async (id: string, newDate: string) => {
    set((s: MealState) => ({
      meals: s.meals.map((m: Meal) => (m.id === id ? { ...m, date: newDate } : m)),
    }))
    upsertMeals([{ id, date: newDate } as Meal]).catch(console.error)
  },

  remove: async (id: string) => {
    set((s: MealState) => ({ meals: s.meals.filter((m: Meal) => m.id !== id) }))
    deleteMeal(id).catch(console.error)
  },
}))
