import React from 'react';
import { Info, Mail, Github } from 'lucide-react';

export const CreditsSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-16 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <Info className="text-primary-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Créditos e Informações</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2 text-primary-700">Tabela TACO</h3>
          <p className="text-gray-700">
            Este sistema utiliza dados da Tabela Brasileira de Composição de Alimentos (TACO), 
            desenvolvida pela Universidade Estadual de Campinas (UNICAMP). O e-TACO é um projeto 
            independente e não possui relação oficial com os pesquisadores ou instituições 
            responsáveis pela TACO.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2 text-primary-700">Desenvolvedor</h3>
          <p className="text-gray-700 font-medium">Erick C. Campos</p>
          <div className="flex items-center mt-2 text-gray-600">
            <Mail size={18} className="mr-2" />
            <a href="mailto:erick.campos@ufjf.br" className="hover:text-primary-600 transition-colors">
              erick.campos@ufjf.br
            </a>
          </div>
          
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2 text-primary-700">Aviso Legal</h3>
          <p className="text-gray-700">
            Este é um projeto voluntário desenvolvido com propósito educacional. 
            O sistema é fornecido "como está", sem garantias. Use as informações e cálculos 
            nutricionais como referência apenas, sempre consultando um profissional de saúde qualificado.
          </p>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Versão 1.0.0</p>
          
        </div>
      </div>
    </div>
  );
};