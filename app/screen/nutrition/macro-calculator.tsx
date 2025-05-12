// app/screen/nutrition/macro-calculator.tsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import Colors from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import nutritionService from '@/services/nutritionService';

interface MacroResult {
  proteinGrams: number;
  fatGrams: number;
  carbGrams: number;
  calories: number;
  proteinCals: number;
  fatCals: number;
  carbCals: number;
}

function MacroCalculatorScreen() {
  const { user, userData, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [goal, setGoal] = useState('deficit');
  const [result, setResult] = useState<MacroResult | null>(null);
  const [isLoadingNutritionGoal, setIsLoadingNutritionGoal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeNutritionGoalId, setActiveNutritionGoalId] = useState<string | null>(null);

  // Load active nutrition goal if user is authenticated
  useEffect(() => {
    const loadNutritionGoal = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        setIsLoadingNutritionGoal(true);
        
        // Consulta el objetivo nutricional activo más reciente usando nuestro servicio
        const nutritionGoals = await nutritionService.getNutritionGoals();
        
        if (nutritionGoals && nutritionGoals.length > 0) {
          // Filtramos manualmente por objetivos activos y ordenamos por fecha (más reciente primero)
          const activeGoals = nutritionGoals
            .filter(goal => goal.status === 'active')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            
          if (activeGoals.length > 0) {
            const goalData = activeGoals[0];
            
            if (goalData.calorieCalculation) {
              // Establecer las calorías del objetivo activo
              setCalories(goalData.calorieCalculation.calorieTarget.toString());
              
              // Establecer el tipo de objetivo basado en el cálculo de calorías
              if (goalData.calorieCalculation.goalType) {
                setGoal(goalData.calorieCalculation.goalType);
              }
              
              // Guardar el ID del objetivo para actualizaciones posteriores
              setActiveNutritionGoalId(goalData._id);
            }
          }
        }
        
        // Establecer el peso del perfil del usuario si está disponible
        if (userData?.profile?.weight) {
          setWeight(userData.profile.weight.toString());
        }
      } catch (error) {
        console.error("Error loading nutrition goal:", error);
      } finally {
        setIsLoadingNutritionGoal(false);
      }
    };

    loadNutritionGoal();
  }, [isAuthenticated, user, userData]);

  const calculateMacros = () => {
    const w = parseFloat(weight);
    const cal = parseInt(calories);
  
    if (!w || !cal || cal < 1000) {
      Alert.alert('Error', 'Please enter valid values for weight and calories (calories must be at least 1000).');
      return;
    }
  
    let proteinPerKg = 2.2;
    let fatPerKg = 0.8;
  
    if (goal === "maintenance") {
      proteinPerKg = 2.0;
      fatPerKg = 1.0;
    } else if (goal === "surplus") {
      proteinPerKg = 1.8;
      fatPerKg = 1.2;
    }
  
    const proteinGrams = Math.round(w * proteinPerKg);
    const fatGrams = Math.round(w * fatPerKg);
    const proteinCals = proteinGrams * 4;
    const fatCals = fatGrams * 9;
  
    const remainingCals = cal - (proteinCals + fatCals);
    const carbGrams = Math.round(remainingCals / 4);
  
    const macroResult = {
      proteinGrams,
      fatGrams,
      carbGrams,
      calories: cal,
      proteinCals,
      fatCals,
      carbCals: carbGrams * 4
    };
  
    setResult(macroResult);
    
    // If user is not authenticated, show the login modal
    if (!isAuthenticated && result) {
      setShowLoginModal(true);
    } else if (isAuthenticated && result) {
      // If authenticated, ask if they want to save the results
      Alert.alert(
        "Save Results",
        "Do you want to save these macro calculations to your profile?",
        [
          {
            text: "Not Now",
            style: "cancel"
          },
          {
            text: "Save",
            onPress: () => saveResultsToBackend(macroResult)
          }
        ]
      );
    }
  };

  const saveResultsToBackend = async (macroResult: MacroResult) => {
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      return;
    }

    try {
      setIsSaving(true);

      // Calcular porcentajes para macros
      const totalCals = macroResult.calories;
      const proteinPercentage = Math.round((macroResult.proteinCals / totalCals) * 100);
      const carbsPercentage = Math.round((macroResult.carbCals / totalCals) * 100);
      const fatPercentage = Math.round((macroResult.fatCals / totalCals) * 100);

      const macroDistribution = {
        protein: { 
          grams: macroResult.proteinGrams, 
          percentage: proteinPercentage 
        },
        carbs: { 
          grams: macroResult.carbGrams, 
          percentage: carbsPercentage 
        },
        fat: { 
          grams: macroResult.fatGrams, 
          percentage: fatPercentage 
        }
      };

      // Si tenemos un objetivo nutricional activo, actualizarlo
      if (activeNutritionGoalId) {
        await nutritionService.updateNutritionGoal(activeNutritionGoalId, {
          macroDistribution: macroDistribution,
          lastUpdated: new Date().toISOString()
        });
      } else {
        // Si no existe un objetivo activo, crear uno nuevo con información calórica básica y macros
        const newGoalData = {
          status: "active",
          name: `Nutrition Goal - ${new Date().toLocaleDateString()}`,
          startDate: new Date().toISOString(),
          calorieCalculation: {
            calorieTarget: macroResult.calories,
            goalType: goal
          },
          macroDistribution: macroDistribution
        };
        
        await nutritionService.createNutritionGoal(newGoalData);
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      Alert.alert(
        "Success",
        "Your macro calculation has been saved to your profile."
      );
    } catch (error) {
      console.error("Error saving macros:", error);
      Alert.alert(
        "Error",
        "There was a problem saving your data. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const getPickerItemColor = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return Colors.text;
    }
    return Colors.text;
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
          
          <Text style={styles.modalTitle}>Save Your Macros</Text>
          
          <Text style={styles.modalText}>
            Create an account or sign in to save your macro calculation and track your nutrition over time.
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
      
      {isSaving && (
        <View style={styles.savingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.savingText}>Saving...</Text>
        </View>
      )}
      
      {saveSuccess && (
        <View style={styles.saveSuccess}>
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.saveSuccessText}>Saved successfully!</Text>
        </View>
      )}
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Macro Calculator (Goal-Based)</Text>
          <Text style={styles.subtitle}>
            Enter your weight, daily calories, and training goal. Your macronutrient targets will adjust based on whether you're cutting, maintaining, or bulking.
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                placeholder="Enter your weight"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Daily Calorie Goal</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                value={calories}
                onChangeText={setCalories}
                placeholder="Enter daily calories"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>
            {isAuthenticated && activeNutritionGoalId && (
              <Text style={styles.infoText}>
                Value loaded from your saved calorie calculation.
              </Text>
            )}
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
                <Picker.Item label="Lose Fat" value="deficit" color={getPickerItemColor()} />
                <Picker.Item label="Maintain" value="maintenance" color={getPickerItemColor()} />
                <Picker.Item label="Gain Muscle" value="surplus" color={getPickerItemColor()} />
              </Picker>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateMacros}>
          <Text style={styles.calculateButtonText}>Calculate Macros</Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Your Macro Breakdown</Text>
            
            <View style={styles.macroRow}>
              <View style={[styles.macroItem, { backgroundColor: 'rgba(255, 99, 132, 0.2)' }]}>
                <Text style={styles.macroLabel}>Protein</Text>
                <Text style={styles.macroValue}>{result.proteinGrams}g</Text>
                <Text style={styles.macroPercent}>
                  {Math.round(result.proteinCals / result.calories * 100)}%
                </Text>
                <Text style={styles.macroCals}>{result.proteinCals} kcal</Text>
              </View>
              
              <View style={[styles.macroItem, { backgroundColor: 'rgba(54, 162, 235, 0.2)' }]}>
                <Text style={styles.macroLabel}>Carbs</Text>
                <Text style={styles.macroValue}>{result.carbGrams}g</Text>
                <Text style={styles.macroPercent}>
                  {Math.round(result.carbCals / result.calories * 100)}%
                </Text>
                <Text style={styles.macroCals}>{result.carbCals} kcal</Text>
              </View>
              
              <View style={[styles.macroItem, { backgroundColor: 'rgba(255, 206, 86, 0.2)' }]}>
                <Text style={styles.macroLabel}>Fat</Text>
                <Text style={styles.macroValue}>{result.fatGrams}g</Text>
                <Text style={styles.macroPercent}>
                  {Math.round(result.fatCals / result.calories * 100)}%
                </Text>
                <Text style={styles.macroCals}>{result.fatCals} kcal</Text>
              </View>
            </View>
            
            <View style={styles.totalCaloriesContainer}>
              <Text style={styles.totalCaloriesLabel}>Total Daily Calories:</Text>
              <Text style={styles.totalCaloriesValue}>{result.calories} kcal</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.macroGuideContainer}>
              <Text style={styles.macroGuideTitle}>Daily Target Summary</Text>
              
              <View style={styles.macroGuideRow}>
                <Text style={styles.macroGuideLabel}>Protein Target:</Text>
                <Text style={styles.macroGuideValue}>{result.proteinGrams} grams</Text>
              </View>
              
              <View style={styles.macroGuideRow}>
                <Text style={styles.macroGuideLabel}>Fat Target:</Text>
                <Text style={styles.macroGuideValue}>{result.fatGrams} grams</Text>
              </View>
              
              <View style={styles.macroGuideRow}>
                <Text style={styles.macroGuideLabel}>Carbohydrate Target:</Text>
                <Text style={styles.macroGuideValue}>{result.carbGrams} grams</Text>
              </View>
            </View>
            
            <Text style={styles.infoText}>
              These targets are based on your weight and goal. Adjust based on your individual response and progress.
            </Text>
            
            {!isAuthenticated && (
              <TouchableOpacity 
                style={styles.saveResultsButton}
                onPress={() => setShowLoginModal(true)}
              >
                <Ionicons name="save-outline" size={20} color={Colors.white} />
                <Text style={styles.saveResultsButtonText}>Save Results</Text>
              </TouchableOpacity>
            )}
            
            {isAuthenticated && (
              <TouchableOpacity 
                style={styles.saveResultsButton}
                onPress={() => saveResultsToBackend(result)}
                disabled={isSaving}
              >
                <Ionicons name="save-outline" size={20} color={Colors.white} />
                <Text style={styles.saveResultsButtonText}>
                  {isSaving ? "Saving..." : "Save to Profile"}
                </Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
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
  calculateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  calculateButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  macroItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  macroLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  macroPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginVertical: 4,
  },
  macroCals: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  totalCaloriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
  },
  totalCaloriesLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  totalCaloriesValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
  macroGuideContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 8,
    padding: 12,
  },
  macroGuideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  macroGuideRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  macroGuideLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  macroGuideValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  infoText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
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
  // Save button in results
  saveResultsButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saveResultsButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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

export default MacroCalculatorScreen;