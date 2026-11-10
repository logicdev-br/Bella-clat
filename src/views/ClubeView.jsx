import React from 'react';
import {
  Crown,
  Sparkles,
  CalendarCheck,
  ShieldCheck,
  Check,
  Calendar,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { useEclat } from '../context/EclatContext';
import { PROTOCOLS } from '../data/mockData';

export default function ClubeView() {
  const {
    isClubMember,
    subscribeToClub,
    setIsClubMember,
    openBookingDrawer,
    navigateTo,
    showToast,
  } = useEclat();

  const includedProtocols = PROTOCOLS.filter((p) => p.price <= 460);

  return (
    <div className="eclat-section bg-[#FAF8F5] min-h-[82vh]">
      <div className="eclat-container space-y-16">
        {/* HERO DO CLUBE ÉCLAT */}
        <div className="rounded-[12px] overflow-hidden border border-[#C5A880] grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 bg-[#2F3E2E] text-[#FAF8F5] p-8 sm:p-12 lg:p-16 space-y-8 flex flex-col justify-between">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880] text-[#C5A880] text-[11px] uppercase tracking-[0.08em]">
                <Crown className="w-3.5 h-3.5" />
                <span>Le Club Éclat • Assinatura Mensal Única</span>
              </span>

              <h1 className="font-serif text-[36px] lg:text-[50px] leading-[1.12] font-normal">
                O compromisso mensal com a longevidade biológica da sua pele.
              </h1>

              <p className="text-[15px] text-[#FAF8F5]/85 leading-relaxed max-w-xl">
                Sincronize suas visitas à Flagship ao ciclo epidérmico de 28 dias. Uma modalidade única VIP desenhada para mulheres que transformam o cuidado facial em ritual permanente.
              </p>
            </div>

            <div className="pt-6 border-t border-[#FAF8F5]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-[12px] uppercase tracking-[0.08em] text-[#C5A880] block">
                  Mensalidade Fixa • Sem Fidelidade
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-[44px] leading-none text-[#FAF8F5]">
                    R$ 360
                  </span>
                  <span className="text-[14px] text-[#FAF8F5]/75">/mês</span>
                </div>
              </div>

              {isClubMember ? (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openBookingDrawer(PROTOCOLS[4])}
                    className="px-7 py-4 rounded-full bg-[#C5A880] text-[#1E241E] text-[13px] font-medium flex items-center gap-2 hover:bg-[#FAF8F5] transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Agendar Ritual Mensal (Taxa R$ 0)</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={subscribeToClub}
                  className="px-8 py-4 rounded-full bg-[#FAF8F5] text-[#2F3E2E] text-[14px] font-medium flex items-center gap-2 hover:bg-[#C5A880] hover:text-[#1E241E] transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Assinar Le Club Éclat Agora</span>
                </button>
              )}
            </div>
          </div>

          {/* Cartão de Status / Resumo Lateral */}
          <div className="lg:col-span-5 bg-[#EFECE6] p-8 sm:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2DEC9] pb-4">
                <span className="meta-tag text-[#2F3E2E]">Status da Sua Conta</span>
                <span
                  className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.08em] font-medium ${
                    isClubMember
                      ? 'bg-[#2F3E2E] text-[#C5A880] border border-[#C5A880]'
                      : 'bg-[#FAF8F5] text-[#5C645A] border border-[#E2DEC9]'
                  }`}
                >
                  {isClubMember ? '✦ Membro VIP Ativo' : 'Visitante Avulso'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] flex items-start gap-3.5">
                  <Sparkles className="w-5 h-5 text-[#2F3E2E] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif text-[20px] text-[#1E241E] font-medium">
                      1 Ritual Mensal na Flagship (Até R$ 460)
                    </h3>
                    <p className="text-[13px] text-[#5C645A]">
                      Economia imediata de até R$ 100 já na própria sessão mensal escolhida.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] flex items-start gap-3.5">
                  <CalendarCheck className="w-5 h-5 text-[#2F3E2E] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif text-[20px] text-[#1E241E] font-medium">
                      Isenção Total da Taxa de Reserva (R$ 100 → R$ 0)
                    </h3>
                    <p className="text-[13px] text-[#5C645A]">
                      Confirmação em 1 clique na Gaveta de Agendamento sem pré-pagamento de sinal.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] flex items-start gap-3.5">
                  <ShieldCheck className="w-5 h-5 text-[#2F3E2E] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif text-[20px] text-[#1E241E] font-medium">
                      15% OFF Automático em Toda a Boutique
                    </h3>
                    <p className="text-[13px] text-[#5C645A]">
                      Aplicado em tempo real em todos os 6 produtos da linha própria e na Sacola.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {isClubMember && (
              <div className="pt-4 border-t border-[#E2DEC9] flex items-center justify-between text-[12px]">
                <button
                  type="button"
                  onClick={() => navigateTo('boutique')}
                  className="text-[#2F3E2E] font-medium inline-flex items-center gap-1 hover:underline"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Ir para Boutique com 15% OFF</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsClubMember(false);
                    showToast('Assinatura pausada', 'Você pode reativar a qualquer momento.');
                  }}
                  className="text-[#5C645A] hover:text-[#B87D64]"
                >
                  Pausar assinatura
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PROTOCOLOS ELEGÍVEIS NO CRÉDITO MENSAL */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="meta-tag text-[#7C8C76] block">
                Menu Incluso na Assinatura
              </span>
              <h2 className="font-serif text-[32px] text-[#1E241E]">
                6 Protocolos Integralmente Cobertos Todo Mês
              </h2>
            </div>
            <p className="text-[13px] text-[#5C645A]">
              Escolha livremente a cada ciclo de 28 dias conforme a necessidade da sua pele:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedProtocols.map((proto) => (
              <div
                key={proto.id}
                className="p-6 rounded-[10px] bg-[#FFFFFF] border border-[#E2DEC9] flex flex-col justify-between gap-5"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EFECE6] text-[11px] uppercase tracking-[0.08em] text-[#2F3E2E] font-medium">
                      Incluso no Clube
                    </span>
                    <span className="text-[12px] text-[#5C645A] line-through">
                      Avulso: R$ {proto.price}
                    </span>
                  </div>
                  <h3 className="font-serif text-[24px] text-[#1E241E] font-medium">
                    {proto.name}
                  </h3>
                  <p className="text-[12px] uppercase tracking-[0.08em] text-[#7C8C76]">
                    {proto.metaLine}
                  </p>
                  <p className="text-[13px] text-[#5C645A] pt-1">
                    {proto.indication}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openBookingDrawer(proto)}
                  className="w-full py-2.5 rounded-full border border-[#2F3E2E] text-[#2F3E2E] text-[12px] font-medium flex items-center justify-center gap-1.5 hover:bg-[#2F3E2E] hover:text-[#FAF8F5] transition-colors"
                >
                  <span>Agendar com o Clube</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

