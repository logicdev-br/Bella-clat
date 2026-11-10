import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Sparkles,
  History,
  ShoppingBag,
  Wallet,
  AlertCircle,
  RefreshCw,
  Clock,
  MapPin,
  CheckCircle2,
  Plus,
  Crown,
  Home,
  Gift,
  FileText,
  Sun,
  Droplets,
  Thermometer,
} from 'lucide-react';
import { useEclat } from '../context/EclatContext';
import { PROTOCOLS, PRODUCTS } from '../data/mockData';
import LuxuryCard from '../components/LuxuryCard';
import { fetchSkinWeatherIndex } from '../services/apiServices';

export default function ClientDashboardView() {
  const {
    dashboardTab,
    setDashboardTab,
    appointments,
    openBookingDrawer,
    skinPlan,
    updateCycleDay,
    specialistNotes,
    procedureHistory,
    addToBag,
    isClubMember,
    subscribeToClub,
    chezVousCredits,
    giftCardBalance,
    redeemGiftCardCode,
    navigateTo,
  } = useEclat();

  const [planSubView, setPlanSubView] = useState('clinica'); // 'clinica' | 'casa'
  const [voucherInput, setVoucherInput] = useState('ECLAT-460-VIP');
  const [voucherFeedback, setVoucherFeedback] = useState('');
  const [weatherSkin, setWeatherSkin] = useState(null);

  useEffect(() => {
    fetchSkinWeatherIndex().then((data) => setWeatherSkin(data));
  }, []);

  const sidebarTabs = [
    { id: 'agendamentos', label: 'Meus Agendamentos', icon: Calendar },
    { id: 'plano', label: 'Meu Plano & Diário da Pele', icon: Sparkles },
    { id: 'historico', label: 'Histórico de Procedimentos', icon: History },
    { id: 'reposicao', label: 'Boutique & Reposição Rápida', icon: ShoppingBag },
    { id: 'carteira', label: 'Carteira & Clube Éclat', icon: Wallet },
  ];

  const cycleDay = skinPlan?.cycleDay || 24;

  const getCyclePhaseInfo = (day) => {
    if (day <= 7) {
      return {
        phase: 'Fase 01 • Regeneração Basal (Dias 1 a 7)',
        advice:
          'A epiderme inicia um novo ciclo mitótico. Priorize hidratação reparadora com Crème Barrière Velours e sessões calmantes.',
        recommendedProtocol: PROTOCOLS[5], // Éclat de Rose
      };
    }
    if (day <= 14) {
      return {
        phase: 'Fase 02 • Nutrição & Síntese Celular (Dias 8 a 14)',
        advice:
          'Pico de receptividade aos antioxidantes. Excelente janela para infusão de Niacinamida 10% e estímulo de bio-colágeno.',
        recommendedProtocol: PROTOCOLS[7], // Bio-Collagen Infuse
      };
    }
    if (day <= 21) {
      return {
        phase: 'Fase 03 • Tonificação & Escultura Muscular (Dias 15 a 21)',
        advice:
          'Barreira íntegra e resistente: momento ideal para manobras miofasciais profundas (Kobi-Do ou Sculpture Impériale).',
        recommendedProtocol: PROTOCOLS[3], // Lifting Kobi-Do Royal
      };
    }
    return {
      phase: 'Fase 04 • Renovação Epidermal (Dias 22 a 28)',
      advice:
        "Fase de Renovação Epidermal: momento ideal para agendar seu Soin Lumière d'Or ou Rituel Pureté Botanique para desobstruir e iluminar.",
      recommendedProtocol: PROTOCOLS[4], // Soin Lumière d'Or
    };
  };

  const phaseInfo = getCyclePhaseInfo(cycleDay);

  const planProductIds = new Set([
    ...(skinPlan?.morningRoutine?.map((r) => r.productId) || []),
    ...(skinPlan?.eveningRoutine?.map((r) => r.productId) || []),
  ]);

  const productsInPlan = PRODUCTS.filter((p) => planProductIds.has(p.id));

  const handleRedeemVoucher = (e) => {
    e.preventDefault();
    const res = redeemGiftCardCode(voucherInput);
    if (res.success) {
      setVoucherFeedback(`+ R$ ${res.amount} adicionados com sucesso à sua carteira!`);
      setVoucherInput('');
    }
  };

  return (
    <div className="eclat-section bg-[#FAF8F5] min-h-[84vh]">
      <div className="eclat-container space-y-10">
        {/* TOPO DO PAINEL DO CLIENTE */}
        <div className="p-7 lg:p-9 rounded-[12px] bg-[#EFECE6] border border-[#E2DEC9] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="meta-tag text-[#7C8C76]">Meu Espaço Éclat</span>
              {isClubMember && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#2F3E2E] text-[#C5A880] text-[10px] uppercase tracking-[0.08em] font-medium">
                  ✦ Membro Le Club Éclat VIP
                </span>
              )}
              {chezVousCredits > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#C5A880] text-[#1E241E] text-[10px] uppercase tracking-[0.08em] font-medium">
                  {chezVousCredits} Créditos Chez Vous
                </span>
              )}
            </div>
            <h1 className="font-serif text-[32px] lg:text-[40px] text-[#1E241E] leading-tight">
              Bonjour, Madame Éclat
            </h1>
            <p className="text-[14px] text-[#5C645A]">
              Acompanhe suas sessões na Flagship, seu ciclo biológico de 28 dias e sua prescrição botânica.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openBookingDrawer()}
              className="px-6 py-3 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium flex items-center gap-2 hover:bg-[#7C8C76] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Agendamento</span>
            </button>
          </div>
        </div>

        {/* LAYOUT COM MENU LATERAL DE 5 ABAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Menu Lateral (5 Abas) */}
          <aside className="lg:col-span-3 space-y-1.5 bg-[#FFFFFF] p-3 rounded-[10px] border border-[#E2DEC9]">
            {sidebarTabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = dashboardTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDashboardTab(tab.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-[8px] text-[13px] font-medium flex items-center gap-3 transition-all duration-250 ${
                    isActive
                      ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                      : 'text-[#5C645A] hover:bg-[#FAF8F5] hover:text-[#1E241E]'
                  }`}
                >
                  <IconComp
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#C5A880]' : 'text-[#7C8C76]'
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </aside>

          {/* CONTEÚDO DA ABA ATIVA */}
          <div className="lg:col-span-9 space-y-8">
            {/* ==================== ABA 1: MEUS AGENDAMENTOS ==================== */}
            {dashboardTab === 'agendamentos' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E2DEC9] pb-4">
                  <div>
                    <span className="meta-tag text-[#7C8C76] block">
                      Agenda Presencial & Domiciliar
                    </span>
                    <h2 className="font-serif text-[30px] text-[#1E241E]">
                      Próximas Sessões Confirmadas ({appointments.length})
                    </h2>
                  </div>
                </div>

                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-6 sm:p-8 rounded-[12px] bg-[#FFFFFF] border border-[#E2DEC9] space-y-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#E2DEC9] pb-5">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#EFECE6] text-[#2F3E2E] text-[11px] uppercase tracking-[0.08em] font-medium">
                            ✦ {apt.status}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E2DEC9] text-[#5C645A] text-[11px] uppercase tracking-[0.08em]">
                            {apt.modality}
                          </span>
                          {apt.rescheduled && (
                            <span className="px-3 py-1 rounded-full bg-[#C5A880]/20 border border-[#C5A880] text-[#1E241E] text-[11px]">
                              Horário Remarcado ✓
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-[30px] text-[#1E241E] leading-tight">
                          {apt.protocolName}
                        </h3>

                        {apt.boosts && apt.boosts.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {apt.boosts.map((b) => (
                              <span
                                key={b.id}
                                className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E2DEC9] text-[12px] text-[#2F3E2E]"
                              >
                                + {b.name} (+20 min)
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Data e Hora em destaque */}
                      <div className="p-4 rounded-[8px] bg-[#EFECE6] border border-[#E2DEC9] text-left md:text-right shrink-0">
                        <span className="text-[11px] uppercase tracking-[0.08em] text-[#5C645A] block">
                          Data & Janela Alocada
                        </span>
                        <p className="font-serif text-[22px] text-[#1E241E] font-medium mt-0.5">
                          {apt.dateLabel} às {apt.timeSlot}
                        </p>
                        <p className="text-[12px] text-[#5C645A] mt-0.5">
                          Duração Total: {apt.totalDuration} min • {apt.specialist}
                        </p>
                      </div>
                    </div>

                    {/* BOX CHECKLIST DE PREPARO PRÉ-SESSÃO (Destaque Terracota #B87D64) */}
                    <div className="p-5 rounded-[8px] bg-[#FAF8F5] border border-[#B87D64] flex items-start gap-3.5">
                      <AlertCircle className="w-5 h-5 text-[#B87D64] shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="meta-tag text-[#B87D64] font-semibold block">
                          Checklist de Preparo Pré-Sessão Obrigatório
                        </span>
                        <p className="text-[14px] text-[#1E241E] font-medium">
                          {apt.preparo}
                        </p>
                        {apt.exige_avaliacao && (
                          <p className="text-[12px] text-[#5C645A]">
                            Inclui Avaliação Visual Presencial Gratuita (30 min) integrada à visita.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rodapé do Card com Botão REMARCAR EM 1 CLIQUE */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <div className="text-[13px] text-[#5C645A]">
                        <span>
                          Taxa de Reserva:{' '}
                          <strong className="text-[#1E241E]">
                            {apt.depositPaid === 0
                              ? 'R$ 0 (Isento VIP)'
                              : `R$ ${apt.depositPaid} (Quitada)`}
                          </strong>
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          Saldo na clínica:{' '}
                          <strong className="text-[#1E241E]">
                            R$ {apt.remainingBalance}
                          </strong>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const proto =
                            PROTOCOLS.find((p) => p.id === apt.protocolId) ||
                            PROTOCOLS[0];
                          openBookingDrawer(proto, {
                            rescheduleAppointment: apt,
                          });
                        }}
                        className="px-6 py-3 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium inline-flex items-center justify-center gap-2 hover:bg-[#7C8C76] transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Remarcar em 1 Clique (Grátis até 24h antes)</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ==================== ABA 2: MEU PLANO & DIÁRIO DA PELE ==================== */}
            {dashboardTab === 'plano' && (
              <div className="space-y-10">
                {/* MONITOR BIOLÓGICO DE CLIMA, UMIDADE & ÍNDICE UV EM TEMPO REAL (API) */}
                {weatherSkin && (
                  <div className="p-6 rounded-[12px] bg-[#EFECE6] border border-[#E2DEC9] space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="meta-tag text-[#2F3E2E] font-medium">
                        ✦ Monitor Ambiental da Epiderme • {weatherSkin.city} ({weatherSkin.source})
                      </span>
                      <span className="text-[11px] text-[#5C645A]">
                        Atualizado em tempo real
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-3.5 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] flex items-center gap-3">
                        <Thermometer className="w-5 h-5 text-[#2F3E2E] shrink-0" />
                        <div>
                          <span className="text-[11px] text-[#5C645A] block">Temperatura</span>
                          <span className="font-serif text-[22px] text-[#1E241E] font-medium">
                            {weatherSkin.temp}°C • {weatherSkin.description}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] flex items-center gap-3">
                        <Droplets className="w-5 h-5 text-[#7C8C76] shrink-0" />
                        <div>
                          <span className="text-[11px] text-[#5C645A] block">Umidade Relativa</span>
                          <span className="font-serif text-[22px] text-[#1E241E] font-medium">
                            {weatherSkin.humidity}% (Barreira Cutânea)
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] flex items-center gap-3">
                        <Sun className="w-5 h-5 text-[#C5A880] shrink-0" />
                        <div>
                          <span className="text-[11px] text-[#5C645A] block">Radiação Solar</span>
                          <span className="font-serif text-[22px] text-[#1E241E] font-medium">
                            Índice UV {weatherSkin.uvIndex}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[13px] text-[#1E241E] bg-[#FAF8F5] px-4 py-2.5 rounded-[6px] border border-[#C5A880]">
                      <strong className="text-[#2F3E2E]">Recomendação do Dia:</strong>{' '}
                      {weatherSkin.skinAdvice}
                    </p>
                  </div>
                )}

                {/* BARRA DE CICLO CELULAR DE 28 DIAS EM OURO FOSCO (#C5A880) */}
                <div className="p-7 sm:p-8 rounded-[12px] bg-[#FFFFFF] border border-[#C5A880] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="meta-tag text-[#7C8C76] block">
                        Cronobiologia Epidermal • Diário da Pele
                      </span>
                      <h2 className="font-serif text-[28px] lg:text-[32px] text-[#1E241E]">
                        Dia {cycleDay} de 28 — {phaseInfo.phase.split('•')[1]}
                      </h2>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-[#EFECE6] border border-[#C5A880] text-[12px] font-medium text-[#1E241E] self-start">
                      Ciclo Biológico Ativo
                    </span>
                  </div>

                  {/* Barra Horizontal em Ouro Fosco (#C5A880) */}
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-[#EFECE6] rounded-full overflow-hidden border border-[#E2DEC9]">
                      <div
                        className="h-full bg-[#C5A880] transition-all duration-300"
                        style={{ width: `${(cycleDay / 28) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] uppercase tracking-[0.06em] text-[#5C645A]">
                      <span>Dia 01 (Mitose Basal)</span>
                      <span>Dia 14 (Pico Colágeno)</span>
                      <span>Dia 24 (Renovação)</span>
                      <span>Dia 28 (Ciclo Completo)</span>
                    </div>
                  </div>

                  {/* Seletor interativo para simular qualquer dia do ciclo */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[12px] text-[#5C645A] mr-2">
                      Simular dia do ciclo:
                    </span>
                    {[5, 12, 18, 24, 28].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => updateCycleDay(d)}
                        className={`px-3 py-1 rounded-full text-[12px] border transition-colors ${
                          cycleDay === d
                            ? 'bg-[#2F3E2E] border-[#2F3E2E] text-[#FAF8F5]'
                            : 'bg-[#FAF8F5] border-[#E2DEC9] text-[#5C645A] hover:text-[#1E241E]'
                        }`}
                      >
                        Dia {d}
                      </button>
                    ))}
                  </div>

                  {/* Recomendação do Dia */}
                  <div className="p-5 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-[14px] text-[#1E241E] leading-relaxed">
                      <strong className="text-[#2F3E2E] block mb-0.5">
                        {phaseInfo.phase}:
                      </strong>
                      {phaseInfo.advice}
                    </p>
                    <button
                      type="button"
                      onClick={() => openBookingDrawer(phaseInfo.recommendedProtocol)}
                      className="px-5 py-2.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[12px] font-medium shrink-0 hover:bg-[#7C8C76] transition-colors"
                    >
                      Agendar {phaseInfo.recommendedProtocol.name}
                    </button>
                  </div>
                </div>

                {/* NOTAS DA ESPECIALISTA */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-[26px] text-[#1E241E]">
                      Notas Clínicas da Especialista
                    </h3>
                    <span className="text-[12px] text-[#5C645A]">
                      Prontuário Botânico Confidencial
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {specialistNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-6 rounded-[10px] bg-[#FFFFFF] border border-[#E2DEC9] space-y-3"
                      >
                        <div className="flex items-center justify-between text-[12px] text-[#7C8C76] border-b border-[#E2DEC9] pb-2.5">
                          <span className="font-medium">{note.date}</span>
                          <span>Hidratação: {note.hydrationLevel}</span>
                        </div>
                        <h4 className="font-serif text-[21px] text-[#1E241E]">
                          Sessão: {note.protocolName}
                        </h4>
                        <p className="text-[13px] text-[#5C645A] leading-relaxed">
                          “{note.note}”
                        </p>
                        <p className="text-[12px] text-[#1E241E] font-medium pt-1">
                          — {note.specialist}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACESSO DIRETO AO CRONOGRAMA SEMESTRAL E ROTINA SALVOS */}
                <div className="p-7 rounded-[12px] bg-[#EFECE6] border border-[#E2DEC9] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="meta-tag text-[#2F3E2E] block">
                        Seu Planejamento Facial Salvo
                      </span>
                      <h3 className="font-serif text-[26px] text-[#1E241E]">
                        {skinPlan.profileTitle}
                      </h3>
                    </div>

                    <div className="inline-flex p-1 rounded-full bg-[#FAF8F5] border border-[#E2DEC9]">
                      <button
                        type="button"
                        onClick={() => setPlanSubView('clinica')}
                        className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                          planSubView === 'clinica'
                            ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                            : 'text-[#5C645A]'
                        }`}
                      >
                        Cronograma 6 Meses
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlanSubView('casa')}
                        className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                          planSubView === 'casa'
                            ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                            : 'text-[#5C645A]'
                        }`}
                      >
                        Rotina Manhã & Noite
                      </button>
                    </div>
                  </div>

                  {planSubView === 'clinica' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {skinPlan.clinicSchedule.map((m) => {
                        const proto =
                          PROTOCOLS.find((p) => p.id === m.protocolId) || PROTOCOLS[0];
                        return (
                          <div
                            key={m.month}
                            className="p-4 rounded-[8px] bg-[#FFFFFF] border border-[#E2DEC9] flex items-center justify-between gap-4"
                          >
                            <div>
                              <span className="text-[11px] uppercase tracking-[0.08em] text-[#7C8C76] block">
                                {m.monthLabel} • {m.status}
                              </span>
                              <p className="font-serif text-[20px] text-[#1E241E] font-medium">
                                {m.protocolName}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                openBookingDrawer(proto, { targetPlanMonth: m.month })
                              }
                              className="px-3.5 py-2 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[11px] font-medium hover:bg-[#7C8C76] shrink-0"
                            >
                              {m.status === 'Agendado' ? 'Agendado ✓' : 'Agendar'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {productsInPlan.map((prod) => (
                        <div
                          key={prod.id}
                          className="p-4 rounded-[8px] bg-[#FFFFFF] border border-[#E2DEC9] flex items-center justify-between gap-3"
                        >
                          <div>
                            <p className="font-serif text-[19px] text-[#1E241E]">
                              {prod.name}
                            </p>
                            <p className="text-[11px] text-[#5C645A]">{prod.metaLine}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              addToBag({ ...prod, itemType: 'product' }, true)
                            }
                            className="px-3 py-1.5 rounded-full border border-[#2F3E2E] text-[#2F3E2E] text-[11px] font-medium hover:bg-[#2F3E2E] hover:text-[#FAF8F5]"
                          >
                            + Repor
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ==================== ABA 3: HISTÓRICO DE PROCEDIMENTOS ==================== */}
            {dashboardTab === 'historico' && (
              <div className="space-y-6">
                <div className="border-b border-[#E2DEC9] pb-4">
                  <span className="meta-tag text-[#7C8C76] block">
                    Memória Cutânea na Flagship
                  </span>
                  <h2 className="font-serif text-[30px] text-[#1E241E]">
                    Histórico Cronológico de Procedimentos
                  </h2>
                </div>

                <div className="space-y-4">
                  {procedureHistory.map((item) => {
                    const proto =
                      PROTOCOLS.find((p) => p.id === item.protocolId) || PROTOCOLS[0];
                    return (
                      <div
                        key={item.id}
                        className="p-6 rounded-[10px] bg-[#FFFFFF] border border-[#E2DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-3 text-[12px] text-[#7C8C76]">
                            <span className="font-medium text-[#1E241E]">
                              {item.date}
                            </span>
                            <span>•</span>
                            <span>{item.location}</span>
                          </div>
                          <h3 className="font-serif text-[24px] text-[#1E241E] font-medium">
                            {item.protocolName}
                          </h3>
                          {item.boostName && (
                            <p className="text-[12px] text-[#5C645A]">
                              + {item.boostName}
                            </p>
                          )}
                          <p className="text-[12px] text-[#5C645A]">
                            Especialista: {item.specialist} • Valor: R$ {item.pricePaid}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => openBookingDrawer(proto)}
                          className="px-5 py-2.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[12px] font-medium inline-flex items-center gap-2 hover:bg-[#7C8C76] transition-colors self-start sm:self-center shrink-0"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Repetir este Ritual</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================== ABA 4: BOUTIQUE & REPOSIÇÃO RÁPIDA ==================== */}
            {dashboardTab === 'reposicao' && (
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2DEC9] pb-4">
                    <div>
                      <span className="meta-tag text-[#7C8C76] block">
                        Prescrição Personalizada
                      </span>
                      <h2 className="font-serif text-[30px] text-[#1E241E]">
                        Em uso no seu Plano Facial
                      </h2>
                    </div>
                    <span className="text-[12px] text-[#5C645A]">
                      Recompra imediata em 1 clique
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PRODUCTS.map((prod) => (
                      <LuxuryCard
                        key={prod.id}
                        item={prod}
                        type="product"
                        customBadge="Em uso no seu Plano Facial"
                        onActionClick={(pr) =>
                          addToBag({ ...pr, itemType: 'product' }, true)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== ABA 5: CARTEIRA & CLUBE ÉCLAT ==================== */}
            {dashboardTab === 'carteira' && (
              <div className="space-y-8">
                <div className="border-b border-[#E2DEC9] pb-4">
                  <span className="meta-tag text-[#7C8C76] block">
                    Gestão de Benefícios & Créditos
                  </span>
                  <h2 className="font-serif text-[30px] text-[#1E241E]">
                    Sua Carteira & Clube Éclat
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Status da Assinatura Mensal Le Club Éclat */}
                  <div className="p-7 rounded-[12px] bg-[#2F3E2E] text-[#FAF8F5] border border-[#C5A880] flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="meta-tag text-[#C5A880] flex items-center gap-1.5">
                          <Crown className="w-3.5 h-3.5" /> Le Club Éclat VIP
                        </span>
                        <span className="px-3 py-0.5 rounded-full bg-[#C5A880] text-[#1E241E] text-[11px] font-medium">
                          {isClubMember ? 'Ativa' : 'Inativa'}
                        </span>
                      </div>

                      <h3 className="font-serif text-[28px] leading-tight">
                        {isClubMember
                          ? 'Ativa • 1 Ritual Disponível neste mês'
                          : 'Assinatura Mensal VIP (R$ 360/mês)'}
                      </h3>

                      <p className="text-[13px] text-[#FAF8F5]/80">
                        {isClubMember
                          ? 'Você possui isenção automática da taxa de R$ 100 na Gaveta de Agendamento e 15% OFF ativo em toda a Boutique.'
                          : 'Ative agora para liberar 1 ritual mensal de até R$ 460, isenção da taxa de reserva e 15% OFF em produtos.'}
                      </p>
                    </div>

                    {isClubMember ? (
                      <button
                        type="button"
                        onClick={() => openBookingDrawer(PROTOCOLS[4])}
                        className="w-full py-3 rounded-full bg-[#FAF8F5] text-[#2F3E2E] text-[13px] font-medium hover:bg-[#C5A880] transition-colors"
                      >
                        Usar Meu Ritual Mensal Agora
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={subscribeToClub}
                        className="w-full py-3 rounded-full bg-[#C5A880] text-[#1E241E] text-[13px] font-medium hover:bg-[#FAF8F5] transition-colors"
                      >
                        Ativar Assinatura VIP (R$ 360/mês)
                      </button>
                    )}
                  </div>

                  {/* Card 2: Saldo de Créditos Domiciliares Chez Vous */}
                  <div className="p-7 rounded-[12px] bg-[#FFFFFF] border border-[#E2DEC9] flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="meta-tag text-[#7C8C76] flex items-center gap-1.5">
                          <Home className="w-3.5 h-3.5" /> Atendimento Domiciliar
                        </span>
                        <span className="text-[12px] text-[#5C645A]">
                          Belle Éclat Chez Vous
                        </span>
                      </div>

                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-[44px] leading-none text-[#1E241E]">
                          {chezVousCredits}
                        </span>
                        <span className="text-[15px] text-[#5C645A]">
                          Créditos Chez Vous disponíveis
                        </span>
                      </div>

                      <p className="text-[13px] text-[#5C645A]">
                        {chezVousCredits > 0
                          ? 'A chave seletora [ Na Flagship | Em Domicílio ] está liberada em sua Gaveta de Agendamento.'
                          : 'Adquira o pacote Sérénité (4 sessões) ou Éclat Absolu (8 sessões) para receber nossa especialista em casa.'}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      {chezVousCredits > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            openBookingDrawer(PROTOCOLS[2], { modality: 'ChezVous' })
                          }
                          className="flex-1 py-3 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[12px] font-medium hover:bg-[#7C8C76]"
                        >
                          Agendar em Domicílio
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          navigateTo('rituais', { rituaisTab: 'chezvous' })
                        }
                        className="flex-1 py-3 rounded-full border border-[#2F3E2E] text-[#2F3E2E] text-[12px] font-medium hover:bg-[#EFECE6]"
                      >
                        Comprar Pacote Chez Vous
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 3: Resgatar Código de Vale-Experiência (Gift Card) */}
                <div className="p-7 rounded-[12px] bg-[#EFECE6] border border-[#E2DEC9] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Gift className="w-5 h-5 text-[#2F3E2E]" />
                      <h3 className="font-serif text-[24px] text-[#1E241E]">
                        Resgatar Código de Vale-Experiência
                      </h3>
                    </div>
                    <span className="text-[13px] font-medium text-[#2F3E2E]">
                      Saldo em Vale-Experiência: R$ {giftCardBalance},00
                    </span>
                  </div>

                  <form
                    onSubmit={handleRedeemVoucher}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="text"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      placeholder="Digite o código do cartão (ex: ECLAT-460-VIP)"
                      className="flex-1 px-4 py-3 rounded-full bg-[#FAF8F5] border border-[#E2DEC9] text-[13px] text-[#1E241E] focus:outline-none focus:border-[#C5A880]"
                    />
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium hover:bg-[#7C8C76] transition-colors shrink-0"
                    >
                      Resgatar Créditos
                    </button>
                  </form>

                  {voucherFeedback && (
                    <p className="text-[13px] text-[#2F3E2E] font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{voucherFeedback}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

