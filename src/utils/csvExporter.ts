// src/utils/csvExporter.ts

import { MealPlan, Meal } from '../types';
import { foods } from '../data/foods';
import {
  calculateMealNutrients,
  calculateTotalNutrients,
} from './calculations';
import { getNutrientLabel, getNutrientUnit } from './nutrientUtils';
import translations from '../i18n/pt-BR';

// Mapeamento das unidades de medida traduzidas
const translatedUnits: { [key: string]: string } = {
  gram: 'Grama',
  porcao: 'Porção (100g)',
  fatia: 'Fatia (30g)',
  copo_americano: 'Copo Americano (180 mL)',
  copo_duplo: 'Copo Americano Duplo (250 mL)',
  concha_pequena: 'Concha Pequena (80 mL)',
  concha_media: 'Concha Média (150 mL)',
  colher_servir: 'Colher de Servir (30 mL)',
  colher_sopa: 'Colher de Sopa (11 mL)',
  colher_sobremesa: 'Colher de Sobremesa (9 mL)',
  colher_cha: 'Colher de Chá (4 mL)',
  colher_cafe: 'Colher de Café (2 mL)',
};

export const exportToCSV = (mealPlan: MealPlan) => {
  const separator = ';';
  const lines: string[] = [];

  // Adicionar informações básicas do plano
  lines.push('NutriPlan Export');
  lines.push(`Plan Name:${separator}${mealPlan.name}`);
  lines.push(
    `Created:${separator}${new Date(mealPlan.createdAt).toLocaleDateString()}`
  );
  lines.push(
    `Last Updated:${separator}${new Date(
      mealPlan.updatedAt
    ).toLocaleDateString()}`
  );
  lines.push('');

  // Adicionar informações do Nutricionista e Paciente, se disponíveis
  if (mealPlan.nutritionist || mealPlan.patient) {
    lines.push('Professional and Patient Information');
    if (mealPlan.nutritionist) {
      lines.push(`Nutritionist Name:${separator}${mealPlan.nutritionist.name}`);
      lines.push(`License:${separator}${mealPlan.nutritionist.license}`);
      if (mealPlan.nutritionist.email) {
        lines.push(`Email:${separator}${mealPlan.nutritionist.email}`);
      }
      if (mealPlan.nutritionist.phone) {
        lines.push(`Phone:${separator}${mealPlan.nutritionist.phone}`);
      }
    }
    if (mealPlan.patient) {
      lines.push(`Patient Name:${separator}${mealPlan.patient.name}`);
      if (mealPlan.patient.age) {
        lines.push(`Age:${separator}${mealPlan.patient.age}`);
      }
      if (mealPlan.patient.gender) {
        const gender = {
          M: 'Masculino',
          F: 'Feminino',
          O: 'Outro',
        }[mealPlan.patient.gender];
        lines.push(`Gender:${separator}${gender}`);
      }
      if (mealPlan.patient.height) {
        lines.push(`Height:${separator}${mealPlan.patient.height} cm`);
      }
      if (mealPlan.patient.weight) {
        lines.push(`Weight:${separator}${mealPlan.patient.weight} kg`);
      }
    }
    lines.push('');
  }

  // Adicionar metas nutricionais
  lines.push('Nutritional Goals');
  lines.push(`Nutrient${separator}Target${separator}Tolerance`);
  Object.entries(mealPlan.goals).forEach(([nutrient, goal]) => {
    lines.push(
      `${getNutrientLabel(nutrient)}${separator}${
        goal.type === 'min' ? '>' : '<'
      } ${goal.value}${getNutrientUnit(nutrient)}${separator}±${
        goal.tolerance
      }%`
    );
  });
  lines.push('');

  // Adicionar refeições e seus itens
  mealPlan.meals.forEach((meal) => {
    lines.push(`${meal.name}`);
    lines.push(
      `Food${separator}Portion${separator}Calories${separator}Protein${separator}Carbs${separator}Lipids`
    );

    meal.items.forEach((item) => {
      const food = foods.find((f) => f.id === item.foodId);
      if (!food) return;

      const nutrients = calculateMealNutrients({ ...meal, items: [item] });
      lines.push(
        `${food.description}${separator}${item.quantity} ${
          translatedUnits[item.unit] || item.unit
        }${separator}${Math.round(
          nutrients.energy
        )} kcal${separator}${Math.round(
          nutrients.protein
        )}g${separator}${Math.round(
          nutrients.carbohydrates
        )}g${separator}${Math.round(nutrients.lipids)}g`
      );
    });
    lines.push('');
  });

  // Adicionar resumo nutricional total
  lines.push('Total Nutrition Summary');
  lines.push(`Nutrient${separator}Actual${separator}Goal`);
  const totals = calculateTotalNutrients(mealPlan.meals);
  Object.entries(mealPlan.goals).forEach(([nutrient, goal]) => {
    lines.push(
      `${getNutrientLabel(nutrient)}${separator}${Math.round(
        totals[nutrient] || 0
      )}${getNutrientUnit(nutrient)}${separator}${
        goal.type === 'min' ? '>' : '<'
      } ${goal.value}${getNutrientUnit(nutrient)}`
    );
  });
  lines.push('');

  // Adicionar tabela explicativa das unidades de medida
  lines.push('Explicação das Unidades de Medida');
  lines.push(`Unidade de Medida${separator}Descrição`);
  Object.entries(translatedUnits).forEach(([unitKey, unitLabel]) => {
    lines.push(`${unitLabel}${separator}${getUnitDescription(unitKey)}`);
  });

  // Criar blob e download
  const csvContent = lines.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `nutriplan-${mealPlan.name.toLowerCase().replace(/\s+/g, '-')}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Função para obter a descrição das unidades de medida
const getUnitDescription = (unitKey: string): string => {
  const descriptions: { [key: string]: string } = {
    grama: 'Grama é uma unidade de massa equivalente a 1g.',
    porcao: 'Porção equivale a 100g do alimento.',
    fatia: 'Fatia equivale a 30g do alimento.',
    copo_americano: 'Copo Americano tem capacidade de 180 mL.',
    copo_duplo: 'Copo Americano Duplo tem capacidade de 250 mL.',
    concha_pequena: 'Concha Pequena tem capacidade de 80 mL.',
    concha_media: 'Concha Média tem capacidade de 150 mL.',
    colher_servir: 'Colher de Servir tem capacidade de 30 mL.',
    colher_sopa: 'Colher de Sopa tem capacidade de 11 mL.',
    colher_sobremesa: 'Colher de Sobremesa tem capacidade de 9 mL.',
    colher_cha: 'Colher de Chá tem capacidade de 4 mL.',
    colher_cafe: 'Colher de Café tem capacidade de 2 mL.',
  };

  return descriptions[unitKey] || '';
};
