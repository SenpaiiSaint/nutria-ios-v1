import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#1e293b' }}>
              Pantry
            </Text>
            <Text style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
              {items.length} items
            </Text>
          </View>
          <View style={{
            backgroundColor: '#22c55e',
            borderRadius: 20,
            padding: 8,
          }}>
            <Ionicons name="basket" size={24} color="white" />
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 20 }}>
        {items.length > 0 ? (
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable onLongPress={() => remove(item.id)} style={{ paddingVertical: 6 }}>
                <Text>
                  • {item.name}{' '}
                  {(item as any).category ? (
                    <Text
                      style={{
                        fontSize: 10,
                        backgroundColor: '#dcfce7',
                        color: '#065f46',
                        paddingHorizontal: 4,
                        borderRadius: 4,
                      }}
                    >
                      {(item as any).category}
                    </Text>
                  ) : null}
                </Text>
              </Pressable>
            )}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              backgroundColor: '#f1f5f9',
              borderRadius: 40,
              padding: 20,
              marginBottom: 16,
            }}>
              <Ionicons name="basket-outline" size={48} color="#94a3b8" />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#475569', marginBottom: 8 }}>
                Your pantry is empty
              </Text>
              <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center' }}>
                Scan a receipt to start tracking your food items
              </Text>
            </View>
          </View>
        )}

        {/* Scan Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#22c55e',
            borderRadius: 12,
            paddingVertical: 16,
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
          onPress={() => router.push('/(tabs)/scan')}
          activeOpacity={0.8}
        >
          <Ionicons name="camera" size={20} color="white" />
          <Text style={{ fontWeight: '600', color: 'white', fontSize: 16 }}>
            Scan Receipt
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
