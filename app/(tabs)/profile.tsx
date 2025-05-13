// app/(tabs)/profile.tsx
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import nutritionService from '../../services/nutritionService';
import mealService from '../../services/mealService';
import workoutService from '../../services/workoutService';
import Colors from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useRefreshContext, RefreshableDataType } from '@/context/RefreshContext';
import { useRefreshableData } from '@/hooks/useRefreshableData';

// Tipos para la información guardada
interface NutritionGoal {
    id: string;
    name: string;
    status?: string;
    calorieCalculation?: {
        calorieTarget: number;
        bmr?: number;
        tdee?: number;
        goalType?: string;
        estimatedWeeklyChange?: number;
    };
    macroDistribution?: {
        protein: { grams: number; percentage: number };
        carbs: { grams: number; percentage: number };
        fat: { grams: number; percentage: number };
    };
    createdAt: any;
}

interface MealPlan {
    id: string;
    name: string;
    createdAt: any;
    settings: {
        calories: number;
        mealsPerDay: number;
        goal: string;
    };
    dailyTotals: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
}
interface WorkoutPlan {
    id: string;
    methodName: string;
    goal: string;
    level: string;
    daysPerWeek: number;
    createdAt: any;
    status: string;
    progress?: {
        daysCompleted: number;
        totalDays: number;
    };
}

