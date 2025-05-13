// app/screen/workouts/workout-details.tsx
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  ActivityIndicator, 
  Alert 
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
      setWorkoutPlan((prevState:any) => ({
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
});