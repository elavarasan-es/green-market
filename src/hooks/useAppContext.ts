
import { useContext } from 'react';
import type { AppContextType } from '../types/type';
import { AppContext } from '../context/AppContext';

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
