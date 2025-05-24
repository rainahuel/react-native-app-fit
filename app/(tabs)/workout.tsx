// app/(tabs)/workout.tsx
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Clipboard
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";
import methodsConfig from "../../data/workout/methods-config";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import workoutService from "../../services/workoutService";
import { useRefreshContext, RefreshableDataType } from '../../context/RefreshContext';
import { Ionicons } from '@expo/vector-icons';

function WorkoutScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { triggerMultipleRefresh } = useRefreshContext();
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
    // Log detailed information for debugging
    console.log(`Generating routine for: Method=${method}, Goal=${goal}, Level=${level}, Days=${daysPerWeek}`);
    console.log(`Method config:`, methodsConfig[method]);

    // Generar rutina basada en las selecciones del usuario
    const source = methodsConfig[method].data;

    if (!source) {
      console.error(`No data found for method: ${method}`);
      setRoutine([]);
      Alert.alert("Error", "No routine data available for this method.");
      return;
    }

    // Log structure of source data for debugging
    console.log(`Source data keys:`, Object.keys(source));
    if (source[goal]) {
      console.log(`Goal data keys:`, Object.keys(source[goal]));
      if (source[goal][level]) {
        console.log(`Level data keys:`, Object.keys(source[goal][level]));
      }
    }

    // For HIIT method, handle differently
    if (method === 'hiit') {
      try {
        const routineSet = source[goal]?.[level]?.[daysPerWeek];

        if (routineSet) {
          console.log("HIIT routine found!");
          setRoutine(routineSet);

          // Si el usuario está autenticado, preguntar si quiere guardar la rutina
          if (isAuthenticated) {
            Alert.alert(
              "HIIT Routine Generated",
              "Do you want to save this HIIT workout plan to your profile?",
              [
                { text: "Not Now", style: "cancel" },
                { text: "Save", onPress: saveWorkoutPlan }
              ]
            );
          } else {
            // Si no está autenticado, mostrar alerta de éxito y ofrecer iniciar sesión
            Alert.alert(
              "HIIT Routine Generated",
              "Create an account to save this HIIT workout plan and track your progress.",
              [
                { text: "Maybe Later", style: "cancel" },
                { text: "Sign Up", onPress: () => setShowLoginModal(true) }
              ]
            );
          }
        } else {
          console.warn("No HIIT routine found for selected options");

          // Provide default HIIT routine when specific one not found
          const defaultHiitRoutine = [
            {
              day: "Day 1",
              focus: "HIIT Cardio",
              description: "High-intensity interval training session focusing on cardiovascular fitness.",
              details: {
                intervals: "8-12",
                work: "30 seconds at 90% effort",
                rest: "90 seconds active recovery",
                totalTime: "20-30 minutes"
              }
            },
            {
              day: "Day 2",
              focus: "Recovery",
              description: "Active recovery or rest day."
            },
            {
              day: "Day 3",
              focus: "HIIT Cardio",
              description: "High-intensity interval training with different exercise selection.",
              details: {
                intervals: "8-12",
                work: "30 seconds at 90% effort",
                rest: "90 seconds active recovery",
                totalTime: "20-30 minutes"
              }
            }
          ];

          setRoutine(defaultHiitRoutine);

          Alert.alert(
            "Default HIIT Routine",
            "We couldn't find a specific routine for your selections, so we've generated a standard HIIT protocol.",
            [
              { text: "OK" }
            ]
          );
        }
      } catch (error) {
        console.error("Error generating HIIT routine:", error);
        setRoutine([]);
        Alert.alert("Error", "Failed to generate HIIT routine.");
      }
    } else {
      // Normal weight training routine
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
    }
  };

  const saveWorkoutPlan = async () => {
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      return;
    }

    try {
      setIsSaving(true);

      // Crear objeto con los datos del plan, incluyendo la rutina completa
      const workoutPlanData = {
        methodKey: method,
        methodName: methodsConfig[method].name,
        goal: goal,
        level: level,
        daysPerWeek: parseInt(daysPerWeek),
        totalDays: parseInt(daysPerWeek) * 4, // Suponiendo un plan de 4 semanas inicialmente
        routineData: routine // Guardamos la rutina completa
      };

      console.log("Saving workout plan data:", workoutPlanData);

      // Guardar en el backend
      const savedPlan = await workoutService.createWorkoutPlan(workoutPlanData);
      console.log("Plan saved successfully:", savedPlan);

      // Trigger refresh to update UI in other screens
      triggerMultipleRefresh(['workoutPlans', 'userProfile']);

      setIsSaving(false);

      if (savedPlan) {
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
      } else {
        throw new Error("Failed to save workout plan");
      }
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

  const copyRoutineToClipboard = async () => {
    try {
      let routineText = '';

      // Título de la rutina
      routineText += `🏋️ ${methodsConfig[method].name.toUpperCase()} ROUTINE\n`;
      routineText += `Goal: ${goal.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}\n`;
      routineText += `Level: ${level.charAt(0).toUpperCase() + level.slice(1)}\n`;
      routineText += `Days per week: ${daysPerWeek}\n`;
      routineText += `\n${'='.repeat(40)}\n\n`;

      // Verificar si es rutina HIIT/Tabata o regular
      const hasBlocks = routine.some(day => day.blocks && day.blocks.length > 0);

      if (method === 'hiit' || method === 'tabata' || hasBlocks) {
        // Formato para rutinas HIIT/Tabata
        routine.forEach((day, index) => {
          routineText += `📅 ${day.day || `Day ${index + 1}`}\n`;
          routineText += `Focus: ${day.focus || 'Interval Training'}\n`;

          if (day.description) {
            routineText += `${day.description}\n`;
          }

          // Bloques si existen
          if (day.blocks && day.blocks.length > 0) {
            day.blocks.forEach((block, blockIndex) => {
              if (block.name) {
                routineText += `\n🔹 ${block.name}\n`;
              }

              if (block.exercises && block.exercises.map) {
                block.exercises.forEach((ex) => {
                  routineText += `  • ${ex.name}`;
                  if (ex.rounds) routineText += ` - Rounds: ${ex.rounds}`;
                  if (ex.work) routineText += ` - Work: ${ex.work}`;
                  if (ex.rest) routineText += ` - Rest: ${ex.rest}`;
                  routineText += `\n`;
                });
              }
            });
          }

          // Ejercicios estándar si no hay bloques
          if (!day.blocks && day.exercises && day.exercises.map) {
            day.exercises.forEach((ex) => {
              routineText += `  • ${ex.name}`;
              if (ex.sets) routineText += ` - Sets: ${ex.sets}`;
              if (ex.reps) routineText += ` - Reps: ${ex.reps}`;
              if (ex.duration) routineText += ` - Duration: ${ex.duration}`;
              if (ex.rest) routineText += ` - Rest: ${ex.rest}`;
              if (ex.intensity) routineText += ` - Intensity: ${ex.intensity}`;
              routineText += `\n`;
            });
          }

          // Detalles HIIT genérico
          if (day.details) {
            routineText += `\n📊 Workout Details:\n`;
            if (day.details.intervals) routineText += `  • Intervals: ${day.details.intervals}\n`;
            if (day.details.work) routineText += `  • Work: ${day.details.work}\n`;
            if (day.details.rest) routineText += `  • Rest: ${day.details.rest}\n`;
            if (day.details.totalTime) routineText += `  • Total Time: ${day.details.totalTime}\n`;
          }

          routineText += `\n${'-'.repeat(30)}\n\n`;
        });
      } else {
        // Formato para rutinas de pesas regulares
        routine.forEach((day, index) => {
          routineText += `📅 ${day.day}\n`;
          routineText += `Focus: ${day.focus}\n\n`;

          if (day.exercises && day.exercises.length > 0) {
            day.exercises.forEach((ex, i) => {
              routineText += `${i + 1}. ${ex.name}\n`;
              routineText += `   Sets: ${ex.sets} | Reps: ${ex.reps} | Rest: ${ex.rest}\n\n`;
            });
          }

          routineText += `${'-'.repeat(30)}\n\n`;
        });
      }

      // Footer
      routineText += `\n🎯 Generated by Built by Rain\n`;
      routineText += `Create your account to save and track your progress!`;

      // Copiar al clipboard
      Clipboard.setString(routineText);

      Alert.alert(
        "Routine Copied! 📋",
        "Your workout routine has been copied to the clipboard. You can now paste it anywhere!",
        [{ text: "OK" }]
      );

    } catch (error) {
      console.error('Error copying routine:', error);
      Alert.alert("Error", "Failed to copy routine. Please try again.");
    }
  };

  // Corregir el problema de texto blanco sobre fondo blanco
  const getPickerItemColor = () => {
    // En iOS y Android, usamos el color del tema
    if (Platform.OS === 'ios') {
      return Colors.text;
    }
    if (Platform.OS === 'android') {
      return '#000000';
    }
    // En web u otras plataformas, podemos usar otro color si es necesario
    return Colors.text;
  };

  const renderRoutine = () => {
    if (routine.length === 0) return null;

    // Detectar si la rutina tiene estructura de blocks (HIIT/Tabata)
    const hasBlocks = routine.some(day => day.blocks && day.blocks.length > 0);

    // Render HIIT/Tabata routines
    if (method === 'hiit' || method === 'tabata' || hasBlocks) {
      return (
        <View style={styles.routineContainer}>
          <Text style={styles.subtitle}>Your {method.toUpperCase()} Routine</Text>

          {routine.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayTitle}>{day.day || `Day ${index + 1}`}</Text>
                <Text style={styles.dayFocus}>{day.focus || 'Interval Training'}</Text>
              </View>

              {day.description && (
                <View style={styles.exerciseRow}>
                  <Text style={styles.exerciseDescription}>{day.description}</Text>
                </View>
              )}

              {/* Renderizar bloques si existen */}
              {day.blocks && day.blocks.length > 0 && (
                day.blocks.map((block, blockIndex) => (
                  <View key={`block-${blockIndex}`}>
                    {block.name && (
                      <View style={styles.blockHeader}>
                        <Text style={styles.blockName}>{block.name}</Text>
                      </View>
                    )}

                    {block.exercises && block.exercises.map && (
                      block.exercises.map((ex, exIndex) => (
                        <View key={`block-ex-${exIndex}`} style={styles.exerciseRow}>
                          <Text style={styles.exerciseName}>{ex.name}</Text>
                          <View style={styles.exerciseDetails}>
                            {ex.rounds && <Text style={styles.exerciseDetail}>Rounds: {ex.rounds}</Text>}
                            {ex.work && <Text style={styles.exerciseDetail}>Work: {ex.work}</Text>}
                            {ex.rest && <Text style={styles.exerciseDetail}>Rest: {ex.rest}</Text>}
                          </View>
                        </View>
                      ))
                    )}
                  </View>
                ))
              )}

              {/* Renderizar ejercicios estándar si no hay bloques pero hay ejercicios */}
              {!day.blocks && day.exercises && day.exercises.map && (
                day.exercises.map((ex, i) => (
                  <View key={i} style={styles.exerciseRow}>
                    <Text style={styles.exerciseName}>{ex.name}</Text>
                    <View style={styles.exerciseDetails}>
                      {ex.sets && <Text style={styles.exerciseDetail}>Sets: {ex.sets}</Text>}
                      {ex.reps && <Text style={styles.exerciseDetail}>Reps: {ex.reps}</Text>}
                      {ex.duration && <Text style={styles.exerciseDetail}>Duration: {ex.duration}</Text>}
                      {ex.rest && <Text style={styles.exerciseDetail}>Rest: {ex.rest}</Text>}
                      {ex.intensity && <Text style={styles.exerciseDetail}>Intensity: {ex.intensity}</Text>}
                    </View>
                  </View>
                ))
              )}

              {/* Renderizar detalles para HIIT genérico */}
              {day.details && (
                <View style={styles.exerciseRow}>
                  <View style={styles.hiitDetailsContainer}>
                    {day.details.intervals && (
                      <Text style={styles.hiitDetailItem}>
                        <Text style={styles.hiitDetailLabel}>Intervals:</Text> {day.details.intervals}
                      </Text>
                    )}
                    {day.details.work && (
                      <Text style={styles.hiitDetailItem}>
                        <Text style={styles.hiitDetailLabel}>Work:</Text> {day.details.work}
                      </Text>
                    )}
                    {day.details.rest && (
                      <Text style={styles.hiitDetailItem}>
                        <Text style={styles.hiitDetailLabel}>Rest:</Text> {day.details.rest}
                      </Text>
                    )}
                    {day.details.totalTime && (
                      <Text style={styles.hiitDetailItem}>
                        <Text style={styles.hiitDetailLabel}>Total Time:</Text> {day.details.totalTime}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Botones de acción */}
          <View style={styles.routineActionsContainer}>
            {/* Botón Copiar */}
            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyRoutineToClipboard}
            >
              <Ionicons name="copy-outline" size={18} color={Colors.white} />
              <Text style={styles.copyButtonText}>Copy Routine</Text>
            </TouchableOpacity>

            {/* Botón Guardar */}
            {isAuthenticated ? (
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveWorkoutPlan}
                disabled={isSaving}
              >
                <Ionicons name="save-outline" size={18} color={Colors.white} />
                <Text style={styles.saveButtonText}>
                  {isSaving ? "Saving..." : "Save to Profile"}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setShowLoginModal(true)}
              >
                <Ionicons name="save-outline" size={18} color={Colors.white} />
                <Text style={styles.saveButtonText}>Save to Profile</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }

    // Regular weight training routine
    return (
      <View style={styles.routineContainer}>
        <Text style={styles.subtitle}>Your Routine</Text>
        {routine.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>{day.day}</Text>
              <Text style={styles.dayFocus}>{day.focus}</Text>
            </View>
            {day.exercises && day.exercises.map((ex, i) => (
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

        {/* Botones de acción */}
        <View style={styles.routineActionsContainer}>
          {/* Botón Copiar */}
          <TouchableOpacity
            style={styles.copyButton}
            onPress={copyRoutineToClipboard}
          >
            <Ionicons name="copy-outline" size={18} color={Colors.white} />
            <Text style={styles.copyButtonText}>Copy Routine</Text>
          </TouchableOpacity>

          {/* Botón Guardar */}
          {isAuthenticated ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveWorkoutPlan}
              disabled={isSaving}
            >
              <Ionicons name="save-outline" size={18} color={Colors.white} />
              <Text style={styles.saveButtonText}>
                {isSaving ? "Saving..." : "Save to Profile"}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setShowLoginModal(true)}
            >
              <Ionicons name="save-outline" size={18} color={Colors.white} />
              <Text style={styles.saveButtonText}>Save to Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

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
                dropdownIconColor={Colors.text}
                itemStyle={styles.pickerItem}
              >
                {methodKeys.map((key) => (
                  <Picker.Item
                    key={key}
                    label={methodsConfig[key].name}
                    value={key}
                    color={getPickerItemColor()}
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
                dropdownIconColor={Colors.text}
                itemStyle={styles.pickerItem}
              >
                {methodsConfig[method].goals.map((g) => (
                  <Picker.Item
                    key={g}
                    label={g.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    value={g}
                    color={getPickerItemColor()}
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
                dropdownIconColor={Colors.text}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item
                  label="Beginner"
                  value="beginner"
                  color={getPickerItemColor()}
                />
                <Picker.Item
                  label="Intermediate"
                  value="intermediate"
                  color={getPickerItemColor()}
                />
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
                dropdownIconColor={Colors.text}
                itemStyle={styles.pickerItem}
              >
                {methodsConfig[method].daysPerWeek.map((num) => (
                  <Picker.Item
                    key={num}
                    label={`${num} Days`}
                    value={num.toString()}
                    color={getPickerItemColor()}
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

        {renderRoutine()}
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
    flex: 1, 
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16, 
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center', 
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
  exerciseDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 10,
    lineHeight: 20,
  },
  hiitDetailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  hiitDetailItem: {
    fontSize: 14,
    color: Colors.white,
    marginBottom: 6,
  },
  hiitDetailLabel: {
    fontWeight: 'bold',
    color: Colors.primary,
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
    marginBottom: 4,
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
  blockHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    paddingHorizontal: 12,
  },
  blockName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  routineActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  copyButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  copyButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default WorkoutScreen;