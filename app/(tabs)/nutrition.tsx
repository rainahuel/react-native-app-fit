// app/(tabs)/nutrition.tsx
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function NutritionScreen() {
  const router = useRouter();

  // Cambiamos la forma de navegación para usar navigate en lugar de push
  // Esto puede ayudar con problemas de navegación en algunos casos
  const navigateToTool = (route: string) => {
    router.navigate(`/screen/nutrition/${route}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition Tools</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigateToTool('nutrition-meals')}
      >
        <Text style={styles.buttonText}>🍽️ Generate Meal Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigateToTool('calories-calculator')}
      >
        <Text style={styles.buttonText}>📊 Calorie Calculator</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigateToTool('macro-calculator')}
      >
        <Text style={styles.buttonText}>🥩 Macro Calculator</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});