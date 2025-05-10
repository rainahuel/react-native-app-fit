// app/(auth)/_layout.tsx
import { Stack, useNavigation } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export default function AuthLayout() {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        // Ahora mostramos el encabezado
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
        contentStyle: { 
          backgroundColor: Colors.background 
        },
        // Configuramos el botón de retroceso personalizado
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen 
        name="register" 
        options={{
          title: "Create Account",
        }}
      />
      <Stack.Screen 
        name="forgot-password" 
        options={{
          title: "Reset Password",
        }}
      />
    </Stack>
  );
}