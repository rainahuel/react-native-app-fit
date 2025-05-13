// services/workoutService.ts
import api from './api';

export interface WorkoutPlan {
  _id: string;
  methodName: string;
  methodKey: string;
  goal: string;
  level: string;
  daysPerWeek: number;
  createdAt: string;
  status: string;
  progress?: {
    daysCompleted: number;
    totalDays: number;
  };
  routineData?: any[]; 
}

// Obtener todos los planes de entrenamiento
const getWorkoutPlans = async (status?: string): Promise<WorkoutPlan[]> => {
  try {
    const url = status ? `/workout-plans?status=${status}` : '/workout-plans';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching workout plans:', error);
    return [];
  }
};

// Obtener un plan de entrenamiento por ID
const getWorkoutPlanById = async (id: string): Promise<WorkoutPlan | null> => {
  try {
    const response = await api.get(`/workout-plans/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching workout plan with id ${id}:`, error);
    return null;
  }
};


const createWorkoutPlan = async (data: Partial<WorkoutPlan>): Promise<WorkoutPlan | null> => {
  try {
    const response = await api.post('/workout-plans', data);
    return response.data;
  } catch (error) {
    console.error('Error creating workout plan:', error);
    throw error;
  }
};

// Actualizar el progreso de un plan de entrenamiento
const updateWorkoutProgress = async (id: string, daysCompleted: number): Promise<WorkoutPlan | null> => {
  try {
    const response = await api.patch(`/workout-plans/${id}/progress`, { daysCompleted });
    return response.data;
  } catch (error) {
    console.error(`Error updating workout progress with id ${id}:`, error);
    throw error;
  }
};

const deleteWorkoutPlan = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/workout-plans/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting workout plan with id ${id}:`, error);
    throw error;
  }
};

export default {
  getWorkoutPlans,
  getWorkoutPlanById,
  createWorkoutPlan,
  updateWorkoutProgress,
  deleteWorkoutPlan
};