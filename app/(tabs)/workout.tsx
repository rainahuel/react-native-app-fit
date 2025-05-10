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
  TouchableOpacity,
  ActivityIndicator,
  Modal
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";
import methodsConfig from "../../data/workout/methods-config";
import { useAuth } from "../../context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "expo-router";

function WorkoutScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const methodKeys = Object.keys(methodsConfig);
  const [method, setMethod] = useState(methodKeys[0]);
  const [goal, setGoal] = useState(methodsConfig[method].defaultGoal);
  const [level, setLevel] = useState("beginner");
  const [daysPerWeek, setDaysPerWeek] = useState(methodsConfig[method].defaultDays);
  const [routine, setRoutine] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
      
      // Si el usuario está autenticado, preguntar si quiere guardar la rutina
      if (isAuthenticated) {
        Alert.alert(
          "Routine Generated",
          "Do you want to save this workout plan to your profile?",
          [
            { text: "Not Now", style: "cancel" },
            { text: "Save", onPress: saveWorkoutPlan }
          ]
        );
      } else {
        // Si no está autenticado, mostrar alerta de éxito y ofrecer iniciar sesión
        Alert.alert(
          "Routine Generated", 
          "Create an account to save this workout plan and track your progress.",
          [
            { text: "Maybe Later", style: "cancel" },
            { text: "Sign Up", onPress: () => setShowLoginModal(true) }
          ]
        );
      }
    } else {
      setRoutine([]);
      Alert.alert("Error", "No routine found for selected options.");
    }
  };

  const saveWorkoutPlan = async () => {
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      return;
    }

    try {
      setIsSaving(true);

      // Crear objeto con los datos del plan
      const workoutPlanData = {
        userId: user.uid,
        createdAt: serverTimestamp(),
        startDate: serverTimestamp(),
        methodKey: method,
        methodName: methodsConfig[method].name,
        goal: goal,
        level: level,
        daysPerWeek: parseInt(daysPerWeek),
        progress: {
          daysCompleted: 0,
          totalDays: parseInt(daysPerWeek) * 4 // Suponiendo un plan de 4 semanas inicialmente
        },
        status: "active"
      };

      // Guardar en Firestore
      const docRef = await addDoc(collection(db, 'workoutPlans'), workoutPlanData);

      setIsSaving(false);
      Alert.alert(
        "Success",
        "Your workout plan has been saved to your profile.",
        [
          { 
            text: "View in Profile", 
            onPress: () => router.push('/(tabs)/profile')
          },
          { text: "OK" }
        ]
      );
    } catch (error) {
      console.error("Error saving workout plan:", error);
      setIsSaving(false);
      Alert.alert("Error", "Failed to save your workout plan. Please try again.");
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    router.push('/(auth)/login');
  };

  const handleRegisterRedirect = () => {
    setShowLoginModal(false);
    router.push('/(auth)/register');
  };

  // Modal para iniciar sesión o registrarse
  const renderLoginModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showLoginModal}
      onRequestClose={() => setShowLoginModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.modalCloseButton}
            onPress={() => setShowLoginModal(false)}
          >
            <Text style={{ color: Colors.white, fontSize: 24 }}>×</Text>
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>Save Your Workout Plan</Text>
          
          <Text style={styles.modalText}>
            Create an account or sign in to save your workout plan and track your progress over time.
          </Text>
          
          <TouchableOpacity 
            style={styles.modalPrimaryButton}
            onPress={handleLoginRedirect}
          >
            <Text style={styles.modalPrimaryButtonText}>Log In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.modalSecondaryButton}
            onPress={handleRegisterRedirect}
          >
            <Text style={styles.modalSecondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setShowLoginModal(false)}
          >
            <Text style={styles.modalCancelText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderLoginModal()}
      
      {isSaving && (
        <View style={styles.savingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.savingText}>Saving your workout plan...</Text>
        </View>
      )}
      
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
            
            {isAuthenticated ? (
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={saveWorkoutPlan}
                disabled={isSaving}
              >
                <Text style={styles.saveButtonText}>
                  {isSaving ? "Saving..." : "Save to Profile"}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => setShowLoginModal(true)}
              >
                <Text style={styles.saveButtonText}>Save to Profile</Text>
              </TouchableOpacity>
            )}
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
    ...(Platform.OS === 'ios' && {
      height: 100,
      justifyContent: 'center',
    }),
  },
  picker: {
    color: Colors.text,
    height: Platform.OS === 'ios' ? 100 : 100,
    width: '100%',
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
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
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
  // Estilos para el modal de login
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalPrimaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalPrimaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalSecondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  modalSecondaryButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  modalCancelText: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  // Overlay para mostrar cuando se está guardando
  savingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  savingText: {
    color: Colors.white,
    fontSize: 16,
    marginTop: 12,
  },
});

export default WorkoutScreen;