import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button, Card, Text, XStack, YStack } from 'tamagui'
import { usePantryStore } from '../../store/usePantryStore'

export default function Home() {
  const router = useRouter()
  const items = usePantryStore((s) => s.items)
  const loading = usePantryStore((s) => s.loading)
  const remove = usePantryStore((s) => s.remove)

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    )

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
              Pantry
            </Text>
            <Text fontSize="$3" color="#64748b" style={{ marginTop: 4 }}>
              {items.length} items
            </Text>
          </YStack>
          <View style={{
            backgroundColor: '#22c55e',
            borderRadius: 20,
            padding: 8,
          }}>
            <Ionicons name="basket" size={24} color="white" />
          </View>
        </XStack>
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 20 }}>
        {items.length > 0 ? (
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Card
                marginBottom="$3"
                padding="$4"
                backgroundColor="white"
                borderRadius="$4"
                borderWidth={1}
                borderColor="#e2e8f0"
                pressStyle={{
                  backgroundColor: '#f8fafc',
                  scale: 0.98,
                }}
                animation="quick"
              >
                <TouchableOpacity
                  onLongPress={() => remove(item.id)}
                  style={{ flex: 1 }}
                >
                  <XStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <YStack flex={1}>
                      <Text fontSize="$4" fontWeight="600" color="#1e293b">
                        {item.name}
                      </Text>
                      <Text fontSize="$3" color="#64748b" style={{ marginTop: 4 }}>
                        {item.quantity} {item.unit}
                      </Text>
                    </YStack>
                    <View style={{
                      backgroundColor: '#f1f5f9',
                      borderRadius: 16,
                      padding: 8,
                    }}>
                      <Ionicons name="trash-outline" size={16} color="#ef4444" />
                    </View>
                  </XStack>
                </TouchableOpacity>
              </Card>
            )}
          />
        ) : (
          <YStack flex={1} style={{ justifyContent: 'center', alignItems: 'center' }} space="$4">
            <View style={{
              backgroundColor: '#f1f5f9',
              borderRadius: 40,
              padding: 20,
            }}>
              <Ionicons name="basket-outline" size={48} color="#94a3b8" />
            </View>
            <YStack style={{ alignItems: 'center' }} space="$2">
              <Text fontSize="$5" fontWeight="600" color="#475569">
                Your pantry is empty
              </Text>
              <Text fontSize="$3" color="#64748b" style={{ textAlign: 'center' }}>
                Scan a receipt to start tracking your food items
              </Text>
            </YStack>
          </YStack>
        )}

        {/* Scan Button */}
        <Button
          size="$5"
          bg="#22c55e"
          borderColor="#22c55e"
          style={{ borderRadius: 12, paddingVertical: 16, marginTop: 16 }}
          onPress={() => router.push('/(tabs)/scan')}
          pressStyle={{
            bg: '#16a34a',
            scale: 0.98,
          }}
          animation="quick"
        >
          <XStack space="$2" style={{ alignItems: 'center' }}>
            <Ionicons name="camera" size={20} color="white" />
            <Text fontWeight="600" color="white" fontSize="$4">
              Scan Receipt
            </Text>
          </XStack>
        </Button>
      </View>
    </View>
  )
}
