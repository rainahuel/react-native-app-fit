// context/AuthContext.tsx
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import authService, { UserData } from '../services/authService';

type User = {
  _id: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  userData: UserData | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  userData: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateUserData: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar estado de autenticación al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const userDataResponse = await authService.checkAuthStatus();
        
        if (userDataResponse) {
          setIsAuthenticated(true);
          setUser({
            _id: userDataResponse._id,
            email: userDataResponse.email
          });
          setUserData(userDataResponse);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setUserData(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setUser(null);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Iniciar sesión
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userDataResponse = await authService.login({ email, password });
      
      setIsAuthenticated(true);
      setUser({
        _id: userDataResponse._id,
        email: userDataResponse.email
      });
      setUserData(userDataResponse);
      
      console.log('Login successful:', email);
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Registrar usuario
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setIsLoading(true);
      const userDataResponse = await authService.register({
        name: displayName,
        email,
        password
      });
      
      setIsAuthenticated(true);
      setUser({
        _id: userDataResponse._id,
        email: userDataResponse.email
      });
      setUserData(userDataResponse);
      
      console.log('Registration successful:', email);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Cerrar sesión
  const signOut = async () => {
    try {
      await authService.logout();
      
      setIsAuthenticated(false);
      setUser(null);
      setUserData(null);
      
      console.log('Sign out successful');
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  // Actualizar datos del usuario
  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    try {
      const updatedUserData = await authService.updateUserProfile(data);
      
      // Actualizar el estado local
      setUserData(prevData => {
        if (!prevData) return updatedUserData;
        return { ...prevData, ...updatedUserData };
      });
      
      console.log('User data updated successfully');
    } catch (error: any) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        userData,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}