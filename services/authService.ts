// services/authService.ts
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos
export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type UserData = {
  _id: string;
  displayName: string;
  email: string;
  createdAt?: string;
  lastLogin?: string;
  profile?: {
    gender?: string;
    age?: number;
    height?: number;
    weight?: number;
    dailyActivity?: {
      sleepHours?: number;
      sittingHours?: number;
      walkingMinutes?: number;
      strengthMinutes?: number;
      cardioMinutes?: number;
    }
  };
  token?: string;
};

// Guardar token en AsyncStorage
const saveToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

// Obtener token de AsyncStorage
const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('token');
};

// Eliminar token de AsyncStorage
const removeToken = async () => {
  await AsyncStorage.removeItem('token');
};

// Iniciar sesión
const login = async (credentials: LoginCredentials): Promise<UserData> => {
  try {
    const response = await api.post('/users/login', credentials);
    const { token, ...userData } = response.data;
    
    // Guardar token en AsyncStorage
    if (token) {
      await saveToken(token);
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

// Registrar nuevo usuario
const register = async (data: RegisterData): Promise<UserData> => {
  try {
    const response = await api.post('/users', data);
    const { token, ...userData } = response.data;
    
    // Guardar token en AsyncStorage
    if (token) {
      await saveToken(token);
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// Cerrar sesión
const logout = async (): Promise<void> => {
  try {
    await removeToken();
  } catch (error: any) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Obtener perfil del usuario
const getUserProfile = async (): Promise<UserData> => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error: any) {
    console.error('Get profile error:', error.response?.data || error.message);
    throw error;
  }
};

// Actualizar perfil del usuario
const updateUserProfile = async (data: Partial<UserData>): Promise<UserData> => {
  try {
    const response = await api.put('/users/profile', data);
    return response.data;
  } catch (error: any) {
    console.error('Update profile error:', error.response?.data || error.message);
    throw error;
  }
};

// Verificar si el usuario está autenticado al iniciar la app
const checkAuthStatus = async (): Promise<UserData | null> => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }
    
    // Intentar obtener perfil para verificar si el token es válido
    const userData = await getUserProfile();
    return userData;
  } catch (error) {
    console.error('Auth check error:', error);
    await removeToken();
    return null;
  }
};

export default {
  login,
  register,
  logout,
  getUserProfile,
  updateUserProfile,
  checkAuthStatus,
  getToken,
  saveToken,
  removeToken
};