// app/screen/workouts/_layout.tsx (Solución actualizada)
import { Stack, useNavigation } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

export default function WorkoutsLayout() {
  // Obtener la navegación para usar en los handlers personalizados
  const navigation = useNavigation();

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
        // Añadir botón personalizado de retroceso
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="workout-details"
        options={{
          // Cambiar a headerShown: true para mostrar el encabezado
          headerShown: true,
          title: "Workout Details"
        }}
      />
      {/* Puedes añadir más pantallas aquí si es necesario */}
    </Stack>
  );
}