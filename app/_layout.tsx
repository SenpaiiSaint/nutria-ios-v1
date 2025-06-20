/* apps/mobile/app/_layout.tsx */
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import PantryInit from '../components/pantryInit';
import { config } from '../tamagui.config';

export default function Root() {
  return (
    <TamaguiProvider config={config}>
      <PantryInit />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Landing page (index) */}
        <Stack.Screen name="index" />

        {/* Main tab group */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </TamaguiProvider>
  );
}
