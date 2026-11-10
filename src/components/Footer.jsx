import React, { useState } from 'react';
import { MapPin, Clock, Sparkles, ArrowUpRight, Check } from 'lucide-react';
import { useEclat } from '../context/EclatContext';
import { sendTransactionalEmail } from '../services/apiServices';

export default function Footer() {
  const { navigateTo, openBookingDrawer, showToast } = useEclat();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    const userEmail = email.trim();
    setSubscribed(true);
    setEmail('');
    await sendTransactionalEmail({
      subject: 'Nova Inscrição na La Lettre Botanique',
      details: { email_inscrito: userEmail },
    });
    showToast(
      'Inscrição confirmada na Lettre Botanique',
      'Você receberá nossos ensaios mensais sobre cronobiologia cutânea.'
    );
  };

  return (
    <footer className="bg-[#EFECE6] border-t border-[#E2DEC9] text-[#1E241E]">
      <div className="eclat-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E2DEC9]">
          {/* Coluna 1: Identidade */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/assets/logomark.png"
                alt="Logomark Belle Éclat"
                className="w-14 h-14 object-contain shrink-0"
              />
              <div>
                <span className="block font-serif text-[30px] leading-none tracking-[0.06em] text-[#1E241E]">
                  BELLE ÉCLAT
                </span>
                <span className="block text-[9px] uppercase tracking-[0.22em] text-[#5C645A] mt-1.5">
                  MAISON DE BEAUTÉ & CLÍNICA FACIAL BOTÂNICA
                </span>
              </div>
            </div>
            <p className="text-[14px] text-[#5C645A] leading-relaxed max-w-sm">
              Arquitetura facial holística, dermocosméticos 100% botânicos e protocolos clínicos guiados pelo ciclo biológico de 28 dias da epiderme.
            </p>
            <div className="pt-2 space-y-2 text-[13px] text-[#5C645A]">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2F3E2E] shrink-0" />
                <span>Flagship Jardins • Rua Bela Cintra, 1840 — São Paulo</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2F3E2E] shrink-0" />
                <span>Terça a Sábado: 09h às 20h • Atendimento c/ Hora Marcada</span>
              </p>
            </div>
          </div>

          {/* Coluna 2: Navegação da Maison */}
          <div className="lg:col-span-3 space-y-3">
            <p className="meta-tag text-[#5C645A]">Navegação da Maison</p>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('rituais', { rituaisTab: 'flagship' })}
                  className="hover:text-[#7C8C76] transition-colors"
                >
                  Rituais na Flagship
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('rituais', { rituaisTab: 'chezvous' })}
                  className="hover:text-[#7C8C76] transition-colors"
                >
                  Belle Éclat Chez Vous (Domiciliar)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('rituais', { rituaisTab: 'giftcards' })}
                  className="hover:text-[#7C8C76] transition-colors"
                >
                  Vale-Experiência (Gift Cards)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('planejamento')}
                  className="hover:text-[#7C8C76] transition-colors"
                >
                  Le Diagnostic (Plano Facial 6 Meses)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('boutique')}
                  className="hover:text-[#7C8C76] transition-colors"
                >
                  Boutique Skincare Digital
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Universo & Cliente */}
          <div className="lg:col-span-2 space-y-3">
            <p className="meta-tag text-[#5C645A]">Universo Éclat</p>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('clube')}
                  className="hover:text-[#7C8C76] transition-colors"
                >
                  Le Club Éclat VIP
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('herbier')}
                  className="hover:text-[#7C8C76] transition-colors"
                >
                  L’Herbier (Ativos)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('herbier')}
                  className="hover:text-[#7C8C76] transition-colors"
                >
                  Le Journal Editorial
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('painel')}
                  className="hover:text-[#7C8C76] transition-colors"
                >
                  Meu Espaço Éclat
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openBookingDrawer()}
                  className="hover:text-[#7C8C76] transition-colors flex items-center gap-1 font-medium text-[#2F3E2E]"
                >
                  <span>Agendar Visita</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 4: La Lettre Botanique */}
          <div className="lg:col-span-3 space-y-4">
            <p className="meta-tag text-[#5C645A]">La Lettre Botanique</p>
            <p className="text-[13px] text-[#5C645A] leading-relaxed">
              Receba convites privados da Flagship e ensaios sazonais sobre longevidade cutânea.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2.5">
              <div className="flex items-center bg-[#FAF8F5] border border-[#E2DEC9] rounded-full p-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail..."
                  className="w-full px-4 py-2 bg-transparent text-[13px] text-[#1E241E] placeholder-[#5C645A] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#2F3E2E] text-[#FAF8F5] text-[12px] font-medium hover:bg-[#7C8C76] transition-colors shrink-0"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : 'Inscrever'}
                </button>
              </div>
            </form>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#5C645A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Fórmulas 100% veganas, refiláveis e livres de silicones.</span>
            </div>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#5C645A]">
          <p>© 2026 Belle Éclat Maison de Beauté. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Rigor Dermatológico Francês</span>
            <span>•</span>
            <span>Botânica Pura & Sustentável</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

