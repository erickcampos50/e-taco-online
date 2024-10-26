// src/components/MealSection.tsx

import React, { useState, useMemo } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { Meal, MealItem } from '../types';
import { foods } from '../data/foods';
import { calculateMealNutrients } from '../utils/calculations';
import { PortionInput } from './PortionInput';
import { AutocompleteCombobox } from './AutocompleteCombobox';

interface MealSectionProps {
  meal: Meal;
  onUpdate: (updatedMeal: Meal) => void;
  onDelete: () => void;
}

const units: { [key: string]: string } = {
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
};

export const MealSection: React.FC<MealSectionProps> = ({
  meal,
  onUpdate,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(meal.name);
  const [showDetails, setShowDetails] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Ordena os alimentos alfabeticamente pela descrição
  const sortedFoods = useMemo(() => {
    return [...foods].sort((a, b) => a.description.localeCompare(b.description));
  }, []);

  const addFood = () => {
    onUpdate({
      ...meal,
      items: [
        ...meal.items,
        { foodId: sortedFoods[0].id, quantity: 100, unit: 'grama' },
      ],
    });
  };

  const removeFood = (index: number) => {
    onUpdate({
      ...meal,
      items: meal.items.filter((_, i) => i !== index),
    });
  };

  const updateFoodItem = (index: number, updates: Partial<MealItem>) => {
    const newItems = [...meal.items];
    newItems[index] = { ...newItems[index], ...updates };
    onUpdate({ ...meal, items: newItems });
  };

  const handleNameSave = () => {
    if (editedName.trim()) {
      onUpdate({ ...meal, name: editedName.trim() });
      setIsEditing(false);
    }
  };

  const mealNutrients = calculateMealNutrients(meal);

  const renderNutrientSummary = () => {
    const mainNutrients = ['energy', 'protein', 'carbohydrates', 'lipids'];

    return (
      <div className="flex flex-wrap gap-2 text-sm text-gray-500">
        {mainNutrients.map((nutrient) => (
          <div key={nutrient} className="flex items-center">
            <span className="font-medium">{t(`nutrients.${nutrient}`)}:</span>
            <span className="ml-1">
              {Math.round(mealNutrients[nutrient as keyof typeof mealNutrients] || 0)}
              {units[nutrient]}
            </span>
          </div>
        ))}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-emerald-600 hover:text-emerald-700 flex items-center"
        >
          {showDetails ? (
            <>
              <ChevronUp size={16} className="mr-1" />
              {t('common.lessDetails')}
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" />
              {t('common.moreDetails')}
            </>
          )}
        </button>
      </div>
    );
  };

  const renderDetailedNutrients = () => {
    if (!showDetails) return null;

    const detailedNutrients = Object.keys(units).filter(
      (nutrient) =>
        !['energy', 'protein', 'carbohydrates', 'lipids'].includes(nutrient)
    );

    return (
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm text-gray-500">
        {detailedNutrients.map((nutrient) => (
          <div key={nutrient} className="flex items-center">
            <span className="font-medium">{t(`nutrients.${nutrient}`)}:</span>
            <span className="ml-1">
              {(mealNutrients[nutrient as keyof typeof mealNutrients] || 0).toFixed(1)}
              {units[nutrient]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 overflow-hidden">
      {/* Cabeçalho da Refeição */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="flex-grow mb-2 sm:mb-0">
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-xl font-semibold text-gray-800 border rounded px-2 py-1 w-full sm:w-auto"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handleNameSave()}
                />
                <button
                  onClick={handleNameSave}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  <Check size={20} />
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-800">
                  {meal.name}
                </h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-gray-600"
                  title={t('meals.editName')}
                >
                  <Edit2 size={16} />
                </button>
              </>
            )}
          </div>
        </div>
        {/* Ícones de ação */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="text-gray-400 hover:text-gray-600"
            title={t('common.help')}
          >
            <HelpCircle size={20} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition-colors"
            title={t('meals.deleteMeal')}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Seção de Ajuda */}
      {showHelp && (
        <div className="mt-4 p-4 bg-gray-50 border rounded-md text-gray-700">
          <h4 className="font-semibold mb-2">{t('meals.helpTitle')}</h4>
          <p className="mb-2">{t('meals.helpDescription')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('meals.helpItems.selectFood')}</li>
            <li>{t('meals.helpItems.enterQuantity')}</li>
            <li>{t('meals.helpItems.chooseUnit')}</li>
            <li>{t('meals.helpItems.infoCalculated')}</li>
            <li>{t('meals.helpItems.removeFood')}</li>
          </ul>
        </div>
      )}

      {/* Resumo de Nutrientes */}
      {renderNutrientSummary()}
      {renderDetailedNutrients()}

      {/* Lista de Itens da Refeição */}
      <div className="mt-4 space-y-4">
        {meal.items.map((item, index) => {
          const food = sortedFoods.find((f) => f.id === item.foodId);
          if (!food) return null;

          const itemNutrients = calculateMealNutrients({
            ...meal,
            items: [item],
          });

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full"
            >
              <AutocompleteCombobox
                options={sortedFoods}
                value={item.foodId}
                onChange={(foodId) => updateFoodItem(index, { foodId })}
              />

              <PortionInput
                item={item}
                onChange={(updates) => updateFoodItem(index, updates)}
              />

              <div className="text-sm text-gray-500 hidden sm:block">
                {Math.round(itemNutrients.energy)} {units.energy}
              </div>

              <button
                onClick={() => removeFood(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
                title={t('meals.deleteFood')}
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Botão para Adicionar Alimento */}
      <button
        onClick={addFood}
        className="mt-4 flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
      >
        <Plus size={20} />
        <span>{t('meals.addFood')}</span>
      </button>
    </div>
  );
};
