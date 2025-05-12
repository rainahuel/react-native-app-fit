// services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definir la URL base para la API
// Para desarrollo en dispositivo físico, usar la IP de tu máquina en lugar de localhost
const API_URL = 'http://10.0.2.2:3000/api'; // Para emulador Android
// const API_URL = 'http://localhost:3000/api'; // Para iOS simulator
// const API_URL = 'http://tu-ip-local:3000/api'; // Para dispositivo físico

// Crear instancia de axios con URL base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Manejar errores globales, como 401 para redireccionar a login
    if (error.response && error.response.status === 401) {
      // Token expirado o inválido
      await AsyncStorage.removeItem('token');
      // Aquí podrías disparar alguna acción para redirigir al login
    }
    return Promise.reject(error);
  }
);

export default api;