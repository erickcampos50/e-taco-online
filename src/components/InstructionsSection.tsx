// home/erickcampos50/e-taco-online/src/components/InstructionsSection.tsx
import React, { useState } from 'react';
import { Book, ChevronDown, ChevronUp } from 'lucide-react';

export const InstructionsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between focus:outline-none"
      >
        <div className="flex items-center space-x-3">
          <Book className="text-emerald-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">Tutorial de Uso do e-TACO</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-gray-500" size={24} />
        ) : (
          <ChevronDown className="text-gray-500" size={24} />
        )}
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-8">
          {/* Guia Rápido */}
          <section>
            <h3 className="text-2xl font-bold mb-4">Guia Rápido para Uso do Sistema e-TACO</h3>
            <p className="text-gray-700">
              O <strong>e-TACO</strong> é uma ferramenta educacional que simplifica as atividades mais mecânicas de estudantes e profissionais ao montar prescrições nutricionais com base na Tabela Brasileira de Composição de Alimentos (TACO). Com operações de busca, somatória e organização automatizadas pela aplicação, o usuário pode dedicar seu foco à parte analítica, criando prescrições nutricionais que considerem múltiplos fatores individuais.
            </p>
          </section>

          {/* Como Usar o Sistema */}
          <section>
            <h3 className="text-xl font-semibold mb-3">Como Usar o Sistema</h3>

            {/* Vídeo Tutorial */}
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe
                className="w-full h-full rounded-md"
                src="https://www.youtube.com/embed/yIGM4LEI-_g"
                title="Tutorial do e-TACO"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Definindo Metas Nutricionais */}
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Definindo Metas Nutricionais</h4>
              <p className="text-gray-600">
                A aplicação permite configurar metas nutricionais personalizadas para cada prescrição, baseando-se nos parâmetros mapeados pela TACO. Para evitar confusões na visualização, é possível incluir apenas os parâmetros nutricionais de interesse, tornando o uso mais claro e objetivo. Todas as metas nutricionais recebem um <strong>auxílio visual no painel Resumo Nutricional</strong>, permitindo verificar graficamente se os parâmetros estão em conformidade com as metas definidas para o paciente.
              </p>
            </div>

            {/* Criando e Organizando Refeições */}
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Criando e Organizando Refeições</h4>
              <p className="text-gray-600">
                É possível criar diferentes refeições, como café da manhã, almoço, jantar e lanches, facilitando uma prescrição bem organizada. Cada título de refeição é editável para se adequar às necessidades do usuário. Adicionar alimentos às refeições é simples e intuitivo, permitindo uma gestão eficiente das prescrições nutricionais.
              </p>
            </div>

            {/* Adicionando Alimentos às Refeições */}
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Adicionando Alimentos às Refeições</h4>
              <p className="text-gray-600">
                Dentro de cada refeição, o usuário pode selecionar qualquer alimento presente na base de dados TACO. As características nutricionais de cada refeição podem ser visualizadas de forma contraída ou expandida diretamente no cabeçalho da refeição. Para maior flexibilidade, a aplicação permite o uso de diversas unidades de medida, desde a massa em gramas, fatias, até colheres de chá, abrangendo as unidades mais usuais na comunicação com pacientes durante a elaboração das prescrições.
              </p>
            </div>
          </section>

          {/* Funcionalidades Adicionais */}
          <section>
            <h3 className="text-xl font-semibold mb-3">Funcionalidades Adicionais</h3>

            {/* Exemplos de Uso */}
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Exemplos de Uso</h4>
              <p className="text-gray-600">
                Para facilitar o aprendizado, o sistema oferece exemplos de preenchimento de metas nutricionais, com sugestões baseadas em perfis como “Homem Adulto”, “Adolescente” ou “Criança”. Esses exemplos são ilustrativos e não substituem a consulta de um profissional.
              </p>
            </div>

            {/* Campos para Dados do Profissional e do Paciente */}
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Campos para Dados do Profissional e do Paciente</h4>
              <p className="text-gray-600">
                Existe uma seção dedicada para preenchimento de informações do nutricionista e do paciente, garantindo que cada prescrição seja devidamente identificada.
              </p>
            </div>

            {/* Geração de Relatórios e Salvar Progresso */}
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Geração de Relatórios e Salvar Progresso</h4>
              <p className="text-gray-600">
                A aplicação permite gerar relatórios em formato PDF e planilhas. Também é possível salvar os dados preenchidos e reabri-los posteriormente, otimizando o trabalho em prescrições futuras.
              </p>
            </div>
          </section>

          {/* Benefícios */}
          <section>
            <h3 className="text-xl font-semibold mb-3">Benefícios do e-TACO</h3>
            <p className="text-gray-600 mb-2">
              <strong>Automatização de tarefas mecânicas:</strong> Libera o usuário para se concentrar na análise.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Visualização clara e organizada:</strong> Auxílio visual para acompanhar metas nutricionais e opções de organização por refeições.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Flexibilidade e usabilidade:</strong> Grande variedade de unidades de medida e edição personalizada.
            </p>
            <p className="text-gray-600">
              <strong>Praticidade no uso:</strong> Ferramentas como exemplos de uso e opções de exportação de relatórios tornam o trabalho mais eficiente.
            </p>
          </section>

          {/* Sobre o Projeto */}
          <section>
            <h3 className="text-xl font-semibold mb-3">Sobre o Projeto</h3>
            <div className="mb-4">
              <p className="text-gray-600">
                Este projeto é uma <strong>iniciativa voluntária</strong> com o intuito de contribuir com estudantes e profissionais de nutrição. Por não se tratar de uma empresa e não possuir fins lucrativos, pedimos a compreensão dos usuários.
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">
                Apesar de não ter vínculo com a equipe que construiu e mantém a TACO, buscamos manter contato com os responsáveis para avaliar as funcionalidades.
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">
                <strong>Nota:</strong> O e-TACO é uma ferramenta educacional e deve ser utilizado em conjunto com a orientação de profissionais qualificados.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
