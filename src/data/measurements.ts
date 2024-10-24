// src/data/measurements.ts

import type { MeasurementConversion } from '../types';

export const measurementUnits: MeasurementConversion[] = [
  { unit: 'grama', label: 'g', gramsPerUnit: 1 },
  { unit: 'porção', label: 'Porção (100g)', gramsPerUnit: 100 },
  { unit: 'fatia', label: 'Fatia (30g)', gramsPerUnit: 30 }, // Assumindo 30g por fatia
  {
    unit: 'copo_americano',
    label: 'Copo Americano (180 mL)',
    gramsPerUnit: 180,
  },
  {
    unit: 'copo_duplo',
    label: 'Copo Americano Duplo (250 mL)',
    gramsPerUnit: 250,
  },
  { unit: 'concha_pequena', label: 'Concha Pequena (80 mL)', gramsPerUnit: 80 },
  { unit: 'concha_media', label: 'Concha Média (150 mL)', gramsPerUnit: 150 },
  {
    unit: 'colher_servir',
    label: 'Colher de Servir (30 mL)',
    gramsPerUnit: 30,
  },
  { unit: 'colher_sopa', label: 'Colher de Sopa (11 mL)', gramsPerUnit: 11 },
  {
    unit: 'colher_sobremesa',
    label: 'Colher de Sobremesa (9 mL)',
    gramsPerUnit: 9,
  },
  { unit: 'colher_cha', label: 'Colher de Chá (4 mL)', gramsPerUnit: 4 },
  { unit: 'colher_cafe', label: 'Colher de Café (2 mL)', gramsPerUnit: 2 },
] as const;

export const convertToGrams = (quantity: number, unit: string): number => {
  const conversion = measurementUnits.find((m) => m.unit === unit);
  return conversion ? quantity * conversion.gramsPerUnit : quantity;
};
