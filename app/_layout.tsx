/* apps/mobile/app/_layout.tsx */
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider } from 'tamagui';
import MealsInit from '../components/mealsInit';
import PantryInit from '../components/pantryInit';
import { config } from '../tamagui.config';

export default function Root() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config}>
        <PantryInit />
        <MealsInit />
        <Stack screenOptions={{ headerShown: false }}>
          {/* Landing page (index) */}
          <Stack.Screen name="index" />

          {/* Main tab group */}
          <Stack.Screen name="(tabs)" />
        </Stack>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
