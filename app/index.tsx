/* apps/mobile/app/index.tsx */
import { useAssets } from 'expo-asset';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { Button, Text, View } from 'tamagui';

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
          <ActivityIndicator />
        </View>
      )}
      {assets && (
        <View
          flex={1}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.45)',
          }}
          gap="$4"
          p="$6"
        >
          <Text
            color="white"
            fontSize="$9"
            style={{ fontWeight: '800', textAlign: 'center' }}
          >
            NutriTrack AI
          </Text>

          <Text
            color="white"
            fontSize="$8"
            style={{ textAlign: 'center', maxWidth: 300 }}
          >
            Scan receipts, track macros, cut food waste.
          </Text>

          <Button
            size="$4"
            bg="green"
            onPress={() => router.replace('(tabs)/scan')}
          >
            <Text fontWeight="bold" color="white">
              Get Started
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
}
