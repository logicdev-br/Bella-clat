import React, { useState } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Calendar,
  Menu,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useEclat } from '../context/EclatContext';
import { PROTOCOLS, PRODUCTS, HERBIER_ACTIVES } from '../data/mockData';

export default function Navbar() {
  const {
    activeView,
    navigateTo,
    openBookingDrawer,
    bagCount,
    setIsBagOpen,
    isClubMember,
    chezVousCredits,
    isSearchOpen,
    setIsSearchOpen,
    addToBag,
  } = useEclat();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { id: 'rituais', label: 'Rituais Faciais' },
    { id: 'planejamento', label: 'Planejamento Facial' },
    { id: 'boutique', label: 'Boutique' },
    { id: 'clube', label: 'Clube Éclat' },
    { id: 'herbier', label: 'L’Herbier & Journal' },
  ];

  const q = searchQuery.trim().toLowerCase();
  const matchedProtocols = q
    ? PROTOCOLS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.keyActive.toLowerCase().includes(q)
      )
    : PROTOCOLS.slice(0, 3);

  const matchedProducts = q
    ? PRODUCTS.filter(
        (pr) =>
          pr.name.toLowerCase().includes(q) ||
          pr.description.toLowerCase().includes(q) ||
          pr.category.toLowerCase().includes(q)
      )
    : PRODUCTS.slice(0, 3);

  const matchedActives = q
    ? HERBIER_ACTIVES.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.frenchTitle.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2DEC9]">
      {/* TOP BAR INSTITUCIONAL */}
      <div className="bg-[#2F3E2E] text-[#FAF8F5] py-2 px-4 border-b border-[#E2DEC9]/20">
        <div className="eclat-container flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-1 text-[11px] uppercase tracking-[0.08em]">
          <span
            onClick={() => navigateTo('planejamento')}
            className="cursor-pointer hover:text-[#C5A880] transition-colors"
          >
            ✦ Diagnóstico Facial Gratuito
          </span>
          <span className="hidden sm:inline text-[#FAF8F5]/90">
            ✦ Protocolos Dermatológicos
          </span>
          <span className="hidden md:inline text-[#FAF8F5]/90">
            ✦ Remarcação Flexível
          </span>
          <span className="hidden lg:inline text-[#FAF8F5]/90">
            ✦ Ativos 100% Botânicos
          </span>
        </div>
      </div>

      {/* NAVBAR PRINCIPAL */}
      <div className="eclat-container h-20 flex items-center justify-between gap-4">
        {/* ESQUERDA: LOGOMARK + LOGOTIPO */}
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <img
            src="/assets/logomark.png"
            alt="Logomark Belle Éclat"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
          />
          <div>
            <span className="block font-serif text-[24px] md:text-[28px] leading-none tracking-[0.06em] text-[#1E241E] font-medium">
              BELLE ÉCLAT
            </span>
            <span className="block text-[9px] uppercase tracking-[0.22em] text-[#5C645A] mt-1">
              MAISON DE BEAUTÉ
            </span>
          </div>
        </button>

        {/* CENTRO: 5 LINKS DE NAVEGAÇÃO */}
        <nav className="hidden xl:flex items-center gap-7" aria-label="Navegação Principal">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => navigateTo(link.id)}
                className={`relative py-1 text-[14px] tracking-[0.02em] transition-colors duration-250 ${
                  isActive
                    ? 'text-[#1E241E] font-medium'
                    : 'text-[#5C645A] hover:text-[#1E241E]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#2F3E2E]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* DIREITA: UTILITÁRIOS */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Busca */}
          <button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Pesquisar rituais e ativos"
            title="Buscar Rituais & Ativos"
            className={`p-2.5 rounded-full border transition-colors duration-250 ${
              isSearchOpen
                ? 'bg-[#EFECE6] border-[#C5A880] text-[#1E241E]'
                : 'border-transparent hover:border-[#E2DEC9] text-[#1E241E]'
            }`}
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
          </button>

          {/* Perfil (Meu Espaço Éclat) */}
          <button
            type="button"
            onClick={() => navigateTo('painel')}
            aria-label="Meu Espaço Éclat"
            title="Meu Espaço Éclat (Painel do Cliente)"
            className={`relative flex items-center gap-2 px-3 py-2 rounded-full border transition-colors duration-250 ${
              activeView === 'painel'
                ? 'bg-[#EFECE6] border-[#C5A880] text-[#1E241E]'
                : 'border-[#E2DEC9] hover:border-[#C5A880] text-[#1E241E]'
            }`}
          >
            <User className="w-4 h-4 stroke-[1.5]" />
            <span className="hidden md:inline text-[12px] font-medium">
              Meu Espaço
            </span>
            {(isClubMember || chezVousCredits > 0) && (
              <span
                title="Benefício VIP Ativo"
                className="w-2 h-2 rounded-full bg-[#C5A880]"
              />
            )}
          </button>

          {/* Botão de Destaque Rápido: Agendar Sessão */}
          <button
            type="button"
            onClick={() => openBookingDrawer()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium tracking-[0.02em] transition-all duration-250 hover:bg-[#7C8C76]"
          >
            <Calendar className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Agendar Sessão</span>
          </button>

          {/* Sacola com Contador Numérico */}
          <button
            type="button"
            onClick={() => setIsBagOpen(true)}
            aria-label="Abrir Sacola da Boutique"
            title="Sacola da Boutique"
            className="relative p-2.5 rounded-full border border-[#E2DEC9] hover:border-[#C5A880] text-[#1E241E] transition-colors duration-250"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            {bagCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[10px] font-medium flex items-center justify-center">
                {bagCount}
              </span>
            )}
          </button>

          {/* Menu Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Menu de navegação"
            className="xl:hidden p-2 rounded-full border border-[#E2DEC9] text-[#1E241E]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* BARRA DE BUSCA EXPANSÍVEL */}
      {isSearchOpen && (
        <div className="bg-[#EFECE6] border-t border-[#E2DEC9] py-6 transition-all duration-250">
          <div className="eclat-container">
            <div className="flex items-center gap-3 bg-[#FFFFFF] border border-[#E2DEC9] rounded-[8px] px-4 py-3">
              <Search className="w-4 h-4 text-[#5C645A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar rituais faciais (ex: Kobi-Do, Lumière), produtos ou ativos botânicos (ex: Bakuchiol, Niacinamida)..."
                className="w-full bg-transparent text-[14px] text-[#1E241E] placeholder-[#5C645A] focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[12px] text-[#5C645A] hover:text-[#1E241E]"
                >
                  Limpar
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-[#5C645A] hover:text-[#1E241E]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rituais encontrados */}
              <div>
                <p className="meta-tag text-[#5C645A] mb-3">
                  Rituais na Flagship ({matchedProtocols.length})
                </p>
                <div className="space-y-2">
                  {matchedProtocols.slice(0, 4).map((proto) => (
                    <div
                      key={proto.id}
                      className="flex items-center justify-between p-3 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9]"
                    >
                      <div>
                        <p className="font-serif text-[18px] text-[#1E241E] font-medium">
                          {proto.name}
                        </p>
                        <p className="text-[12px] text-[#5C645A]">
                          {proto.metaLine} • R$ {proto.price}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          openBookingDrawer(proto);
                        }}
                        className="px-3 py-1.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[12px] hover:bg-[#7C8C76] transition-colors"
                      >
                        Agendar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Produtos & Ativos encontrados */}
              <div>
                <p className="meta-tag text-[#5C645A] mb-3">
                  Dermocosméticos & Ativos ({matchedProducts.length + matchedActives.length})
                </p>
                <div className="space-y-2">
                  {matchedProducts.slice(0, 3).map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between p-3 rounded-[8px] bg-[#FAF8F5] border border-[#E2DEC9]"
                    >
                      <div>
                        <p className="font-serif text-[18px] text-[#1E241E] font-medium">
                          {prod.name}
                        </p>
                        <p className="text-[12px] text-[#5C645A]">
                          {prod.metaLine} • R$ {prod.price}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          addToBag({ ...prod, itemType: 'product' }, true);
                        }}
                        className="px-3 py-1.5 rounded-full border border-[#2F3E2E] text-[#2F3E2E] text-[12px] hover:bg-[#2F3E2E] hover:text-[#FAF8F5] transition-colors"
                      >
                        + Sacola
                      </button>
                    </div>
                  ))}
                  {matchedActives.slice(0, 2).map((act) => (
                    <div
                      key={act.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('herbier');
                      }}
                      className="cursor-pointer flex items-center justify-between p-3 rounded-[8px] bg-[#FAF8F5] border border-[#C5A880]/60"
                    >
                      <div>
                        <p className="font-serif text-[17px] text-[#1E241E]">
                          Ativo: {act.name}
                        </p>
                        <p className="text-[12px] text-[#5C645A]">{act.category}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#5C645A]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MENU MOBILE */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF8F5] border-t border-[#E2DEC9] py-5 px-5 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                navigateTo(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2.5 border-b border-[#E2DEC9]/60 font-serif text-[20px] ${
                activeView === link.id ? 'text-[#2F3E2E] font-semibold' : 'text-[#1E241E]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingDrawer();
              }}
              className="w-full py-3 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Sessão na Flagship</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('painel');
              }}
              className="w-full py-3 rounded-full border border-[#E2DEC9] text-[#1E241E] text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Acessar Meu Espaço Éclat</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

