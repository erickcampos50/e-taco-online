// src/components/profiles.ts

import type { Goals } from '../types';

export interface NutrientGoal {
  min?: number;
  max?: number;
}

export interface Profile {
  profile: string;
  [key: string]: NutrientGoal | string;
}

export const profiles = [
  /**
   * Perfil: Homem Adulto
   * 
   * Referências:
   * - Snetselaar et al., 2021
   * - Aparicio et al., 2020
   * - Sharma et al., 2020
   * - Jaiswal, 2021
   * - Marvin-Dowle et al., 2016
   * - Churruca et al., 2015
   * - Buffini et al., 2023
   * - Casagrande & Cowie, 2017
   * - Królak et al., 2017
   * - Julibert et al., 2019
   * - Bahtiri et al., 2014
   */
  {
    profile: "adult_man",
    energy: { max: 2600 },
    protein: { max: 91 },
    lipids: { max: 80 },
    carbohydrates: { max: 325 },
    fiber: { min: 30 },
    sodium: { max: 2300 },
    potassium: { min: 3400 },
    calcium: { min: 1200 },
    iron: { min: 8 },
    zinc: { min: 11 },
    thiamine: { min: 1.2 }
  },
  
  /**
   * Perfil: Mulher Adulta
   * 
   * Referências:
   * - Snetselaar et al., 2021
   * - Aparicio et al., 2020
   * - Sharma et al., 2020
   * - Jaiswal, 2021
   * - Marvin-Dowle et al., 2016
   * - Churruca et al., 2015
   * - Buffini et al., 2023
   * - Casagrande & Cowie, 2017
   * - Królak et al., 2017
   * - Julibert et al., 2019
   * - Bahtiri et al., 2014
   */
  {
    profile: "adult_woman",
    energy: { max: 2200 },
    protein: { max: 75 },
    lipids: { max: 70 },
    carbohydrates: { max: 275 },
    fiber: { min: 25 },
    sodium: { max: 2300 },
    potassium: { min: 2600 },
    calcium: { min: 1200 },
    iron: { min: 18 },
    zinc: { min: 8 },
    thiamine: { min: 1.1 }
  },
  
  /**
   * Perfil: Menino Adolescente
   * 
   * Referências:
   * - Snetselaar et al., 2021
   * - Aparicio et al., 2020
   * - Sharma et al., 2020
   * - Jaiswal, 2021
   * - Marvin-Dowle et al., 2016
   * - Churruca et al., 2015
   * - Buffini et al., 2023
   * - Casagrande & Cowie, 2017
   * - Królak et al., 2017
   * - Julibert et al., 2019
   * - Bahtiri et al., 2014
   */
  {
    profile: "teenager_boy",
    energy: { max: 3200 },
    protein: { max: 100 },
    lipids: { max: 80 },
    carbohydrates: { max: 400 },
    fiber: { min: 38 },
    sodium: { max: 2300 },
    potassium: { min: 3000 },
    calcium: { min: 1300 },
    iron: { min: 11 },
    zinc: { min: 11 },
    thiamine: { min: 1.2 }
  },
  
  /**
   * Perfil: Menina Adolescente
   * 
   * Referências:
   * - Snetselaar et al., 2021
   * - Aparicio et al., 2020
   * - Sharma et al., 2020
   * - Jaiswal, 2021
   * - Marvin-Dowle et al., 2016
   * - Churruca et al., 2015
   * - Buffini et al., 2023
   * - Casagrande & Cowie, 2017
   * - Królak et al., 2017
   * - Julibert et al., 2019
   * - Bahtiri et al., 2014
   */
  {
    profile: "teenager_girl",
    energy: { max: 2400 },
    protein: { max: 100 },
    lipids: { max: 70 },
    carbohydrates: { max: 300 },
    fiber: { min: 25 },
    sodium: { max: 2300 },
    potassium: { min: 2300 },
    calcium: { min: 1300 },
    iron: { min: 15 },
    zinc: { min: 9 },
    thiamine: { min: 1.0 }
  },
  
  /**
   * Perfil: Criança
   * 
   * Referências:
   * - Snetselaar et al., 2021
   * - Aparicio et al., 2020
   * - Sharma et al., 2020
   * - Jaiswal, 2021
   * - Marvin-Dowle et al., 2016
   * - Churruca et al., 2015
   * - Buffini et al., 2023
   * - Casagrande & Cowie, 2017
   * - Królak et al., 2017
   * - Julibert et al., 2019
   * - Bahtiri et al., 2014
   */
  {
    profile: "child",
    energy: { max: 1600 },
    protein: { max: 34 },
    lipids: { max: 40 },
    carbohydrates: { max: 210 },
    fiber: { min: 25 },
    sodium: { max: 1900 },
    potassium: { min: 2300 },
    calcium: { min: 1000 },
    iron: { min: 10 },
    zinc: { min: 5 },
    thiamine: { min: 0.6 }
  },
  
  /**
   * Perfil: Homem Idoso
   * 
   * Referências:
   * - Snetselaar et al., 2021
   * - Aparicio et al., 2020
   * - Sharma et al., 2020
   * - Jaiswal, 2021
   * - Marvin-Dowle et al., 2016
   * - Churruca et al., 2015
   * - Buffini et al., 2023
   * - Casagrande & Cowie, 2017
   * - Królak et al., 2017
   * - Julibert et al., 2019
   * - Bahtiri et al., 2014
   */
  {
    profile: "elderly_man",
    energy: { max: 2400 },
    protein: { max: 91 },
    lipids: { max: 80 },
    carbohydrates: { max: 325 },
    fiber: { min: 30 },
    sodium: { max: 2300 },
    potassium: { min: 3400 },
    calcium: { min: 1200 },
    iron: { min: 8 },
    zinc: { min: 11 },
    thiamine: { min: 1.2 }
  },
  
  /**
   * Perfil: Mulher Idosa
   * 
   * Referências:
   * - Snetselaar et al., 2021
   * - Aparicio et al., 2020
   * - Sharma et al., 2020
   * - Jaiswal, 2021
   * - Marvin-Dowle et al., 2016
   * - Churruca et al., 2015
   * - Buffini et al., 2023
   * - Casagrande & Cowie, 2017
   * - Królak et al., 2017
   * - Julibert et al., 2019
   * - Bahtiri et al., 2014
   */
  {
    profile: "elderly_woman",
    energy: { max: 2000 },
    protein: { max: 75 },
    lipids: { max: 70 },
    carbohydrates: { max: 275 },
    fiber: { min: 25 },
    sodium: { max: 2300 },
    potassium: { min: 2600 },
    calcium: { min: 1200 },
    iron: { min: 8 },
    zinc: { min: 8 },
    thiamine: { min: 1.1 }
  }
] as const;

/**
 * Converte um perfil de nutrientes para um objeto de metas (Goals)
 * 
 * @param profile - Perfil de nutrientes
 * @returns Objeto Goals com tipo, valor e tolerância para cada nutriente
 */
export const convertProfileToGoals = (profile: Profile): Goals => {
  const goals: Goals = {};
  
  Object.entries(profile).forEach(([key, value]) => {
    if (key !== 'profile' && typeof value === 'object') {
      goals[key] = {
        type: value.min !== undefined ? 'min' : 'max',
        value: value.min !== undefined ? value.min : value.max!,
        tolerance: 0
      };
    }
  });

  return goals;
};