export default function ProfileScreen() {
    const router = useRouter();
    const { user, userData, signOut, isAuthenticated, isLoading } = useAuth();
    const { refreshCounters, triggerRefresh } = useRefreshContext();

    // Usar el hook useRefreshableData para cada tipo de datos
    const {
        data: nutritionGoalsData,
        isLoading: isLoadingNutrition,
    } = useRefreshableData<any>({
        fetchFunction: () => nutritionService.getNutritionGoals(),
        dataType: 'nutritionGoals' as RefreshableDataType,
        dependencies: [isAuthenticated, user?._id]
    });

    const {
        data: mealPlansData,
        isLoading: isLoadingMeals,
    } = useRefreshableData<any>({
        fetchFunction: () => mealService.getMealPlans(),
        dataType: 'mealPlans' as RefreshableDataType,
        dependencies: [isAuthenticated, user?._id]
    });

    const {
        data: workoutPlansData,
        isLoading: isLoadingWorkouts,
    } = useRefreshableData<any>({
        fetchFunction: () => workoutService.getWorkoutPlans('active'),
        dataType: 'workoutPlans' as RefreshableDataType,
        dependencies: [isAuthenticated, user?._id]
    });

    // Estados para los datos procesados
    const [nutritionGoal, setNutritionGoal] = useState<NutritionGoal | null>(null);
    const [recentMealPlans, setRecentMealPlans] = useState<MealPlan[]>([]);
    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);

    // Procesar objetivos de nutrición cuando los datos cambian
    useEffect(() => {
        if (nutritionGoalsData && nutritionGoalsData.length > 0) {
            // Filtrar los objetivos activos
            const activeGoals = nutritionGoalsData
                .filter((goal: any) => goal.status === 'active')
                .map((goal: any) => ({
                    id: goal._id,
                    ...goal,
                    createdAt: new Date(goal.createdAt)
                }));

            // Ordenar por fecha manualmente
            activeGoals.sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());

            if (activeGoals.length > 0) {
                setNutritionGoal(activeGoals[0] as NutritionGoal);
                console.log("Active nutrition goal found:", activeGoals[0].id);
            } else {
                setNutritionGoal(null);
            }
        } else {
            setNutritionGoal(null);
        }
    }, [nutritionGoalsData]);

    // Procesar planes de comida cuando los datos cambian
    useEffect(() => {
        if (mealPlansData && mealPlansData.length > 0) {
            const plans = mealPlansData.map((plan: any) => ({
                id: plan._id,
                ...plan,
                createdAt: new Date(plan.createdAt)
            }));

            // Ordenar manualmente por fecha (más reciente primero)
            plans.sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());

            // Tomar solo los 3 más recientes
            const recentPlans = plans.slice(0, 3);

            setRecentMealPlans(recentPlans as MealPlan[]);
            console.log("Meal plans loaded:", recentPlans.length);
        } else {
            setRecentMealPlans([]);
        }
    }, [mealPlansData]);

    // Procesar planes de entrenamiento cuando los datos cambian
    useEffect(() => {
        if (workoutPlansData && workoutPlansData.length > 0) {
            const plans = workoutPlansData.map((plan: any) => ({
                id: plan._id,
                ...plan,
                createdAt: new Date(plan.createdAt)
            }));

            // Ordenar manualmente por fecha (más reciente primero)
            plans.sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());

            // Establecer los planes activos
            setWorkoutPlans(plans as WorkoutPlan[]);
            console.log("Workout plans loaded:", plans.length);
        } else {
            setWorkoutPlans([]);
        }
    }, [workoutPlansData]);

    const isLoadingUserData = isLoadingNutrition || isLoadingMeals || isLoadingWorkouts;

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Log Out",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await signOut();
                            console.log("User logged out successfully");
                        } catch (error) {
                            console.error("Error signing out:", error);
                            Alert.alert("Error", "Failed to log out. Please try again.");
                        }
                    }
                }
            ]
        );
    };


    // Añadir antes del return del componente ProfileScreen
    const handleDeleteWorkoutPlan = (planId: string) => {
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
                            await workoutService.deleteWorkoutPlan(planId);

                            // Actualizar los planes de entrenamiento en el perfil
                            triggerRefresh('workoutPlans');

                            Alert.alert(
                                "Success",
                                "Workout plan deleted successfully."
                            );
                        } catch (error) {
                            console.error("Error deleting workout plan:", error);
                            Alert.alert(
                                "Error",
                                "Failed to delete the workout plan. Please try again."
                            );
                        }
                    }
                }
            ]
        );
    };

    // Función para mostrar el texto del objetivo
    const renderGoalText = (goalType?: string) => {
        if (!goalType) return 'Custom';

        switch (goalType) {
            case 'deficit':
                return 'Fat Loss';
            case 'aggressiveDeficit':
                return 'Aggressive Fat Loss';
            case 'maintenance':
                return 'Maintenance';
            case 'surplus':
                return 'Muscle Gain';
            default:
                return 'Custom';
        }
    };

    // Si está cargando, mostrar indicador de carga
    if (isLoading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    // Si no está autenticado, mostrar pantalla de invitación
    if (!isAuthenticated || !user) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.guestContainer, styles.centerContent]}>
                    <Ionicons name="person-circle-outline" size={80} color={Colors.primary} />
                    <Text style={styles.guestTitle}>Welcome to Built by Rain</Text>
                    <Text style={styles.guestSubtitle}>
                        Create an account to track your fitness journey, save your workout plans and
                        nutrition goals.
                    </Text>

                    <View style={styles.guestButtonsContainer}>
                        <TouchableOpacity
                            style={styles.guestPrimaryButton}
                            onPress={() => router.push('/(auth)/login')}
                        >
                            <Text style={styles.guestPrimaryButtonText}>Log In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.guestSecondaryButton}
                            onPress={() => router.push('/(auth)/register')}
                        >
                            <Text style={styles.guestSecondaryButtonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.guestFeatureList}>
                        <Text style={styles.guestFeatureTitle}>What you get with an account:</Text>

                        <View style={styles.guestFeatureItem}>
                            <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                            <Text style={styles.guestFeatureText}>Save your workout routines</Text>
                        </View>

                        <View style={styles.guestFeatureItem}>
                            <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                            <Text style={styles.guestFeatureText}>Track your nutrition goals</Text>
                        </View>

                        <View style={styles.guestFeatureItem}>
                            <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                            <Text style={styles.guestFeatureText}>Generate personalized meal plans</Text>
                        </View>

                        <View style={styles.guestFeatureItem}>
                            <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                            <Text style={styles.guestFeatureText}>Monitor your progress over time</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    // Usuario autenticado - mostrar información básica y datos guardados
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.userContainer}>
                {/* Sección de cabecera con información del usuario */}
                <View style={styles.headerSection}>
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImage}>
                            <Text style={styles.profileInitial}>
                                {userData?.displayName ? userData.displayName.charAt(0).toUpperCase() :
                                    user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.userName}>{userData?.displayName || user.email}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={22} color={Colors.white} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                {/* Cargando datos */}
                {isLoadingUserData && (
                    <View style={styles.loadingDataContainer}>
                        <ActivityIndicator size="small" color={Colors.primary} />
                        <Text style={styles.loadingDataText}>Loading your data...</Text>
                    </View>
                )}

                {/* Sección de objetivo nutricional si existe */}
                {nutritionGoal && nutritionGoal.calorieCalculation && (
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="nutrition-outline" size={22} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Nutrition Goal</Text>
                        </View>

                        <View style={styles.cardContainer}>
                            <View style={styles.nutritionHeader}>
                                <View>
                                    <Text style={styles.nutritionGoalTitle}>
                                        {renderGoalText(nutritionGoal.calorieCalculation.goalType)}
                                    </Text>
                                    <Text style={styles.nutritionGoalDate}>
                                        Created {nutritionGoal.createdAt.toLocaleDateString()}
                                    </Text>
                                </View>

                                <View style={styles.nutritionCaloriesBadge}>
                                    <Text style={styles.nutritionCaloriesValue}>{nutritionGoal.calorieCalculation.calorieTarget}</Text>
                                    <Text style={styles.nutritionCaloriesLabel}>kcal/day</Text>
                                </View>
                            </View>

                            {nutritionGoal.macroDistribution && (
                                <View style={styles.macroContainer}>
                                    <Text style={styles.macroTitle}>Macronutrient Distribution</Text>

                                    <View style={styles.macroBarContainer}>
                                        <View style={styles.macroBarOuter}>
                                            <View
                                                style={[
                                                    styles.macroBarSegment,
                                                    {
                                                        width: `${nutritionGoal.macroDistribution.protein.percentage}%`,
                                                        backgroundColor: 'rgba(255, 99, 132, 0.8)'
                                                    }
                                                ]}
                                            />
                                            <View
                                                style={[
                                                    styles.macroBarSegment,
                                                    {
                                                        width: `${nutritionGoal.macroDistribution.carbs.percentage}%`,
                                                        backgroundColor: 'rgba(54, 162, 235, 0.8)'
                                                    }
                                                ]}
                                            />
                                            <View
                                                style={[
                                                    styles.macroBarSegment,
                                                    {
                                                        width: `${nutritionGoal.macroDistribution.fat.percentage}%`,
                                                        backgroundColor: 'rgba(255, 206, 86, 0.8)'
                                                    }
                                                ]}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.macroRow}>
                                        <View style={styles.macroInfo}>
                                            <View style={[styles.macroColorDot, { backgroundColor: 'rgba(255, 99, 132, 0.8)' }]} />
                                            <Text style={styles.macroLabel}>Protein: </Text>
                                            <Text style={styles.macroValue}>{nutritionGoal.macroDistribution.protein.grams}g</Text>
                                        </View>

                                        <View style={styles.macroInfo}>
                                            <View style={[styles.macroColorDot, { backgroundColor: 'rgba(54, 162, 235, 0.8)' }]} />
                                            <Text style={styles.macroLabel}>Carbs: </Text>
                                            <Text style={styles.macroValue}>{nutritionGoal.macroDistribution.carbs.grams}g</Text>
                                        </View>

                                        <View style={styles.macroInfo}>
                                            <View style={[styles.macroColorDot, { backgroundColor: 'rgba(255, 206, 86, 0.8)' }]} />
                                            <Text style={styles.macroLabel}>Fat: </Text>
                                            <Text style={styles.macroValue}>{nutritionGoal.macroDistribution.fat.grams}g</Text>
                                        </View>
                                    </View>
                                </View>
                            )}

                            <View style={styles.actionsRow}>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => router.push('/screen/nutrition/calories-calculator')}
                                >
                                    <Text style={styles.actionButtonText}>Update Calories</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => router.push('/screen/nutrition/macro-calculator')}
                                >
                                    <Text style={styles.actionButtonText}>Update Macros</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                {/* Sección de planes de comida recientes */}
                {recentMealPlans.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="restaurant-outline" size={22} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Recent Meal Plans</Text>
                        </View>

                        {recentMealPlans.map((plan, index) => (
                            <View key={index} style={styles.mealPlanCard}>
                                <View style={styles.mealPlanHeader}>
                                    <Text style={styles.mealPlanTitle}>{plan.name}</Text>
                                    <Text style={styles.mealPlanDate}>{plan.createdAt.toLocaleDateString()}</Text>
                                </View>

                                <View style={styles.mealPlanDetails}>
                                    <View style={styles.mealPlanDetail}>
                                        <Text style={styles.mealPlanDetailLabel}>Calories:</Text>
                                        <Text style={styles.mealPlanDetailValue}>{plan.dailyTotals.calories} kcal</Text>
                                    </View>

                                    <View style={styles.mealPlanDetail}>
                                        <Text style={styles.mealPlanDetailLabel}>Meals:</Text>
                                        <Text style={styles.mealPlanDetailValue}>{plan.settings.mealsPerDay} per day</Text>
                                    </View>

                                    <View style={styles.mealPlanDetail}>
                                        <Text style={styles.mealPlanDetailLabel}>Goal:</Text>
                                        <Text style={styles.mealPlanDetailValue}>
                                            {plan.settings.goal === 'loseFat' ? 'Fat Loss' :
                                                plan.settings.goal === 'maintainMuscle' ? 'Maintain Muscle' :
                                                    plan.settings.goal === 'buildMuscle' ? 'Build Muscle' : 'Custom'}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.viewDetailButton}
                                    onPress={() => router.push({
                                        pathname: '/screen/nutrition/meal-plan-details',
                                        params: { id: plan.id }
                                    })}
                                >
                                    <Text style={styles.viewDetailButtonText}>View Details</Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => router.push('/screen/nutrition/nutrition-meals')}
                        >
                            <Text style={styles.secondaryButtonText}>Create New Meal Plan</Text>
                        </TouchableOpacity>
                    </View>
                )}


                {workoutPlans.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="fitness-outline" size={22} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Active Workout Plans</Text>
                        </View>

                        {workoutPlans.map((plan, index) => (
                            <View key={index} style={styles.mealPlanCard}>
                                <View style={styles.mealPlanHeader}>
                                    <Text style={styles.mealPlanTitle}>{plan.methodName}</Text>
                                    <Text style={styles.mealPlanDate}>{plan.createdAt.toLocaleDateString()}</Text>
                                </View>

                                <View style={styles.mealPlanDetails}>
                                    <View style={styles.mealPlanDetail}>
                                        <Text style={styles.mealPlanDetailLabel}>Goal:</Text>
                                        <Text style={styles.mealPlanDetailValue}>
                                            {plan.goal === 'loseFat' ? 'Fat Loss' :
                                                plan.goal === 'maintainMuscle' ? 'Maintain Muscle' :
                                                    plan.goal === 'gainStrength' ? 'Gain Strength' :
                                                        plan.goal === 'buildMuscle' ? 'Build Muscle' : 'Custom'}
                                        </Text>
                                    </View>

                                    <View style={styles.mealPlanDetail}>
                                        <Text style={styles.mealPlanDetailLabel}>Level:</Text>
                                        <Text style={styles.mealPlanDetailValue}>
                                            {plan.level.charAt(0).toUpperCase() + plan.level.slice(1)}
                                        </Text>
                                    </View>

                                    <View style={styles.mealPlanDetail}>
                                        <Text style={styles.mealPlanDetailLabel}>Days/Week:</Text>
                                        <Text style={styles.mealPlanDetailValue}>{plan.daysPerWeek}</Text>
                                    </View>

                                    {plan.progress && (
                                        <View style={styles.mealPlanDetail}>
                                            <Text style={styles.mealPlanDetailLabel}>Progress:</Text>
                                            <Text style={styles.mealPlanDetailValue}>
                                                {plan.progress.daysCompleted} of {plan.progress.totalDays} days
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <TouchableOpacity
                                    style={styles.viewDetailButton}
                                    onPress={() => router.push({
                                        pathname: '/screen/workouts/workout-details',
                                        params: { id: plan._id || plan.id }
                                    })}
                                >
                                    <Text style={styles.viewDetailButtonText}>View Workout</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDeleteWorkoutPlan(plan.id)}
                                >
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => router.push('/(tabs)/workout')}
                        >
                            <Text style={styles.secondaryButtonText}>Create New Workout Plan</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Sección de acciones rápidas */}
                <View style={styles.quickLinksContainer}>
                    <Text style={styles.quickLinksTitle}>Quick Actions</Text>

                    <TouchableOpacity
                        style={styles.quickLinkButton}
                        onPress={() => router.push('/screen/nutrition/nutrition-meals')}
                    >
                        <Ionicons name="nutrition-outline" size={20} color={Colors.primary} />
                        <Text style={styles.quickLinkText}>Generate Meal Plan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickLinkButton}
                        onPress={() => router.push('/screen/nutrition/calories-calculator')}
                    >
                        <Ionicons name="calculator-outline" size={20} color={Colors.primary} />
                        <Text style={styles.quickLinkText}>Calculate Calories</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickLinkButton}
                        onPress={() => router.push('/(tabs)/workout')}
                    >
                        <Ionicons name="fitness-outline" size={20} color={Colors.primary} />
                        <Text style={styles.quickLinkText}>Create Workout Plan</Text>
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
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        color: Colors.textSecondary,
        marginTop: 12,
        fontSize: 16,
    },
    loadingDataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    loadingDataText: {
        color: Colors.textSecondary,
        marginLeft: 8,
        fontSize: 14,
    },

    // Estilos para usuario no autenticado (guest)
    guestContainer: {
        padding: 20,
    },
    guestTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.white,
        marginTop: 20,
        marginBottom: 12,
        textAlign: 'center',
    },
    guestSubtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
    },
    guestButtonsContainer: {
        width: '100%',
        marginBottom: 32,
    },
    guestPrimaryButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    guestPrimaryButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    guestSecondaryButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    guestSecondaryButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    guestFeatureList: {
        width: '100%',
    },
    guestFeatureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 16,
    },
    guestFeatureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    guestFeatureText: {
        fontSize: 16,
        color: Colors.white,
        marginLeft: 12,
    },

    // Estilos para usuario autenticado
    userContainer: {
        flex: 1,
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    profileImageContainer: {
        marginRight: 12,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitial: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.white,
    },
    userInfoContainer: {
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    logoutText: {
        color: Colors.white,
        marginLeft: 4,
        fontSize: 14,
    },

    // Secciones de Datos
    sectionContainer: {
        padding: 16,
        marginBottom: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
        marginLeft: 8,
    },
    cardContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },

    // Nutrición
    nutritionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    nutritionGoalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
    },
    nutritionGoalDate: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    nutritionCaloriesBadge: {
        backgroundColor: Colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    nutritionCaloriesValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
    },
    nutritionCaloriesLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
    },

    // Macros
    macroContainer: {
        marginBottom: 16,
    },
    macroTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 10,
    },
    macroBarContainer: {
        marginBottom: 10,
    },
    macroBarOuter: {
        height: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 6,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    macroBarSegment: {
        height: '100%',
    },
    macroRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    macroInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    macroColorDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    macroLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    macroValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.white,
    },

    // Meal Plans
    mealPlanCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    mealPlanHeader: {
        marginBottom: 10,
    },
    mealPlanTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.white,
    },
    mealPlanDate: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    mealPlanDetails: {
        marginBottom: 12,
    },
    mealPlanDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    mealPlanDetailLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    mealPlanDetailValue: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '500',
    },
    viewDetailButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    viewDetailButtonText: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '600',
    },

    // Botones
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    actionButtonText: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 4,
    },
    secondaryButtonText: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '600',
    },

    // Quick Links
    quickLinksContainer: {
        padding: 16,
        marginBottom: 20,
    },
    quickLinksTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 12,
    },
    quickLinkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    quickLinkText: {
        color: Colors.white,
        fontSize: 16,
        marginLeft: 12,
    },
    planButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: 'rgba(255, 59, 48, 0.6)',  // Rojo con transparencia
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
    },
    deleteButtonText: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '600',
    },
});