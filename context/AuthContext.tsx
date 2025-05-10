import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp, 
  updateDoc 
} from 'firebase/firestore';
import { auth, db } from '../firebase';

type UserData = {
  displayName?: string;
  email?: string;
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
  }
};

type User = {
  uid: string;
  email: string | null;
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

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      
      if (firebaseUser) {
        setIsAuthenticated(true);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email
        });
        
        // Cargar datos del usuario desde Firestore
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
            
            // Actualizar lastLogin
            await updateDoc(userDocRef, {
              lastLogin: serverTimestamp()
            });
          } else {
            console.log("No user data found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // Usuario no autenticado
        setIsAuthenticated(false);
        setUser(null);
        setUserData(null);
      }
      
      setIsLoading(false);
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  // Iniciar sesión con email y contraseña
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // La actualización de isAuthenticated y user se manejará en el efecto onAuthStateChanged
      // Aquí solo actualizamos lastLogin en la base de datos
      await updateDoc(doc(db, 'users', userCredential.user.uid), {
        lastLogin: serverTimestamp()
      });
      
      console.log('Login successful:', email);
    } catch (error: any) {
      console.error('Login error:', error.code, error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Registrar un nuevo usuario
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setIsLoading(true);
      // Crear cuenta en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar el perfil con el displayName
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName });
      }
      
      // Crear documento de usuario en Firestore
      const newUserData: UserData = {
        displayName,
        email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        profile: {
          // Los valores iniciales pueden ser rellenados posteriormente
          dailyActivity: {
            sleepHours: 8,
            sittingHours: 8,
            walkingMinutes: 30,
            strengthMinutes: 0,
            cardioMinutes: 0
          }
        }
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), newUserData);
      
      console.log('Registration successful:', email);
    } catch (error: any) {
      console.error('Registration error:', error.code, error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Cerrar sesión
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      // El resto se maneja en el efecto onAuthStateChanged
      console.log('Sign out successful');
    } catch (error: any) {
      console.error('Sign out error:', error.code, error.message);
      throw error;
    }
  };

  // Actualizar datos del usuario
  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, data);
      
      // Actualizar el estado local
      setUserData(prevData => {
        if (!prevData) return data as UserData;
        return { ...prevData, ...data };
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