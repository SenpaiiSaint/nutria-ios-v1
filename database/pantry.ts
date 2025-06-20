import { supabase } from '../lib/supabase'
import { PantryItem } from '../types/index'

export async function getPantry(): Promise<PantryItem[]> {
  const { data, error } = await supabase.from('pantry').select('*')
  if (error) throw error
  return data as PantryItem[]
}

export async function insertItems(items: PantryItem[]) {
  const { error } = await supabase.from('pantry').upsert(items)
  if (error) throw error
}

export async function deleteItem(id: string) {
  const { error } = await supabase.from('pantry').delete().eq('id', id)
  if (error) throw error
}
