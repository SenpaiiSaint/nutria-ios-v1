import { Ionicons } from '@expo/vector-icons'
import { useCameraPermissions } from 'expo-camera'
import { useRef, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid'
import { runOCR } from '../../lib/ocr'
import { fetchProductByBarcode } from '../../lib/openfoodfacts'
import { usePantryStore } from '../../store/usePantryStore'
import { PantryItem } from '../../types'

export default function Scan() {
  const cameraRef = useRef<any>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const [loading, setLoading] = useState(false)
  const addMany = usePantryStore((s) => s.addMany)

  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    )
  }

  if (!permission.granted) {
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
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 28, fontWeight: '800', color: '#1e293b' }}>
                Scan Receipt
              </Text>
              <Text style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
                Camera access required
              </Text>
            </View>
            <View style={{
              backgroundColor: '#22c55e',
              borderRadius: 20,
              padding: 8,
            }}>
              <Ionicons name="camera" size={24} color="white" />
            </View>
          </View>
        </View>

        {/* Permission Request */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{
            backgroundColor: '#f1f5f9',
            borderRadius: 40,
            padding: 20,
            marginBottom: 24,
          }}>
            <Ionicons name="camera-outline" size={48} color="#94a3b8" />
          </View>
          
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <Text style={{ fontSize: 24, fontWeight: '600', color: '#1e293b', textAlign: 'center', marginBottom: 12 }}>
              Camera Permission Required
            </Text>
            <Text style={{ fontSize: 16, color: '#64748b', textAlign: 'center', lineHeight: 24 }}>
              We need camera access to scan receipts and add items to your pantry
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#22c55e',
              borderRadius: 12,
              paddingVertical: 16,
              paddingHorizontal: 32,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
            onPress={requestPermission}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={20} color="white" />
            <Text style={{ fontWeight: '600', color: 'white', fontSize: 16 }}>
              Grant Permission
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const handleSnap = async () => {
    setLoading(true)

    try {
      // Temporarily use mock photo data since camera is disabled
      const mockPhoto = { uri: 'mock-photo-uri' }
      
      const skus = await runOCR(mockPhoto.uri)

      // Enrich SKUs with product data from OpenFoodFacts
      const enriched: PantryItem[] = []

      for (const code of skus) {
        const base = {
          id: uuid.v4().toString(),
          quantity: 1,
          unit: '',
        }

        // try OpenFoodFacts
        const info = await fetchProductByBarcode(code)

        enriched.push({
          ...base,
          name: info?.name || `SKU ${code}`,
          category: info?.category || '',
          macros: info?.macros || { protein: 0, carbs: 0, fat: 0 },
        })
      }

      addMany(enriched)
      console.log('Added enriched items:', enriched)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        paddingTop: 60, 
        paddingBottom: 20, 
        paddingHorizontal: 20,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 28, fontWeight: '800', color: 'white' }}>
              Scan Receipt
            </Text>
            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
              Position receipt in frame
            </Text>
          </View>
          <View style={{
            backgroundColor: '#22c55e',
            borderRadius: 20,
            padding: 8,
          }}>
            <Ionicons name="camera" size={24} color="white" />
          </View>
        </View>
      </View>

      {/* Camera Preview */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          width: 300,
          height: 400,
          borderWidth: 2,
          borderColor: '#22c55e',
          borderRadius: 16,
          borderStyle: 'dashed',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
        }}>
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="receipt-outline" size={48} color="#22c55e" />
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', marginTop: 12 }}>
              Camera Preview
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textAlign: 'center', marginTop: 8 }}>
              Camera component temporarily disabled
            </Text>
          </View>
        </View>
      </View>

      {/* Controls */}
      {loading ? (
        <View style={{
          position: 'absolute',
          bottom: 40,
          alignSelf: 'center',
          padding: 20,
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#22c55e',
        }}>
          <View style={{ alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#22c55e" />
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500', marginTop: 8 }}>
              Processing receipt...
            </Text>
          </View>
        </View>
      ) : (
        <View style={{
          position: 'absolute',
          bottom: 40,
          alignSelf: 'center',
          paddingHorizontal: 20,
        }}>
          <TouchableOpacity
            style={{ 
              backgroundColor: '#22c55e',
              borderRadius: 50, 
              paddingVertical: 20, 
              paddingHorizontal: 40,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
            onPress={handleSnap}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={24} color="white" />
            <Text style={{ fontWeight: '700', color: 'white', fontSize: 16 }}>
              Capture
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
