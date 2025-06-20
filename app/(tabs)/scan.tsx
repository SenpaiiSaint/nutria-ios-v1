import { Ionicons } from '@expo/vector-icons'
import { useCameraPermissions } from 'expo-camera'
import { useRef, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button, Text, XStack, YStack } from 'tamagui'
import { runOCR } from '../../lib/ocr'
import { usePantryStore } from '../../store/usePantryStore'

// React Native compatible UUID generator
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

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
          <XStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <YStack>
              <Text fontSize="$8" fontWeight="800" color="#1e293b">
                Scan Receipt
              </Text>
              <Text fontSize="$3" color="#64748b" style={{ marginTop: 4 }}>
                Camera access required
              </Text>
            </YStack>
            <View style={{
              backgroundColor: '#22c55e',
              borderRadius: 20,
              padding: 8,
            }}>
              <Ionicons name="camera" size={24} color="white" />
            </View>
          </XStack>
        </View>

        {/* Permission Request */}
        <YStack flex={1} style={{ justifyContent: 'center', alignItems: 'center', padding: 24 }} space="$6">
          <View style={{
            backgroundColor: '#f1f5f9',
            borderRadius: 40,
            padding: 20,
          }}>
            <Ionicons name="camera-outline" size={48} color="#94a3b8" />
          </View>
          
          <YStack style={{ alignItems: 'center' }} space="$3">
            <Text fontSize="$6" fontWeight="600" color="#1e293b" style={{ textAlign: 'center' }}>
              Camera Permission Required
            </Text>
            <Text fontSize="$3" color="#64748b" style={{ textAlign: 'center', lineHeight: 20 }}>
              We need camera access to scan receipts and add items to your pantry
            </Text>
          </YStack>

          <Button
            size="$5"
            bg="#22c55e"
            borderColor="#22c55e"
            style={{ borderRadius: 12, paddingVertical: 16, paddingHorizontal: 32 }}
            onPress={requestPermission}
            pressStyle={{
              bg: '#16a34a',
              scale: 0.98,
            }}
            animation="quick"
          >
            <XStack space="$2" style={{ alignItems: 'center' }}>
              <Ionicons name="camera" size={20} color="white" />
              <Text fontWeight="600" color="white" fontSize="$4">
                Grant Permission
              </Text>
            </XStack>
          </Button>
        </YStack>
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
        id: generateUUID(),
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
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        paddingTop: 60, 
        paddingBottom: 20, 
        paddingHorizontal: 20,
      }}>
        <XStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <YStack>
            <Text fontSize="$8" fontWeight="800" color="white">
              Scan Receipt
            </Text>
            <Text fontSize="$3" color="rgba(255,255,255,0.7)" style={{ marginTop: 4 }}>
              Position receipt in frame
            </Text>
          </YStack>
          <View style={{
            backgroundColor: '#22c55e',
            borderRadius: 20,
            padding: 8,
          }}>
            <Ionicons name="camera" size={24} color="white" />
          </View>
        </XStack>
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
          <YStack style={{ alignItems: 'center' }} space="$3">
            <Ionicons name="receipt-outline" size={48} color="#22c55e" />
            <Text color="white" fontSize="$4" fontWeight="600">
              Camera Preview
            </Text>
            <Text color="rgba(255,255,255,0.7)" fontSize="$2" style={{ textAlign: 'center' }}>
              Camera component temporarily disabled
            </Text>
          </YStack>
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
          <YStack style={{ alignItems: 'center' }} space="$2">
            <ActivityIndicator size="large" color="#22c55e" />
            <Text color="white" fontSize="$3" fontWeight="500">
              Processing receipt...
            </Text>
          </YStack>
        </View>
      ) : (
        <View style={{
          position: 'absolute',
          bottom: 40,
          alignSelf: 'center',
          paddingHorizontal: 20,
        }}>
          <Button
            size="$6"
            bg="#22c55e"
            borderColor="#22c55e"
            style={{ 
              borderRadius: 50, 
              paddingVertical: 20, 
              paddingHorizontal: 40,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
            onPress={handleSnap}
            pressStyle={{
              bg: '#16a34a',
              scale: 0.95,
            }}
            animation="quick"
          >
            <XStack space="$2" style={{ alignItems: 'center' }}>
              <Ionicons name="camera" size={24} color="white" />
              <Text fontWeight="700" color="white" fontSize="$4">
                Capture
              </Text>
            </XStack>
          </Button>
        </View>
      )}
    </View>
  )
}
