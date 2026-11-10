import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Home,
  Gift,
  X,
  Check,
  ShoppingBag,
  AlertCircle,
  Clock,
  Leaf,
} from 'lucide-react';
import { useEclat } from '../context/EclatContext';
import { PROTOCOLS, CATEGORIES, CHEZ_VOUS_PACKAGES } from '../data/mockData';
import LuxuryCard from '../components/LuxuryCard';

export default function RituaisView() {
  const {
    rituaisTab,
    setRituaisTab,
    rituaisCategoryFilter,
    setRituaisCategoryFilter,
    openBookingDrawer,
    addToBag,
    chezVousCredits,
    setChezVousCredits,
    showToast,
  } = useEclat();

  // Modal de detalhes sensoriais ao clicar no título de um ritual
  const [selectedModalProtocol, setSelectedModalProtocol] = useState(null);

  // Estado do configurador de Vale-Experiência (Gift Card)
  const [giftSelection, setGiftSelection] = useState({
    presetType: 'ritual', // 'ritual' | 'valor'
    protocolId: 'p5',
    customAmount: 500,
    recipientName: 'Isabella Montenegro',
    senderName: 'Helena',
    message:
      'Que este momento na Maison Belle Éclat renove sua serenidade e ilumine ainda mais a sua pele.',
  });

  const categoryPills = ['Todos', ...CATEGORIES.map((c) => c.id)];

  const filteredProtocols =
    rituaisCategoryFilter === 'Todos'
      ? PROTOCOLS
      : PROTOCOLS.filter((p) => p.category === rituaisCategoryFilter);

  const selectedGiftProtocol =
    PROTOCOLS.find((p) => p.id === giftSelection.protocolId) || PROTOCOLS[4];

  const giftFinalPrice =
    giftSelection.presetType === 'ritual'
      ? selectedGiftProtocol.price
      : Number(giftSelection.customAmount) || 400;

  const giftFinalTitle =
    giftSelection.presetType === 'ritual'
      ? `Vale-Experiência: ${selectedGiftProtocol.name}`
      : `Vale-Experiência Belle Éclat (R$ ${giftFinalPrice})`;

  const handleAddGiftCard = (e) => {
    e.preventDefault();
    addToBag(
      {
        id: `gift-${Date.now()}`,
        name: giftFinalTitle,
        price: giftFinalPrice,
        metaLine: `Presente para ${giftSelection.recipientName || 'Convidada Especial'}`,
        recipientName: giftSelection.recipientName,
        senderName: giftSelection.senderName,
        message: giftSelection.message,
        itemType: 'giftcard',
      },
      true
    );
  };

  return (
    <div className="eclat-section bg-[#FAF8F5] min-h-[82vh]">
      <div className="eclat-container space-y-12">
        {/* CABEÇALHO E SUB-NAVEGAÇÃO POR 3 PÍLULAS NO TOPO */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E2DEC9]">
          <div className="space-y-3 max-w-xl">
            <span className="meta-tag text-[#7C8C76] block">
              Menu Clínico & Sensorial
            </span>
            <h1 className="font-serif text-[36px] lg:text-[48px] leading-[1.15] text-[#1E241E]">
              {rituaisTab === 'flagship' && 'Rituais Faciais na Flagship'}
              {rituaisTab === 'chezvous' && 'Belle Éclat Chez Vous'}
              {rituaisTab === 'giftcards' && 'Vale-Experiência (Gift Cards)'}
            </h1>
            <p className="text-[15px] text-[#5C645A]">
              {rituaisTab === 'flagship' &&
                'Protocolos botânicos de alta precisão desenhados para purificar, esculpir e regenerar a derme.'}
              {rituaisTab === 'chezvous' &&
                'A experiência completa das nossas cabines transportada para a privacidade da sua residência.'}
              {rituaisTab === 'giftcards' &&
                'Presenteie com tempo, silêncio e cuidado botânico em cartão de papel algodão digital.'}
            </p>
          </div>

          {/* 3 Pílulas de Sub-Navegação */}
          <div className="inline-flex flex-wrap p-1.5 rounded-full bg-[#EFECE6] border border-[#E2DEC9] gap-1 self-start">
            <button
              type="button"
              onClick={() => setRituaisTab('flagship')}
              className={`px-5 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all duration-250 ${
                rituaisTab === 'flagship'
                  ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                  : 'text-[#5C645A] hover:text-[#1E241E]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rituais na Flagship</span>
            </button>

            <button
              type="button"
              onClick={() => setRituaisTab('chezvous')}
              className={`px-5 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all duration-250 ${
                rituaisTab === 'chezvous'
                  ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                  : 'text-[#5C645A] hover:text-[#1E241E]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Atendimento Domiciliar (Chez Vous)</span>
            </button>

            <button
              type="button"
              onClick={() => setRituaisTab('giftcards')}
              className={`px-5 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all duration-250 ${
                rituaisTab === 'giftcards'
                  ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                  : 'text-[#5C645A] hover:text-[#1E241E]'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Vale-Experiência (Gift Cards)</span>
            </button>
          </div>
        </div>

        {/* ==================== ABA 1: RITUAIS NA FLAGSHIP ==================== */}
        {rituaisTab === 'flagship' && (
          <div className="space-y-10">
            {/* Filtro rápido pelas 4 categorias */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {categoryPills.map((cat) => {
                  const active = rituaisCategoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setRituaisCategoryFilter(cat)}
                      className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all duration-250 ${
                        active
                          ? 'bg-[#2F3E2E] border-[#2F3E2E] text-[#FAF8F5]'
                          : 'bg-[#FFFFFF] border-[#E2DEC9] text-[#5C645A] hover:border-[#C5A880] hover:text-[#1E241E]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
              <span className="text-[12px] text-[#5C645A]">
                Clique no título do ritual para ler os detalhes sensoriais ou em <strong>+</strong> para agendar.
              </span>
            </div>

            {/* Grade de Cards dos 8 Protocolos (Regra dos 3 Elementos) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredProtocols.map((proto) => (
                <LuxuryCard
                  key={proto.id}
                  item={proto}
                  type="protocol"
                  onTitleClick={(p) => setSelectedModalProtocol(p)}
                  onActionClick={(p) => openBookingDrawer(p)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ==================== ABA 2: ATENDIMENTO DOMICILIAR (CHEZ VOUS) ==================== */}
        {rituaisTab === 'chezvous' && (
          <div className="space-y-12">
            {/* Banner Explicativo da Experiência */}
            <div className="p-8 lg:p-10 rounded-[12px] bg-[#EFECE6] border border-[#E2DEC9] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="meta-tag text-[#2F3E2E] block">
                  Exclusividade em Domicílio • Pacotes Fechados
                </span>
                <h2 className="font-serif text-[30px] lg:text-[36px] leading-tight text-[#1E241E]">
                  Sua residência transformada em uma cabine sensorial da Maison.
                </h2>
                <p className="text-[15px] text-[#5C645A] leading-relaxed">
                  Nossa especialista desloca-se até sua casa com maca aquecida revestida em linho egípcio, difusor ultrassônico de óleos essenciais orgânicos, música ambiente e todo o arsenal botânico da Belle Éclat.
                </p>
              </div>
              <div className="p-5 rounded-[8px] bg-[#FAF8F5] border border-[#C5A880] text-center shrink-0 min-w-[240px]">
                <span className="meta-tag text-[#5C645A] block">Seu Saldo Atual</span>
                <p className="font-serif text-[34px] text-[#2F3E2E] my-1">
                  {chezVousCredits} Créditos
                </p>
                <span className="text-[12px] text-[#7C8C76] block">
                  {chezVousCredits > 0
                    ? '✓ Chave "Em Domicílio" ativa na Gaveta'
                    : 'Adquira um pacote para liberar a agenda domiciliar'}
                </span>
              </div>
            </div>

            {/* Os 2 Pacotes Fechados (cv1 e cv2) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {CHEZ_VOUS_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-[12px] bg-[#FFFFFF] border border-[#E2DEC9] overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 bg-[#EFECE6]">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[11px] uppercase tracking-[0.08em]">
                        {pkg.badge}
                      </span>
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#FAF8F5]/95 border border-[#E2DEC9] text-[11px] text-[#1E241E]">
                        {pkg.validity}
                      </span>
                    </div>

                    <div className="p-8 space-y-5">
                      <div>
                        <h3 className="font-serif text-[28px] leading-tight text-[#1E241E]">
                          {pkg.name}
                        </h3>
                        <p className="text-[14px] text-[#5C645A] mt-2 leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-4 border-t border-[#E2DEC9]">
                        <span className="meta-tag text-[#7C8C76] block">
                          O que está incluído no pacote:
                        </span>
                        {pkg.includes.map((inc, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-[13px] text-[#1E241E]"
                          >
                            <Check className="w-4 h-4 text-[#2F3E2E] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-8 py-6 bg-[#FAF8F5] border-t border-[#E2DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[12px] text-[#5C645A] block">
                        Investimento do Programa ({pkg.sessions} Visitas)
                      </span>
                      <span className="font-serif text-[30px] text-[#1E241E] font-medium">
                        R$ {pkg.price.toLocaleString('pt-BR')}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setChezVousCredits((prev) => prev + pkg.credits);
                          showToast(
                            `+${pkg.credits} Créditos Chez Vous ativados!`,
                            'A chave seletora [ Na Flagship | Em Domicílio ] já está disponível na Gaveta de Agendamento.'
                          );
                        }}
                        className="px-5 py-3 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[12px] font-medium hover:bg-[#7C8C76] transition-colors"
                      >
                        Ativar Pacote Agora (+{pkg.credits} Créd.)
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          addToBag(
                            {
                              id: pkg.id,
                              name: pkg.shortName,
                              price: pkg.price,
                              credits: pkg.credits,
                              image: pkg.image,
                              metaLine: `${pkg.sessions} Sessões em Casa • +${pkg.credits} Créditos`,
                              itemType: 'chezvous',
                            },
                            true
                          )
                        }
                        className="px-4 py-3 rounded-full border border-[#2F3E2E] text-[#2F3E2E] text-[12px] font-medium hover:bg-[#EFECE6] transition-colors"
                      >
                        + Sacola
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== ABA 3: VALE-EXPERIÊNCIA (GIFT CARDS) ==================== */}
        {rituaisTab === 'giftcards' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Formulário Configurador à Esquerda */}
            <form
              onSubmit={handleAddGiftCard}
              className="lg:col-span-6 p-8 rounded-[12px] bg-[#FFFFFF] border border-[#E2DEC9] space-y-6"
            >
              <div className="border-b border-[#E2DEC9] pb-4">
                <span className="meta-tag text-[#7C8C76] block">
                  Personalização do Presente
                </span>
                <h2 className="font-serif text-[28px] text-[#1E241E]">
                  Configurar Vale-Experiência
                </h2>
              </div>

              {/* Modo: Escolher um Ritual ou Valor em Reais */}
              <div className="space-y-2">
                <label className="text-[12px] uppercase tracking-[0.08em] text-[#5C645A] block">
                  01. Formato do Presente
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-[#EFECE6] border border-[#E2DEC9]">
                  <button
                    type="button"
                    onClick={() =>
                      setGiftSelection((prev) => ({ ...prev, presetType: 'ritual' }))
                    }
                    className={`py-2.5 rounded-full text-[12px] font-medium transition-colors ${
                      giftSelection.presetType === 'ritual'
                        ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                        : 'text-[#5C645A]'
                    }`}
                  >
                    Oferecer um Ritual
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setGiftSelection((prev) => ({ ...prev, presetType: 'valor' }))
                    }
                    className={`py-2.5 rounded-full text-[12px] font-medium transition-colors ${
                      giftSelection.presetType === 'valor'
                        ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                        : 'text-[#5C645A]'
                    }`}
                  >
                    Escolher Valor em R$
                  </button>
                </div>
              </div>

              {giftSelection.presetType === 'ritual' ? (
                <div className="space-y-2">
                  <label className="text-[12px] uppercase tracking-[0.08em] text-[#5C645A] block">
                    Selecione o Ritual para Presentear
                  </label>
                  <select
                    value={giftSelection.protocolId}
                    onChange={(e) =>
                      setGiftSelection((prev) => ({
                        ...prev,
                        protocolId: e.target.value,
                      }))
                    }
                    className="w-full bg-[#FAF8F5] border border-[#E2DEC9] rounded-[8px] px-4 py-3 font-serif text-[19px] text-[#1E241E] focus:outline-none focus:border-[#C5A880]"
                  >
                    {PROTOCOLS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.durationLabel} — R$ {p.price})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-[12px] uppercase tracking-[0.08em] text-[#5C645A] block">
                    Selecione o Valor em Créditos (R$)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[350, 500, 750, 1000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() =>
                          setGiftSelection((prev) => ({
                            ...prev,
                            customAmount: val,
                          }))
                        }
                        className={`py-2.5 rounded-[6px] border text-[13px] font-medium transition-colors ${
                          giftSelection.customAmount === val
                            ? 'bg-[#2F3E2E] border-[#2F3E2E] text-[#FAF8F5]'
                            : 'bg-[#FAF8F5] border-[#E2DEC9] text-[#1E241E]'
                        }`}
                      >
                        R$ {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#5C645A] mb-1">
                    Para (Nome da Presenteada)
                  </label>
                  <input
                    type="text"
                    required
                    value={giftSelection.recipientName}
                    onChange={(e) =>
                      setGiftSelection((prev) => ({
                        ...prev,
                        recipientName: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#FAF8F5] border border-[#E2DEC9] text-[14px] text-[#1E241E] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] text-[#5C645A] mb-1">
                    De (Seu Nome)
                  </label>
                  <input
                    type="text"
                    required
                    value={giftSelection.senderName}
                    onChange={(e) =>
                      setGiftSelection((prev) => ({
                        ...prev,
                        senderName: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#FAF8F5] border border-[#E2DEC9] text-[14px] text-[#1E241E] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#5C645A] mb-1">
                  Dedicatória em Papel Algodão Digital
                </label>
                <textarea
                  rows={3}
                  value={giftSelection.message}
                  onChange={(e) =>
                    setGiftSelection((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#FAF8F5] border border-[#E2DEC9] text-[14px] text-[#1E241E] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-[#7C8C76] transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar Vale-Experiência à Sacola (R$ {giftFinalPrice})</span>
              </button>
            </form>

            {/* Pré-Visualização do Cartão com Estética de Papel Algodão à Direita */}
            <div className="lg:col-span-6 space-y-4">
              <span className="meta-tag text-[#5C645A] block">
                Pré-visualização do Cartão em Papel Algodão
              </span>

              <div className="p-10 lg:p-12 rounded-[12px] bg-[#EFECE6] border border-[#C5A880] relative overflow-hidden">
                <div className="p-8 sm:p-10 rounded-[8px] bg-[#FAF8F5] border border-[#C5A880] text-center space-y-6">
                  <div className="space-y-1">
                    <span className="font-serif text-[26px] tracking-[0.08em] text-[#1E241E] block">
                      BELLE ÉCLAT
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.24em] text-[#5C645A] block">
                      MAISON DE BEAUTÉ • CARTE D’INVITATION
                    </span>
                  </div>

                  <div className="w-12 h-[1px] bg-[#C5A880] mx-auto" />

                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[#7C8C76]">
                      Oferecido especialmente para
                    </span>
                    <h3 className="font-serif italic text-[32px] text-[#1E241E]">
                      {giftSelection.recipientName || 'Convidada Especial'}
                    </h3>
                  </div>

                  <p className="font-serif italic text-[19px] leading-relaxed text-[#5C645A] max-w-md mx-auto">
                    “{giftSelection.message}”
                  </p>

                  <div className="p-4 rounded-[6px] bg-[#EFECE6] border border-[#E2DEC9] space-y-1">
                    <span className="meta-tag text-[#2F3E2E] block">
                      Experiência Contemplada
                    </span>
                    <p className="font-serif text-[22px] text-[#1E241E] font-medium">
                      {giftFinalTitle}
                    </p>
                    <p className="text-[11px] text-[#5C645A]">
                      Código de Resgate: ECLAT-{giftFinalPrice}-2026 • Validade de 12 meses
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[12px] text-[#5C645A] border-t border-[#E2DEC9]">
                    <span>Com carinho, {giftSelection.senderName || 'Você'}</span>
                    <span>Flagship Jardins & Boutique</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL LIMPO DE DETALHES SENSORIAIS DO PROTOCOLO */}
      {selectedModalProtocol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedModalProtocol(null)}
            className="fixed inset-0 bg-[#1E241E]/45 backdrop-blur-[3px]"
          />

          <div className="relative z-10 w-full max-w-2xl rounded-[12px] bg-[#FAF8F5] border border-[#C5A880] overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-56 bg-[#EFECE6] shrink-0">
              <img
                src={selectedModalProtocol.image}
                alt={selectedModalProtocol.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedModalProtocol(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF8F5]/90 border border-[#E2DEC9] text-[#1E241E] hover:border-[#2F3E2E]"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full bg-[#FAF8F5]/95 border border-[#E2DEC9] text-[11px] uppercase tracking-[0.08em] text-[#1E241E]">
                {selectedModalProtocol.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#E2DEC9] pb-4">
                <div>
                  <h2 className="font-serif text-[32px] text-[#1E241E] leading-tight">
                    {selectedModalProtocol.name}
                  </h2>
                  <p className="text-[13px] text-[#5C645A] flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#7C8C76]" />
                      {selectedModalProtocol.durationLabel}
                    </span>
                    <span>•</span>
                    <span>Indicação: {selectedModalProtocol.indication}</span>
                  </p>
                </div>
                <span className="font-serif text-[28px] text-[#2F3E2E] font-medium">
                  R$ {selectedModalProtocol.price}
                </span>
              </div>

              <div className="space-y-2">
                <span className="meta-tag text-[#7C8C76] block">
                  Experiência Sensorial & Biológica
                </span>
                <p className="text-[15px] text-[#1E241E] leading-relaxed">
                  {selectedModalProtocol.sensoryDescription}
                </p>
              </div>

              <div className="p-4 rounded-[8px] bg-[#EFECE6] border border-[#E2DEC9] flex items-start gap-3">
                <Leaf className="w-4 h-4 text-[#2F3E2E] shrink-0 mt-1" />
                <div className="text-[13px]">
                  <span className="font-medium text-[#1E241E] block">
                    Ativo Botânico Chave:
                  </span>
                  <span className="text-[#5C645A]">{selectedModalProtocol.keyActive}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <span className="meta-tag text-[#5C645A] block">
                  Etapas do Protocolo em Cabine
                </span>
                <ul className="space-y-2">
                  {selectedModalProtocol.steps.map((st, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-[13px] text-[#1E241E]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#EFECE6] border border-[#E2DEC9] text-[11px] flex items-center justify-center text-[#2F3E2E] font-medium shrink-0">
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-[8px] bg-[#FAF8F5] border border-[#B87D64] flex items-start gap-2.5 text-[13px]">
                <AlertCircle className="w-4 h-4 text-[#B87D64] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#B87D64] block">
                    Preparo Pré-Sessão Recomendado:
                  </strong>
                  <span className="text-[#1E241E]">{selectedModalProtocol.preparo}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedModalProtocol(null)}
                  className="px-5 py-3 rounded-full border border-[#E2DEC9] text-[13px] text-[#5C645A] hover:text-[#1E241E]"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const p = selectedModalProtocol;
                    setSelectedModalProtocol(null);
                    openBookingDrawer(p);
                  }}
                  className="px-7 py-3 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium flex items-center gap-2 hover:bg-[#7C8C76] transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Este Ritual</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

