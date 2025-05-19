// app/(tabs)/index.tsx
import { useRouter } from 'expo-router';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function HomeScreen() {
  const router = useRouter();

  const handleGoToWorkout = () => {
    router.push('/(tabs)/workout');
  };

  const handleGoToNutrition = () => {
    router.push('/(tabs)/nutrition');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Start your transformation</Text>

        <Text style={styles.subtitle}>
          Build muscle. Burn fat. Stay consistent.
        </Text>

        <Text style={styles.quote}>
          Simple tools. Real results.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleGoToWorkout}>
          <Text style={styles.buttonText}>🏋️‍♂️ Trainings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGoToNutrition}>
          <Text style={styles.buttonText}>🥗 Nutrition</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.youtube.com/@builtByRain')}
          >
            <Text style={styles.socialLink}>📺 @builtByRain</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  box: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: Colors.primary,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  quote: {
    color: Colors.textMuted,
    fontStyle: 'italic',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  socialLink: {
    color: Colors.white,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});