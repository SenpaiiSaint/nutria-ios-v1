import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
    <View style={[
      styles.card,
      isActive && styles.activeCard
    ]}>
      <TouchableOpacity
        onLongPress={drag}
        style={{ flex: 1 }}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>
              {meal.name}
            </Text>
            {isActive && (
              <View style={styles.dragIndicator}>
                <Ionicons name="move" size={12} color="white" />
              </View>
            )}
          </View>
          
          <View style={styles.macros}>
            <View style={styles.macroItem}>
              <View style={[styles.macroIcon, { backgroundColor: '#ef4444' }]}>
                <Ionicons name="fitness" size={10} color="white" />
              </View>
              <Text style={[styles.macroText, { color: '#ef4444' }]}>
                {meal.protein}g
              </Text>
            </View>
            
            <View style={styles.macroItem}>
              <View style={[styles.macroIcon, { backgroundColor: '#f59e0b' }]}>
                <Ionicons name="leaf" size={10} color="white" />
              </View>
              <Text style={[styles.macroText, { color: '#f59e0b' }]}>
                {meal.carbs}g
              </Text>
            </View>
            
            <View style={styles.macroItem}>
              <View style={[styles.macroIcon, { backgroundColor: '#8b5cf6' }]}>
                <Ionicons name="water" size={10} color="white" />
              </View>
              <Text style={[styles.macroText, { color: '#8b5cf6' }]}>
                {meal.fat}g
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeCard: {
    backgroundColor: '#f0f9ff',
    borderColor: '#0ea5e9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  dragIndicator: {
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    padding: 4,
  },
  macros: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  macroIcon: {
    borderRadius: 8,
    padding: 4,
  },
  macroText: {
    fontSize: 12,
    fontWeight: '500',
  },
})
