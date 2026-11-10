import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  ShoppingBag,
  Check,
  Sun,
  Moon,
  RotateCcw,
  BookmarkCheck,
  Plus,
  Bot,
  Send,
  Loader2,
} from 'lucide-react';
import { useEclat } from '../context/EclatContext';
import { IMAGES, QUIZ_QUESTIONS, PROTOCOLS, PRODUCTS } from '../data/mockData';
import { askBotanicalAI } from '../services/apiServices';

export default function DiagnosticView() {
  const {
    skinPlan,
    saveNewSkinPlan,
    openBookingDrawer,
    addToBag,
    addFullRoutineToBag,
    navigateTo,
    isClubMember,
  } = useEclat();

  // 'welcome' | 'quiz' | 'result'
  const [stage, setStage] = useState('welcome');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({
    biotipo: skinPlan?.answers?.biotipo || '',
    objetivo: skinPlan?.answers?.objetivo || '',
    restricoes: skinPlan?.answers?.restricoes || '',
    estiloRotina: skinPlan?.answers?.estiloRotina || '',
    frequencia: skinPlan?.answers?.frequencia || '',
  });

  // Chave Seletora Central no Resultado: 'clinica' | 'casa'
  const [resultMode, setResultMode] = useState('clinica');
  const [isSavedBanner, setIsSavedBanner] = useState(false);

  // Estado da API 1: Google Gemini IA (Dra. Camille Laurent)
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [lastAskedQuestion, setLastAskedQuestion] = useState('');

  const handleAskGemini = async (customQ = '') => {
    const qText = customQ.trim();
    if (qText) {
      setLastAskedQuestion(qText);
      setAiQuestion('');
    } else {
      setLastAskedQuestion('');
    }
    setAiLoading(true);
    const res = await askBotanicalAI({
      skinPlan,
      userQuestion: qText,
    });
    setAiResponse(res);
    setAiLoading(false);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];

  const handleSelectOption = (optionValue) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: optionValue,
    };
    setAnswers(updatedAnswers);

    if (currentStepIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 180);
    } else {
      saveNewSkinPlan(updatedAnswers);
      setStage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveToDashboard = () => {
    saveNewSkinPlan(answers);
    setIsSavedBanner(true);
  };

  return (
    <div className="eclat-section bg-[#FAF8F5] min-h-[82vh]">
      <div className="eclat-container">
        {/* ==================== ESTADO 1: BOAS-VINDAS (LAYOUT 50/50) ==================== */}
        {stage === 'welcome' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Imagem Botânica à Esquerda */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[12px] overflow-hidden border border-[#E2DEC9] aspect-[4/4] bg-[#EFECE6]">
                <img
                  src={IMAGES.categories.antiAging}
                  alt="Le Diagnostic Belle Éclat"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/95 border border-[#C5A880] text-[11px] uppercase tracking-[0.08em] text-[#1E241E]">
                  ✦ Le Diagnostic • Algoritmo Cronobiológico
                </div>
              </div>
            </div>

            {/* Chamada à Direita */}
            <div className="lg:col-span-6 space-y-7">
              <span className="meta-tag text-[#7C8C76] block">
                Planejamento Facial Interativo
              </span>
              <h1 className="font-serif text-[36px] lg:text-[48px] leading-[1.15] text-[#1E241E]">
                Mapeie o ritmo biológico da sua pele em 5 passos.
              </h1>
              <p className="text-[15px] text-[#5C645A] leading-relaxed">
                Cada rosto possui uma assinatura epidérmica única. Através de 5 perguntas clínicas essenciais, desenhamos seu{' '}
                <strong className="text-[#1E241E] font-medium">
                  Cronograma Semestral na Flagship (6 Meses)
                </strong>{' '}
                e sua{' '}
                <strong className="text-[#1E241E] font-medium">
                  Rotina Diária em Casa (Manhã & Noite)
                </strong>{' '}
                sincronizados ao ciclo celular de 28 dias.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-[8px] bg-[#EFECE6] border border-[#E2DEC9]">
                  <span className="meta-tag text-[#2F3E2E] block">01. Na Clínica</span>
                  <p className="font-serif text-[19px] text-[#1E241E] mt-1">
                    Mapa de 6 Sessões Presenciais
                  </p>
                </div>
                <div className="p-4 rounded-[8px] bg-[#EFECE6] border border-[#E2DEC9]">
                  <span className="meta-tag text-[#2F3E2E] block">02. Em Casa</span>
                  <p className="font-serif text-[19px] text-[#1E241E] mt-1">
                    Prescrição Matinal & Noturna
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setStage('quiz');
                  }}
                  className="px-8 py-4 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[14px] font-medium inline-flex items-center gap-2.5 hover:bg-[#7C8C76] transition-colors"
                >
                  <span>Iniciar Diagnóstico</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {skinPlan && (
                  <button
                    type="button"
                    onClick={() => setStage('result')}
                    className="px-6 py-4 rounded-full border border-[#E2DEC9] bg-[#FFFFFF] text-[#1E241E] text-[13px] font-medium hover:border-[#C5A880] transition-colors"
                  >
                    Ver Meu Plano Atual
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== ESTADO 2: QUIZ (1 PERGUNTA POR VEZ) ==================== */}
        {stage === 'quiz' && currentQuestion && (
          <div className="max-w-3xl mx-auto space-y-10">
            {/* Topo do Quiz & Barra de Progresso Fina */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.08em] text-[#5C645A]">
                <button
                  type="button"
                  onClick={() => {
                    if (currentStepIndex === 0) setStage('welcome');
                    else setCurrentStepIndex((prev) => prev - 1);
                  }}
                  className="inline-flex items-center gap-1.5 text-[#1E241E] hover:text-[#7C8C76] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar</span>
                </button>
                <span>
                  Passo 0{currentQuestion.step} de 0{QUIZ_QUESTIONS.length} •{' '}
                  {currentQuestion.categoryLabel}
                </span>
              </div>

              <div className="w-full h-1.5 bg-[#EFECE6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2F3E2E] transition-all duration-300 ease-out"
                  style={{
                    width: `${(currentQuestion.step / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Pergunta */}
            <div className="space-y-3">
              <h2 className="font-serif text-[32px] lg:text-[42px] leading-[1.15] text-[#1E241E]">
                {currentQuestion.question}
              </h2>
              <p className="text-[15px] text-[#5C645A]">{currentQuestion.subtitle}</p>
            </div>

            {/* Cartões de Resposta Largos */}
            <div className="space-y-4">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelectOption(option.value)}
                    className={`w-full text-left p-6 rounded-[10px] border transition-all duration-250 flex items-center justify-between gap-6 ${
                      isSelected
                        ? 'bg-[#EFECE6] border-[#2F3E2E]'
                        : 'bg-[#FFFFFF] border-[#E2DEC9] hover:border-[#C5A880]'
                    }`}
                  >
                    <div className="space-y-1">
                      <h3 className="font-serif text-[23px] text-[#1E241E] font-medium">
                        {option.label}
                      </h3>
                      <p className="text-[14px] text-[#5C645A]">{option.desc}</p>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#2F3E2E] border-[#2F3E2E] text-[#FAF8F5]'
                          : 'border-[#E2DEC9] text-[#5C645A]'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== ESTADO 3: RESULTADO COM CHAVE SELETORA ==================== */}
        {stage === 'result' && skinPlan && (
          <div className="space-y-12">
            {/* Cabeçalho do Diagnóstico */}
            <div className="p-8 lg:p-10 rounded-[12px] bg-[#EFECE6] border border-[#C5A880] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#C5A880] text-[11px] uppercase tracking-[0.08em] text-[#1E241E]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Diagnóstico Concluído • Ciclo Celular de 28 Dias</span>
                </div>
                <h1 className="font-serif text-[32px] lg:text-[42px] leading-[1.15] text-[#1E241E]">
                  {skinPlan.profileTitle}
                </h1>
                <p className="text-[15px] text-[#5C645A] leading-relaxed">
                  {skinPlan.profileSummary}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleSaveToDashboard}
                  className="px-6 py-3.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium inline-flex items-center justify-center gap-2 hover:bg-[#7C8C76] transition-colors"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>
                    {isSavedBanner
                      ? 'Salvo no Meu Espaço Éclat ✓'
                      : 'Salvar no Meu Espaço Éclat'}
                  </span>
                </button>
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      navigateTo('painel', { dashboardTab: 'plano' })
                    }
                    className="text-[12px] text-[#2F3E2E] font-medium underline"
                  >
                    Abrir Diário da Pele →
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStepIndex(0);
                      setStage('quiz');
                    }}
                    className="inline-flex items-center gap-1 text-[12px] text-[#5C645A] hover:text-[#1E241E]"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Refazer Quiz</span>
                  </button>
                </div>
              </div>
            </div>

            {/* BLOCO DE CONSULTORIA IA — GOOGLE GEMINI API (Dra. Camille Laurent) */}
            <div className="p-6 lg:p-8 rounded-[12px] bg-[#FFFFFF] border border-[#E2DEC9] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DEC9] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2F3E2E] text-[#C5A880] flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="meta-tag text-[#7C8C76] block">
                      Integração Google Gemini API • Concierge Botânica
                    </span>
                    <h3 className="font-serif text-[24px] text-[#1E241E]">
                      Parecer Clínico da Dra. Camille Laurent (IA)
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={aiLoading}
                  onClick={() => handleAskGemini('')}
                  className="px-5 py-2.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[12px] font-medium inline-flex items-center gap-2 hover:bg-[#7C8C76] transition-colors self-start sm:self-center shrink-0"
                >
                  {aiLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  )}
                  <span>Gerar Parecer Personalizado com IA</span>
                </button>
              </div>

              {aiLoading && (
                <div className="p-5 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] flex items-center gap-3 text-[13px] text-[#5C645A]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#2F3E2E]" />
                  <span>Dra. Camille Laurent está elaborando sua resposta via Gemini IA...</span>
                </div>
              )}

              {!aiLoading && aiResponse && (
                <div className="p-5 rounded-[8px] bg-[#FAF8F5] border border-[#C5A880] space-y-2.5">
                  {lastAskedQuestion && (
                    <div className="pb-2 border-b border-[#E2DEC9] text-[12px] text-[#5C645A]">
                      <strong>Sua pergunta:</strong> “{lastAskedQuestion}”
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.08em] text-[#7C8C76]">
                    <span>Dra. Camille Laurent • Facialista Sênior</span>
                    <span>✦ Gemini AI Ativa</span>
                  </div>
                  <p className="text-[14px] text-[#1E241E] leading-relaxed whitespace-pre-line">
                    {aiResponse.text}
                  </p>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!aiQuestion.trim()) return;
                  handleAskGemini(aiQuestion);
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Pergunte à Dra. Camille IA (ex: Posso usar Bakuchiol no verão? Qual ritual reduz poros?)"
                  className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E2DEC9] text-[13px] text-[#1E241E] focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="px-6 py-2.5 rounded-full border border-[#2F3E2E] text-[#2F3E2E] text-[12px] font-medium inline-flex items-center justify-center gap-1.5 hover:bg-[#2F3E2E] hover:text-[#FAF8F5] transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Perguntar à IA</span>
                </button>
              </form>
            </div>

            {/* CHAVE SELETORA CENTRAL (TOGGLE ANTI-BAGUNÇA) */}
            <div className="flex flex-col items-center space-y-3">
              <span className="meta-tag text-[#5C645A]">
                Alterne a visualização do seu protocolo
              </span>
              <div className="p-1.5 rounded-full bg-[#EFECE6] border border-[#E2DEC9] inline-flex flex-wrap justify-center gap-1">
                <button
                  type="button"
                  onClick={() => setResultMode('clinica')}
                  className={`px-6 py-3 rounded-full text-[13px] font-medium transition-all duration-250 flex items-center gap-2 ${
                    resultMode === 'clinica'
                      ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                      : 'text-[#5C645A] hover:text-[#1E241E]'
                  }`}
                >
                  <span>
                    {resultMode === 'clinica' ? '●' : '○'} Cronograma na Clínica (6 Meses)
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setResultMode('casa')}
                  className={`px-6 py-3 rounded-full text-[13px] font-medium transition-all duration-250 flex items-center gap-2 ${
                    resultMode === 'casa'
                      ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                      : 'text-[#5C645A] hover:text-[#1E241E]'
                  }`}
                >
                  <span>
                    {resultMode === 'casa' ? '●' : '○'} Rotina Diária em Casa (Manhã & Noite)
                  </span>
                </button>
              </div>
            </div>

            {/* MODO 1: CRONOGRAMA NA CLÍNICA (6 MESES - 6 CARDS HORIZONTAIS) */}
            {resultMode === 'clinica' ? (
              <div className="space-y-4 max-w-4xl mx-auto">
                {skinPlan.clinicSchedule.map((item) => {
                  const fullProto =
                    PROTOCOLS.find((p) => p.id === item.protocolId) || PROTOCOLS[0];
                  const isBooked = item.status === 'Agendado';

                  return (
                    <div
                      key={item.month}
                      className={`p-6 rounded-[10px] bg-[#FFFFFF] border transition-all duration-250 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                        isBooked ? 'border-[#7C8C76]' : 'border-[#E2DEC9]'
                      }`}
                    >
                      <div className="space-y-2 max-w-xl">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="px-3 py-1 rounded-full bg-[#EFECE6] text-[#1E241E] text-[11px] uppercase tracking-[0.08em] font-medium">
                            {item.monthLabel}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.08em] font-medium ${
                              isBooked
                                ? 'bg-[#7C8C76]/20 text-[#2F3E2E] border border-[#7C8C76]'
                                : 'bg-[#FAF8F5] text-[#5C645A] border border-[#E2DEC9]'
                            }`}
                          >
                            {isBooked ? '✓ Agendado' : 'Pendente'}
                          </span>
                          <span className="text-[12px] text-[#5C645A]">
                            {item.durationLabel} • R$ {item.price}
                          </span>
                        </div>

                        <h3 className="font-serif text-[26px] text-[#1E241E] font-medium">
                          {item.protocolName}
                        </h3>
                        <p className="text-[14px] text-[#5C645A]">
                          {item.biologicalReason}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            openBookingDrawer(fullProto, {
                              targetPlanMonth: item.month,
                            })
                          }
                          className={`px-6 py-3 rounded-full text-[13px] font-medium inline-flex items-center gap-2 transition-colors ${
                            isBooked
                              ? 'border border-[#2F3E2E] text-[#2F3E2E] hover:bg-[#2F3E2E] hover:text-[#FAF8F5]'
                              : 'bg-[#2F3E2E] text-[#FAF8F5] hover:bg-[#7C8C76]'
                          }`}
                        >
                          <Calendar className="w-4 h-4" />
                          <span>{isBooked ? 'Reagendar Etapa' : 'Agendar Etapa'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* MODO 2: ROTINA DIÁRIA EM CASA (MANHÃ & NOITE - 2 COLUNAS LIMPAS) */
              <div className="space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Coluna 1: Ritual Matinal (3 passos) */}
                  <div className="p-7 rounded-[12px] bg-[#FFFFFF] border border-[#E2DEC9] space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-[#E2DEC9]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#2F3E2E]">
                          <Sun className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="meta-tag text-[#7C8C76] block">
                            Proteção & Luminosidade
                          </span>
                          <h3 className="font-serif text-[26px] text-[#1E241E]">
                            Ritual Matinal (3 Passos)
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {skinPlan.morningRoutine.map((stepItem) => {
                        const prod =
                          PRODUCTS.find((p) => p.id === stepItem.productId) ||
                          PRODUCTS[0];
                        const price = isClubMember
                          ? Math.round(prod.price * 0.85)
                          : prod.price;

                        return (
                          <div
                            key={stepItem.stepNumber}
                            className="p-4 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-16 h-20 rounded-[6px] object-cover shrink-0"
                              />
                              <div className="space-y-1">
                                <span className="text-[11px] uppercase tracking-[0.08em] text-[#7C8C76] font-medium block">
                                  {stepItem.stepNumber}
                                </span>
                                <h4 className="font-serif text-[20px] text-[#1E241E] font-medium">
                                  {prod.name}
                                </h4>
                                <p className="text-[12px] text-[#5C645A]">
                                  {stepItem.usageTip}
                                </p>
                                <p className="text-[13px] font-medium text-[#1E241E] pt-1">
                                  R$ {price}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                addToBag({ ...prod, itemType: 'product' }, true)
                              }
                              title="Adicionar à Sacola"
                              className="w-9 h-9 rounded-full bg-[#2F3E2E] text-[#FAF8F5] flex items-center justify-center shrink-0 hover:bg-[#7C8C76] transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Coluna 2: Ritual Noturno (3 passos) */}
                  <div className="p-7 rounded-[12px] bg-[#FFFFFF] border border-[#E2DEC9] space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-[#E2DEC9]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#2F3E2E] flex items-center justify-center text-[#FAF8F5]">
                          <Moon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="meta-tag text-[#7C8C76] block">
                            Reparo Circadiano & Barreira
                          </span>
                          <h3 className="font-serif text-[26px] text-[#1E241E]">
                            Ritual Noturno (3 Passos)
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {skinPlan.eveningRoutine.map((stepItem) => {
                        const prod =
                          PRODUCTS.find((p) => p.id === stepItem.productId) ||
                          PRODUCTS[1];
                        const price = isClubMember
                          ? Math.round(prod.price * 0.85)
                          : prod.price;

                        return (
                          <div
                            key={stepItem.stepNumber}
                            className="p-4 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-16 h-20 rounded-[6px] object-cover shrink-0"
                              />
                              <div className="space-y-1">
                                <span className="text-[11px] uppercase tracking-[0.08em] text-[#7C8C76] font-medium block">
                                  {stepItem.stepNumber}
                                </span>
                                <h4 className="font-serif text-[20px] text-[#1E241E] font-medium">
                                  {prod.name}
                                </h4>
                                <p className="text-[12px] text-[#5C645A]">
                                  {stepItem.usageTip}
                                </p>
                                <p className="text-[13px] font-medium text-[#1E241E] pt-1">
                                  R$ {price}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                addToBag({ ...prod, itemType: 'product' }, true)
                              }
                              title="Adicionar à Sacola"
                              className="w-9 h-9 rounded-full bg-[#2F3E2E] text-[#FAF8F5] flex items-center justify-center shrink-0 hover:bg-[#7C8C76] transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Botão Central: Adicionar Rotina Completa à Sacola */}
                <div className="p-6 rounded-[12px] bg-[#EFECE6] border border-[#E2DEC9] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-[24px] text-[#1E241E]">
                      Prescrição Completa Belle Éclat (6 Dermocosméticos Botânicos)
                    </h4>
                    <p className="text-[13px] text-[#5C645A]">
                      Inclui os 6 passos de Manhã & Noite formulados para sustentar seu protocolo de cabine.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addFullRoutineToBag}
                    className="px-7 py-4 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium inline-flex items-center gap-2 hover:bg-[#7C8C76] transition-colors shrink-0"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar Rotina Completa à Sacola</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

