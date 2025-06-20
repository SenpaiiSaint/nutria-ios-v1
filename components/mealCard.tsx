import { StyleSheet, Text } from 'react-native'
import { Meal } from '../types'

export default function MealCard({
  meal,
  drag,
  isActive,
}: {
  meal: Meal
  drag?: () => void
  isActive?: boolean
}) {
  return (
    <Text
      onLongPress={drag}
      style={[
        styles.card,
        isActive && styles.activeCard
      ]}
    >
      <Text style={styles.name}>{meal.name}</Text>
      <Text style={styles.macro}>
        P{meal.protein} C{meal.carbs} F{meal.fat}
      </Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eef',
    borderRadius: 8,
    padding: 6,
    marginBottom: 4,
  },
  activeCard: {
    backgroundColor: '#ddf',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: { fontWeight: '600' },
  macro: { fontSize: 12 },
})
