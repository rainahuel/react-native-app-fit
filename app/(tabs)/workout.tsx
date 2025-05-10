// app/(tabs)/workout.tsx
import React, { useEffect, useState } from "react";
import { 
  Alert, 
  Button, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  Platform,
  TouchableOpacity
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";
import methodsConfig from "../../data/workout/methods-config";

function WorkoutScreen() {
  const methodKeys = Object.keys(methodsConfig);
  const [method, setMethod] = useState(methodKeys[0]);
  const [goal, setGoal] = useState(methodsConfig[method].defaultGoal);
  const [level, setLevel] = useState("beginner");
  const [daysPerWeek, setDaysPerWeek] = useState(methodsConfig[method].defaultDays);
  const [routine, setRoutine] = useState<any[]>([]);

  useEffect(() => {
    setGoal(methodsConfig[method].defaultGoal);
    setDaysPerWeek(methodsConfig[method].defaultDays);
  }, [method]);

  const recommendRoutine = () => {
    setMethod("helms");
    setGoal("maintainMuscle");
    setLevel("beginner");
    setDaysPerWeek("4");
    Alert.alert("Recommendation", "Start with Eric Helms - Beginner - 4 Days.");
  };

  const generateRoutine = () => {
    // Generar rutina basada en las selecciones del usuario
    const source = methodsConfig[method].data;
    const routineSet = source?.[goal]?.[level]?.[daysPerWeek];

    if (routineSet) {
      setRoutine(routineSet);
      Alert.alert("Success", "Routine generated successfully.");
    } else {
      setRoutine([]);
      Alert.alert("Error", "No routine found for selected options.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Generate Your Training Plan</Text>
          <Text style={styles.subtitle}>Customize your workout routine based on your goals and schedule</Text>
        </View>

        <TouchableOpacity 
          style={styles.recommendButton} 
          onPress={recommendRoutine}
        >
          <Text style={styles.recommendButtonText}>📊 Recommend Routine</Text>
        </TouchableOpacity>

        <View style={styles.formSection}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Training Method</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={method}
                onValueChange={(itemValue) => setMethod(itemValue)}
                style={styles.picker}
                dropdownIconColor={Platform.OS === 'web' ? Colors.white : undefined}
                itemStyle={styles.pickerItem}
              >
                {methodKeys.map((key) => (
                  <Picker.Item 
                    key={key} 
                    label={methodsConfig[key].name} 
                    value={key}
                    color={Colors.text} 
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Training Goal</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={goal}
                onValueChange={(itemValue) => setGoal(itemValue)}
                style={styles.picker}
                dropdownIconColor={Platform.OS === 'web' ? Colors.white : undefined}
                itemStyle={styles.pickerItem}
              >
                {methodsConfig[method].goals.map((g) => (
                  <Picker.Item 
                    key={g} 
                    label={g.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} 
                    value={g}
                    color={Colors.text}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Experience Level</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={level}
                onValueChange={(itemValue) => setLevel(itemValue)}
                style={styles.picker}
                dropdownIconColor={Platform.OS === 'web' ? Colors.white : undefined}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Beginner" value="beginner" color={Colors.text} />
                <Picker.Item label="Intermediate" value="intermediate" color={Colors.text} />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Days per Week</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={daysPerWeek}
                onValueChange={(itemValue) => setDaysPerWeek(itemValue)}
                style={styles.picker}
                dropdownIconColor={Platform.OS === 'web' ? Colors.white : undefined}
                itemStyle={styles.pickerItem}
              >
                {methodsConfig[method].daysPerWeek.map((num) => (
                  <Picker.Item 
                    key={num} 
                    label={`${num} Days`} 
                    value={num.toString()}
                    color={Colors.text} 
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.generateButton} 
          onPress={generateRoutine}
        >
          <Text style={styles.generateButtonText}>Generate Routine</Text>
        </TouchableOpacity>

        {routine.length > 0 && (
          <View style={styles.routineContainer}>
            <Text style={styles.subtitle}>Your Routine</Text>
            {routine.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayTitle}>{day.day}</Text>
                  <Text style={styles.dayFocus}>{day.focus}</Text>
                </View>
                {day.exercises.map((ex, i) => (
                  <View key={i} style={styles.exerciseRow}>
                    <Text style={styles.exerciseName}>{ex.name}</Text>
                    <View style={styles.exerciseDetails}>
                      <Text style={styles.exerciseDetail}>Sets: {ex.sets}</Text>
                      <Text style={styles.exerciseDetail}>Reps: {ex.reps}</Text>
                      <Text style={styles.exerciseDetail}>Rest: {ex.rest}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },
  recommendButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  recommendButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  formSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    color: Colors.text,
    marginBottom: 8,
    fontWeight: "600",
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    // Reducir altura para iOS
    ...(Platform.OS === 'ios' && {
      height: 100,
      justifyContent: 'center',
    }),
  },
  picker: {
    color: Colors.text,
    // Ajustar altura según plataforma
    height: Platform.OS === 'ios' ? 100 : 100,
    width: '100%',
    // Para iOS, ajustar el posicionamiento
    ...(Platform.OS === 'ios' && {
      marginTop: -8,
      marginBottom: -8,
    }),
  },
  pickerItem: {
    color: Colors.text,
    height: Platform.OS === 'ios' ? 100 : 100,
  },
  generateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  generateButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  routineContainer: {
    marginTop: 10,
  },
  dayContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  dayHeader: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  dayFocus: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  exerciseRow: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
    marginBottom: 4,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  exerciseDetail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
});

export default WorkoutScreen;