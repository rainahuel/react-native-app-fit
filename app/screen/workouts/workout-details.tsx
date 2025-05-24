// app/screen/workouts/workout-details.tsx
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Clipboard,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import Colors from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import workoutService from '../../../services/workoutService';
import methodsConfig from '../../../data/workout/methods-config';
import { useRefreshContext } from '@/context/RefreshContext';

export default function WorkoutDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id ? String(params.id) : '';
  const { user, isAuthenticated } = useAuth();
  const { triggerRefresh } = useRefreshContext();

  const [isLoading, setIsLoading] = useState(true);
  const [workoutPlan, setWorkoutPlan] = useState<any>(null);
  const [routine, setRoutine] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);


  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerExpanded, setIsTimerExpanded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);


  const [isHiitMode, setIsHiitMode] = useState(false);
  const [hiitCurrentPhase, setHiitCurrentPhase] = useState<'work' | 'rest' | 'finished'>('work');
  const [hiitCurrentRound, setHiitCurrentRound] = useState(1);
  const [hiitWorkTime, setHiitWorkTime] = useState(30); // segundos
  const [hiitRestTime, setHiitRestTime] = useState(10); // segundos
  const [hiitTotalRounds, setHiitTotalRounds] = useState(8);
  const [hiitPhaseTimeLeft, setHiitPhaseTimeLeft] = useState(30);


  // Agregar estas funciones dentro del componente
  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);

      if (isHiitMode) {
        // Timer HIIT
        timerRef.current = setInterval(() => {
          setHiitPhaseTimeLeft(prev => {
            if (prev <= 1) {
              // Cambiar de fase
              setHiitCurrentPhase(currentPhase => {
                if (currentPhase === 'work') {
                  // De work a rest
                  return 'rest';
                } else if (currentPhase === 'rest') {
                  // De rest a work (siguiente round)
                  setHiitCurrentRound(round => {
                    if (round >= hiitTotalRounds) {
                      // Terminado
                      setHiitCurrentPhase('finished');
                      setIsTimerRunning(false);
                      if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                      }
                      return round;
                    }
                    return round + 1;
                  });
                  return 'work';
                }
                return currentPhase;
              });

              // Reiniciar tiempo para la nueva fase
              return hiitCurrentPhase === 'work' ? hiitRestTime : hiitWorkTime;
            }
            return prev - 1;
          });

          // También incrementar el timer total
          setTimerSeconds(prev => prev + 1);
        }, 1000);
      } else {
        // Timer normal (como antes)
        timerRef.current = setInterval(() => {
          setTimerSeconds(prev => prev + 1);
        }, 1000);
      }
    }
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);

    if (isHiitMode) {
      setHiitCurrentPhase('work');
      setHiitCurrentRound(1);
      setHiitPhaseTimeLeft(hiitWorkTime);
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const toggleTimerMode = () => {
    resetTimer();
    setIsHiitMode(!isHiitMode);
    if (!isHiitMode) {
      // Cambiar a modo HIIT y sincronizar con la rutina
      const timings = initializeHiitTimer();
      if (timings) {
        Alert.alert(
          "HIIT Timer Synchronized! ⚡",
          `Timer set to:\n• ${timings.workTime}s work / ${timings.restTime}s rest\n• ${timings.totalRounds} rounds total\n\nBased on: ${timings.exerciseName}`,
          [{ text: "Let's Go!" }]
        );
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Componente del cronómetro flotante
  // REEMPLAZA toda tu función renderFloatingTimer() con esta:

  const renderFloatingTimer = () => {
    // Detectar automáticamente si es rutina HIIT/Tabata
    const isHiitWorkout = workoutPlan && (
      workoutPlan.methodKey === 'hiit' ||
      workoutPlan.methodKey === 'tabata'
    );

    if (!isTimerExpanded) {
      // Versión minimizada - con colores HIIT
      const bgColor = isHiitMode ?
        (hiitCurrentPhase === 'work' ? '#22c55e' : hiitCurrentPhase === 'rest' ? '#ef4444' : Colors.primary)
        : Colors.primary;

      return (
        <TouchableOpacity
          style={[styles.floatingTimerMinimized, { backgroundColor: bgColor }]}
          onPress={() => setIsTimerExpanded(true)}
        >
          <Ionicons
            name={isTimerRunning ? "pause" : "play"}
            size={24}
            color={Colors.white}
          />
          <Text style={styles.timerTextMinimized}>
            {isHiitMode ?
              `${Math.floor(hiitPhaseTimeLeft / 60)}:${(hiitPhaseTimeLeft % 60).toString().padStart(2, '0')}` :
              formatTime(timerSeconds)
            }
          </Text>
        </TouchableOpacity>
      );
    }

    // Versión expandida
    const getPhaseColor = () => {
      if (!isHiitMode) return Colors.primary;
      if (hiitCurrentPhase === 'work') return '#22c55e'; // Verde
      if (hiitCurrentPhase === 'rest') return '#ef4444'; // Rojo
      return '#8b5cf6'; // Morado para finished
    };

    const getPhaseText = () => {
      if (!isHiitMode) return 'Rest Timer';
      if (hiitCurrentPhase === 'work') return 'WORK TIME!';
      if (hiitCurrentPhase === 'rest') return 'REST TIME';
      return 'FINISHED!';
    };

    return (
      <View style={[styles.floatingTimerExpanded, { borderColor: getPhaseColor() }]}>
        <View style={styles.timerHeader}>
          <Text style={styles.timerTitle}>{getPhaseText()}</Text>
          <TouchableOpacity
            onPress={() => setIsTimerExpanded(false)}
            style={styles.minimizeButton}
          >
            <Ionicons name="remove" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Timer principal */}
        <Text style={[styles.timerDisplay, { color: getPhaseColor() }]}>
          {isHiitMode ?
            `${Math.floor(hiitPhaseTimeLeft / 60)}:${(hiitPhaseTimeLeft % 60).toString().padStart(2, '0')}` :
            formatTime(timerSeconds)
          }
        </Text>

        {/* Info adicional para HIIT */}
        {isHiitMode && (
          <View style={styles.hiitInfo}>
            <Text style={styles.hiitInfoText}>
              Round {hiitCurrentRound} of {hiitTotalRounds}
            </Text>
            <Text style={styles.hiitInfoText}>
              Total: {formatTime(timerSeconds)}
            </Text>
            <Text style={styles.hiitConfigText}>
              {hiitWorkTime}s work / {hiitRestTime}s rest
            </Text>
          </View>
        )}

        {/* Controles */}
        <View style={styles.timerControls}>
          {/* Toggle modo HIIT (solo si es workout HIIT) */}
          {isHiitWorkout && (
            <TouchableOpacity
              style={[styles.timerButton, { backgroundColor: isHiitMode ? '#22c55e' : 'rgba(255,255,255,0.2)' }]}
              onPress={toggleTimerMode}
            >
              <Ionicons name="flash" size={20} color={Colors.white} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.timerButton, { backgroundColor: getPhaseColor() }]}
            onPress={isTimerRunning ? pauseTimer : startTimer}
            disabled={hiitCurrentPhase === 'finished'}
          >
            <Ionicons
              name={isTimerRunning ? "pause" : "play"}
              size={20}
              color={Colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.timerButton}
            onPress={resetTimer}
          >
            <Ionicons name="refresh" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };



  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      if (!isAuthenticated || !id) {
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching workout plan with id:', id);
        const workoutPlanData = await workoutService.getWorkoutPlanById(id);

        if (workoutPlanData) {
          console.log('Workout plan retrieved:', workoutPlanData);
          setWorkoutPlan(workoutPlanData);

          if (workoutPlanData.routineData && workoutPlanData.routineData.length > 0) {
            console.log('Using stored routine data');
            setRoutine(workoutPlanData.routineData);
          } else {
            console.log('Reconstructing routine from method config');

            const methodConfig = methodsConfig[workoutPlanData.methodKey];

            if (methodConfig && methodConfig.data) {
              try {

                const daysPerWeekStr = workoutPlanData.daysPerWeek.toString();

                console.log(`Looking for routine with params: goal=${workoutPlanData.goal}, level=${workoutPlanData.level}, days=${daysPerWeekStr}`);

                let routineData;
                if (methodConfig.data[workoutPlanData.goal]) {
                  if (methodConfig.data[workoutPlanData.goal][workoutPlanData.level]) {
                    routineData = methodConfig.data[workoutPlanData.goal][workoutPlanData.level][daysPerWeekStr];
                  }
                }

                console.log('Routine data found:', routineData ? 'Yes' : 'No');

                if (routineData) {
                  setRoutine(routineData);
                } else {
                  console.warn(`No routine data for ${workoutPlanData.methodKey} with current configuration`);
                }
              } catch (error) {
                console.error('Error generating routine:', error);
              }
            } else {
              console.warn(`Method config not found for ${workoutPlanData.methodKey}`);
            }
          }
        } else {
          Alert.alert('Error', 'Workout plan not found.');
          router.back();
        }
      } catch (error) {
        console.error('Error fetching workout plan:', error);
        Alert.alert('Error', 'Failed to load workout plan details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, [id, isAuthenticated, router]);

  const copyRoutineToClipboard = async () => {
    try {
      if (!workoutPlan || routine.length === 0) {
        Alert.alert("No Data", "No routine data available to copy.");
        return;
      }

      let routineText = '';

      // Título de la rutina
      routineText += `🏋️ ${workoutPlan.methodName.toUpperCase()} ROUTINE\n`;
      routineText += `Goal: ${workoutPlan.goal === 'loseFat' ? 'Fat Loss' :
        workoutPlan.goal === 'maintainMuscle' ? 'Maintain Muscle' :
          workoutPlan.goal === 'gainStrength' ? 'Gain Strength' :
            workoutPlan.goal === 'buildMuscle' ? 'Build Muscle' : 'Custom'}\n`;
      routineText += `Level: ${workoutPlan.level.charAt(0).toUpperCase() + workoutPlan.level.slice(1)}\n`;
      routineText += `Days per week: ${workoutPlan.daysPerWeek}\n`;
      routineText += `Progress: ${workoutPlan.progress.daysCompleted} of ${workoutPlan.progress.totalDays} days\n`;
      routineText += `\n${'='.repeat(40)}\n\n`;

      // Verificar si es rutina HIIT/Tabata o regular
      const hasBlocks = routine.some(day => day.blocks && day.blocks.length > 0);

      if (workoutPlan.methodKey === 'hiit' || workoutPlan.methodKey === 'tabata' || hasBlocks) {
        // Formato para rutinas HIIT/Tabata
        routine.forEach((day, index) => {
          routineText += `📅 ${day.day || `Day ${index + 1}`}\n`;
          routineText += `Focus: ${day.focus || 'Training Session'}\n`;

          // Bloques si existen
          if (day.blocks && day.blocks.length > 0) {
            day.blocks.forEach((block) => {
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
        routine.forEach((day) => {
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
      routineText += `Track your progress with our app!`;

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

  const handleUpdateProgress = async () => {
    if (!workoutPlan) return;

    const currentProgress = workoutPlan.progress.daysCompleted;
    let newProgress = currentProgress + 1;


    if (newProgress > workoutPlan.progress.totalDays) {
      newProgress = workoutPlan.progress.totalDays;
    }

    try {
      setIsUpdating(true);

      await workoutService.updateWorkoutProgress(workoutPlan._id, newProgress);

      // Actualizar el estado local
      setWorkoutPlan((prevState: any) => ({
        ...prevState,
        progress: {
          ...prevState.progress,
          daysCompleted: newProgress
        },
        status: newProgress >= workoutPlan.progress.totalDays ? 'completed' : 'active'
      }));

      // Actualizar la lista de planes en el perfil
      triggerRefresh('workoutPlans');

      Alert.alert(
        "Progress Updated",
        `You've completed ${newProgress} of ${workoutPlan.progress.totalDays} days.`
      );
    } catch (error) {
      console.error('Error updating progress:', error);
      Alert.alert('Error', 'Failed to update workout progress.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteWorkoutPlan = () => {
    if (!workoutPlan) return;

    Alert.alert(
      "Delete Workout Plan",
      "Are you sure you want to delete this workout plan? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await workoutService.deleteWorkoutPlan(workoutPlan._id);

              // Actualizar la lista de planes en el perfil
              triggerRefresh('workoutPlans');

              Alert.alert(
                "Success",
                "Workout plan deleted successfully."
              );

              router.back();
            } catch (error) {
              console.error('Error deleting workout plan:', error);
              Alert.alert('Error', 'Failed to delete workout plan.');
            }
          }
        }
      ]
    );
  };

  const extractTimingsFromRoutine = () => {
    if (!workoutPlan || !routine || routine.length === 0) return null;
    
    // Buscar el primer ejercicio con tiempos definidos
    for (const day of routine) {
      if (day.blocks && day.blocks.length > 0) {
        for (const block of day.blocks) {
          if (block.exercises && block.exercises.length > 0) {
            const firstEx = block.exercises[0];
            if (firstEx.work && firstEx.rest && firstEx.rounds) {
              // Convertir strings como "20 sec" a números
              const workSeconds = parseInt(firstEx.work.replace(/[^0-9]/g, '')) || 30;
              const restSeconds = parseInt(firstEx.rest.replace(/[^0-9]/g, '')) || 10;
              const rounds = firstEx.rounds || 8;
              
              console.log(`Found exercise: ${firstEx.name} - ${workSeconds}s work / ${restSeconds}s rest x ${rounds} rounds`);
              
              return {
                workTime: workSeconds,
                restTime: restSeconds,
                totalRounds: rounds,
                exerciseName: firstEx.name
              };
            }
          }
        }
      }
    }
    return null;
  };
  
  // Función para inicializar timer con parámetros de la rutina
  const initializeHiitTimer = () => {
    const timings = extractTimingsFromRoutine();
    
    if (timings) {
      setHiitWorkTime(timings.workTime);
      setHiitRestTime(timings.restTime);
      setHiitTotalRounds(timings.totalRounds);
      setHiitPhaseTimeLeft(timings.workTime);
      
      console.log(`Timer synchronized: ${timings.workTime}s work / ${timings.restTime}s rest x ${timings.totalRounds} rounds`);
      return timings;
    } else {
      // Valores por defecto si no encuentra parámetros
      const defaultTimings = {
        workTime: workoutPlan?.methodKey === 'tabata' ? 20 : 30,
        restTime: workoutPlan?.methodKey === 'tabata' ? 10 : 15,
        totalRounds: 8,
        exerciseName: 'Standard Interval'
      };
      
      setHiitWorkTime(defaultTimings.workTime);
      setHiitRestTime(defaultTimings.restTime);
      setHiitTotalRounds(defaultTimings.totalRounds);
      setHiitPhaseTimeLeft(defaultTimings.workTime);
      
      console.log(`Using defaults: ${defaultTimings.workTime}s work / ${defaultTimings.restTime}s rest`);
      return defaultTimings;
    }
  };


  const renderWorkoutRoutine = () => {
    if (!workoutPlan) return null;

    // Detectar si la rutina tiene estructura de blocks (HIIT/Tabata)
    const hasBlocks = routine.length > 0 && routine.some(day => day.blocks && day.blocks.length > 0);

    // Si es un entrenamiento HIIT/Tabata o tiene estructura de blocks
    if (workoutPlan.methodKey === 'hiit' || workoutPlan.methodKey === 'tabata' || hasBlocks) {
      return (
        <>
          <Text style={styles.routineTitle}>
            {workoutPlan.methodName} Workout Routine
          </Text>

          {routine.length > 0 ? (
            routine.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayTitle}>{day.day || `Day ${index + 1}`}</Text>
                  <Text style={styles.dayFocus}>{day.focus || 'Training Session'}</Text>
                </View>

                {/* Renderizar bloques de HIIT/Tabata si existen */}
                {day.blocks && day.blocks.length > 0 && (
                  day.blocks.map((block, blockIndex) => (
                    <View key={`block-${blockIndex}`}>
                      {block.name && (
                        <View style={styles.blockHeader}>
                          <Text style={styles.blockName}>{block.name}</Text>
                        </View>
                      )}

                      {block.exercises && block.exercises.map && block.exercises.map((ex, exIndex) => (
                        <View key={`block-ex-${exIndex}`} style={styles.exerciseRow}>
                          <Text style={styles.exerciseName}>{ex.name}</Text>
                          <View style={styles.exerciseDetails}>
                            {ex.rounds && <Text style={styles.exerciseDetail}>Rounds: {ex.rounds}</Text>}
                            {ex.work && <Text style={styles.exerciseDetail}>Work: {ex.work}</Text>}
                            {ex.rest && <Text style={styles.exerciseDetail}>Rest: {ex.rest}</Text>}
                          </View>
                        </View>
                      ))}
                    </View>
                  ))
                )}

                {/* Renderizar ejercicios estándar (para el caso de que la rutina HIIT no tenga bloques) */}
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
            ))
          ) : (
            <View style={styles.noRoutineContainer}>
              <Text style={styles.noRoutineText}>
                No detailed routine data available for this workout plan.
              </Text>

              <View style={styles.hiitGuideContainer}>
                <Text style={styles.hiitGuideTitle}>General HIIT Guidelines:</Text>
                <Text style={styles.hiitGuideText}>• Warm up for 5-10 minutes</Text>
                <Text style={styles.hiitGuideText}>• Perform high-intensity intervals (85-95% max effort)</Text>
                <Text style={styles.hiitGuideText}>• Rest between intervals</Text>
                <Text style={styles.hiitGuideText}>• Complete your target number of intervals</Text>
                <Text style={styles.hiitGuideText}>• Cool down for 5-10 minutes</Text>
              </View>
            </View>
          )}
        </>
      );
    }

    // Para otros tipos de entrenamiento (como Helms), usar el renderizado estándar
    return (
      <>
        <Text style={styles.routineTitle}>Workout Routine</Text>

        {routine.length > 0 ? (
          routine.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayTitle}>{day.day}</Text>
                <Text style={styles.dayFocus}>{day.focus}</Text>
              </View>
              {day.exercises && day.exercises.map(
                (ex, i) => (
                  <View key={i} style={styles.exerciseRow}>
                    <Text style={styles.exerciseName}>{ex.name}</Text>
                    <View style={styles.exerciseDetails}>
                      <Text style={styles.exerciseDetail}>Sets: {ex.sets}</Text>
                      <Text style={styles.exerciseDetail}>Reps: {ex.reps}</Text>
                      <Text style={styles.exerciseDetail}>Rest: {ex.rest}</Text>
                    </View>
                  </View>
                )
              )}
            </View>
          ))
        ) : (
          <View style={styles.noRoutineContainer}>
            <Text style={styles.noRoutineText}>
              No routine data available for this workout plan.
            </Text>
          </View>
        )}
      </>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading workout plan...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!workoutPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={60} color={Colors.primary} />
          <Text style={styles.errorText}>Workout plan not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{workoutPlan.methodName}</Text>
          <Text style={styles.date}>
            Created on {new Date(workoutPlan.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Plan Summary</Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Goal</Text>
              <Text style={styles.summaryValue}>
                {workoutPlan.goal === 'loseFat' ? 'Fat Loss' :
                  workoutPlan.goal === 'maintainMuscle' ? 'Maintain Muscle' :
                    workoutPlan.goal === 'gainStrength' ? 'Gain Strength' :
                      workoutPlan.goal === 'buildMuscle' ? 'Build Muscle' : 'Custom'}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Level</Text>
              <Text style={styles.summaryValue}>
                {workoutPlan.level.charAt(0).toUpperCase() + workoutPlan.level.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Days per Week</Text>
              <Text style={styles.summaryValue}>{workoutPlan.daysPerWeek}</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Progress</Text>
              <Text style={styles.summaryValue}>
                {workoutPlan.progress.daysCompleted} of {workoutPlan.progress.totalDays} days
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.progressButton,
              workoutPlan.progress.daysCompleted >= workoutPlan.progress.totalDays
                ? styles.progressButtonDisabled
                : {}
            ]}
            onPress={handleUpdateProgress}
            disabled={workoutPlan.progress.daysCompleted >= workoutPlan.progress.totalDays || isUpdating}
          >
            <Text style={styles.progressButtonText}>
              {isUpdating ? "Updating..." :
                workoutPlan.progress.daysCompleted >= workoutPlan.progress.totalDays ?
                  "Program Completed" :
                  "Complete Workout Day"}
            </Text>
          </TouchableOpacity>

          {/* Nuevo botón para copiar rutina */}
          <TouchableOpacity
            style={styles.copyRoutineButton}
            onPress={copyRoutineToClipboard}
          >
            <Ionicons name="copy-outline" size={18} color={Colors.white} />
            <Text style={styles.copyRoutineButtonText}>Copy Routine</Text>
          </TouchableOpacity>
        </View>

        {renderWorkoutRoutine()}

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteWorkoutPlan}
          >
            <Ionicons name="trash-outline" size={18} color={Colors.white} />
            <Text style={styles.deleteButtonText}>Delete Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {renderFloatingTimer()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 12,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryCard: {
    margin: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  progressButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  progressButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  routineTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  dayContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  dayHeader: {
    backgroundColor: Colors.primary,
    padding: 12,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  dayFocus: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  exerciseRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
    marginBottom: 8,
    lineHeight: 20,
  },
  exerciseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exerciseDetail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 16,
    marginBottom: 4,
  },
  noRoutineContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  noRoutineText: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  hiitGuideContainer: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 16,
    borderRadius: 8,
  },
  hiitGuideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
  },
  hiitGuideText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 6,
    lineHeight: 20,
  },
  actionsContainer: {
    margin: 16,
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#FF4136', // Rojo para acción destructiva
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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
  hiitDetailItem: {
    fontSize: 14,
    color: Colors.white,
    marginBottom: 6,
  },
  hiitDetailLabel: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  hiitDetailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  copyRoutineButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  copyRoutineButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Agregar estos estilos al final del StyleSheet

  // Cronómetro Flotante
  floatingTimerMinimized: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timerTextMinimized: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  floatingTimerExpanded: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 16,
    padding: 16,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  timerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timerTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  minimizeButton: {
    padding: 4,
  },
  timerDisplay: {
    color: Colors.primary,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timerButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiitInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  hiitInfoText: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  hiitConfigText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
});