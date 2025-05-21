// app/screen/nutrition/calories-calculator.tsx
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
  Modal,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import Colors from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import nutritionService from '../../../services/nutritionService';
import { useRefreshContext, RefreshableDataType } from '../../../context/RefreshContext';

interface ResultData {
  bmr: number;
  tdee: number;
  calories: number;
  kgPerWeek: number;
}

interface ChartEntry {
  label: string;
  calories: number;
}

function CaloriesCalculatorScreen() {
  const { user, userData, isAuthenticated, updateUserData } = useAuth();
  const router = useRouter();
  const { triggerMultipleRefresh } = useRefreshContext();

  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    goal: 'deficit',
    sleep: '',
    sitting: '',
    walking: '',
    strength: '',
    cardio: '',
  });

  const [result, setResult] = useState<ResultData | null>(null);
  const [chartData, setChartData] = useState<ChartEntry[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load user data if authenticated
  useEffect(() => {
    if (isAuthenticated && userData?.profile) {
      const profile = userData.profile;
      setFormData(prevState => ({
        ...prevState,
        age: profile.age?.toString() || '',
        weight: profile.weight?.toString() || '',
        height: profile.height?.toString() || '',
        gender: profile.gender || 'male',
        sleep: profile.dailyActivity?.sleepHours?.toString() || '',
        sitting: profile.dailyActivity?.sittingHours?.toString() || '',
        walking: profile.dailyActivity?.walkingMinutes?.toString() || '',
        strength: profile.dailyActivity?.strengthMinutes?.toString() || '',
        cardio: profile.dailyActivity?.cardioMinutes?.toString() || '',
      }));
    }
  }, [isAuthenticated, userData]);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const calculate = () => {
    const { age, weight, height, gender, goal, sleep, sitting, walking, strength, cardio } = formData;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    const sleepHours = parseFloat(sleep) || 0;
    const sittingHours = parseFloat(sitting) || 0;
    const walkingMinutes = parseFloat(walking) || 0;
    const strengthMinutes = parseFloat(strength) || 0;
    const cardioMinutes = parseFloat(cardio) || 0;

    if (!w || !h || !a) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const walkingHours = walkingMinutes / 60;
    const strengthHours = strengthMinutes / 60;
    const cardioHours = cardioMinutes / 60;

    const bmr = Math.floor(gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161);

    const sleepCalories = Math.floor(sleepHours * w * 0.95);
    const sittingCalories = Math.floor(sittingHours * w * 1.3);
    const walkingCalories = Math.floor(walkingHours * w * 3.5);
    const strengthCalories = Math.floor(strengthHours * w * 6.5);
    const cardioCalories = Math.floor(cardioHours * w * 9);



    const tdee = Math.floor(bmr + sleepCalories + sittingCalories + walkingCalories + strengthCalories + cardioCalories);

    let calories = tdee;
    let kcalDiff = 0;

    if (goal === "deficit") {
      calories = Math.floor(tdee * 0.85);
      kcalDiff = tdee - calories;
    } else if (goal === "aggressiveDeficit") {
      calories = Math.floor(tdee * 0.80);
      kcalDiff = tdee - calories;
    } else if (goal === "surplus") {
      calories = Math.floor(tdee * 1.1);
      kcalDiff = calories - tdee;
    }

    const kgPerWeek = kcalDiff > 0 ? Math.floor(kcalDiff * 7 / 7700 * 100) / 100 : 0;

    const calculationResult = {
      bmr: Math.floor(bmr),
      tdee: Math.floor(tdee),
      calories: Math.floor(calories),
      kgPerWeek,
    };

    setResult(calculationResult);

    setChartData([
      { label: "BMR", calories: Math.floor(bmr) },
      { label: "Sleep", calories: Math.floor(sleepCalories) },
      { label: "Sitting", calories: Math.floor(sittingCalories) },
      { label: "Walking", calories: Math.floor(walkingCalories) },
      { label: "Strength", calories: Math.floor(strengthCalories) },
      { label: "Cardio", calories: Math.floor(cardioCalories) },
    ]);

    // If the user is not authenticated, show the login modal
    if (!isAuthenticated && result) {
      setShowLoginModal(true);
    } else if (isAuthenticated && result) {
      // If authenticated, ask if they want to save the results
      Alert.alert(
        "Save Results",
        "Do you want to save these results to your profile?",
        [
          {
            text: "Not Now",
            style: "cancel"
          },
          {
            text: "Save",
            onPress: () => saveResultsToBackend(calculationResult)
          }
        ]
      );
    }
  };

  const saveResultsToBackend = async (resultData: ResultData) => {
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      return;
    }

    try {
      setIsSaving(true);

      // 1. Update user profile with the form data
      const userProfileData = {
        profile: {
          gender: formData.gender,
          age: parseInt(formData.age),
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height),
          dailyActivity: {
            sleepHours: parseFloat(formData.sleep) || 0,
            sittingHours: parseFloat(formData.sitting) || 0,
            walkingMinutes: parseFloat(formData.walking) || 0,
            strengthMinutes: parseFloat(formData.strength) || 0,
            cardioMinutes: parseFloat(formData.cardio) || 0
          }
        }
      };

      await updateUserData(userProfileData);

      // 2. Create a new nutrition goal
      const nutritionGoalData = {
        status: "active",
        name: `Calorie Goal - ${new Date().toLocaleDateString()}`,
        startDate: new Date().toISOString(),
        calorieCalculation: {
          bmr: resultData.bmr,
          tdee: resultData.tdee,
          calorieTarget: resultData.calories,
          goalType: formData.goal,
          estimatedWeeklyChange: resultData.kgPerWeek,
          components: {
            sleep: Math.floor(parseFloat(formData.sleep) * parseFloat(formData.weight) * 0.95) || 0,
            sitting: Math.floor(parseFloat(formData.sitting) * parseFloat(formData.weight) * 1.3) || 0,
            walking: Math.floor((parseFloat(formData.walking) / 60) * parseFloat(formData.weight) * 3.5) || 0,
            strength: Math.floor((parseFloat(formData.strength) / 60) * parseFloat(formData.weight) * 6.5) || 0,
            cardio: Math.floor((parseFloat(formData.cardio) / 60) * parseFloat(formData.weight) * 9) || 0
          }
        }
      };

      await nutritionService.createNutritionGoal(nutritionGoalData);

      triggerMultipleRefresh(['nutritionGoals', 'userProfile']);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      Alert.alert(
        "Success",
        "Your calorie calculation has been saved to your profile."
      );
    } catch (error) {
      console.error("Error saving data to server:", error);
      Alert.alert(
        "Error",
        "There was a problem saving your data. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Similar function to getPickerItemColor from WorkoutScreen to fix the white-on-white issue
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

          <Text style={styles.modalTitle}>Save Your Results</Text>

          <Text style={styles.modalText}>
            Create an account or sign in to save your calorie calculation and track your progress over time.
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

  const renderInputField = (name: string, placeholder: string, keyboardType = 'numeric') => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>
        {name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}
        {name === 'walking' || name === 'strength' || name === 'cardio'
          ? ' (mins/day)'
          : name === 'sleep' || name === 'sitting'
            ? ' (hrs/day)'
            : name === 'height'
              ? ' (cm)'
              : name === 'weight'
                ? ' (kg)'
                : ''}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType={keyboardType as any}
          value={formData[name as keyof typeof formData]}
          onChangeText={(value) => handleInputChange(name, value)}
          placeholder={placeholder}
          placeholderTextColor={Colors.textSecondary}
        />
      </View>
    </View>
  );

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
          <Text style={styles.title}>Calorie Calculator</Text>
          <Text style={styles.subtitle}>Enter your details to get personalized calorie targets</Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.formRow}>
            {renderInputField('age', 'Years')}
            {renderInputField('weight', 'Kilograms')}
          </View>

          <View style={styles.formRow}>
            {renderInputField('height', 'Centimeters')}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                  style={styles.picker}
                  dropdownIconColor={Colors.text}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Male" value="male" color={getPickerItemColor()} />
                  <Picker.Item label="Female" value="female" color={getPickerItemColor()} />
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.sectionDivider} />
          <Text style={styles.sectionTitle}>Daily Activity</Text>

          <View style={styles.formRow}>
            {renderInputField('sleep', 'Hours sleeping')}
            {renderInputField('sitting', 'Hours sitting')}
          </View>

          <View style={styles.formRow}>
            {renderInputField('walking', 'Minutes walking')}
            {renderInputField('strength', 'Minutes strength training')}
          </View>

          <View style={[styles.formGroup, { flex: 1 }]}>
            {renderInputField('cardio', 'Minutes cardio')}
            <View style={styles.formGroup}>
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Goal</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.goal}
                  onValueChange={(value) => handleInputChange('goal', value)}
                  style={styles.picker}
                  dropdownIconColor={Colors.text}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Lose Weight" value="deficit" color={getPickerItemColor()} />
                  <Picker.Item label="Lose Weight (Faster)" value="aggressiveDeficit" color={getPickerItemColor()} />
                  <Picker.Item label="Maintain" value="maintenance" color={getPickerItemColor()} />
                  <Picker.Item label="Gain Weight" value="surplus" color={getPickerItemColor()} />
                </Picker>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.generateButton} onPress={calculate}>
          <Text style={styles.generateButtonText}>Calculate Calories</Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.resultsContainer}>
            <View style={styles.resultCard}>
              <Text style={styles.resultCardTitle}>Your Calorie Results</Text>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>BMR:</Text>
                <Text style={styles.resultValue}>{result.bmr} kcal</Text>
              </View>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>TDEE (based on your routine):</Text>
                <Text style={styles.resultValue}>{result.tdee} kcal</Text>
              </View>

              <View style={styles.highlightRow}>
                <Text style={styles.highlightLabel}>Recommended Intake:</Text>
                <Text style={styles.highlightValue}>{result.calories} kcal/day</Text>
              </View>

              {formData.goal !== "maintenance" && (
                <>
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>
                      Estimated {formData.goal.includes("deficit") ? "weight loss" : "weight gain"}:
                    </Text>
                    <Text style={styles.resultValue}>{result.kgPerWeek} kg/week</Text>
                  </View>

                  {formData.goal === "aggressiveDeficit" && (
                    <View style={styles.warningContainer}>
                      <Text style={styles.warningText}>
                        ⚠️ Aggressive fat loss is not recommended for long periods. Monitor your energy, recovery, and progress weekly.
                      </Text>
                    </View>
                  )}

                  <Text style={styles.infoText}>
                    Use this calorie target for the next 2 weeks and then recalculate based on your progress.
                  </Text>
                </>
              )}

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

            <Text style={styles.disclaimerText}>
              ⚠️ This result is an approximation based on the Mifflin-St Jeor Equation and energy expenditure estimates from published averages. Results may vary depending on genetics, metabolism, and lifestyle.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Los estilos se mantienen igual
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
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  formGroup: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: Colors.text,
    fontWeight: '600',
    minHeight: 40,
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
  sectionDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 12,
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
  resultsContainer: {
    marginBottom: 32,
  },
  resultCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  resultCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  resultLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    flex: 1,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'right',
  },
  highlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  highlightLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    flex: 1,
  },
  highlightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'right',
  },
  warningContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  warningText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
  infoText: {
    color: Colors.textSecondary,
    fontSize: 15,
    marginTop: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  disclaimerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
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

export default CaloriesCalculatorScreen;