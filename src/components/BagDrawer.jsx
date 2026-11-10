import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  Truck,
  MapPin,
  ArrowRight,
  Gift,
  Home,
} from 'lucide-react';
import { useEclat } from '../context/EclatContext';
import { fetchAddressByCep, sendTransactionalEmail } from '../services/apiServices';

export default function BagDrawer() {
  const {
    isBagOpen,
    setIsBagOpen,
    bagItems,
    updateBagQuantity,
    removeFromBag,
    checkoutBag,
    isClubMember,
    navigateTo,
  } = useEclat();

  const [deliveryOption, setDeliveryOption] = useState('Flagship'); // 'Flagship' | 'Expressa'
  const [cepInput, setCepInput] = useState('');
  const [cepAddress, setCepAddress] = useState(null);
  const [cepLoading, setCepLoading] = useState(false);

  const handleCepChange = async (val) => {
    setCepInput(val);
    const clean = val.replace(/\D/g, '');
    if (clean.length === 8) {
      setCepLoading(true);
      const found = await fetchAddressByCep(clean);
      setCepAddress(found);
      setCepLoading(false);
    } else {
      setCepAddress(null);
    }
  };

  if (!isBagOpen) return null;

  const subtotalOriginal = bagItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const subtotalWithClub = bagItems.reduce((sum, item) => {
    const unitPrice =
      item.itemType === 'product' && isClubMember
        ? Math.round(item.price * 0.85)
        : item.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const clubSavings = subtotalOriginal - subtotalWithClub;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsBagOpen(false)}
        className="fixed inset-0 bg-[#1E241E]/40 backdrop-blur-[3px] transition-opacity duration-250"
      />

      {/* Gaveta Lateral */}
      <aside className="relative z-10 w-full max-w-[440px] bg-[#EFECE6] border-l border-[#E2DEC9] h-full flex flex-col justify-between overflow-hidden">
        {/* TOPO */}
        <div className="px-6 py-5 bg-[#FAF8F5] border-b border-[#E2DEC9] flex items-center justify-between">
          <div>
            <span className="meta-tag text-[#7C8C76] block">Boutique & Experiências</span>
            <h2 className="font-serif text-[26px] leading-tight text-[#1E241E]">
              Sua Sacola Éclat
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsBagOpen(false)}
            aria-label="Fechar sacola"
            className="p-2 rounded-full border border-[#E2DEC9] text-[#1E241E] hover:border-[#C5A880] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BANNER DE STATUS DO CLUBE NA SACOLA */}
        {isClubMember ? (
          <div className="px-6 py-2.5 bg-[#2F3E2E] text-[#FAF8F5] text-[12px] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Privilégio Le Club Éclat Ativo: 15% OFF em Skincare</span>
            </span>
            {clubSavings > 0 && (
              <span className="text-[#C5A880] font-medium">- R$ {clubSavings}</span>
            )}
          </div>
        ) : (
          <div className="px-6 py-2.5 bg-[#FAF8F5] border-b border-[#E2DEC9] text-[12px] flex items-center justify-between">
            <span className="text-[#5C645A]">
              Membros <strong>Le Club Éclat</strong> têm 15% OFF automático
            </span>
            <button
              type="button"
              onClick={() => {
                setIsBagOpen(false);
                navigateTo('clube');
              }}
              className="text-[#2F3E2E] font-medium underline"
            >
              Conhecer
            </button>
          </div>
        )}

        {/* LISTA DE ITENS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {bagItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#E2DEC9] flex items-center justify-center text-[#5C645A]">
                <ShoppingBag className="w-6 h-6 stroke-[1.25]" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="font-serif text-[22px] text-[#1E241E]">
                  Sua sacola está vazia
                </h3>
                <p className="text-[13px] text-[#5C645A]">
                  Explore nossas fórmulas botânicas puras, pacotes domiciliares Chez Vous ou Vale-Experiências.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsBagOpen(false);
                    navigateTo('boutique');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[12px] font-medium hover:bg-[#7C8C76] transition-colors"
                >
                  Explorar Boutique
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsBagOpen(false);
                    navigateTo('rituais', { rituaisTab: 'chezvous' });
                  }}
                  className="px-5 py-2.5 rounded-full border border-[#E2DEC9] bg-[#FAF8F5] text-[#1E241E] text-[12px] font-medium hover:border-[#C5A880] transition-colors"
                >
                  Pacotes Chez Vous
                </button>
              </div>
            </div>
          ) : (
            bagItems.map((item) => {
              const isProd = item.itemType === 'product';
              const discountedUnit =
                isProd && isClubMember ? Math.round(item.price * 0.85) : item.price;

              return (
                <div
                  key={item.cartItemId}
                  className="p-4 rounded-[8px] bg-[#FFFFFF] border border-[#E2DEC9] flex gap-4"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 rounded-[6px] object-cover bg-[#EFECE6] shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-20 rounded-[6px] bg-[#EFECE6] border border-[#C5A880] flex items-center justify-center shrink-0">
                      {item.itemType === 'giftcard' ? (
                        <Gift className="w-6 h-6 text-[#C5A880]" />
                      ) : (
                        <Home className="w-6 h-6 text-[#2F3E2E]" />
                      )}
                    </div>
                  )}

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-[18px] leading-tight text-[#1E241E] font-medium">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromBag(item.cartItemId)}
                          aria-label="Remover item"
                          className="text-[#5C645A] hover:text-[#B87D64] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] uppercase tracking-[0.06em] text-[#5C645A] mt-0.5">
                        {item.metaLine ||
                          (item.itemType === 'chezvous'
                            ? `Pacote Domiciliar • +${item.credits} Créditos`
                            : 'Vale-Experiência Personalizado')}
                      </p>
                      {item.recipientName && (
                        <p className="text-[11px] text-[#7C8C76] mt-1 italic">
                          Para: {item.recipientName}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 flex items-center justify-between">
                      {/* Controle de Quantidade */}
                      <div className="flex items-center border border-[#E2DEC9] rounded-full bg-[#FAF8F5]">
                        <button
                          type="button"
                          onClick={() => updateBagQuantity(item.cartItemId, -1)}
                          className="p-1.5 text-[#5C645A] hover:text-[#1E241E]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-[12px] font-medium text-[#1E241E]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateBagQuantity(item.cartItemId, 1)}
                          className="p-1.5 text-[#5C645A] hover:text-[#1E241E]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Preço */}
                      <div className="text-right">
                        <span className="text-[14px] font-medium text-[#1E241E]">
                          R$ {discountedUnit * item.quantity}
                        </span>
                        {isProd && isClubMember && (
                          <span className="block text-[11px] line-through text-[#5C645A]">
                            R$ {item.price * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RODAPÉ DE CHECKOUT DA SACOLA */}
        {bagItems.length > 0 && (
          <div className="p-6 bg-[#FAF8F5] border-t border-[#E2DEC9] space-y-4">
            {/* Opção de Entrega ou Retirada na Flagship */}
            <div className="space-y-2">
              <span className="meta-tag text-[#5C645A] block">
                Modalidade de Recebimento
              </span>
              <div className="grid grid-cols-1 gap-2">
                <label
                  onClick={() => setDeliveryOption('Flagship')}
                  className={`cursor-pointer p-3 rounded-[6px] border flex items-center justify-between text-[12px] transition-colors ${
                    deliveryOption === 'Flagship'
                      ? 'bg-[#EFECE6] border-[#2F3E2E] text-[#1E241E]'
                      : 'bg-[#FFFFFF] border-[#E2DEC9] text-[#5C645A]'
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#2F3E2E]" />
                    <span>Retirada Gratuita na Flagship na sua próxima sessão</span>
                  </span>
                  <span className="text-[#2F3E2E] font-medium">Grátis</span>
                </label>

                <label
                  onClick={() => setDeliveryOption('Expressa')}
                  className={`cursor-pointer p-3 rounded-[6px] border flex items-center justify-between text-[12px] transition-colors ${
                    deliveryOption === 'Expressa'
                      ? 'bg-[#EFECE6] border-[#2F3E2E] text-[#1E241E]'
                      : 'bg-[#FFFFFF] border-[#E2DEC9] text-[#5C645A]'
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Truck className="w-3.5 h-3.5 text-[#2F3E2E]" />
                    <span>Entrega Expressa em Domicílio (Ecobag de Linho)</span>
                  </span>
                  <span className="text-[#2F3E2E] font-medium">Cortesia</span>
                </label>
              </div>

              {/* Autopreenchimento de Endereço via API Gratuita ViaCEP quando Entrega Expressa está ativa */}
              {deliveryOption === 'Expressa' && (
                <div className="p-3 rounded-[6px] bg-[#FFFFFF] border border-[#E2DEC9] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] uppercase tracking-[0.06em] text-[#7C8C76]">
                      Calcular Endereço (ViaCEP API)
                    </span>
                    {cepLoading && (
                      <span className="text-[11px] text-[#5C645A]">Buscando...</span>
                    )}
                  </div>
                  <input
                    type="text"
                    maxLength={9}
                    value={cepInput}
                    onChange={(e) => handleCepChange(e.target.value)}
                    placeholder="Digite seu CEP (ex: 01414-001)"
                    className="w-full px-3 py-1.5 rounded bg-[#FAF8F5] border border-[#E2DEC9] text-[12px] text-[#1E241E] focus:outline-none focus:border-[#C5A880]"
                  />
                  {cepAddress && (
                    <p className="text-[11px] text-[#2F3E2E] font-medium">
                      ✓ {cepAddress.street} — {cepAddress.neighborhood}, {cepAddress.city}/{cepAddress.state}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Resumo de Valores */}
            <div className="pt-2 border-t border-[#E2DEC9] space-y-1.5 text-[13px]">
              {clubSavings > 0 && (
                <div className="flex justify-between text-[#7C8C76]">
                  <span>Desconto Le Club Éclat (15% OFF)</span>
                  <span>- R$ {clubSavings},00</span>
                </div>
              )}
              <div className="flex justify-between items-baseline text-[16px] font-medium text-[#1E241E]">
                <span>Total do Pedido</span>
                <span className="font-serif text-[24px]">R$ {subtotalWithClub},00</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                sendTransactionalEmail({
                  subject: 'Novo Pedido na Boutique Belle Éclat',
                  details: {
                    itens: bagItems.map((i) => `${i.quantity}x ${i.name}`).join(', '),
                    total: `R$ ${subtotalWithClub},00`,
                    modalidade: deliveryOption,
                    endereco: cepAddress
                      ? `${cepAddress.street}, ${cepAddress.neighborhood} - ${cepAddress.city}`
                      : 'Retirada na Flagship Jardins',
                  },
                });
                checkoutBag(deliveryOption);
              }}
              className="w-full py-3.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-[#7C8C76] transition-colors"
            >
              <span>Finalizar Compra na Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

