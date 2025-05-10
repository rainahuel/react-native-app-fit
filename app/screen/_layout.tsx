// app/screen/_layout.tsx
import { Stack } from 'expo-router';
import Colors from '../../constants/Colors';

export default function ScreenLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // Importante: asegurarnos de que estas opciones no están sobrescribiendo
        // las configuraciones de los layouts anidados
        headerBackVisible: true, // Añadimos esto para garantizar la visibilidad del botón de retroceso
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      {/* No necesitamos definir pantallas específicas aquí */}
    </Stack>
  );
}