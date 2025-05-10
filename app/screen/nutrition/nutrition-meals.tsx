// app/screen/nutrition/nutrition-meals.tsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
  TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../../constants/Colors';
import foods from '../../../data/food/foods';

function NutritionMealsScreen() {
  const [calories, setCalories] = useState('2000');
  const [goal, setGoal] = useState('maintainMuscle');
  const [mealsPerDay, setMealsPerDay] = useState('5');
  const [generatedMeals, setGeneratedMeals] = useState<any[]>([]);

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
    
    Alert.alert('Success', 'Meal plan generated successfully.');
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
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
                <Picker.Item label="Lose Fat (Protein 40% / Carbs 30% / Fat 30%)" value="loseFat" color={Colors.text} />
                <Picker.Item label="Maintain Muscle (Protein 30% / Carbs 40% / Fat 30%)" value="maintainMuscle" color={Colors.text} />
                <Picker.Item label="Build Muscle (Protein 30% / Carbs 50% / Fat 20%)" value="buildMuscle" color={Colors.text} />
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
});

export default NutritionMealsScreen;