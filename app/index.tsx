/* apps/mobile/app/index.tsx */
import { Ionicons } from '@expo/vector-icons';
import { useAssets } from 'expo-asset';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { Button, Text, View, XStack, YStack } from 'tamagui';

export default function Landing() {
  const router = useRouter();
  const [assets] = useAssets([require('../assets/images/home-bg.jpg')]);

  return (
    <View flex={1}>
      {assets ? (
        <Image
          source={assets[0]}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          contentFit="cover"
        />
      ) : (
        <View
          flex={1}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      )}
      {assets && (
        <View
          flex={1}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
          p="$6"
        >
          <YStack space="$6" style={{ alignItems: 'center', maxWidth: 320 }}>
            {/* App Icon */}
            <View
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                borderRadius: 48,
                padding: 16,
                marginBottom: 8,
              }}
            >
              <Ionicons name="leaf" size={48} color="#22c55e" />
            </View>

            {/* Title */}
            <YStack space="$3" style={{ alignItems: 'center' }}>
              <Text
                color="white"
                fontSize="$10"
                fontWeight="900"
                style={{ textAlign: 'center', letterSpacing: 1 }}
              >
                NutriTrack AI
              </Text>

              <Text
                color="rgba(255,255,255,0.9)"
                fontSize="$5"
                style={{ textAlign: 'center', lineHeight: 24, fontWeight: '400' }}
              >
                Scan receipts, track macros, cut food waste.
              </Text>
            </YStack>

            {/* Features */}
            <YStack space="$3" width="100%">
              <XStack space="$3" style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#22c55e', borderRadius: 20, padding: 8 }}>
                  <Ionicons name="camera" size={16} color="white" />
                </View>
                <Text color="rgba(255,255,255,0.8)" fontSize="$3">
                  Smart receipt scanning with AI
                </Text>
              </XStack>
              
              <XStack space="$3" style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#22c55e', borderRadius: 20, padding: 8 }}>
                  <Ionicons name="analytics" size={16} color="white" />
                </View>
                <Text color="rgba(255,255,255,0.8)" fontSize="$3">
                  Track nutrition and macros
                </Text>
              </XStack>
              
              <XStack space="$3" style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#22c55e', borderRadius: 20, padding: 8 }}>
                  <Ionicons name="leaf" size={16} color="white" />
                </View>
                <Text color="rgba(255,255,255,0.8)" fontSize="$3">
                  Reduce food waste
                </Text>
              </XStack>
            </YStack>

            {/* CTA Button */}
            <Button
              size="$5"
              bg="#22c55e"
              borderColor="#22c55e"
              borderRadius="$6"
              paddingHorizontal="$6"
              paddingVertical="$4"
              onPress={() => router.replace('(tabs)/planner')}
              pressStyle={{
                bg: '#16a34a',
                scale: 0.98,
              }}
              animation="quick"
            >
              <XStack space="$2" style={{ alignItems: 'center' }}>
                <Ionicons name="arrow-forward" size={20} color="white" />
                <Text fontWeight="700" color="white" fontSize="$4">
                  Get Started
                </Text>
              </XStack>
            </Button>
          </YStack>
        </View>
      )}
    </View>
  );
}
