import { useEffect } from 'react'
import { usePantryStore } from '../store/usePantryStore'

export default function PantryInit() {
  const init = usePantryStore((s) => s.init)

  useEffect(() => {
    init()
  }, [])

  return null // renders nothing
}
