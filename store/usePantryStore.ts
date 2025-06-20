// store/usePantryStore.ts
import { create } from 'zustand'

type PantryItem = {
  id: string
  name: string
  quantity: number
  unit: string
}

type PantryState = {
  items: PantryItem[]
  loading: boolean
  init: () => void
  addMany: (items: PantryItem[]) => void
  remove: (id: string) => void
}

export const usePantryStore = create<PantryState>((set, get) => ({
  items: [],
  loading: true,

  init: () => {
    const loadItems = async () => {
      try {
        // Temporarily disabled database calls
        set({ items: [], loading: false })
      } catch (e) {
        console.error(e)
        set({ loading: false })
      }
    }
    loadItems()
  },

  addMany: async (newItems: PantryItem[]) => {
    set((s: PantryState) => ({ items: [...s.items, ...newItems] }))
    // Temporarily disabled database calls
    // insertItems(newItems).catch(console.error)
  },

  remove: async (id: string) => {
    set((s: PantryState) => ({ items: s.items.filter((i: PantryItem) => i.id !== id) }))
    // Temporarily disabled database calls
    // deleteItem(id).catch(console.error)
  },
}))
