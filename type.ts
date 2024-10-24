// src/types.ts

export interface Nutrient {
  value: number | null | string;
  unit: string;
}

export interface FoodNutrients {
  [key: string]: Nutrient;
}

export interface Food {
  id: number;
  description: string;
  nutrients: FoodNutrients;
}

export interface MealItem {
  foodId: number;
  quantity: number;
}

export interface Meal {
  id: number;
  name: string;
  items: MealItem[];
}

export interface Goals {
  [nutrient: string]: {
    type: 'min' | 'max';
    value: number;
    tolerance: number;
    unit: string;
  };
}

export interface NutritionSummary {
  [nutrient: string]: {
    value: number;
    target: number;
    type: 'min' | 'max';
    tolerance: number;
    status: 'success' | 'warning' | 'error';
    unit: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  preferences: {
    language: string;
    theme: 'light' | 'dark';
    measurementSystem: 'metric' | 'imperial';
  };
}

export interface AppState {
  user: User | null;
  meals: Meal[];
  goals: Goals;
  selectedLanguage: string;
}

export type Language = 'pt-BR' | 'en';

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface Translations {
  [language: string]: TranslationDictionary;
}

export type ActionType =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_MEAL'; payload: Meal }
  | { type: 'UPDATE_MEAL'; payload: Meal }
  | { type: 'DELETE_MEAL'; payload: number }
  | { type: 'UPDATE_GOALS'; payload: Goals }
  | { type: 'SET_LANGUAGE'; payload: string };

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}

export interface NutrientInfo {
  name: string;
  unit: string;
  description: string;
  recommendations?: {
    min?: number;
    max?: number;
    unit: string;
  };
}

export interface NutrientDatabase {
  [nutrientKey: string]: NutrientInfo;
}
