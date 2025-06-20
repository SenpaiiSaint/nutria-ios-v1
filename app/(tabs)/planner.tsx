import { Ionicons } from '@expo/vector-icons'
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
        <ActivityIndicator size="large" color="#22c55e" />
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
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: 'white', 
        paddingTop: 60, 
        paddingBottom: 20, 
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#1e293b' }}>
              Meal Planner
            </Text>
            <Text style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
              Plan your nutrition for the week
            </Text>
          </View>
          <View style={{
            backgroundColor: '#22c55e',
            borderRadius: 20,
            padding: 8,
          }}>
            <Ionicons name="calendar" size={24} color="white" />
          </View>
        </View>
      </View>

      {/* Calendar View */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 20 }}
      >
        {dates.map((d) => {
          const key = d.format('YYYY-MM-DD')
          const dayMeals = meals.filter((m: Meal) => m.date === key)
          const macros = macrosForDate(key)
          const isToday = d.isSame(dayjs(), 'day')

          return (
            <View key={key} style={[styles.column, isToday && styles.todayColumn]}>
              <View style={[styles.dateHeader, isToday && styles.todayHeader]}>
                <Text style={[styles.dateLabel, isToday && styles.todayLabel]}>
                  {d.format('ddd')}
                </Text>
                <Text style={[styles.dateNumber, isToday && styles.todayNumber]}>
                  {d.format('D')}
                </Text>
              </View>

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
                  contentContainerStyle={{ padding: 8 }}
                />
                {dayMeals.length === 0 && (
                  <View style={styles.emptyDay}>
                    <Ionicons name="add-circle-outline" size={24} color="#cbd5e1" />
                    <Text style={styles.emptyText}>Add meal</Text>
                  </View>
                )}
              </View>

              <View style={styles.macroBar}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.macroText}>P{macros.protein}</Text>
                  <Text style={styles.macroText}>C{macros.carbs}</Text>
                  <Text style={styles.macroText}>F{macros.fat}</Text>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>

      {/* Add Meal Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={addSample}
        activeOpacity={0.8}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={{ fontWeight: '600', color: 'white', fontSize: 16 }}>
            Add Meal
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  column: { 
    width: 160, 
    padding: 8,
    marginHorizontal: 4,
  },
  todayColumn: {
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  dateHeader: {
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  todayHeader: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    marginHorizontal: -4,
  },
  dateLabel: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: '#64748b',
    textTransform: 'uppercase',
  },
  todayLabel: {
    color: 'white',
  },
  dateNumber: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1e293b',
    marginTop: 2,
  },
  todayNumber: {
    color: 'white',
  },
  dropZone: {
    flex: 1,
    minHeight: 300,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emptyDay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 4,
    fontWeight: '500',
  },
  macroBar: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  macroText: { 
    fontSize: 11, 
    fontWeight: '600',
    color: '#475569',
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
})
