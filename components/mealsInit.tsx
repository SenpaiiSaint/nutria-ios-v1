// components/MealsInit.tsx
import { useEffect } from 'react'
import { useMealStore } from '../store/useMealStore'

export default function MealsInit() {
  const init = useMealStore((s: any) => s.init)
  useEffect(() => init(), [init])
  return null
}
