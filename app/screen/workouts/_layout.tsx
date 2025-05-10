// app/screen/workouts/_layout.tsx
import { Stack } from 'expo-router';
import Colors from '../../../constants/Colors';

export default function WorkoutsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerShadowVisible: false,
        headerTintColor: Colors.white,
        headerBackTitleVisible: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen
        name="workout-details"
        options={{
          headerShown: false, // Ocultamos el header porque lo implementamos manualmente
        }}
      />
    </Stack>
  );
}