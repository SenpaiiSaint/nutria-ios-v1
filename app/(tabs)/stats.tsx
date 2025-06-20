import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import PrimaryButton from '../../components/PrimaryButton'
import { aiSuggestMeal } from '../../lib/openai'
import { useCO2Total, useMacroTotals } from '../../store/useStats'

export default function StatsScreen() {
  const macros = useMacroTotals()
  const co2 = useCO2Total()
  const [aiText, setText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const askAI = async () => {
    try {
      setLoading(true)
      const reply = await aiSuggestMeal(macros)
      setText(reply)
    } catch (e) {
      setText(String(e))
    } finally {
      setLoading(false)
    }
  }

  const totalCalories = macros.protein * 4 + macros.carbs * 4 + macros.fat * 9
  const proteinPercentage = totalCalories > 0 ? (macros.protein * 4 / totalCalories) * 100 : 0
  const carbsPercentage = totalCalories > 0 ? (macros.carbs * 4 / totalCalories) * 100 : 0
  const fatPercentage = totalCalories > 0 ? (macros.fat * 9 / totalCalories) * 100 : 0

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Nutrition Stats</Text>
          <Text style={styles.subtitle}>Weekly overview</Text>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons name="stats-chart" size={24} color="white" />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Macro Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Macronutrients</Text>
          <Text style={styles.totalCalories}>{totalCalories.toFixed(0)} kcal</Text>
          
          <View style={styles.macroRow}>
            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <View style={[styles.macroDot, { backgroundColor: '#ef4444' }]} />
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
              <Text style={styles.macroValue}>{macros.protein.toFixed(0)}g</Text>
              <Text style={styles.macroPercentage}>{proteinPercentage.toFixed(0)}%</Text>
            </View>
            
            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <View style={[styles.macroDot, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>
              <Text style={styles.macroValue}>{macros.carbs.toFixed(0)}g</Text>
              <Text style={styles.macroPercentage}>{carbsPercentage.toFixed(0)}%</Text>
            </View>
            
            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <View style={[styles.macroDot, { backgroundColor: '#f59e0b' }]} />
                <Text style={styles.macroLabel}>Fat</Text>
              </View>
              <Text style={styles.macroValue}>{macros.fat.toFixed(0)}g</Text>
              <Text style={styles.macroPercentage}>{fatPercentage.toFixed(0)}%</Text>
            </View>
          </View>
        </View>

        {/* CO2 Impact Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="leaf" size={20} color="#22c55e" />
            <Text style={styles.cardTitle}>Environmental Impact</Text>
          </View>
          
          <View style={styles.co2Container}>
            <Text style={styles.co2Value}>{(co2 / 1000).toFixed(2)}</Text>
            <Text style={styles.co2Unit}>kg CO₂</Text>
          </View>
          
          <Text style={styles.co2Description}>
            Estimated carbon footprint from your meals this week
          </Text>
          
          <View style={styles.co2Comparison}>
            <View style={styles.comparisonItem}>
              <Ionicons name="car" size={16} color="#64748b" />
              <Text style={styles.comparisonText}>
                {(co2 / 1000 / 0.4).toFixed(1)} km driving
              </Text>
            </View>
            <View style={styles.comparisonItem}>
              <Ionicons name="bulb" size={16} color="#64748b" />
              <Text style={styles.comparisonText}>
                {(co2 / 1000 / 0.5).toFixed(1)} hours of electricity
              </Text>
            </View>
          </View>
        </View>

        {/* AI Suggestions Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="sparkles" size={20} color="#8b5cf6" />
            <Text style={styles.cardTitle}>AI Meal Suggestions</Text>
          </View>
          
          <Text style={styles.aiDescription}>
            Get personalized meal ideas based on your current nutrition balance
          </Text>

          <PrimaryButton
            size="large"
            style={styles.aiButton}
            onPress={askAI}
          >
            {loading ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator size="small" color="white" />
                <Text style={styles.buttonText}>Thinking…</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Ionicons name="sparkles" size={16} color="white" />
                <Text style={styles.buttonText}>Get AI Suggestions</Text>
              </View>
            )}
          </PrimaryButton>

          {aiText && (
            <View style={styles.aiResponse}>
              <View style={styles.aiResponseHeader}>
                <Ionicons name="chatbubble" size={16} color="#8b5cf6" />
                <Text style={styles.aiResponseTitle}>AI Suggestion</Text>
              </View>
              <Text style={styles.aiResponseText}>{aiText}</Text>
            </View>
          )}
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.quickStatItem}>
            <Ionicons name="restaurant" size={24} color="#22c55e" />
            <Text style={styles.quickStatValue}>7</Text>
            <Text style={styles.quickStatLabel}>Meals</Text>
          </View>
          
          <View style={styles.quickStatItem}>
            <Ionicons name="trending-up" size={24} color="#f59e0b" />
            <Text style={styles.quickStatValue}>{totalCalories > 0 ? 'Good' : 'Start'}</Text>
            <Text style={styles.quickStatLabel}>Balance</Text>
          </View>
          
          <View style={styles.quickStatItem}>
            <Ionicons name="leaf" size={24} color="#10b981" />
            <Text style={styles.quickStatValue}>{(co2 / 1000) < 5 ? 'Low' : 'Moderate'}</Text>
            <Text style={styles.quickStatLabel}>Impact</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  headerIcon: {
    backgroundColor: '#22c55e',
    borderRadius: 20,
    padding: 8,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginLeft: 8,
  },
  totalCalories: {
    fontSize: 32,
    fontWeight: '800',
    color: '#22c55e',
    textAlign: 'center',
    marginBottom: 20,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  macroLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  macroPercentage: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  co2Container: {
    alignItems: 'center',
    marginBottom: 12,
  },
  co2Value: {
    fontSize: 36,
    fontWeight: '800',
    color: '#22c55e',
  },
  co2Unit: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  co2Description: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
  },
  co2Comparison: {
    gap: 8,
  },
  comparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  comparisonText: {
    fontSize: 14,
    color: '#64748b',
  },
  aiDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 20,
  },
  aiButton: {
    marginBottom: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  aiResponse: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  aiResponseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiResponseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b5cf6',
    marginLeft: 6,
  },
  aiResponseText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickStatItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 8,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
})
