import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist'
import MealCard from '../../components/mealCard'
import { useMealStore } from '../../store/useMealStore'
import { Meal } from '../../types'

const daysToShow = 7

export default function PlannerScreen() {
  const { meals, loading, init, add } = useMealStore()

  useEffect(() => init(), [init])

  const dates = useMemo(() => {
    const today = dayjs()
    return Array.from({ length: daysToShow }, (_, i) => today.add(i, 'day'))
  }, [])

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    )

  /** helper to calc daily macro totals */
  const macrosForDate = (date: string) => {
    const dayMeals = meals.filter((m: Meal) => m.date === date)
    return dayMeals.reduce(
      (tot: { protein: number; carbs: number; fat: number }, m: Meal) => ({
        protein: tot.protein + m.protein,
        carbs: tot.carbs + m.carbs,
        fat: tot.fat + m.fat,
      }),
      { protein: 0, carbs: 0, fat: 0 }
    )
  }

  /** For demo: add a dummy high-protein meal to today */
  const addSample = () =>
    add({
      name: 'Chicken Bowl',
      protein: 40,
      carbs: 30,
      fat: 12,
      date: dayjs().format('YYYY-MM-DD'),
    })

  const handleDragEnd = ({ data, from, to }: { data: Meal[], from: number, to: number }) => {
    // For now, just log the drag operation
    console.log('Drag ended:', { from, to, data })
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal>
        {dates.map((d) => {
          const key = d.format('YYYY-MM-DD')
          const dayMeals = meals.filter((m: Meal) => m.date === key)
          const macros = macrosForDate(key)

          return (
            <View key={key} style={styles.column}>
              <Text style={styles.dateLabel}>{d.format('ddd D')}</Text>

              <View style={styles.dropZone}>
                <DraggableFlatList
                  data={dayMeals}
                  onDragEnd={handleDragEnd}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, drag, isActive }) => (
                    <ScaleDecorator>
                      <MealCard 
                        meal={item} 
                        drag={drag}
                        isActive={isActive}
                      />
                    </ScaleDecorator>
                  )}
                  contentContainerStyle={{ padding: 4 }}
                />
              </View>

              <View style={styles.macroBar}>
                <Text style={styles.macroTxt}>
                  P{macros.protein} C{macros.carbs} F{macros.fat}
                </Text>
              </View>
            </View>
          )
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={addSample}
      >
        <Text style={styles.fabText}>+ Meal</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  column: { width: 140, padding: 6 },
  dateLabel: { textAlign: 'center', fontWeight: '600', marginBottom: 4 },
  dropZone: {
    flex: 1,
    minHeight: 300,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
  },
  macroBar: {
    marginTop: 4,
    padding: 4,
    backgroundColor: '#def',
    borderRadius: 6,
  },
  macroTxt: { fontSize: 12, textAlign: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  fabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})
