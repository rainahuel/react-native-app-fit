// app/screen/nutrition/nutrition-meals.tsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
  TextInput,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import nutritionService from '../../../services/nutritionService';
import mealService from '../../../services/mealService';
import { useAuth } from '../../../context/AuthContext';
import Colors from '../../../constants/Colors';
import foods from '../../../data/food/foods';
import { Ionicons } from '@expo/vector-icons';

function NutritionMealsScreen() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [calories, setCalories] = useState('2000');
  const [goal, setGoal] = useState('maintainMuscle');
  const [mealsPerDay, setMealsPerDay] = useState('5');
  const [generatedMeals, setGeneratedMeals] = useState<any[]>([]);
  const [isLoadingNutritionGoal, setIsLoadingNutritionGoal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [planName, setPlanName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const getPickerItemColor = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return Colors.text;
    }
    return Colors.text;
  };

  // Load calorie target from active nutrition goal
  useEffect(() => {
    const loadCalorieTarget = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        setIsLoadingNutritionGoal(true);
        
        // Consultar los objetivos nutricionales usando nuestro servicio
        const nutritionGoals = await nutritionService.getNutritionGoals();
        
        if (nutritionGoals && nutritionGoals.length > 0) {
          // Filtrar manualmente los objetivos activos y ordenarlos por fecha (más reciente primero)
          const activeGoals = nutritionGoals
            .filter(goal => goal.status === 'active')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            
          if (activeGoals.length > 0) {
            const goalData = activeGoals[0];
            
            if (goalData.calorieCalculation?.calorieTarget) {
              // Establecer las calorías del objetivo activo
              setCalories(goalData.calorieCalculation.calorieTarget.toString());
              
              // Establecer un nombre de plan de comidas predeterminado basado en el objetivo
              const goalType = goalData.calorieCalculation.goalType || 'custom';
              let goalText = 'Custom';
              
              if (goalType === 'deficit') goalText = 'Fat Loss';
              else if (goalType === 'aggressiveDeficit') goalText = 'Aggressive Fat Loss';
              else if (goalType === 'maintenance') goalText = 'Maintenance';
              else if (goalType === 'surplus') goalText = 'Muscle Gain';
              
              setPlanName(`${goalText} Meal Plan - ${new Date().toLocaleDateString()}`);
            }
          }
        }
      } catch (error) {
        console.error("Error loading nutrition goal:", error);
      } finally {
        setIsLoadingNutritionGoal(false);
      }
    };

    loadCalorieTarget();
  }, [isAuthenticated, user]);

  const goalMacros = {
    loseFat: { protein: 40, carbs: 30, fat: 30 },
    maintainMuscle: { protein: 30, carbs: 40, fat: 30 },
    buildMuscle: { protein: 30, carbs: 50, fat: 20 }
  };

  const generateMealPlan = () => {
    const caloriesNum = parseInt(calories);
    const mealsNum = parseInt(mealsPerDay);
    
    if (!caloriesNum || caloriesNum < 1000) {
      Alert.alert('Error', 'Please enter a valid amount of daily calories (above 1000).');
      return;
    }
    
    if (mealsNum < 3 || mealsNum > 6) {
      Alert.alert('Error', 'Meals per day must be between 3 and 6.');
      return;
    }
  
    const { protein, carbs, fat } = goalMacros[goal as keyof typeof goalMacros];
    const totalProtein = ((caloriesNum * protein) / 100) / 4;
    const totalCarbs = ((caloriesNum * carbs) / 100) / 4;
    const totalFat = ((caloriesNum * fat) / 100) / 9;
  
    const proteinPerMeal = totalProtein / mealsNum;
    const carbPerMeal = totalCarbs / mealsNum;
    const fatPerMeal = totalFat / mealsNum;
  
    const meals: any[] = [];
    const fruitIndex = Math.floor(Math.random() * mealsNum);
    const fruitTiming = Math.random() < 0.5 ? "Pre-Workout" : "Post-Workout";
  
    for (let i = 0; i < mealsNum; i++) {
      let mealName = '';
      switch (i) {
        case 0: mealName = 'Breakfast'; break;
        case 1: mealName = mealsNum <= 3 ? 'Lunch' : 'Morning Snack'; break;
        case 2: mealName = mealsNum <= 3 ? 'Dinner' : 'Lunch'; break;
        case 3: mealName = 'Afternoon Snack'; break;
        case 4: mealName = 'Dinner'; break;
        case 5: mealName = 'Evening Snack'; break;
        default: mealName = `Meal ${i+1}`; break;
      }
      
      const protein = foods.proteins[Math.floor(Math.random() * foods.proteins.length)];
      const carb = foods.carbohydrates[Math.floor(Math.random() * foods.carbohydrates.length)];
      const fat = foods.fats[Math.floor(Math.random() * foods.fats.length)];
      const veggie = foods.vegetables[Math.floor(Math.random() * foods.vegetables.length)];
      const fruit = i === fruitIndex ? foods.fruits[Math.floor(Math.random() * foods.fruits.length)] : null;
  
      const proteinGrams = parseFloat(proteinPerMeal.toFixed(1));
      const carbGrams = parseFloat(carbPerMeal.toFixed(1));
      const fatGrams = parseFloat(fatPerMeal.toFixed(1));
      const totalMealCalories = parseFloat(((proteinGrams * 4) + (carbGrams * 4) + (fatGrams * 9)).toFixed(1));
      
      const foodItems = [
        {
          ...protein,
          type: 'protein',
          amount: proteinGrams,
          displayName: protein.name
        },
        {
          ...carb,
          type: 'carb',
          amount: carbGrams,
          displayName: carb.name
        },
        {
          ...fat,
          type: 'fat',
          amount: fatGrams,
          displayName: fat.name
        },
        {
          ...veggie,
          type: 'veggie',
          amount: 'as desired',
          displayName: veggie.name
        }
      ];
      
      if (fruit) {
        foodItems.push({
          ...fruit,
          type: 'fruit',
          amount: '~1 handful',
          displayName: fruit.name
        });
      }
  
      meals.push({
        name: mealName,
        label: fruit ? `(${fruitTiming})` : null,
        foods: foodItems,
        macros: {
          protein: proteinGrams,
          carbs: carbGrams,
          fat: fatGrams,
          calories: totalMealCalories
        }
      });
    }
  
    setGeneratedMeals(meals);
    
    // Default plan name if not set from nutrition goal
    if (!planName) {
      setPlanName(`Meal Plan - ${new Date().toLocaleDateString()}`);
    }
    
    Alert.alert('Success', 'Meal plan generated successfully.');
  };

  const handleSaveMealPlan = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    if (generatedMeals.length === 0) {
      Alert.alert('Error', 'Please generate a meal plan first.');
      return;
    }
    
    setShowSaveModal(true);
  };
  
  const saveMealPlanToBackend = async () => {
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      return;
    }

    try {
      setIsSaving(true);
      setShowSaveModal(false);
      
      const totalDailyCalories = generatedMeals.reduce(
        (sum, meal) => sum + meal.macros.calories, 0
      );
      
      const totalProtein = generatedMeals.reduce(
        (sum, meal) => sum + meal.macros.protein, 0
      );
      
      const totalCarbs = generatedMeals.reduce(
        (sum, meal) => sum + meal.macros.carbs, 0
      );
      
      const totalFat = generatedMeals.reduce(
        (sum, meal) => sum + meal.macros.fat, 0
      );

      // Crear documento de plan de comidas para nuestro backend
      const mealPlanData = {
        // Settings usados para generar el plan
        settings: {
          calories: parseInt(calories),
          mealsPerDay: parseInt(mealsPerDay),
          goal: goal,
          macroRatio: goalMacros[goal as keyof typeof goalMacros]
        },
        
        // Metadata del plan
        name: planName,
        
        // Resumen de macros diarios totales
        dailyTotals: {
          calories: totalDailyCalories,
          protein: totalProtein,
          carbs: totalCarbs,
          fat: totalFat
        },
        
        // Las comidas propiamente dichas
        meals: generatedMeals.map(meal => ({
          name: meal.name,
          label: meal.label,
          macros: meal.macros,
          foods: meal.foods.map(food => ({
            name: food.displayName,
            type: food.type,
            amount: food.amount,
            // Solo incluir información nutricional para alimentos medidos (no "a discreción")
            ...(typeof food.amount === 'number' ? {
              protein: food.protein,
              carbs: food.carbs,
              fat: food.fat
            } : {})
          }))
        }))
      };
      
      await mealService.createMealPlan(mealPlanData);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      Alert.alert(
        "Success",
        "Your meal plan has been saved to your profile."
      );
    } catch (error) {
      console.error("Error saving meal plan:", error);
      Alert.alert(
        "Error",
        "There was a problem saving your meal plan. Please try again."
      );
    } finally {
      setIsSaving(false);
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
            <Ionicons name="close" size={24} color={Colors.white} />
          </TouchableOpacity>
          
          <Ionicons name="save-outline" size={50} color={Colors.primary} style={styles.modalIcon} />
          
          <Text style={styles.modalTitle}>Save Your Meal Plan</Text>
          
          <Text style={styles.modalText}>
            Create an account or sign in to save your meal plan and access it anytime.
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

  const renderSaveModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showSaveModal}
      onRequestClose={() => setShowSaveModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.modalCloseButton}
            onPress={() => setShowSaveModal(false)}
          >
            <Ionicons name="close" size={24} color={Colors.white} />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>Name Your Meal Plan</Text>
          
          <Text style={styles.modalText}>
            Give your meal plan a name so you can easily find it later.
          </Text>
          
          <View style={styles.modalInputContainer}>
            <TextInput
              style={styles.modalTextInput}
              value={planName}
              onChangeText={setPlanName}
              placeholder="Enter meal plan name"
              placeholderTextColor={Colors.textSecondary}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.modalPrimaryButton}
            onPress={saveMealPlanToBackend}
          >
            <Text style={styles.modalPrimaryButtonText}>Save Plan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setShowSaveModal(false)}
          >
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  
  if (isLoadingNutritionGoal) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading your nutrition data...</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {renderLoginModal()}
      {renderSaveModal()}
      
      {isSaving && (
        <View style={styles.savingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.savingText}>Saving your meal plan...</Text>
        </View>
      )}
      
      {saveSuccess && (
        <View style={styles.saveSuccess}>
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.saveSuccessText}>Meal plan saved!</Text>
        </View>
      )}
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Generate Meal Plan</Text>
          <Text style={styles.subtitle}>Customize and create your personalized meals</Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Daily Calories</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={calories}
                onChangeText={setCalories}
                placeholder="Enter calories"
                placeholderTextColor={Colors.textSecondary}
                keyboardType="numeric"
              />
              <Text style={styles.inputSuffix}>kcal</Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Goal</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={goal}
                onValueChange={(value) => setGoal(value)}
                style={styles.picker}
                dropdownIconColor={Platform.OS === 'web' ? Colors.white : undefined}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Lose Fat (Protein 40% / Carbs 30% / Fat 30%)" value="loseFat" color={getPickerItemColor()} />
                <Picker.Item label="Maintain Muscle (Protein 30% / Carbs 40% / Fat 30%)" value="maintainMuscle" color={getPickerItemColor()} />
                <Picker.Item label="Build Muscle (Protein 30% / Carbs 50% / Fat 20%)" value="buildMuscle" color={getPickerItemColor()} />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Meals per Day</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={mealsPerDay}
                onValueChange={(value) => setMealsPerDay(value)}
                style={styles.picker}
                dropdownIconColor={Platform.OS === 'web' ? Colors.white : undefined}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="3 meals" value="3" color={Colors.text} />
                <Picker.Item label="4 meals" value="4" color={Colors.text} />
                <Picker.Item label="5 meals" value="5" color={Colors.text} />
                <Picker.Item label="6 meals" value="6" color={Colors.text} />
              </Picker>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.generateButton} onPress={generateMealPlan}>
          <Text style={styles.generateButtonText}>Generate Meal Plan</Text>
        </TouchableOpacity>

        {generatedMeals.length > 0 && (
          <View style={styles.mealsContainer}>
            <Text style={styles.mealsTitle}>Your Daily Meal Plan</Text>
            
            {generatedMeals.map((meal, index) => (
              <View key={index} style={styles.mealCard}>
                <View style={styles.mealHeader}>
                  <Text style={styles.mealName}>
                    {meal.name} {meal.label && <Text style={styles.mealLabel}>{meal.label}</Text>}
                  </Text>
                  <Text style={styles.mealCalories}>{meal.macros.calories} kcal</Text>
                </View>
                
                <View style={styles.macroRow}>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroLabel}>Protein</Text>
                    <Text style={styles.macroValue}>{meal.macros.protein}g</Text>
                  </View>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroLabel}>Carbs</Text>
                    <Text style={styles.macroValue}>{meal.macros.carbs}g</Text>
                  </View>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroLabel}>Fat</Text>
                    <Text style={styles.macroValue}>{meal.macros.fat}g</Text>
                  </View>
                </View>
                
                <View style={styles.foodsHeader}>
                  <Text style={styles.foodsTitle}>Foods</Text>
                </View>
                
                <View style={styles.foodsList}>
                  {meal.foods.map((food, idx) => (
                    <View key={idx} style={styles.foodItem}>
                      <View style={styles.foodInfo}>
                        <Text style={styles.foodType}>{food.type.charAt(0).toUpperCase() + food.type.slice(1)}:</Text>
                        <Text style={styles.foodName}>{food.displayName}</Text>
                      </View>
                      <Text style={styles.foodAmount}>
                        {typeof food.amount === 'number' ? `${food.amount}g` : food.amount}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
            
            <View style={styles.totalContainer}>
              <Text style={styles.totalTitle}>Daily Totals</Text>
              
              <View style={styles.totalMacroRow}>
                <View style={styles.totalMacroItem}>
                  <Text style={styles.totalMacroLabel}>Calories</Text>
                  <Text style={styles.totalMacroValue}>
                    {generatedMeals.reduce((sum, meal) => sum + meal.macros.calories, 0)} kcal
                  </Text>
                </View>
              </View>
              
              <View style={styles.totalMacroRow}>
                <View style={styles.totalMacroItem}>
                  <Text style={styles.totalMacroLabel}>Protein</Text>
                  <Text style={styles.totalMacroValue}>
                    {generatedMeals.reduce((sum, meal) => sum + meal.macros.protein, 0)}g
                  </Text>
                </View>
                <View style={styles.totalMacroItem}>
                  <Text style={styles.totalMacroLabel}>Carbs</Text>
                  <Text style={styles.totalMacroValue}>
                    {generatedMeals.reduce((sum, meal) => sum + meal.macros.carbs, 0)}g
                  </Text>
                </View>
                <View style={styles.totalMacroItem}>
                  <Text style={styles.totalMacroLabel}>Fat</Text>
                  <Text style={styles.totalMacroValue}>
                    {generatedMeals.reduce((sum, meal) => sum + meal.macros.fat, 0)}g
                  </Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveMealPlan}
            >
              <Ionicons name="save-outline" size={20} color={Colors.white} />
              <Text style={styles.saveButtonText}>Save Meal Plan</Text>
            </TouchableOpacity>
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
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    marginTop: 12,
    fontSize: 16,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
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
    fontSize: 16,
    marginBottom: 8,
    color: Colors.text,
    fontWeight: '600',
  },
  inputContainer: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  textInput: {
    flex: 1,
    color: Colors.text,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 16,
  },
  inputSuffix: {
    color: Colors.textSecondary,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    // Ajustar altura según plataforma
    ...(Platform.OS === 'ios' && {
      height: 100,
      justifyContent: 'center',
    }),
  },
  picker: {
    color: Colors.text,
    height: Platform.OS === 'ios' ? 100 : 50,
    width: '100%',
    // Para iOS, ajustar el posicionamiento
    ...(Platform.OS === 'ios' && {
      marginTop: -8,
      marginBottom: -8,
    }),
  },
  pickerItem: {
    color: Colors.text,
    height: Platform.OS === 'ios' ? 100 : 50,
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
  mealsContainer: {
    marginBottom: 32,
  },
  mealsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  mealCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
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
  macroRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
  },
  macroItem: {
    flex: 1,
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  foodsHeader: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  foodsTitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  foodsList: {
    padding: 12,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
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
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textSecondary,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  totalContainer: {
    marginTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  totalMacroRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  totalMacroItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  totalMacroLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  totalMacroValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  // Modal styles
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
  modalIcon: {
    alignSelf: 'center',
    marginBottom: 16,
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
  modalInputContainer: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 20,
  },
  modalTextInput: {
    flex: 1,
    color: Colors.text,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 16,
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
  // Loading overlay
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
  // Success indicator
  saveSuccess: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
  },
  saveSuccessText: {
    color: Colors.white,
    fontSize: 14,
    marginLeft: 8,
  },
});

export default NutritionMealsScreen;