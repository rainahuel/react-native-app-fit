// app/screen/nutrition/meal-plan-details.tsx
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
import mealService from '../../../services/mealService';
import { useRefreshContext, RefreshableDataType } from '@/context/RefreshContext';

// Las interfaces se mantienen iguales
interface Food {
  name: string;
  type: string;
  amount: string | number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface Meal {
  name: string;
  label: string | null;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
  };
  foods: Food[];
}

interface MealPlan {
  _id: string;
  name: string;
  createdAt: Date;
  settings: {
    calories: number;
    mealsPerDay: number;
    goal: string;
    macroRatio?: {
      protein: number;
      carbs: number;
      fat: number;
    };
  };
  dailyTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: Meal[];
}

export default function MealPlanDetailsScreen() {
  const { user, isAuthenticated } = useAuth();
  const { triggerRefresh, triggerMultipleRefresh } = useRefreshContext();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchMealPlan = async () => {
      if (!isAuthenticated || !user || !id) {
        setIsLoading(false);
        return;
      }

      try {
        // Obtener el plan de comidas usando nuestro servicio
        const mealPlanData = await mealService.getMealPlanById(id as string);
        
        if (mealPlanData) {
          // Convertir la fecha a objeto Date si viene como string
          let createdAt;
          try {
            createdAt = new Date(mealPlanData.createdAt);
          } catch (e) {
            createdAt = new Date();
          }
          
          setMealPlan({
            ...mealPlanData,
            createdAt: createdAt
          } as MealPlan);
        } else {
          Alert.alert('Error', 'Meal plan not found.');
          router.back();
        }
      } catch (error) {
        console.error('Error fetching meal plan:', error);
        Alert.alert('Error', 'Failed to load meal plan details.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMealPlan();
  }, [id, isAuthenticated, user, router]);

  const handleDeleteMealPlan = () => {
    Alert.alert(
      'Delete Meal Plan',
      'Are you sure you want to delete this meal plan? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (!mealPlan?._id) return;
            
            try {
              setIsDeleting(true);
              // Usar nuestro servicio para eliminar el plan de comidas
              await mealService.deleteMealPlan(mealPlan._id);
              triggerMultipleRefresh(['mealPlans', 'userProfile']);
              Alert.alert('Success', 'Meal plan deleted successfully.');
              router.back();
            } catch (error) {
              console.error('Error deleting meal plan:', error);
              Alert.alert('Error', 'Failed to delete meal plan.');
              setIsDeleting(false);
            }
          }
        }
      ]
    );
  };

  // Helper para convertir el nombre del objetivo a texto legible - no cambia
  const getGoalText = (goal: string) => {
    switch (goal) {
      case 'loseFat':
        return 'Fat Loss';
      case 'maintainMuscle':
        return 'Maintain Muscle';
      case 'buildMuscle':
        return 'Build Muscle';
      default:
        return 'Custom';
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading meal plan...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!mealPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={60} color={Colors.primary} />
          <Text style={styles.errorText}>Meal plan not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isDeleting && (
        <View style={styles.deletingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.deletingText}>Deleting meal plan...</Text>
        </View>
      )}
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{mealPlan.name}</Text>
          <Text style={styles.date}>Created on {mealPlan.createdAt.toLocaleDateString()}</Text>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Plan Summary</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Goal</Text>
              <Text style={styles.summaryValue}>{getGoalText(mealPlan.settings.goal)}</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Meals</Text>
              <Text style={styles.summaryValue}>{mealPlan.settings.mealsPerDay} per day</Text>
            </View>
          </View>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Calories</Text>
              <Text style={styles.summaryValue}>{mealPlan.dailyTotals.calories} kcal</Text>
            </View>
            
            {mealPlan.settings.macroRatio && (
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Macro Ratio</Text>
                <Text style={styles.summaryValue}>
                  P: {mealPlan.settings.macroRatio.protein}% / 
                  C: {mealPlan.settings.macroRatio.carbs}% / 
                  F: {mealPlan.settings.macroRatio.fat}%
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.macrosCard}>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>Protein</Text>
              <Text style={styles.macroValue}>{mealPlan.dailyTotals.protein}g</Text>
            </View>
            
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>Carbs</Text>
              <Text style={styles.macroValue}>{mealPlan.dailyTotals.carbs}g</Text>
            </View>
            
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>Fat</Text>
              <Text style={styles.macroValue}>{mealPlan.dailyTotals.fat}g</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.mealsHeader}>Daily Meals</Text>
        
        {mealPlan.meals.map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealName}>
                {meal.name} {meal.label && <Text style={styles.mealLabel}>{meal.label}</Text>}
              </Text>
              <Text style={styles.mealCalories}>{meal.macros.calories} kcal</Text>
            </View>
            
            <View style={styles.mealMacros}>
              <Text style={styles.mealMacroText}>
                P: {meal.macros.protein}g | C: {meal.macros.carbs}g | F: {meal.macros.fat}g
              </Text>
            </View>
            
            <View style={styles.foodsList}>
              {meal.foods.map((food, foodIndex) => (
                <View key={foodIndex} style={styles.foodItem}>
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodType}>{food.type.charAt(0).toUpperCase() + food.type.slice(1)}:</Text>
                    <Text style={styles.foodName}>{food.name}</Text>
                  </View>
                  <Text style={styles.foodAmount}>
                    {typeof food.amount === 'number' ? `${food.amount}g` : food.amount}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleDeleteMealPlan}
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
  deletingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deletingText: {
    color: Colors.white,
    marginTop: 12,
    fontSize: 16,
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
  macrosCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  macroItem: {
    flex: 1,
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  mealsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  mealCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  mealHeader: {
    backgroundColor: Colors.primary,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  mealLabel: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  mealMacros: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
    alignItems: 'center',
  },
  mealMacroText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  foodsList: {
    padding: 12,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  foodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textSecondary,
    marginRight: 5,
  },
  foodName: {
    fontSize: 16,
    color: Colors.white,
  },
  foodAmount: {
    fontSize: 14,
    color: Colors.textSecondary,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
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
  }
});