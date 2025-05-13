//app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { AuthProvider } from '../context/AuthContext';
import { RefreshProvider } from '../context/RefreshContext';

function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Built by Rain</Text>
        <Text style={styles.splashSubtext}>Train with purpose</Text>
      </View>
    );
  }

  return (
    <RefreshProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.text,
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: Colors.background },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="(auth)" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="screen" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="index" 
            options={{ headerShown: false }} 
          />
        </Stack>
      </AuthProvider>
    </RefreshProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  splashSubtext: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default RootLayout;