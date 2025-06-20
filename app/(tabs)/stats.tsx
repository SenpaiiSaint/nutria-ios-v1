import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'
import { Card, Text, XStack, YStack } from 'tamagui'

export default function StatsScreen() {
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
        <XStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <YStack>
            <Text fontSize="$8" fontWeight="800" color="#1e293b">
              Analytics
            </Text>
            <Text fontSize="$3" color="#64748b" style={{ marginTop: 4 }}>
              Track your nutrition & waste
            </Text>
          </YStack>
          <View style={{
            backgroundColor: '#22c55e',
            borderRadius: 20,
            padding: 8,
          }}>
            <Ionicons name="stats-chart" size={24} color="white" />
          </View>
        </XStack>
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 20 }}>
        <YStack space="$6">
          {/* Coming Soon Card */}
          <Card
            padding="$6"
            backgroundColor="white"
            borderRadius="$4"
            borderWidth={1}
            borderColor="#e2e8f0"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={0.05}
            shadowRadius={2}
            elevation={1}
          >
            <YStack style={{ alignItems: 'center' }} space="$4">
              <View style={{
                backgroundColor: '#f1f5f9',
                borderRadius: 40,
                padding: 20,
              }}>
                <Ionicons name="analytics-outline" size={48} color="#94a3b8" />
              </View>
              
              <YStack style={{ alignItems: 'center' }} space="$2">
                <Text fontSize="$6" fontWeight="600" color="#1e293b" style={{ textAlign: 'center' }}>
                  Analytics Coming Soon
                </Text>
                <Text fontSize="$3" color="#64748b" style={{ textAlign: 'center', lineHeight: 20 }}>
                  Track your nutrition goals, monitor food waste, and get insights into your eating habits
                </Text>
              </YStack>
            </YStack>
          </Card>

          {/* Feature Preview */}
          <YStack space="$4">
            <Text fontSize="$5" fontWeight="600" color="#1e293b">
              What's Coming
            </Text>
            
            <YStack space="$3">
              <XStack space="$3" style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#22c55e', borderRadius: 20, padding: 8 }}>
                  <Ionicons name="trending-up" size={16} color="white" />
                </View>
                <YStack flex={1}>
                  <Text fontSize="$4" fontWeight="600" color="#1e293b">
                    Nutrition Trends
                  </Text>
                  <Text fontSize="$3" color="#64748b">
                    Track your macro intake over time
                  </Text>
                </YStack>
              </XStack>
              
              <XStack space="$3" style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#22c55e', borderRadius: 20, padding: 8 }}>
                  <Ionicons name="leaf" size={16} color="white" />
                </View>
                <YStack flex={1}>
                  <Text fontSize="$4" fontWeight="600" color="#1e293b">
                    Waste Reduction
                  </Text>
                  <Text fontSize="$3" color="#64748b">
                    Monitor food waste and get tips
                  </Text>
                </YStack>
              </XStack>
              
              <XStack space="$3" style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#22c55e', borderRadius: 20, padding: 8 }}>
                  <Ionicons name="trophy" size={16} color="white" />
                </View>
                <YStack flex={1}>
                  <Text fontSize="$4" fontWeight="600" color="#1e293b">
                    Achievements
                  </Text>
                  <Text fontSize="$3" color="#64748b">
                    Earn badges for healthy habits
                  </Text>
                </YStack>
              </XStack>
              
              <XStack space="$3" style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#22c55e', borderRadius: 20, padding: 8 }}>
                  <Ionicons name="calendar" size={16} color="white" />
                </View>
                <YStack flex={1}>
                  <Text fontSize="$4" fontWeight="600" color="#1e293b">
                    Weekly Reports
                  </Text>
                  <Text fontSize="$3" color="#64748b">
                    Get detailed nutrition summaries
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          </YStack>
        </YStack>
      </View>
    </View>
  )
}
