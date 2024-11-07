import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { NutritionSummary } from '../utils/calculations';

interface NutritionSummaryProps {
  summary: NutritionSummary;
}

const statusIcons = {
  success: <CheckCircle className="text-emerald-500" size={20} />,
  warning: <AlertCircle className="text-amber-500" size={20} />,
  error: <XCircle className="text-red-500" size={20} />,
};

const statusColors = {
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  error: 'bg-red-100 text-red-800',
};

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

export const NutritionSummaryComponent = ({
  summary,
}: NutritionSummaryProps) => {
  const { t } = useTranslation();
  const formatValue = (value: number) => Math.round(value * 10) / 10;

  const renderNutrient = (nutrient: string) => {
    const data = summary[nutrient];
    if (!data) return null;

    const tolerance = data.target * (data.tolerance / 100);
    const range =
      data.type === 'min'
        ? `>${formatValue(data.target - tolerance)}`
        : `<${formatValue(data.target + tolerance)}`;

    const unit = units[nutrient] || '';

    return (
      <div
        key={nutrient}
        className={`p-2 rounded-md ${statusColors[data.status]} text-xs`} // Menor padding e fonte
      >
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium">{t(`nutrients.${nutrient}`)}</span>
          {statusIcons[data.status]}
        </div>
        <div className="text-lg font-semibold mb-1"> {/* Menor tamanho da fonte */}
          {formatValue(data.value)}
          {unit}
        </div>
        <div className="text-xs opacity-70"> {/* Menor tamanho de fonte */}
          {t('nutrition.summary.target')}: {range} {unit}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-4 mb-4"> {/* Menor padding e borda arredondada */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3"> {/* Menor fonte e margem */}
        {t('nutrition.summary.title')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2"> {/* Ajuste do grid para até 6 colunas */}
        {Object.keys(summary).map(renderNutrient)}
      </div>
    </div>
  );
};
