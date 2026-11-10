import React from 'react';
import { Plus } from 'lucide-react';
import { useEclat } from '../context/EclatContext';

/**
 * Regra Inegociável dos 3 Elementos nos Cards:
 * 1) Foto minimalista + 1 badge discreta no topo
 * 2) Nome em Francês (font-serif) + 1 linha curta de metadado abaixo
 * 3) Preço em R$ à esquerda e botão redondo verde-oliva (+) à direita
 */
export default function LuxuryCard({
  item,
  type = 'protocol', // 'protocol' | 'product'
  customBadge = null,
  onTitleClick,
  onActionClick,
}) {
  const { isClubMember } = useEclat();

  const badgeText = customBadge || item.badge;
  const isProduct = type === 'product';
  const finalPrice = isProduct && isClubMember ? Math.round(item.price * 0.85) : item.price;

  return (
    <article className="group bg-[#FFFFFF] border border-[#E2DEC9] rounded-[8px] overflow-hidden flex flex-col justify-between transition-all duration-250 hover:border-[#C5A880]">
      {/* ELEMENTO 1: Fotografia minimalista + 1 badge discreta no topo */}
      <div
        onClick={() => onTitleClick && onTitleClick(item)}
        className={`relative aspect-[4/5] w-full bg-[#EFECE6] overflow-hidden ${
          onTitleClick ? 'cursor-pointer' : ''
        }`}
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {badgeText && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FAF8F5]/95 border border-[#E2DEC9] text-[#1E241E] text-[11px] uppercase tracking-[0.08em] font-medium">
            {badgeText}
          </span>
        )}
      </div>

      {/* ELEMENTO 2 & 3 */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-5">
        {/* ELEMENTO 2: Nome em Francês + 1 linha curta de metadado abaixo */}
        <div>
          <h3
            onClick={() => onTitleClick && onTitleClick(item)}
            className={`font-serif text-[22px] leading-[1.2] text-[#1E241E] font-medium transition-colors duration-250 ${
              onTitleClick ? 'cursor-pointer hover:text-[#7C8C76]' : ''
            }`}
          >
            {item.name}
          </h3>
          <p className="mt-1.5 text-[12px] uppercase tracking-[0.08em] text-[#5C645A]">
            {item.metaLine}
          </p>
        </div>

        {/* ELEMENTO 3: Valor em R$ à esquerda e botão circular verde-oliva (+) à direita */}
        <div className="pt-3 border-t border-[#E2DEC9] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-[16px] font-medium text-[#1E241E]">
              R$ {finalPrice}
            </span>
            {isProduct && isClubMember && (
              <span className="text-[12px] line-through text-[#5C645A]">
                R$ {item.price}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onActionClick && onActionClick(item)}
            aria-label={isProduct ? `Adicionar ${item.name} à sacola` : `Agendar ${item.name}`}
            title={isProduct ? 'Adicionar à Sacola' : 'Agendar este Ritual'}
            className="w-9 h-9 rounded-full bg-[#2F3E2E] text-[#FAF8F5] flex items-center justify-center transition-all duration-250 hover:bg-[#7C8C76] active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[1.75]" />
          </button>
        </div>
      </div>
    </article>
  );
}

