// hooks/useRefreshableData.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRefreshContext, RefreshableDataType } from '../context/RefreshContext';
import { useAuth } from '../context/AuthContext'; // Añadir esta importación

interface UseRefreshableDataOptions<T> {
  fetchFunction: () => Promise<T[]>;
  dataType: RefreshableDataType;
  dependencies?: any[];
  initialData?: T[];
  requiresAuth?: boolean; // Nueva opción para indicar si la función requiere autenticación
}

export function useRefreshableData<T>({
  fetchFunction,
  dataType,
  dependencies = [],
  initialData = [],
  requiresAuth = true // Por defecto, asumimos que requiere autenticación
}: UseRefreshableDataOptions<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { refreshCounters, triggerRefresh } = useRefreshContext();
  const { isAuthenticated } = useAuth(); // Obtener estado de autenticación
  const lastFetchedCountRef = useRef(refreshCounters[dataType]);
  
  // Function to refresh data manually
  const refresh = useCallback(() => {
    console.log(`Manual refresh triggered for ${dataType}`);
    triggerRefresh(dataType);
  }, [triggerRefresh, dataType]);
  
  // Effect to load data when dependencies change or refresh is triggered
  useEffect(() => {
    // Si requiere autenticación y el usuario no está autenticado, no hacer fetch
    if (requiresAuth && !isAuthenticated) {
      setData(initialData); // Resetear a datos iniciales
      return;
    }
    
    // Check if we need to fetch based on refresh counter
    const shouldFetch = refreshCounters[dataType] !== lastFetchedCountRef.current;
    
    if (!shouldFetch && dependencies.length === 0) {
      return; // Skip if no dependencies changed and no refresh triggered
    }
    
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log(`Fetching data for ${dataType}...`);
        const result = await fetchFunction();
        
        if (isMounted) {
          console.log(`Data fetched for ${dataType}: ${result.length} items`);
          setData(result);
          lastFetchedCountRef.current = refreshCounters[dataType];
        }
      } catch (err) {
        // Solo mostrar y guardar el error si aún estamos autenticados
        // Esto evita mostrar errores 401 cuando hacemos logout
        if (isMounted) {
          if (!requiresAuth || isAuthenticated) {
            console.error(`Error fetching data for ${dataType}:`, err);
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
          } else {
            // Si el error ocurre porque no estamos autenticados, simplemente limpiamos los datos
            setData(initialData);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();
    
    return () => {
      isMounted = false;
    };
  }, [...dependencies, refreshCounters[dataType], isAuthenticated]); // Añadir isAuthenticated como dependencia

  return {
    data,
    isLoading,
    error,
    refresh,
    setData
  };
}