import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Leaf,
  RefreshCw,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useEclat } from '../context/EclatContext';
import { PRODUCTS } from '../data/mockData';
import LuxuryCard from '../components/LuxuryCard';

export default function BoutiqueView() {
  const {
    addToBag,
    addFullRoutineToBag,
    isClubMember,
    subscribeToClub,
    skinPlan,
  } = useEclat();

  const [filterTime, setFilterTime] = useState('Todos'); // 'Todos' | 'Manhã & Noite' | 'Manhã' | 'Noite'
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  const filteredProducts =
    filterTime === 'Todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.timeOfDay === filterTime);

  const planProductIds = new Set([
    ...(skinPlan?.morningRoutine?.map((r) => r.productId) || []),
    ...(skinPlan?.eveningRoutine?.map((r) => r.productId) || []),
  ]);

  return (
    <div className="eclat-section bg-[#FAF8F5] min-h-[82vh]">
      <div className="eclat-container space-y-14">
        {/* CABEÇALHO DA BOUTIQUE */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E2DEC9]">
          <div className="space-y-3 max-w-2xl">
            <span className="meta-tag text-[#7C8C76] block">
              Dermocosméticos Botânicos de Linha Própria
            </span>
            <h1 className="font-serif text-[36px] lg:text-[48px] leading-[1.15] text-[#1E241E]">
              La Boutique Skincare
            </h1>
            <p className="text-[15px] text-[#5C645A] leading-relaxed">
              Seis fórmulas essenciais de alta biocompatibilidade desenvolvidas em nosso laboratório botânico para prolongar em casa a luminosidade conquistada na Flagship.
            </p>
          </div>

          {/* Filtros de Momento do Dia */}
          <div className="inline-flex flex-wrap p-1.5 rounded-full bg-[#EFECE6] border border-[#E2DEC9] gap-1 self-start">
            {['Todos', 'Manhã & Noite', 'Manhã', 'Noite'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilterTime(tab)}
                className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all duration-250 ${
                  filterTime === tab
                    ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                    : 'text-[#5C645A] hover:text-[#1E241E]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* FAIXA DE BENEFÍCIO DO CLUBE ÉCLAT NA BOUTIQUE */}
        <div className="p-6 rounded-[10px] bg-[#EFECE6] border border-[#C5A880] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#2F3E2E] text-[#C5A880] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-[21px] text-[#1E241E] font-medium">
                {isClubMember
                  ? 'Privilégio Le Club Éclat Ativo: Todos os preços já exibem 15% OFF'
                  : 'Membros do Le Club Éclat possuem 15% OFF permanente em toda a Boutique'}
              </h2>
              <p className="text-[13px] text-[#5C645A]">
                {isClubMember
                  ? 'Adicione seus itens à sacola com desconto automático e opção de retirada na recepção.'
                  : 'Ative sua assinatura VIP para economizar imediatamente em todos os produtos da sua rotina.'}
              </p>
            </div>
          </div>

          {!isClubMember && (
            <button
              type="button"
              onClick={subscribeToClub}
              className="px-5 py-2.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[12px] font-medium hover:bg-[#7C8C76] transition-colors shrink-0"
            >
              Ativar 15% OFF do Clube
            </button>
          )}
        </div>

        {/* GRADE DOS 6 PRODUTOS (REGRA DOS 3 ELEMENTOS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => {
            const inPlan = planProductIds.has(prod.id);
            return (
              <LuxuryCard
                key={prod.id}
                item={prod}
                type="product"
                customBadge={inPlan ? 'No seu Plano Facial' : prod.badge}
                onTitleClick={(pr) => setSelectedProductModal(pr)}
                onActionClick={(pr) => addToBag({ ...pr, itemType: 'product' }, true)}
              />
            );
          })}
        </div>

        {/* BLOCO COFRE COMPLETO (OS 6 PRODUTOS) */}
        <div className="rounded-[12px] overflow-hidden border border-[#C5A880] bg-[#2F3E2E] text-[#FAF8F5] grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 bg-[#EFECE6]">
            <img
              src="/assets/products-all.jpg"
              alt="Coleção completa de 6 produtos Belle Éclat"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <span className="meta-tag text-[#C5A880] block">
                Le Coffret Botanique Complet
              </span>
              <h2 className="font-serif text-[30px] lg:text-[36px] leading-tight">
                Rotina Completa Manhã & Noite (6 Produtos)
              </h2>
              <p className="text-[14px] text-[#FAF8F5]/85 leading-relaxed">
                Adquira a coleção integral: Huile Pureté (150ml), Essence Apaisante (100ml), Sérum Éclat Boréal (30ml), Crème Barrière Velours (50ml), Élixir Nuit Régénérant (30ml) e Voile Solaire Minéral FPS 50 (50ml).
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6 text-[12px] text-[#C5A880]">
                <span className="flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5" /> 100% Botânico & Vegano
                </span>
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" /> Frascos em Vidro Refilável
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Dermatologicamente Testado
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#FAF8F5]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[12px] text-[#FAF8F5]/75 block">
                  Valor dos 6 itens combinados
                </span>
                <span className="font-serif text-[34px] text-[#C5A880]">
                  R$ {isClubMember ? Math.round(1720 * 0.85) : 1720}
                </span>
                {isClubMember && (
                  <span className="ml-2 text-[13px] line-through text-[#FAF8F5]/60">
                    R$ 1720
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={addFullRoutineToBag}
                className="px-7 py-4 rounded-full bg-[#FAF8F5] text-[#2F3E2E] text-[13px] font-medium inline-flex items-center justify-center gap-2 hover:bg-[#C5A880] hover:text-[#1E241E] transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar Coleção Completa à Sacola</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL SENSORIAL DE PRODUTO */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedProductModal(null)}
            className="fixed inset-0 bg-[#1E241E]/45 backdrop-blur-[3px]"
          />
          <div className="relative z-10 w-full max-w-xl rounded-[12px] bg-[#FAF8F5] border border-[#C5A880] overflow-hidden">
            <div className="relative h-60 bg-[#EFECE6]">
              <img
                src={selectedProductModal.image}
                alt={selectedProductModal.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedProductModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF8F5]/90 border border-[#E2DEC9]"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full bg-[#FAF8F5]/95 border border-[#E2DEC9] text-[11px] uppercase tracking-[0.08em]">
                {selectedProductModal.metaLine} • {selectedProductModal.volume}
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-baseline justify-between gap-4 border-b border-[#E2DEC9] pb-4">
                <div>
                  <h2 className="font-serif text-[30px] text-[#1E241E]">
                    {selectedProductModal.name}
                  </h2>
                  <p className="text-[13px] text-[#5C645A]">
                    {selectedProductModal.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-serif text-[28px] text-[#2F3E2E] font-medium">
                    R${' '}
                    {isClubMember
                      ? Math.round(selectedProductModal.price * 0.85)
                      : selectedProductModal.price}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="meta-tag text-[#7C8C76] block">
                  Notas de Textura & Sensorial
                </span>
                <p className="text-[14px] text-[#1E241E] leading-relaxed">
                  {selectedProductModal.sensoryNotes}
                </p>
              </div>

              <div className="space-y-2">
                <span className="meta-tag text-[#5C645A] block">
                  Ativos Botânicos Principais
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProductModal.keyActives.map((act) => (
                    <span
                      key={act}
                      className="px-3 py-1 rounded-full bg-[#EFECE6] border border-[#E2DEC9] text-[12px] text-[#1E241E]"
                    >
                      ✦ {act}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProductModal(null)}
                  className="px-5 py-2.5 rounded-full border border-[#E2DEC9] text-[13px] text-[#5C645A]"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const pr = selectedProductModal;
                    setSelectedProductModal(null);
                    addToBag({ ...pr, itemType: 'product' }, true);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium flex items-center gap-2 hover:bg-[#7C8C76]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar à Sacola</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

