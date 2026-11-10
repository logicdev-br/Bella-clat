import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { EclatProvider, useEclat } from './context/EclatContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingDrawer from './components/BookingDrawer';
import BagDrawer from './components/BagDrawer';
import BotanicalAIChatWidget from './components/BotanicalAIChatWidget';
import HomeView from './views/HomeView';
import RituaisView from './views/RituaisView';
import DiagnosticView from './views/DiagnosticView';
import BoutiqueView from './views/BoutiqueView';
import ClubeView from './views/ClubeView';
import HerbierJournalView from './views/HerbierJournalView';
import ClientDashboardView from './views/ClientDashboardView';

function MainAppContent() {
  const { activeView, toast } = useEclat();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E241E]">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && <HomeView />}
        {activeView === 'rituais' && <RituaisView />}
        {activeView === 'planejamento' && <DiagnosticView />}
        {activeView === 'boutique' && <BoutiqueView />}
        {activeView === 'clube' && <ClubeView />}
        {activeView === 'herbier' && <HerbierJournalView />}
        {activeView === 'painel' && <ClientDashboardView />}
      </main>

      <Footer />

      {/* Gavetas Laterais Globais */}
      <BookingDrawer />
      <BagDrawer />
      <BotanicalAIChatWidget />

      {/* Notificação Flutuante Discreta de Luxo */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 max-w-md p-4 rounded-[10px] bg-[#2F3E2E] text-[#FAF8F5] border border-[#C5A880] flex items-start gap-3 transition-all duration-250">
          <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-serif text-[18px] leading-tight text-[#FAF8F5]">
              {toast.message}
            </p>
            {toast.subtitle && (
              <p className="text-[12px] text-[#FAF8F5]/80">{toast.subtitle}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <EclatProvider>
      <MainAppContent />
    </EclatProvider>
  );
}

