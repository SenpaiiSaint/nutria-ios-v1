import { useCameraPermissions } from 'expo-camera'
import { useRef, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { v4 as uuid } from 'uuid'
import { runOCR } from '../../lib/ocr'
import { usePantryStore } from '../../store/usePantryStore'

export default function Scan() {
  const cameraRef = useRef<any>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const [loading, setLoading] = useState(false)
  const addMany = usePantryStore((s) => s.addMany)

  if (!permission) {
    return <Text>Requesting camera permission…</Text>
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No camera access</Text>
        <TouchableOpacity
          style={{ marginTop: 16, padding: 16, backgroundColor: '#007AFF', borderRadius: 8 }}
          onPress={requestPermission}
        >
          <Text style={{ color: 'white' }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const handleSnap = async () => {
    setLoading(true)

    try {
      // Temporarily use mock photo data since camera is disabled
      const mockPhoto = { uri: 'mock-photo-uri' }
      
      const skus = await runOCR(mockPhoto.uri)

      // Map SKUs to basic pantry items (temporary)
      const newItems = skus.map((sku) => ({
        id: uuid(),
        name: `SKU ${sku}`,
        quantity: 1,
        unit: '',
      }))
      addMany(newItems)
      console.log('Added items:', newItems)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ color: 'white' }}>Camera Preview</Text>
        <Text style={{ color: 'white', fontSize: 12, marginTop: 8 }}>
          Camera component temporarily disabled
        </Text>
      </View>
      {loading ? (
        <View
          style={{
            position: 'absolute',
            bottom: 40,
            alignSelf: 'center',
            padding: 16,
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 12,
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff', marginTop: 8 }}>Processing…</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 60,
            alignSelf: 'center',
            backgroundColor: '#007AFF',
            padding: 16,
            borderRadius: 8,
            minWidth: 120,
            alignItems: 'center',
          }}
          onPress={handleSnap}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Capture
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
