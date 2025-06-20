import { create } from 'zustand'

type PantryItem = {
  id: string
  name: string
  quantity: number
  unit: string
}

type PantryState = {
  items: PantryItem[]
  addMany: (items: PantryItem[]) => void
}

export const usePantryStore = create<PantryState>((set) => ({
  items: [],
  addMany: (newItems: PantryItem[]) =>
    set((s: PantryState) => ({ items: [...s.items, ...newItems] })),
}))
