import { supabase } from '../lib/supabase'
import { Meal } from '../types'

export async function getMeals(): Promise<Meal[]> {
  if (!supabase) return []
  const { data, error } = await supabase.from('meals').select('*')
  if (error) throw error
  return data as Meal[]
}

export async function upsertMeals(meals: Meal[]) {
  if (!supabase) return
  const { error } = await supabase.from('meals').upsert(meals)
  if (error) throw error
}

export async function deleteMeal(id: string) {
  if (!supabase) return
  const { error } = await supabase.from('meals').delete().eq('id', id)
  if (error) throw error
}
