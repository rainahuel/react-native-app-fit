// context/RefreshContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Definir tipos específicos de datos que pueden ser actualizados
export type RefreshableDataType = 'nutritionGoals' | 'mealPlans' | 'workoutPlans' | 'userProfile';

type RefreshContextType = {
  refreshCounters: Record<RefreshableDataType, number>;
  triggerRefresh: (dataType: RefreshableDataType) => void;
  triggerMultipleRefresh: (dataTypes: RefreshableDataType[]) => void;
  shouldRefresh: (dataType: RefreshableDataType, dependencies: any[]) => boolean;
  lastRefreshTimestamp: Record<RefreshableDataType, number>;
};

const RefreshContext = createContext<RefreshContextType>({
  refreshCounters: {
    nutritionGoals: 0,
    mealPlans: 0,
    workoutPlans: 0,
    userProfile: 0
  },
  triggerRefresh: () => {},
  triggerMultipleRefresh: () => {},
  shouldRefresh: () => false,
  lastRefreshTimestamp: {
    nutritionGoals: 0,
    mealPlans: 0,
    workoutPlans: 0,
    userProfile: 0
  }
});

export const useRefreshContext = () => useContext(RefreshContext);

export const RefreshProvider = ({ children }: { children: ReactNode }) => {
  const [refreshCounters, setRefreshCounters] = useState<Record<RefreshableDataType, number>>({
    nutritionGoals: 0,
    mealPlans: 0,
    workoutPlans: 0,
    userProfile: 0
  });
  
  const [lastRefreshTimestamp, setLastRefreshTimestamp] = useState<Record<RefreshableDataType, number>>({
    nutritionGoals: 0,
    mealPlans: 0,
    workoutPlans: 0,
    userProfile: 0
  });

  const triggerRefresh = useCallback((dataType: RefreshableDataType) => {
    console.log(`Triggering refresh for ${dataType}`);
    setRefreshCounters(prev => ({
      ...prev,
      [dataType]: prev[dataType] + 1
    }));
    
    setLastRefreshTimestamp(prev => ({
      ...prev,
      [dataType]: Date.now()
    }));
  }, []);
  
  const triggerMultipleRefresh = useCallback((dataTypes: RefreshableDataType[]) => {
    console.log(`Triggering refresh for multiple data types: ${dataTypes.join(', ')}`);
    const now = Date.now();
    
    setRefreshCounters(prev => {
      const updated = { ...prev };
      dataTypes.forEach(type => {
        updated[type] = updated[type] + 1;
      });
      return updated;
    });
    
    setLastRefreshTimestamp(prev => {
      const updated = { ...prev };
      dataTypes.forEach(type => {
        updated[type] = now;
      });
      return updated;
    });
  }, []);
  
  // Helper to determine if a refresh is needed based on dependencies
  const shouldRefresh = useCallback((dataType: RefreshableDataType, dependencies: any[]) => {
    // If any dependency has changed, we should refresh
    if (dependencies.some(dep => dep !== undefined && dep !== null)) {
      return true;
    }
    
    // Or if the counter has increased since last check
    return refreshCounters[dataType] > 0;
  }, [refreshCounters]);

  return (
    <RefreshContext.Provider 
      value={{ 
        refreshCounters, 
        triggerRefresh, 
        triggerMultipleRefresh,
        shouldRefresh,
        lastRefreshTimestamp
      }}
    >
      {children}
    </RefreshContext.Provider>
  );
};