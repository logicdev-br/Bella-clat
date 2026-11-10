import React, { useState } from 'react';
import {
  Leaf,
  BookOpen,
  Sparkles,
  Calendar,
  ShoppingBag,
  ArrowRight,
  X,
  Clock,
} from 'lucide-react';
import { useEclat } from '../context/EclatContext';
import {
  HERBIER_ACTIVES,
  JOURNAL_ARTICLES,
  PROTOCOLS,
  PRODUCTS,
} from '../data/mockData';

export default function HerbierJournalView() {
  const { openBookingDrawer, addToBag } = useEclat();

  const [mode, setMode] = useState('herbier'); // 'herbier' | 'journal'
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="eclat-section bg-[#FAF8F5] min-h-[82vh]">
      <div className="eclat-container space-y-14">
        {/* CABEÇALHO COM BOTÃO SELETOR (L'HERBIER vs LE JOURNAL) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E2DEC9]">
          <div className="space-y-3 max-w-2xl">
            <span className="meta-tag text-[#7C8C76] block">
              Ciência Botânica & Cultura Epidermal
            </span>
            <h1 className="font-serif text-[36px] lg:text-[48px] leading-[1.15] text-[#1E241E]">
              {mode === 'herbier'
                ? 'L’Herbier de la Maison'
                : 'Le Journal Éclat'}
            </h1>
            <p className="text-[15px] text-[#5C645A] leading-relaxed">
              {mode === 'herbier'
                ? 'Nosso glossário vivo de matérias-primas botânicas puras, extraídas a frio e selecionadas por sua afinidade biológica com a pele humana.'
                : 'Ensaios editoriais sobre o ciclo celular de 28 dias, arquitetura muscular facial e longevidade sem procedimentos agressivos.'}
            </p>
          </div>

          {/* Chave Seletora */}
          <div className="inline-flex p-1.5 rounded-full bg-[#EFECE6] border border-[#E2DEC9] gap-1 self-start">
            <button
              type="button"
              onClick={() => setMode('herbier')}
              className={`px-6 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all duration-250 ${
                mode === 'herbier'
                  ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                  : 'text-[#5C645A] hover:text-[#1E241E]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>L’Herbier (Ativos Botânicos)</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('journal')}
              className={`px-6 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all duration-250 ${
                mode === 'journal'
                  ? 'bg-[#2F3E2E] text-[#FAF8F5]'
                  : 'text-[#5C645A] hover:text-[#1E241E]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Le Journal (Editorial)</span>
            </button>
          </div>
        </div>

        {/* ==================== VISÃO 1: L'HERBIER (ENCICLOPÉDIA DE ATIVOS) ==================== */}
        {mode === 'herbier' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HERBIER_ACTIVES.map((active) => {
              const linkedProtocol =
                PROTOCOLS.find((p) => p.id === active.foundInProtocol) ||
                PROTOCOLS[0];
              const linkedProduct =
                PRODUCTS.find((pr) => pr.id === active.foundInProduct) ||
                PRODUCTS[0];

              return (
                <article
                  key={active.id}
                  className="rounded-[12px] bg-[#FFFFFF] border border-[#E2DEC9] overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 bg-[#EFECE6] overflow-hidden">
                      <img
                        src={active.image}
                        alt={active.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FAF8F5]/95 border border-[#E2DEC9] text-[11px] uppercase tracking-[0.08em] text-[#1E241E]">
                        {active.category}
                      </span>
                      <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#2F3E2E]/90 text-[#FAF8F5] text-[11px]">
                        {active.concentration}
                      </span>
                    </div>

                    <div className="p-7 space-y-4">
                      <div>
                        <span className="font-serif italic text-[17px] text-[#7C8C76] block">
                          {active.frenchTitle}
                        </span>
                        <h2 className="font-serif text-[28px] text-[#1E241E] leading-tight">
                          {active.name}
                        </h2>
                        <p className="text-[12px] uppercase tracking-[0.06em] text-[#5C645A] mt-1">
                          Origem: {active.origin}
                        </p>
                      </div>

                      <p className="text-[14px] text-[#5C645A] leading-relaxed">
                        {active.description}
                      </p>

                      <div className="p-3.5 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9] text-[13px]">
                        <strong className="text-[#2F3E2E] block mb-0.5">
                          Mecanismo Biológico na Pele:
                        </strong>
                        <span className="text-[#5C645A]">{active.biologicalAction}</span>
                      </div>
                    </div>
                  </div>

                  {/* Conexão Direta com Ritual e Produto */}
                  <div className="px-7 py-4 bg-[#EFECE6] border-t border-[#E2DEC9] flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => openBookingDrawer(linkedProtocol)}
                      className="text-[12px] font-medium text-[#2F3E2E] hover:underline inline-flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Ritual: {linkedProtocol.name}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        addToBag({ ...linkedProduct, itemType: 'product' }, true)
                      }
                      className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E2DEC9] text-[12px] text-[#1E241E] hover:border-[#2F3E2E] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#2F3E2E]" />
                      <span>Fórmula: {linkedProduct.name}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* ==================== VISÃO 2: LE JOURNAL (EDITORIAL DE PELE) ==================== */
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {JOURNAL_ARTICLES.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="group cursor-pointer rounded-[12px] bg-[#FFFFFF] border border-[#E2DEC9] overflow-hidden flex flex-col justify-between transition-all duration-250 hover:border-[#C5A880]"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-[#EFECE6] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#FAF8F5]/95 border border-[#E2DEC9] text-[10px] uppercase tracking-[0.08em] text-[#1E241E]">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-[#5C645A]">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>

                      <h2 className="font-serif text-[25px] leading-[1.2] text-[#1E241E] group-hover:text-[#7C8C76] transition-colors">
                        {article.title}
                      </h2>

                      <p className="text-[14px] text-[#5C645A] leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-[#E2DEC9] flex items-center justify-between text-[13px] font-medium text-[#2F3E2E]">
                    <span>Ler Ensaio Completo</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE LEITURA EDITORIAL DO JOURNAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 bg-[#1E241E]/45 backdrop-blur-[3px]"
          />
          <div className="relative z-10 w-full max-w-2xl rounded-[12px] bg-[#FAF8F5] border border-[#C5A880] overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-60 bg-[#EFECE6] shrink-0">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF8F5]/90 border border-[#E2DEC9]"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full bg-[#FAF8F5]/95 border border-[#E2DEC9] text-[11px] uppercase tracking-[0.08em]">
                {selectedArticle.category} • {selectedArticle.readTime}
              </span>
            </div>

            <div className="p-6 sm:p-10 overflow-y-auto space-y-5">
              <h2 className="font-serif text-[32px] leading-tight text-[#1E241E]">
                {selectedArticle.title}
              </h2>

              <div className="space-y-4 text-[15px] text-[#1E241E] leading-[1.75]">
                {selectedArticle.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-[#E2DEC9] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[12px] text-[#7C8C76]">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span>Conselho Científico Maison Belle Éclat</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedArticle(null);
                    openBookingDrawer(PROTOCOLS[3]);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[12px] font-medium hover:bg-[#7C8C76]"
                >
                  Agendar Ritual Relacionado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

