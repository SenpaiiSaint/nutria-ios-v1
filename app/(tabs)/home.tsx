import { useRouter } from 'expo-router'
import {
  ActivityIndicator,
  FlatList,
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
        <ActivityIndicator size="large" />
      </View>
    )

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 16 }}>
        Pantry ({items.length})
      </Text>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => remove(item.id)}
            style={{ paddingVertical: 4 }}
          >
            <Text>
              • {item.name} ({item.quantity} {item.unit})
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ color: '#666' }}>Nothing here yet – scan a receipt!</Text>
        }
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 16,
          borderRadius: 8,
          marginTop: 'auto',
          alignItems: 'center',
        }}
        onPress={() => router.push('/(tabs)/scan')}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          Scan Receipt
        </Text>
      </TouchableOpacity>
    </View>
  )
}
