import React, { useState } from 'react';
import {
  X,
  Check,
  Calendar,
  Clock,
  Sparkles,
  AlertCircle,
  QrCode,
  CreditCard,
  ChevronDown,
  MapPin,
  Home,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { useEclat, getNext14Days } from '../context/EclatContext';
import { PROTOCOLS, BOOSTS, PRODUCTS } from '../data/mockData';

const DAYS_LIST = getNext14Days();

const TIME_PERIODS = [
  { label: 'Manhã', slots: ['09:00', '10:30'] },
  { label: 'Tarde', slots: ['14:00', '15:30', '17:00'] },
  { label: 'Noite', slots: ['18:30'] },
];

export default function BookingDrawer() {
  const {
    bookingDrawer,
    setBookingDrawer,
    closeBookingDrawer,
    toggleBoostInDrawer,
    confirmBooking,
    isClubMember,
    chezVousCredits,
    navigateTo,
    addToBag,
  } = useEclat();

  const [paymentTab, setPaymentTab] = useState('PIX'); // 'PIX' | 'CARD'
  const [upsellAddedIds, setUpsellAddedIds] = useState([]);

  if (!bookingDrawer.isOpen) return null;

  const {
    selectedProtocol,
    selectedBoosts,
    step,
    reschedulingId,
    modality,
    selectedDate,
    selectedTime,
  } = bookingDrawer;

  const boostsDuration = selectedBoosts.reduce((acc, b) => acc + b.duration, 0);
  const boostsPrice = selectedBoosts.reduce((acc, b) => acc + b.price, 0);
  const totalDuration = selectedProtocol.duration + boostsDuration;
  const totalPrice = selectedProtocol.price + boostsPrice;

  const isExempt = Boolean(reschedulingId) || isClubMember || modality === 'ChezVous';
  const depositAmount = isExempt ? 0 : 100;
  const remainingAtClinic =
    modality === 'ChezVous'
      ? 0
      : isClubMember && selectedProtocol.price <= 460
      ? boostsPrice
      : Math.max(0, totalPrice - (reschedulingId ? 100 : depositAmount));

  const allocatedSpecialist =
    selectedTime === '09:00' || selectedTime === '10:30'
      ? 'Dra. Camille Laurent (Especialista Sênior)'
      : selectedTime === '14:00' || selectedTime === '15:30'
      ? 'Claire Moreau (Facialista Botânica)'
      : 'Hélène Dubois (Mestre em Escultura Facial)';

  const handleSelectTimeSlot = (slot) => {
    // Selecionar o horário recolhe a Etapa 2 e abre a Etapa 3 automaticamente
    setBookingDrawer((prev) => ({
      ...prev,
      selectedTime: slot,
      step: 3,
    }));
  };

  const handleUpsellReserve = (product) => {
    addToBag({ ...product, itemType: 'product' }, false);
    setUpsellAddedIds((prev) => [...prev, product.id]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop com blur(3px) */}
      <div
        onClick={closeBookingDrawer}
        className="fixed inset-0 bg-[#1E241E]/40 backdrop-blur-[3px] transition-opacity duration-250"
      />

      {/* Gaveta Lateral de 440px */}
      <aside className="relative z-10 w-full max-w-[440px] bg-[#EFECE6] border-l border-[#E2DEC9] h-full flex flex-col justify-between overflow-hidden">
        {/* TOPO DA GAVETA */}
        <div className="px-6 py-5 bg-[#FAF8F5] border-b border-[#E2DEC9]">
          <div className="flex items-center justify-between">
            <div>
              <span className="meta-tag text-[#7C8C76] block">
                {reschedulingId ? 'Remarcação Flexível em 1 Clique' : 'Concierge de Agendamento'}
              </span>
              <h2 className="font-serif text-[26px] leading-tight text-[#1E241E]">
                {step === 4 ? 'Reserva Confirmada' : 'Agendar Ritual Facial'}
              </h2>
            </div>
            <button
              type="button"
              onClick={closeBookingDrawer}
              aria-label="Fechar gaveta de agendamento"
              className="p-2 rounded-full border border-[#E2DEC9] text-[#1E241E] hover:border-[#C5A880] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* SELETOR CONDICIONAL DE MODALIDADE (Flagship vs Em Domicílio Chez Vous) */}
          {step < 4 && (
            <div className="mt-4">
              {chezVousCredits > 0 ? (
                <div className="p-1 rounded-full bg-[#EFECE6] border border-[#E2DEC9] grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setBookingDrawer((prev) => ({ ...prev, modality: 'Flagship' }))
                    }
                    className={`py-2 px-3 rounded-full text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all duration-250 ${
                      modality === 'Flagship'
                        ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                        : 'text-[#5C645A] hover:text-[#1E241E]'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Na Flagship</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setBookingDrawer((prev) => ({ ...prev, modality: 'ChezVous' }))
                    }
                    className={`py-2 px-3 rounded-full text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all duration-250 ${
                      modality === 'ChezVous'
                        ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                        : 'text-[#5C645A] hover:text-[#1E241E]'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Em Domicílio ({chezVousCredits} créd.)</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between px-3.5 py-2 rounded-[6px] bg-[#EFECE6] border border-[#E2DEC9] text-[12px]">
                  <span className="flex items-center gap-1.5 text-[#1E241E] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#2F3E2E]" />
                    Modalidade: Unidade Flagship Jardins
                  </span>
                  <span className="text-[#5C645A]">Cabine Privativa</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CORPO DA GAVETA (SANFONA DE 3 ETAPAS OU TELA DE SUCESSO) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {step === 4 ? (
            /* TELA DE SUCESSO DENTRO DA GAVETA */
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-[12px] bg-[#FFFFFF] border border-[#C5A880] text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#C5A880]/15 border border-[#C5A880] text-[#2F3E2E] flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5 text-[#C5A880]" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#EFECE6] border border-[#C5A880] text-[11px] uppercase tracking-[0.08em] text-[#1E241E]">
                  ✦ Ritual Confirmado na Maison
                </span>
                <h3 className="font-serif text-[26px] text-[#1E241E]">
                  {selectedProtocol.name}
                </h3>
                <p className="text-[13px] text-[#5C645A]">
                  {selectedDate.fullLabel} às <strong>{selectedTime}</strong> •{' '}
                  {modality === 'ChezVous' ? 'Atendimento em Domicílio' : 'Unidade Flagship'}
                </p>
                <p className="text-[12px] text-[#7C8C76] font-medium">
                  Especialista designada: {allocatedSpecialist}
                </p>
              </div>

              {/* CHECKLIST DE PREPARO PRÉ-SESSÃO (Destaque Terracota) */}
              <div className="p-5 rounded-[8px] bg-[#FAF8F5] border border-[#B87D64] space-y-2.5">
                <div className="flex items-center gap-2 text-[#B87D64]">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="meta-tag font-semibold">
                    Checklist de Preparo Pré-Sessão
                  </span>
                </div>
                <p className="text-[14px] text-[#1E241E] font-medium leading-relaxed">
                  {selectedProtocol.preparo}
                </p>
                {selectedProtocol.exige_avaliacao && (
                  <p className="text-[12px] text-[#B87D64] pt-1 border-t border-[#E2DEC9]">
                    Nota: Inclui Avaliação Visual Presencial Gratuita (30 min) no início da visita.
                  </p>
                )}
              </div>

              {/* UPSELL DE 1 CLIQUE: Retirada na Recepção */}
              <div className="p-5 rounded-[8px] bg-[#FFFFFF] border border-[#E2DEC9] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="meta-tag text-[#5C645A]">Concierge Boutique</span>
                  {isClubMember && (
                    <span className="text-[11px] text-[#2F3E2E] font-medium">
                      15% OFF Clube Ativo
                    </span>
                  )}
                </div>
                <p className="font-serif text-[19px] text-[#1E241E] leading-snug">
                  Deseja deixar algum produto separado na recepção para retirar no dia?
                </p>
                <div className="space-y-2.5 pt-1">
                  {PRODUCTS.slice(0, 2).map((prod) => {
                    const isAdded = upsellAddedIds.includes(prod.id);
                    const finalPrice = isClubMember
                      ? Math.round(prod.price * 0.85)
                      : prod.price;
                    return (
                      <div
                        key={prod.id}
                        className="flex items-center justify-between p-2.5 rounded-[6px] bg-[#FAF8F5] border border-[#E2DEC9]"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div>
                            <p className="font-serif text-[16px] text-[#1E241E] leading-tight">
                              {prod.name}
                            </p>
                            <p className="text-[12px] text-[#5C645A]">R$ {finalPrice}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={isAdded}
                          onClick={() => handleUpsellReserve(prod)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
                            isAdded
                              ? 'bg-[#7C8C76] text-[#FAF8F5]'
                              : 'border border-[#2F3E2E] text-[#2F3E2E] hover:bg-[#2F3E2E] hover:text-[#FAF8F5]'
                          }`}
                        >
                          {isAdded ? '✓ Separado' : '+ Separar'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  closeBookingDrawer();
                  navigateTo('painel', { dashboardTab: 'agendamentos' });
                }}
                className="w-full py-3.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[14px] font-medium hover:bg-[#7C8C76] transition-colors"
              >
                Ver em Meus Agendamentos
              </button>
            </div>
          ) : (
            /* SANFONA (ACCORDION) DE 3 ETAPAS */
            <>
              {/* ================= ETAPA 1: PROTOCOLO & BOOSTS ================= */}
              <div className="rounded-[8px] bg-[#FFFFFF] border border-[#E2DEC9] overflow-hidden">
                {step !== 1 ? (
                  /* Linha fina de resumo quando recolhida */
                  <button
                    type="button"
                    onClick={() => setBookingDrawer((prev) => ({ ...prev, step: 1 }))}
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-[#FAF8F5] transition-colors"
                  >
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.08em] text-[#7C8C76] block">
                        01. Protocolo & Boosts ✓
                      </span>
                      <span className="font-serif text-[18px] text-[#1E241E] font-medium">
                        {selectedProtocol.name}
                        {selectedBoosts.length > 0 && ` + ${selectedBoosts.length} Boost`}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[13px] font-medium text-[#1E241E] block">
                        R$ {totalPrice}
                      </span>
                      <span className="text-[11px] text-[#5C645A]">{totalDuration} min</span>
                    </div>
                  </button>
                ) : (
                  /* Etapa 1 Aberta */
                  <div className="p-5 space-y-5">
                    <div className="flex items-center justify-between border-b border-[#E2DEC9] pb-3">
                      <span className="meta-tag text-[#2F3E2E] font-semibold">
                        Etapa 01 • Protocolo & Boosts
                      </span>
                      <span className="text-[12px] text-[#5C645A]">
                        {totalDuration} min • R$ {totalPrice}
                      </span>
                    </div>

                    {/* Seletor de Protocolo */}
                    <div>
                      <label className="block text-[12px] text-[#5C645A] mb-1.5">
                        Ritual Selecionado
                      </label>
                      <div className="relative">
                        <select
                          value={selectedProtocol.id}
                          onChange={(e) => {
                            const found = PROTOCOLS.find((p) => p.id === e.target.value);
                            if (found) {
                              setBookingDrawer((prev) => ({
                                ...prev,
                                selectedProtocol: found,
                              }));
                            }
                          }}
                          className="w-full appearance-none bg-[#FAF8F5] border border-[#E2DEC9] rounded-[6px] px-3.5 py-2.5 pr-9 font-serif text-[19px] text-[#1E241E] focus:outline-none focus:border-[#C5A880]"
                        >
                          {PROTOCOLS.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.durationLabel} — R$ {p.price})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#5C645A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      <p className="mt-1.5 text-[12px] text-[#5C645A]">
                        {selectedProtocol.category} • Ativo: {selectedProtocol.keyActive}
                      </p>
                    </div>

                    {/* REGRA DE TRATAMENTO INVASIVO (exige_avaliacao === true) */}
                    {selectedProtocol.exige_avaliacao && (
                      <div className="p-3.5 rounded-[6px] bg-[#FAF8F5] border border-[#B87D64] flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-[#B87D64] shrink-0 mt-0.5" />
                        <p className="text-[12px] text-[#1E241E] leading-relaxed">
                          <strong className="text-[#B87D64] block mb-0.5">
                            Avaliação Presencial Obrigatória:
                          </strong>
                          Por segurança dermatológica, sua primeira visita para este protocolo é convertida automaticamente em uma{' '}
                          <strong>Avaliação Visual Presencial Gratuita (30 min)</strong>.
                        </p>
                      </div>
                    )}

                    {/* Seleção de Boosts (+20 min) */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="meta-tag text-[#5C645A]">
                          Adicionar Boost na Mesma Visita (+20 min)
                        </span>
                        <span className="text-[11px] text-[#5C645A]">Máx. 2</span>
                      </div>

                      {BOOSTS.map((boost) => {
                        const checked = selectedBoosts.some((b) => b.id === boost.id);
                        return (
                          <label
                            key={boost.id}
                            onClick={() => toggleBoostInDrawer(boost)}
                            className={`cursor-pointer p-3 rounded-[6px] border flex items-start justify-between gap-3 transition-all duration-250 ${
                              checked
                                ? 'bg-[#FAF8F5] border-[#2F3E2E]'
                                : 'bg-[#FFFFFF] border-[#E2DEC9] hover:border-[#C5A880]'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <div
                                className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border ${
                                  checked
                                    ? 'bg-[#2F3E2E] border-[#2F3E2E] text-[#FAF8F5]'
                                    : 'border-[#5C645A]'
                                }`}
                              >
                                {checked && <Check className="w-3 h-3 stroke-[2.5]" />}
                              </div>
                              <div>
                                <p className="text-[13px] font-medium text-[#1E241E]">
                                  {boost.name}
                                </p>
                                <p className="text-[11px] text-[#5C645A] mt-0.5">
                                  + {boost.duration} min • {boost.description}
                                </p>
                              </div>
                            </div>
                            <span className="text-[13px] font-medium text-[#1E241E] shrink-0">
                              + R$ {boost.price}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Resumo de Tempo e Valor na Etapa 1 */}
                    <div className="p-3 rounded-[6px] bg-[#EFECE6] flex items-center justify-between text-[13px]">
                      <span className="text-[#5C645A]">
                        Tempo Total: <strong className="text-[#1E241E]">{totalDuration} min</strong>
                      </span>
                      <span className="text-[#5C645A]">
                        Valor Total: <strong className="text-[#1E241E]">R$ {totalPrice}</strong>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setBookingDrawer((prev) => ({ ...prev, step: 2 }))}
                      className="w-full py-3 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium hover:bg-[#7C8C76] transition-colors"
                    >
                      Escolher Data e Horário
                    </button>
                  </div>
                )}
              </div>

              {/* ================= ETAPA 2: DATA & HORÁRIO ================= */}
              <div className="rounded-[8px] bg-[#FFFFFF] border border-[#E2DEC9] overflow-hidden">
                {step !== 2 ? (
                  /* Linha fina de resumo quando recolhida */
                  <button
                    type="button"
                    onClick={() => setBookingDrawer((prev) => ({ ...prev, step: 2 }))}
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-[#FAF8F5] transition-colors"
                  >
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.08em] text-[#7C8C76] block">
                        02. Data & Horário {step > 2 ? '✓' : ''}
                      </span>
                      <span className="font-serif text-[18px] text-[#1E241E] font-medium">
                        {selectedDate.fullLabel} às {selectedTime}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#5C645A] underline">Alterar</span>
                  </button>
                ) : (
                  /* Etapa 2 Aberta */
                  <div className="p-5 space-y-5">
                    <div className="flex items-center justify-between border-b border-[#E2DEC9] pb-3">
                      <span className="meta-tag text-[#2F3E2E] font-semibold">
                        Etapa 02 • Data & Horário
                      </span>
                      <span className="text-[11px] text-[#7C8C76]">
                        Alocação Inteligente
                      </span>
                    </div>

                    {reschedulingId && (
                      <div className="p-3 rounded-[6px] bg-[#FAF8F5] border border-[#C5A880] text-[12px] text-[#1E241E]">
                        ✦ <strong>Remarcação Gratuita em 1 Clique:</strong> Escolha sua nova janela abaixo sem nenhuma cobrança adicional.
                      </div>
                    )}

                    {/* Seletor Horizontal dos Próximos 14 Dias */}
                    <div>
                      <label className="block text-[12px] text-[#5C645A] mb-2">
                        Próximos 14 Dias Disponíveis
                      </label>
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {DAYS_LIST.map((day) => {
                          const isSelected = selectedDate.iso === day.iso;
                          return (
                            <button
                              key={day.iso}
                              type="button"
                              onClick={() =>
                                setBookingDrawer((prev) => ({ ...prev, selectedDate: day }))
                              }
                              className={`min-w-[68px] py-2.5 px-2 rounded-[8px] border text-center transition-all duration-250 shrink-0 ${
                                isSelected
                                  ? 'bg-[#2F3E2E] border-[#2F3E2E] text-[#FAF8F5]'
                                  : 'bg-[#FAF8F5] border-[#E2DEC9] text-[#1E241E] hover:border-[#C5A880]'
                              }`}
                            >
                              <span className="block text-[10px] uppercase tracking-wider opacity-80">
                                {day.weekName}
                              </span>
                              <span className="block font-serif text-[20px] font-semibold leading-tight my-0.5">
                                {day.dayNum}
                              </span>
                              <span className="block text-[10px] opacity-80">
                                {day.monthName}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Grade de Horários (Manhã, Tarde, Noite) */}
                    <div className="space-y-3">
                      <label className="block text-[12px] text-[#5C645A]">
                        Selecione o Horário (Avança automaticamente)
                      </label>
                      {TIME_PERIODS.map((group) => (
                        <div key={group.label} className="space-y-1.5">
                          <span className="text-[11px] uppercase tracking-[0.08em] text-[#5C645A]">
                            {group.label}
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {group.slots.map((slot) => {
                              const active = selectedTime === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => handleSelectTimeSlot(slot)}
                                  className={`py-2 px-3 rounded-full border text-[13px] font-medium transition-all duration-250 ${
                                    active
                                      ? 'bg-[#2F3E2E] border-[#2F3E2E] text-[#FAF8F5]'
                                      : 'bg-[#FAF8F5] border-[#E2DEC9] text-[#1E241E] hover:border-[#2F3E2E]'
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-[6px] bg-[#FAF8F5] border border-[#E2DEC9] text-[12px] text-[#5C645A]">
                      Especialista alocada para este turno:{' '}
                      <strong className="text-[#1E241E]">{allocatedSpecialist}</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => setBookingDrawer((prev) => ({ ...prev, step: 3 }))}
                      className="w-full py-3 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium hover:bg-[#7C8C76] transition-colors"
                    >
                      Continuar para Confirmação
                    </button>
                  </div>
                )}
              </div>

              {/* ================= ETAPA 3: CONFIRMAÇÃO E TAXA FIXA DE RESERVA ================= */}
              <div className="rounded-[8px] bg-[#FFFFFF] border border-[#E2DEC9] overflow-hidden">
                {step !== 3 ? (
                  <div className="px-4 py-3.5 flex items-center justify-between text-left opacity-60">
                    <span className="text-[11px] uppercase tracking-[0.08em] text-[#5C645A]">
                      03. Confirmação & Taxa de Reserva
                    </span>
                    <span className="text-[12px] text-[#5C645A]">
                      {isExempt ? 'R$ 0 (Isento)' : 'Taxa R$ 100'}
                    </span>
                  </div>
                ) : (
                  <div className="p-5 space-y-5">
                    <div className="flex items-center justify-between border-b border-[#E2DEC9] pb-3">
                      <span className="meta-tag text-[#2F3E2E] font-semibold">
                        Etapa 03 • Confirmação & Garantia
                      </span>
                      <ShieldCheck className="w-4 h-4 text-[#7C8C76]" />
                    </div>

                    {/* Quadro Financeiro */}
                    <div className="p-4 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] space-y-2.5 text-[13px]">
                      <div className="flex justify-between text-[#5C645A]">
                        <span>{selectedProtocol.name}</span>
                        <span>R$ {selectedProtocol.price},00</span>
                      </div>
                      {selectedBoosts.map((b) => (
                        <div key={b.id} className="flex justify-between text-[#5C645A]">
                          <span>+ {b.name}</span>
                          <span>R$ {b.price},00</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-[#E2DEC9] flex justify-between font-medium text-[#1E241E]">
                        <span>Resumo Total do Serviço ({totalDuration} min)</span>
                        <span>R$ {totalPrice},00</span>
                      </div>

                      {/* Regra da Taxa de Reserva: R$ 100 vs R$ 0 (Clube / Chez Vous / Remarcação) */}
                      <div className="pt-2 border-t border-[#E2DEC9] flex justify-between items-center">
                        <span className="font-medium text-[#2F3E2E]">
                          Taxa Fixa de Reserva agora:
                        </span>
                        {isExempt ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[11px] font-medium">
                            R$ 0,00 •{' '}
                            {reschedulingId
                              ? 'Já quitada'
                              : modality === 'ChezVous'
                              ? 'Pacote Chez Vous'
                              : 'Coberto pelo Clube Éclat'}
                          </span>
                        ) : (
                          <span className="text-[15px] font-semibold text-[#2F3E2E]">
                            R$ 100,00
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between text-[12px] text-[#5C645A]">
                        <span>Saldo restante na recepção da clínica:</span>
                        <span>R$ {remainingAtClinic},00</span>
                      </div>
                    </div>

                    {/* Se for Isento (Clube Éclat, Chez Vous ou Remarcação) vs Cliente Avulso */}
                    {isExempt ? (
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-[6px] bg-[#EFECE6] border border-[#C5A880] text-[12px] text-[#1E241E] flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
                          <span>
                            {reschedulingId
                              ? 'Remarcação gratuita até 24h antes. Seu sinal original de R$ 100 permanece integralmente abatido.'
                              : modality === 'ChezVous'
                              ? '1 crédito do seu pacote Belle Éclat Chez Vous será utilizado para esta visita domiciliar.'
                              : 'Privilégio Le Club Éclat VIP ativo: reserva imediata sem cobrança de sinal de R$ 100.'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => confirmBooking('VIP_ONE_CLICK')}
                          className="w-full py-3.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[14px] font-medium hover:bg-[#7C8C76] transition-colors"
                        >
                          {reschedulingId
                            ? 'Confirmar Remarcação em 1 Clique'
                            : 'Confirmar Reserva em 1 Clique'}
                        </button>
                      </div>
                    ) : (
                      /* Pagamento Rápido da Taxa Fixa de R$ 100 (PIX ou Cartão) */
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-[#EFECE6] border border-[#E2DEC9]">
                          <button
                            type="button"
                            onClick={() => setPaymentTab('PIX')}
                            className={`py-2 px-3 rounded-full text-[12px] font-medium flex items-center justify-center gap-1.5 transition-colors ${
                              paymentTab === 'PIX'
                                ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                                : 'text-[#5C645A]'
                            }`}
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>PIX Instantâneo</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentTab('CARD')}
                            className={`py-2 px-3 rounded-full text-[12px] font-medium flex items-center justify-center gap-1.5 transition-colors ${
                              paymentTab === 'CARD'
                                ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                                : 'text-[#5C645A]'
                            }`}
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Cartão de Crédito</span>
                          </button>
                        </div>

                        {paymentTab === 'PIX' ? (
                          <div className="p-4 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] text-center space-y-3">
                            <div className="w-28 h-28 mx-auto rounded-[8px] bg-[#FFFFFF] border border-[#E2DEC9] flex flex-col items-center justify-center p-2">
                              <QrCode className="w-20 h-20 text-[#2F3E2E] stroke-[1.25]" />
                            </div>
                            <p className="text-[12px] text-[#5C645A]">
                              Taxa de Reserva: <strong className="text-[#1E241E]">R$ 100,00</strong> (100% abatida na clínica)
                            </p>
                            <div className="px-3 py-1.5 rounded bg-[#EFECE6] text-[11px] font-mono text-[#5C645A] truncate">
                              00020126580014BR.GOV.BCB.PIX0136belle-eclat-flagship-sp52040000
                            </div>
                            <button
                              type="button"
                              onClick={() => confirmBooking('PIX Instantâneo')}
                              className="w-full py-3 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium hover:bg-[#7C8C76] transition-colors"
                            >
                              Simular Pagamento PIX e Confirmar
                            </button>
                          </div>
                        ) : (
                          <div className="p-4 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] space-y-3">
                            <div className="flex items-center justify-between text-[12px] text-[#5C645A]">
                              <span>Cartão salvo na Maison</span>
                              <span className="font-medium text-[#1E241E]">•••• 4892 (Mastercard Black)</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => confirmBooking('Cartão em 1 Clique')}
                              className="w-full py-3 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium hover:bg-[#7C8C76] transition-colors"
                            >
                              Pagar Taxa de R$ 100,00 em 1 Clique
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* RODAPÉ DISCRETO DA GAVETA */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#E2DEC9] flex items-center justify-between text-[11px] text-[#5C645A]">
          <span>✦ Remarcação gratuita até 24h antes</span>
          <span>Flagship Jardins</span>
        </div>
      </aside>
    </div>
  );
}

