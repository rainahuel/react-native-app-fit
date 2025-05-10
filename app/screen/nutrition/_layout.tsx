// app/screen/nutrition/_layout.tsx
import { Stack, useNavigation } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

export default function NutritionScreenLayout() {
  // Obtenemos la navegación para poder usarla en los handlers personalizados
  const navigation = useNavigation();

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
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
        // Aquí está la clave: Agregamos un botón personalizado de retroceso
        // en lugar de depender del botón automático
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen 
        name="nutrition-meals" 
        options={{
          title: "Meal Planner",
        }}
      />
      <Stack.Screen 
        name="calories-calculator" 
        options={{
          title: "Calorie Calculator",
        }}
      />
      <Stack.Screen 
        name="macro-calculator" 
        options={{
          title: "Macro Calculator",
        }}
      />
      <Stack.Screen 
        name="macro-calculator-simple" 
        options={{
          title: "Simple Macro Calculator",
        }}
      />
    </Stack>
  );
}