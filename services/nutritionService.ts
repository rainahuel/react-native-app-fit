// services/nutritionService.ts
import api from './api';

export interface NutritionGoal {
  _id: string;
  name: string;
  status: string;
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
  createdAt: string;
}

// Obtener todos los objetivos nutricionales del usuario
const getNutritionGoals = async (): Promise<NutritionGoal[]> => {
  try {
    const response = await api.get('/nutrition-goals');
    return response.data;
  } catch (error) {
    console.error('Error fetching nutrition goals:', error);
    return [];
  }
};

// Obtener un objetivo nutricional por ID
const getNutritionGoalById = async (id: string): Promise<NutritionGoal | null> => {
  try {
    const response = await api.get(`/nutrition-goals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching nutrition goal with id ${id}:`, error);
    return null;
  }
};

// Crear un nuevo objetivo nutricional
const createNutritionGoal = async (data: Partial<NutritionGoal>): Promise<NutritionGoal | null> => {
  try {
    const response = await api.post('/nutrition-goals', data);
    return response.data;
  } catch (error) {
    console.error('Error creating nutrition goal:', error);
    throw error;
  }
};

// Actualizar un objetivo nutricional
const updateNutritionGoal = async (id: string, data: Partial<NutritionGoal>): Promise<NutritionGoal | null> => {
  try {
    const response = await api.put(`/nutrition-goals/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating nutrition goal with id ${id}:`, error);
    throw error;
  }
};

export default {
  getNutritionGoals,
  getNutritionGoalById,
  createNutritionGoal,
  updateNutritionGoal
};