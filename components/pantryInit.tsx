import { useEffect } from 'react'
import { usePantryStore } from '../store/usePantryStore'

export default function PantryInit() {
  const init = usePantryStore((s: any) => s.init)

  useEffect(() => {
    init()
  }, [init])

  return null // renders nothing
}
