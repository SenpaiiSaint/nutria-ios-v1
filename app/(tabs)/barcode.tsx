import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid'
import { fetchProductByBarcode } from '../../lib/openfoodfacts'
import { usePantryStore } from '../../store/usePantryStore'
import { PantryItem } from '../../types'

export default function BarcodeScreen() {
  const [hasPerm, setPerm] = useState<boolean | null>(null)
  const [scanning, setScanning] = useState(false)
  const [cameraAvailable, setCameraAvailable] = useState(false)
  const addMany = usePantryStore((s) => s.addMany)

  const handleManualAdd = async () => {
    setScanning(true)
    
    // Simulate barcode scanning for demo purposes
    setTimeout(async () => {
      try {
        // Demo barcode - you can replace this with actual barcode detection
        const demoBarcode = '3017620422003' // Example: Nutella
        const info = await fetchProductByBarcode(demoBarcode)
        const item: PantryItem = {
          id: uuid.v4().toString(),
          name: info?.name || `Product ${demoBarcode}`,
          category: info?.category || '',
          macros: info?.macros || { protein: 0, carbs: 0, fat: 0 },
          quantity: 1,
          unit: '',
        }
        addMany([item])
      } catch (error) {
        console.error('Error adding product:', error)
      } finally {
        setScanning(false)
      }
    }, 2000)
  }

  useEffect(() => {
    // Check if camera is available
    const checkCamera = async () => {
      try {
        const { Camera } = await import('expo-camera')
        setCameraAvailable(true)
        const { status } = await Camera.requestCameraPermissionsAsync()
        setPerm(status === 'granted')
      } catch (error) {
        console.log('Camera not available:', error)
        setCameraAvailable(false)
        setPerm(false)
      }
    }
    
    checkCamera()
  }, [])

  if (hasPerm === null) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={{ marginTop: 16, color: '#64748b' }}>Checking camera availability…</Text>
      </View>
    )
  }

  if (hasPerm === false || !cameraAvailable) {
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
                Barcode Scanner
              </Text>
              <Text style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
                {!cameraAvailable ? 'Development build required' : 'Camera access required'}
              </Text>
            </View>
            <View style={{
              backgroundColor: '#22c55e',
              borderRadius: 20,
              padding: 8,
            }}>
              <Ionicons name="barcode" size={24} color="white" />
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
              {!cameraAvailable ? 'Development Build Required' : 'Camera Permission Required'}
            </Text>
            <Text style={{ fontSize: 16, color: '#64748b', textAlign: 'center', lineHeight: 24 }}>
              {!cameraAvailable 
                ? 'Full barcode scanning requires a development build. For now, you can test the product lookup functionality.'
                : 'We need camera access to scan barcodes and add products to your pantry'
              }
            </Text>
          </View>

          {cameraAvailable && (
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
              onPress={async () => {
                try {
                  const { Camera } = await import('expo-camera')
                  const { status } = await Camera.requestCameraPermissionsAsync()
                  setPerm(status === 'granted')
                } catch (error) {
                  console.log('Error requesting permission:', error)
                }
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="camera" size={20} color="white" />
              <Text style={{ fontWeight: '600', color: 'white', fontSize: 16 }}>
                Grant Permission
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              backgroundColor: '#22c55e',
              borderRadius: 12,
              paddingVertical: 16,
              paddingHorizontal: 32,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginTop: cameraAvailable ? 16 : 0,
            }}
            onPress={handleManualAdd}
            disabled={scanning}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle" size={20} color="white" />
            <Text style={{ fontWeight: '600', color: 'white', fontSize: 16 }}>
              {scanning ? 'Adding Product...' : 'Demo: Add Sample Product'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        paddingTop: 60, 
        paddingBottom: 20, 
        paddingHorizontal: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 28, fontWeight: '800', color: 'white' }}>
              Barcode Scanner
            </Text>
            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
              Development build required for full functionality
            </Text>
          </View>
          <View style={{
            backgroundColor: '#22c55e',
            borderRadius: 20,
            padding: 8,
          }}>
            <Ionicons name="barcode" size={24} color="white" />
          </View>
        </View>
      </View>

      {/* Demo Overlay */}
      <View style={styles.demoOverlay}>
        <View style={styles.demoContent}>
          <Ionicons name="information-circle" size={48} color="#22c55e" />
          <Text style={styles.demoTitle}>Development Build Required</Text>
          <Text style={styles.demoText}>
            Full barcode scanning requires a development build. For now, you can test the product lookup functionality.
          </Text>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={handleManualAdd}
            disabled={scanning}
          >
            <Ionicons name="add-circle" size={20} color="white" />
            <Text style={styles.demoButtonText}>
              {scanning ? 'Adding Product...' : 'Demo: Add Sample Product'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scanning Overlay */}
      {scanning && (
        <View style={styles.overlay}>
          <View style={styles.scanningContent}>
            <ActivityIndicator size="large" color="#22c55e" />
            <Text style={styles.scanningText}>Adding product…</Text>
          </View>
        </View>
      )}

      {/* Scan Frame */}
      <View style={styles.scanFrame}>
        <View style={styles.corner} />
        <View style={[styles.corner, styles.cornerTopRight]} />
        <View style={[styles.corner, styles.cornerBottomLeft]} />
        <View style={[styles.corner, styles.cornerBottomRight]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  demoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  demoContent: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22c55e',
    maxWidth: 300,
  },
  demoTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  demoText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  demoButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  demoButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningContent: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  scanningText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  scanFrame: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 250,
    height: 250,
    marginLeft: -125,
    marginTop: -125,
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#22c55e',
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 0,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopWidth: 0,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
}) 