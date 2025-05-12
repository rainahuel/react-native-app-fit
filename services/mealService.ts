// services/mealService.ts
import api from './api';

export interface MealPlan {
  _id: string;
  name: string;
  createdAt: string;
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
  meals: any[]; // Puedes definir una interfaz más específica si es necesario
}

// Obtener todos los planes de comidas
const getMealPlans = async (): Promise<MealPlan[]> => {
  try {
    const response = await api.get('/meal-plans');
    return response.data;
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    return [];
  }
};

// Obtener un plan de comidas por ID
const getMealPlanById = async (id: string): Promise<MealPlan | null> => {
  try {
    const response = await api.get(`/meal-plans/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching meal plan with id ${id}:`, error);
    return null;
  }
};

// Crear un nuevo plan de comidas
const createMealPlan = async (data: Partial<MealPlan>): Promise<MealPlan | null> => {
  try {
    const response = await api.post('/meal-plans', data);
    return response.data;
  } catch (error) {
    console.error('Error creating meal plan:', error);
    throw error;
  }
};

const deleteMealPlan = async (id: string): Promise<void> => {
    try {
      await api.delete(`/meal-plans/${id}`);
    } catch (error) {
      console.error(`Error deleting meal plan with id ${id}:`, error);
      throw error;
    }
  };

export default {
  getMealPlans,
  getMealPlanById,
  createMealPlan,
  deleteMealPlan
};