import React, { useState } from 'react';
import {
  ArrowRight,
  Leaf,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Crown,
} from 'lucide-react';
import { useEclat } from '../context/EclatContext';
import { IMAGES, CATEGORIES, PROTOCOLS, PRODUCTS } from '../data/mockData';
import LuxuryCard from '../components/LuxuryCard';

export default function HomeView() {
  const {
    navigateTo,
    openBookingDrawer,
    addToBag,
    isClubMember,
    subscribeToClub,
  } = useEclat();

  const [showcaseMode, setShowcaseMode] = useState('rituais'); // 'rituais' | 'produtos'

  const trustBadges = [
    { icon: Leaf, label: 'Fórmulas Botânicas Puras' },
    { icon: Sparkles, label: 'Lifting Natural' },
    { icon: ShieldCheck, label: 'Seguro para Peles Sensíveis' },
    { icon: RefreshCw, label: 'Refil Sustentável' },
  ];

  const featuredProtocols = PROTOCOLS.slice(0, 5);
  const featuredProducts = PRODUCTS.slice(0, 5);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="bg-[#EFECE6] border-b border-[#E2DEC9] py-16 lg:py-24">
        <div className="eclat-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Coluna Esquerda */}
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E2DEC9]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F3E2E]" />
                <span className="meta-tag text-[#5C645A]">
                  Maison de Beauté & Clínica Facial Botânica
                </span>
              </div>

              <div className="space-y-5">
                <h1 className="font-serif text-[36px] lg:text-[52px] leading-[1.15] text-[#1E241E] font-normal">
                  A ciência botânica a favor do tempo da sua pele.
                </h1>
                <p className="text-[16px] leading-[1.65] text-[#5C645A] max-w-xl">
                  Rituais faciais holísticos, escultura natural e dermocosméticos puros desenhados para o ciclo biológico do seu rosto.
                </p>
              </div>

              {/* Botões do Hero */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <button
                  type="button"
                  onClick={() => openBookingDrawer()}
                  className="px-8 py-4 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[14px] font-medium tracking-[0.02em] transition-all duration-250 hover:bg-[#7C8C76]"
                >
                  Agendar Sessão
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('planejamento')}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#1E241E] hover:text-[#7C8C76] transition-colors py-2 border-b border-[#1E241E] hover:border-[#7C8C76]"
                >
                  <span>Criar Meu Plano Facial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 4 Selos Verticais Minimalistas de Confiança */}
              <div className="pt-8 border-t border-[#E2DEC9] grid grid-cols-2 sm:grid-cols-4 gap-6">
                {trustBadges.map((badge, idx) => {
                  const IconComponent = badge.icon;
                  return (
                    <div key={idx} className="flex flex-col items-start gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#E2DEC9] flex items-center justify-center text-[#2F3E2E]">
                        <IconComponent className="w-4 h-4 stroke-[1.5]" />
                      </div>
                      <span className="text-[12px] leading-snug text-[#1E241E] font-medium">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coluna Direita: Composição Fotográfica Editorial */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[12px] overflow-hidden border border-[#E2DEC9] bg-[#FAF8F5] aspect-[16/11] sm:aspect-[4/3]">
                <img
                  src={IMAGES.hero}
                  alt="Frasco botânico Belle Éclat sobre pedras de travertino e folhas"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 sm:p-5 rounded-[8px] bg-[#FAF8F5]/95 backdrop-blur-sm border border-[#E2DEC9] flex items-center justify-between gap-4">
                  <div>
                    <span className="meta-tag text-[#7C8C76] block">
                      Flagship Jardins • São Paulo
                    </span>
                    <p className="font-serif text-[19px] sm:text-[20px] text-[#1E241E]">
                      Cabines Sensoriais & Diagnóstico de Barreira
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('rituais')}
                    className="w-10 h-10 rounded-full border border-[#E2DEC9] flex items-center justify-center text-[#1E241E] hover:border-[#2F3E2E] shrink-0"
                    aria-label="Explorar Rituais"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FAIXA HORIZONTAL VERDE SÁLVIA (#7C8C76) */}
      <section className="bg-[#7C8C76] text-[#FAF8F5] py-8 border-b border-[#E2DEC9]">
        <div className="eclat-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#FAF8F5]/20">
            <div className="flex items-start gap-4 pt-4 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5]/15 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#FAF8F5] stroke-[1.5]" />
              </div>
              <div>
                <h3 className="font-serif text-[21px] leading-tight font-medium">
                  Taxa Fixa de R$ 100
                </h3>
                <p className="text-[13px] text-[#FAF8F5]/90 mt-1">
                  100% abatida no valor final da sua sessão na Flagship
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-8">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5]/15 flex items-center justify-center shrink-0">
                <CalendarCheck className="w-5 h-5 text-[#FAF8F5] stroke-[1.5]" />
              </div>
              <div>
                <h3 className="font-serif text-[21px] leading-tight font-medium">
                  Remarcação em 1 Clique
                </h3>
                <p className="text-[13px] text-[#FAF8F5]/90 mt-1">
                  Flexibilidade gratuita até 24h antes do seu horário
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-8">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5]/15 flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-5 h-5 text-[#FAF8F5] stroke-[1.5]" />
              </div>
              <div>
                <h3 className="font-serif text-[21px] leading-tight font-medium">
                  Preparo Guiado
                </h3>
                <p className="text-[13px] text-[#FAF8F5]/90 mt-1">
                  Checklist personalizado pré-procedimento para sua pele
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO "RITUAIS POR CATEGORIA" */}
      <section className="eclat-section bg-[#FAF8F5]">
        <div className="eclat-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Coluna Esquerda */}
            <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-32">
              <span className="meta-tag text-[#7C8C76] block">
                Arquitetura de Cabine
              </span>
              <h2 className="font-serif text-[28px] lg:text-[36px] leading-[1.2] text-[#1E241E]">
                Rituais por Categoria
              </h2>
              <p className="text-[15px] text-[#5C645A] leading-relaxed">
                Cada sessão em nossa Flagship respeita a fisiologia cutânea, unindo fito-ativos franceses de alta concentração a técnicas manuais de escultura e drenagem profunda.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    navigateTo('rituais', {
                      rituaisTab: 'flagship',
                      categoryFilter: 'Todos',
                    })
                  }
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#2F3E2E] hover:text-[#7C8C76] transition-colors border-b border-[#2F3E2E] pb-1"
                >
                  <span>Ver Todos os Protocolos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grade à Direita com 4 Cards Verticais Fotográficos */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {CATEGORIES.map((cat, idx) => (
                <div
                  key={cat.id}
                  onClick={() =>
                    navigateTo('rituais', {
                      rituaisTab: 'flagship',
                      categoryFilter: cat.id,
                    })
                  }
                  className="group cursor-pointer rounded-[12px] overflow-hidden border border-[#E2DEC9] bg-[#FFFFFF] transition-all duration-250 hover:border-[#C5A880]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EFECE6]">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#FAF8F5]/95 border border-[#E2DEC9] text-[11px] uppercase tracking-[0.08em] text-[#1E241E]">
                      0{idx + 1} • {cat.count}
                    </span>
                  </div>
                  <div className="p-6 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-[24px] text-[#1E241E] group-hover:text-[#7C8C76] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-[13px] text-[#5C645A] mt-1">
                        {cat.subtitle}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-[#E2DEC9] flex items-center justify-center text-[#1E241E] group-hover:bg-[#2F3E2E] group-hover:text-[#FAF8F5] transition-colors shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. BANNER BIPARTIDO "LE CLUB ÉCLAT" */}
      <section className="py-12 lg:py-20 bg-[#FAF8F5]">
        <div className="eclat-container">
          <div className="rounded-[12px] overflow-hidden border border-[#C5A880] grid grid-cols-1 lg:grid-cols-12">
            {/* Metade Esquerda em Verde Oliva Escuro (#2F3E2E) */}
            <div className="lg:col-span-6 bg-[#2F3E2E] text-[#FAF8F5] p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A880] text-[#C5A880] text-[11px] uppercase tracking-[0.08em]">
                  <Crown className="w-3.5 h-3.5" />
                  <span>ASSINATURA MENSAL VIP</span>
                </span>
                <h2 className="font-serif text-[30px] lg:text-[40px] leading-[1.15] text-[#FAF8F5] font-normal">
                  Sua pele em seu estado mais luminoso, todos os meses.
                </h2>
              </div>

              <div className="space-y-6 pt-4 border-t border-[#FAF8F5]/15">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-[38px] text-[#C5A880]">R$ 360</span>
                  <span className="text-[14px] text-[#FAF8F5]/80">/mês • Sem fidelidade</span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {isClubMember ? (
                    <button
                      type="button"
                      onClick={() =>
                        navigateTo('painel', { dashboardTab: 'carteira' })
                      }
                      className="px-7 py-3.5 rounded-full bg-[#C5A880] text-[#1E241E] text-[13px] font-medium hover:bg-[#FAF8F5] transition-colors"
                    >
                      ✦ Você já é Membro VIP (Ver Carteira)
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={subscribeToClub}
                        className="px-7 py-3.5 rounded-full bg-[#FAF8F5] text-[#2F3E2E] text-[13px] font-medium hover:bg-[#C5A880] hover:text-[#1E241E] transition-colors"
                      >
                        Fazer Parte do Clube
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateTo('clube')}
                        className="text-[13px] text-[#FAF8F5]/90 underline hover:text-[#C5A880]"
                      >
                        Conhecer todos os privilégios →
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Metade Direita em Bege Areia (#EFECE6) com 3 Ícones Alinhados */}
            <div className="lg:col-span-6 bg-[#EFECE6] p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#C5A880] flex items-center justify-center text-[#2F3E2E] shrink-0">
                  <Sparkles className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-[22px] text-[#1E241E] font-medium">
                    1 Ritual Mensal na Flagship
                  </h3>
                  <p className="text-[14px] text-[#5C645A] mt-1">
                    Qualquer protocolo de até R$ 460 incluso mensalmente (como o Soin Lumière d'Or ou Lifting Kobi-Do Royal).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-[#E2DEC9]">
                <div className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#C5A880] flex items-center justify-center text-[#2F3E2E] shrink-0">
                  <CalendarCheck className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-[22px] text-[#1E241E] font-medium">
                    Reserva Sem Taxa
                  </h3>
                  <p className="text-[14px] text-[#5C645A] mt-1">
                    Agendamento imediato em 1 clique na Gaveta sem cobrança do sinal de R$ 100.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-[#E2DEC9]">
                <div className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#C5A880] flex items-center justify-center text-[#2F3E2E] shrink-0">
                  <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-[22px] text-[#1E241E] font-medium">
                    15% OFF Fixo na Boutique
                  </h3>
                  <p className="text-[14px] text-[#5C645A] mt-1">
                    Desconto permanente e automático em toda a linha de dermocosméticos botânicos home care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CARROSSEL "PROTOCOLOS MAIS AGENDADOS" + "ESSENCIAIS DA BOUTIQUE" */}
      <section className="eclat-section bg-[#FAF8F5] border-t border-[#E2DEC9]">
        <div className="eclat-container space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="meta-tag text-[#7C8C76] block">
                Curadoria da Maison
              </span>
              <h2 className="font-serif text-[28px] lg:text-[36px] leading-[1.2] text-[#1E241E]">
                {showcaseMode === 'rituais'
                  ? 'Protocolos Mais Agendados'
                  : 'Essenciais da Boutique'}
              </h2>
            </div>

            {/* Chave Seletora Simples no Topo da Seção */}
            <div className="inline-flex p-1 rounded-full bg-[#EFECE6] border border-[#E2DEC9] self-start">
              <button
                type="button"
                onClick={() => setShowcaseMode('rituais')}
                className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-250 ${
                  showcaseMode === 'rituais'
                    ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                    : 'text-[#5C645A] hover:text-[#1E241E]'
                }`}
              >
                Rituais na Flagship
              </button>
              <button
                type="button"
                onClick={() => setShowcaseMode('produtos')}
                className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-250 ${
                  showcaseMode === 'produtos'
                    ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                    : 'text-[#5C645A] hover:text-[#1E241E]'
                }`}
              >
                Produtos Skincare
              </button>
            </div>
          </div>

          {/* Fileira Limpa de 5 Cards seguindo estritamente a Regra dos 3 Elementos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {showcaseMode === 'rituais'
              ? featuredProtocols.map((proto) => (
                  <LuxuryCard
                    key={proto.id}
                    item={proto}
                    type="protocol"
                    onTitleClick={() =>
                      navigateTo('rituais', {
                        rituaisTab: 'flagship',
                        categoryFilter: 'Todos',
                      })
                    }
                    onActionClick={(p) => openBookingDrawer(p)}
                  />
                ))
              : featuredProducts.map((prod) => (
                  <LuxuryCard
                    key={prod.id}
                    item={prod}
                    type="product"
                    onTitleClick={() => navigateTo('boutique')}
                    onActionClick={(pr) =>
                      addToBag({ ...pr, itemType: 'product' }, true)
                    }
                  />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}

