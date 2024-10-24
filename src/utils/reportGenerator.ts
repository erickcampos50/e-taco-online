// src/utils/reportGenerator.ts

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { MealPlan } from '../types';
import {
  calculateMealNutrients,
  calculateTotalNutrients,
} from './calculations';
import { getNutrientLabel, getNutrientUnit } from './nutrientUtils';
import { foods } from '../data/foods';

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

export const generatePDFReport = (mealPlan: MealPlan) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Título
  doc.setFontSize(24);
  doc.setTextColor(2, 132, 199); // primary-600
  doc.text('Relatório e-TACO', pageWidth / 2, 20, { align: 'center' });

  // Nome do plano e data
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Plano: ${mealPlan.name}`, 20, 35);
  doc.text(
    `Criado em: ${new Date(mealPlan.createdAt).toLocaleDateString()}`,
    20,
    42
  );
  doc.text(
    `Última atualização: ${new Date(mealPlan.updatedAt).toLocaleDateString()}`,
    20,
    49
  );

  let yPos = 65;

  // Informações do Nutricionista e Paciente
  if (mealPlan.nutritionist || mealPlan.patient) {
    doc.setFontSize(16);
    doc.setTextColor(2, 132, 199);
    doc.text('Informações do Profissional e Paciente', 20, yPos);
    yPos += 10;

    const infoData = [];

    if (mealPlan.nutritionist) {
      infoData.push(
        ['Nome do Nutricionista', mealPlan.nutritionist.name],
        ['CRN', mealPlan.nutritionist.license]
      );
      if (mealPlan.nutritionist.email) {
        infoData.push(['E-mail', mealPlan.nutritionist.email]);
      }
      if (mealPlan.nutritionist.phone) {
        infoData.push(['Telefone', mealPlan.nutritionist.phone]);
      }
    }

    if (mealPlan.patient) {
      infoData.push(['Nome do Paciente', mealPlan.patient.name]);
      if (mealPlan.patient.age) {
        infoData.push(['Idade', mealPlan.patient.age.toString()]);
      }
      if (mealPlan.patient.gender) {
        const gender = {
          M: 'Masculino',
          F: 'Feminino',
          O: 'Outro',
        }[mealPlan.patient.gender];
        infoData.push(['Gênero', gender]);
      }
      if (mealPlan.patient.height) {
        infoData.push(['Altura', `${mealPlan.patient.height} cm`]);
      }
      if (mealPlan.patient.weight) {
        infoData.push(['Peso', `${mealPlan.patient.weight} kg`]);
      }
    }

    autoTable(doc, {
      startY: yPos,
      head: [['Campo', 'Valor']],
      body: infoData,
      theme: 'striped',
      headStyles: { fillColor: [2, 132, 199] },
      margin: { left: 20, right: 20 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 20;
  }

  // Metas Nutricionais
  doc.setFontSize(16);
  doc.setTextColor(2, 132, 199);
  doc.text('Metas Nutricionais', 20, yPos);
  yPos += 10;

  const goalsData = Object.entries(mealPlan.goals).map(([nutrient, goal]) => [
    getNutrientLabel(nutrient),
    `${goal.type === 'min' ? '>' : '<'} ${goal.value}${getNutrientUnit(
      nutrient
    )}`,
    `±${goal.tolerance}%`,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Nutriente', 'Meta', 'Tolerância']],
    body: goalsData,
    theme: 'striped',
    headStyles: { fillColor: [2, 132, 199] },
    margin: { left: 20, right: 20 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 20;

  // Resumo das Refeições
  doc.setFontSize(16);
  doc.setTextColor(2, 132, 199);
  doc.text('Resumo das Refeições', 20, yPos);
  yPos += 10;

  mealPlan.meals.forEach((meal) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    const mealNutrients = calculateMealNutrients(meal);

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`${meal.name}`, 20, yPos);
    yPos += 8;

    const mealItems = meal.items.map((item) => {
      const food = foods.find((f) => f.id === item.foodId);
      return [
        food?.description || '',
        `${item.quantity} ${translatedUnits[item.unit] || item.unit}`,
        `${Math.round(mealNutrients.energy)} kcal`,
        `${Math.round(mealNutrients.protein)}g`,
        `${Math.round(mealNutrients.carbohydrates)}g`,
        `${Math.round(mealNutrients.lipids)}g`,
      ];
    });

    autoTable(doc, {
      startY: yPos,
      head: [
        [
          'Alimento',
          'Porção',
          'Calorias',
          'Proteína',
          'Carboidratos',
          'Gorduras',
        ],
      ],
      body: mealItems,
      theme: 'grid',
      headStyles: { fillColor: [2, 132, 199] },
      margin: { left: 20, right: 20 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;
  });

  // Resumo Nutricional Total
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(16);
  doc.setTextColor(2, 132, 199);
  doc.text('Resumo Nutricional Total', 20, yPos);
  yPos += 10;

  const totals = calculateTotalNutrients(mealPlan.meals);
  const nutritionData = Object.entries(mealPlan.goals).map(
    ([nutrient, goal]) => [
      getNutrientLabel(nutrient),
      `${Math.round(totals[nutrient] || 0)}${getNutrientUnit(nutrient)}`,
      `${goal.type === 'min' ? '>' : '<'} ${goal.value}${getNutrientUnit(
        nutrient
      )}`,
    ]
  );

  autoTable(doc, {
    startY: yPos,
    head: [['Nutriente', 'Atual', 'Meta']],
    body: nutritionData,
    theme: 'striped',
    headStyles: { fillColor: [2, 132, 199] },
    margin: { left: 20, right: 20 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 20;

  // Tabela Explicativa das Unidades de Medida
  doc.setFontSize(16);
  doc.setTextColor(2, 132, 199);
  doc.text('Explicação das Unidades de Medida', 20, yPos);
  yPos += 10;

  const unitsExplanation = Object.entries(translatedUnits).map(
    ([unitKey, unitLabel]) => [unitLabel, getUnitDescription(unitKey)]
  );

  autoTable(doc, {
    startY: yPos,
    head: [['Unidade de Medida', 'Descrição']],
    body: unitsExplanation,
    theme: 'striped',
    headStyles: { fillColor: [2, 132, 199] },
    margin: { left: 20, right: 20 },
  });

  // Salvar o PDF
  doc.save(`etaco-${mealPlan.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
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
