// hooks/useRefreshableData.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRefreshContext, RefreshableDataType } from '../context/RefreshContext';

interface UseRefreshableDataOptions<T> {
  fetchFunction: () => Promise<T[]>;
  dataType: RefreshableDataType;
  dependencies?: any[];
  initialData?: T[];
}

export function useRefreshableData<T>({
  fetchFunction,
  dataType,
  dependencies = [],
  initialData = []
}: UseRefreshableDataOptions<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { refreshCounters, triggerRefresh } = useRefreshContext();
  const lastFetchedCountRef = useRef(refreshCounters[dataType]);
  
  // Function to refresh data manually
  const refresh = useCallback(() => {
    console.log(`Manual refresh triggered for ${dataType}`);
    triggerRefresh(dataType);
  }, [triggerRefresh, dataType]);
  
  // Effect to load data when dependencies change or refresh is triggered
  useEffect(() => {
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
        console.error(`Error fetching data for ${dataType}:`, err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
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
  }, [...dependencies, refreshCounters[dataType]]);

  return {
    data,
    isLoading,
    error,
    refresh,
    setData
  };
}