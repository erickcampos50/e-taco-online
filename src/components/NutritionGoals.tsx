// src/components/NutritionGoals.tsx

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { Goals } from '../types';
import { getNutrientFields } from '../utils/nutrientUtils';

interface NutritionGoalsProps {
  goals: Goals;
  onUpdate: (goals: Goals) => void;
}

// Define as unidades para cada nutriente
const nutrientUnits: { [key: string]: string } = {
  energy: 'kcal',
  protein: 'g',
  lipids: 'g',
  carbohydrates: 'g',
  fiber: 'g',
  calcium: 'mg',
  magnesium: 'mg',
  manganese: 'mg',
  phosphorus: 'mg',
  iron: 'mg',
  sodium: 'mg',
  potassium: 'mg',
  copper: 'mg',
  zinc: 'mg',
  cholesterol: 'mg',
  humidity: '%',
  ashes: 'g',
  retinol: 'µg',
  re: 'µg',
  rae: 'µg',
  thiamine: 'mg',
  riboflavin: 'mg',
  pyridoxine: 'mg',
  niacin: 'mg',
  vitaminC: 'mg',
};

export const NutritionGoals = ({ goals, onUpdate }: NutritionGoalsProps) => {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Obter nutrientes com a tradução e ordenar
  const availableNutrients = getNutrientFields()
    .map((nutrient) => ({
      key: nutrient,
      label: t(`nutrients.${nutrient}`),
    }))
    .sort((a, b) => a.label.localeCompare(b.label)); // Ordena pela tradução (label)

  const handleGoalChange = (
    nutrient: string,
    field: 'value' | 'tolerance' | 'type',
    value: number | 'min' | 'max'
  ) => {
    onUpdate({
      ...goals,
      [nutrient]: {
        ...goals[nutrient],
        [field]: value,
      },
    });
  };

  const addNewGoal = (nutrient: string) => {
    onUpdate({
      ...goals,
      [nutrient]: {
        type: 'max',
        value: 0,
        tolerance: 5,
      },
    });
    setShowDropdown(false);
  };

  const removeGoal = (nutrient: string) => {
    const { [nutrient]: removed, ...remainingGoals } = goals;
    onUpdate(remainingGoals);
  };

  const unusedNutrients = availableNutrients.filter(nutrient => !goals[nutrient.key]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start sm:items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{t('nutrition.goals.title')}</h2>
          <p className="text-sm text-gray-500">
            {t('nutrition.goals.instruction')}
          </p>
        </div>
        {unusedNutrients.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 border border-blue-500 bg-blue-100/50 text-blue-500 hover:bg-blue-200/50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={t('nutrition.goals.addGoal')}
            >
              <Plus size={20} />
              <span>{t('nutrition.goals.addGoal')}</span>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                <div className="flex justify-between items-center p-2 border-b">
                  <span className="font-medium">{t('nutrition.goals.selectNutrient')}</span>
                  <button 
                    onClick={() => setShowDropdown(false)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label={t('nutrition.goals.closeDropdown')}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {unusedNutrients.map((nutrient) => (
                    <button
                      key={nutrient.key}
                      onClick={() => addNewGoal(nutrient.key)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                      aria-label={`${t('nutrition.goals.add')} ${nutrient.label}`}
                    >
                      {nutrient.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(goals).map(([nutrient, goal]) => (
          <div key={nutrient} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                {t(`nutrients.${nutrient}`)}
              </label>
              {nutrient !== 'energy' && nutrient !== 'protein' && 
               nutrient !== 'carbohydrates' && nutrient !== 'lipids' && (
                <button
                  onClick={() => removeGoal(nutrient)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  aria-label={t('nutrition.goals.removeGoal')}
                >
                  {t('nutrition.goals.removeGoal')}
                </button>
              )}
            </div>
            <div className="flex space-x-4 items-center">
              {/* Tipo de Meta (Min/Máx) */}
              <select
                value={goal.type}
                onChange={(e) => handleGoalChange(nutrient, 'type', e.target.value as 'min' | 'max')}
                className="p-2 border rounded-md"
                aria-label={t('nutrition.goals.type')}
              >
                <option value="min">{t('nutrition.goals.min')}</option>
                <option value="max">{t('nutrition.goals.max')}</option>
              </select>
              
              {/* Campo de Valor e Unidade */}
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  value={goal.value}
                  onChange={(e) => handleGoalChange(nutrient, 'value', Number(e.target.value))}
                  className="w-24 p-2 border rounded-md"
                  min="0"
                  aria-label={t('nutrition.goals.value')}
                />
                <span className="text-gray-500">{nutrientUnits[nutrient]}</span>
              </div>
              
              {/* Campo de Tolerância com "+-" */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">+-</span>
                <input
                  type="number"
                  value={goal.tolerance}
                  onChange={(e) => handleGoalChange(nutrient, 'tolerance', Number(e.target.value))}
                  className="w-16 p-2 border rounded-md"
                  min="0"
                  max="100"
                  aria-label={t('nutrition.goals.tolerance')}
                />
                <span className="text-gray-500">{t('nutrition.goals.toleranceUnit')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
