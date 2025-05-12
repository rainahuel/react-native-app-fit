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
import methodsConfig from '../../../data/workout/methods-config';
import workoutService from '../../../services/workoutService';

// Interfaces para los datos
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

interface WorkoutPlan {
  _id: string;  // Cambiado de id a _id para MongoDB
  methodKey: string;
  methodName: string;
  goal: string;
  level: string;
  daysPerWeek: number;
  createdAt: any;
  status: string;
  progress: {
    daysCompleted: number;
    totalDays: number;
  };
}

export default function WorkoutDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user, isAuthenticated } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [routineData, setRoutineData] = useState<WorkoutDay[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user || !id) {
      router.push('/(tabs)/workout');
      return;
    }
    
    const loadWorkoutPlan = async () => {
      try {
        setIsLoading(true);
        
        // Obtener el plan de entrenamiento usando nuestro servicio
        const planData = await workoutService.getWorkoutPlanById(id as string);
        
        if (!planData) {
          Alert.alert("Error", "Workout plan not found.");
          router.push('/(tabs)/workout');
          return;
        }
        
        // Convertir string de fecha a objeto Date si es necesario
        let createdAt;
        try {
          createdAt = new Date(planData.createdAt);
        } catch (e) {
          createdAt = new Date();
        }
        
        const plan: WorkoutPlan = {
          ...planData,
          createdAt
        } as WorkoutPlan;
        
        setWorkoutPlan(plan);
        
        // Cargar los datos de la rutina basado en las selecciones guardadas
        const source = methodsConfig[plan.methodKey].data;
        if (source) {
          const routineSet = source[plan.goal]?.[plan.level]?.[plan.daysPerWeek.toString()];
          if (routineSet) {
            setRoutineData(routineSet);
          }
        }
      } catch (error) {
        console.error("Error loading workout plan:", error);
        Alert.alert("Error", "Failed to load workout plan details.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWorkoutPlan();
  }, [id, isAuthenticated, user]);

  const markDayComplete = async (dayIndex: number) => {
    if (!workoutPlan || !user) return;
    
    try {
      setIsUpdating(true);
      
      // Actualizar el progreso
      const updatedDaysCompleted = workoutPlan.progress.daysCompleted + 1;
      
      // Actualizar en el backend usando nuestro servicio
      await workoutService.updateWorkoutProgress(workoutPlan._id, updatedDaysCompleted);
      
      // Actualizar estado local
      setWorkoutPlan({
        ...workoutPlan,
        progress: {
          ...workoutPlan.progress,
          daysCompleted: updatedDaysCompleted
        }
      });
      
      Alert.alert("Success", "Workout day completed! Keep up the good work!");
    } catch (error) {
      console.error("Error updating progress:", error);
      Alert.alert("Error", "Failed to update workout progress.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Función auxiliar para renderizar el texto del objetivo
  const renderGoalText = (goal: string) => {
    switch(goal) {
      case 'loseFat':
        return 'Fat Loss';
      case 'maintainMuscle':
        return 'Maintain Muscle';
      case 'gainStrength':
        return 'Gain Strength';
      case 'buildMuscle':
        return 'Build Muscle';
      default:
        return goal.charAt(0).toUpperCase() + goal.slice(1);
    }
  };

  // El resto del componente (renderizado) permanece sin cambios
  // Solo necesitamos actualizar las referencias de 'id' a '_id'

  // Mostrar indicador de carga
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading workout plan...</Text>
      </View>
    );
  }

  // Si no se encontró el plan
  if (!workoutPlan) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Workout plan not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/workout')}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Cabecera del plan */}
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <Text style={styles.planTitle}>{workoutPlan.methodName}</Text>
            <Text style={styles.planSubtitle}>
              {renderGoalText(workoutPlan.goal)} • {workoutPlan.level.charAt(0).toUpperCase() + workoutPlan.level.slice(1)} • {workoutPlan.daysPerWeek} days/week
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.backIcon}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        
        {/* Barra de progreso */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>Progress</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarOuter}>
              <View 
                style={[
                  styles.progressBarInner, 
                  { 
                    width: `${(workoutPlan.progress.daysCompleted / workoutPlan.progress.totalDays) * 100}%` 
                  }
                ]} 
              />
            </View>
          </View>
          <Text style={styles.progressText}>
            {workoutPlan.progress.daysCompleted} of {workoutPlan.progress.totalDays} days completed
          </Text>
        </View>
        
        {/* Lista de días de entrenamiento */}
        <View style={styles.workoutDaysContainer}>
          <Text style={styles.sectionTitle}>Workout Schedule</Text>
          
          {routineData.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <View style={styles.dayHeader}>
                <View>
                  <Text style={styles.dayTitle}>{day.day}</Text>
                  <Text style={styles.dayFocus}>{day.focus}</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.completeButton}
                  onPress={() => markDayComplete(index)}
                  disabled={isUpdating}
                >
                  <Text style={styles.completeButtonText}>
                    {isUpdating ? "Updating..." : "Mark Complete"}
                  </Text>
                </TouchableOpacity>
              </View>
              
              {day.exercises.map((exercise, i) => (
                <View key={i} style={styles.exerciseRow}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.exerciseDetails}>
                    <Text style={styles.exerciseDetail}>Sets: {exercise.sets}</Text>
                    <Text style={styles.exerciseDetail}>Reps: {exercise.reps}</Text>
                    <Text style={styles.exerciseDetail}>Rest: {exercise.rest}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  loadingText: {
    color: Colors.textSecondary,
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    color: Colors.white,
    fontSize: 18,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    flex: 1,
    marginLeft: 30, // Espacio para el botón de retroceso
  },
  backIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  planSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  progressContainer: {
    padding: 16,
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
  },
  progressBarContainer: {
    marginBottom: 10,
  },
  progressBarOuter: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  workoutDaysContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 16,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  completeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  completeButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
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
  backButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
  },
  backButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});