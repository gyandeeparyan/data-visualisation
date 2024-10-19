"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the filters
type Filters = {
  ageRange: [number, number];
  gender: string;
  startDate: string;
  endDate: string;
};

type AnalyticsContextType = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Filters>({
    ageRange: [15, 25],
    gender: 'male',
    startDate: '',
    endDate: '',
  });

  return (
    <AnalyticsContext.Provider value={{ filters, setFilters }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
